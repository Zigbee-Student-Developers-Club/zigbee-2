import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAt,
  updateDoc,
  where,
} from "firebase/firestore";
import firebaseApp from "./config";
import {
  AlumniType,
  ContributorType,
  EventType,
  FirebaseFetchUserType,
  MagazineType,
  ResourceType,
  UserData,
} from "../types";
import { sendVerificationEmail } from "../resend/utils";
import { generateToken } from "../jwt";

const db = getFirestore(firebaseApp);
const userCollection = collection(db, "users");
const resourceCollection = collection(db, "resources");
const magazineCollection = collection(db, "magazines");
const eventCollection = collection(db, "events");

// handling error
const handleError = (err: unknown, method: string): string => {
  console.error(`Firebase Error in ${method} :: `, err); // Log the error
  return "An unexpected error occurred. Please try again later.";
};

// check if a user is registered
export const checkUserRegistered = async (email: string) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    result = !querySnapshot.empty;
  } catch (err) {
    error = handleError(err, "checkUserRegistered");
  }

  return { result, error };
};

// send OTP to user
export const sendOtp = async (email: string) => {
  let result: boolean = false;
  let error: string | null = null;

  const tempOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const data = {
    email,
    tempOtp,
    isVerified: false,
  };

  try {
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // send OTP
    const response = await sendVerificationEmail(email, tempOtp);

    if (!response.success) {
      return {
        result: false,
        error: response.message,
      };
    }

    if (!querySnapshot.empty) {
      const id = querySnapshot.docs[0].id;
      await updateDoc(doc(db, "users", id), {
        tempOtp,
        isVerified: false,
      });
    } else {
      await addDoc(userCollection, data);
    }

    result = true;
  } catch (err) {
    error = handleError(err, "sendOtp");
  }

  return { result, error };
};

// verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  let result: {
    isProvidedBasicData: boolean;
    token: string | null;
  } | null = null;
  let error: string | null = null;

  try {
    const q = query(
      userCollection,
      where("email", "==", email),
      where("tempOtp", "==", otp),
      where("isVerified", "==", false)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        result: null,
        error: "Incorrect OTP",
      };
    }

    const docData = querySnapshot.docs[0];

    const token = await generateToken(docData.id);

    if (!token) {
      return {
        result: null,
        error: "Failed to generate authentication token. Please try again.",
      };
    }

    await updateDoc(doc(userCollection, docData.id), {
      tempOtp: null,
      isVerified: true,
      accessToken: token,
    });

    result = {
      isProvidedBasicData: !!docData.data().isProvidedBasicData,
      token,
    };
  } catch (err) {
    error = handleError(err, "verifyOtp");
  }

  return { result, error };
};

// check user by id
export const getUserById = async (id: string) => {
  let result = null;
  let error: string | null = null;

  try {
    const docRef = doc(userCollection, id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      throw new Error("User not found.");
    }

    const userData: {
      [key: string]: unknown;
    } = userDoc.data();

    delete userData.tempOtp;
    delete userData.accessToken;
    delete userData.isProvidedBasicData;
    delete userData.isVerified;

    result = userData;
    error = null;
    return { result, error };
  } catch (err) {
    error = handleError(err, "getUserById");
  }
  return { result, error };
};

// fetch all users by role, batch with pagination
export const fetchUser = async (
  role?: string,
  batch?: number,
  page: number = 1,
  countLimit: number = 20
) => {
  let result = null;
  let error = null;
  let totalUsers = 0;

  try {
    let q = query(userCollection);

    if (role) {
      q = query(q, where("role", "==", role));
    }

    if (batch) {
      q = query(q, where("batch", "==", batch));
    }

    // Get total users
    const allDocs = await getDocs(q);
    totalUsers = allDocs.size;

    // Apply pagination
    const startIndex = (page - 1) * countLimit;
    const paginatedQuery = query(
      q,
      orderBy("name"),
      limit(countLimit),
      startAt(startIndex)
    );

    const querySnapshot = await getDocs(paginatedQuery);

    if (querySnapshot.empty) {
      return { result, totalUsers, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: FirebaseFetchUserType = {
        id: doc.id,
        ...data,
      };

      // Remove sensitive fields
      delete filteredData.tempOtp;
      delete filteredData.accessToken;
      delete filteredData.isProvidedBasicData;
      delete filteredData.isVerified;

      return filteredData;
    });

    return { result, totalUsers, error };
  } catch (err) {
    error = handleError(err, "fetchUser");
  }
  return { result, totalUsers, error };
};

// fetch alumni
export const fetchAlumni = async (batch?: number) => {
  let result = null;
  let error: string | null = null;

  try {
    let q = query(userCollection, where("role", "in", ["alumni", "admin"]));

    if (batch) {
      q = query(q, where("batch", "==", batch));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: {
        id: string;
      } & AlumniType = {
        id: doc.id,
        name: data.name,
        batch: data.batch,
        profileImg: data.profileImg,
        linkedInUrl: data.linkedInUrl,
        position: data.position,
        domain: data.domain,
        about: data.about,
      };

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err, "fetchUserByField");
  }
  return { result, error };
};

// fetch contributors
export const fetchContributors = async () => {
  let result = null;
  let error: string | null = null;

  try {
    const q = query(userCollection, where("isContributor", "==", true));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: {
        id: string;
      } & ContributorType = {
        id: doc.id,
        name: data.name,
        batch: data.batch,
        profileImg: data.profileImg,
        linkedInUrl: data.linkedInUrl,
        isContributor: data.isContributor,
        domain: data.domain,
        position: data.position,
      };

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err, "fetchUserByField");
  }
  return { result, error };
};

// Check user role
export const checkUserRole = async (id: string) => {
  try {
    const docRef = doc(userCollection, id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      return { result: null, error: "User not found." };
    }

    const role = userDoc.data()?.role || null;

    return { result: role, error: null };
  } catch (err) {
    const error = handleError(err, "checkUserRole");
    return { result: null, error };
  }
};

// Add or update user details
export const addOrUpdateUserDetails = async (
  id: string | null,
  data: UserData,
  isAdmin: boolean
) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    // For new user creation
    if (!id && isAdmin) {
      const newUser = {
        name: data.name,
        batch: data.batch,
        linkedInUrl: data.linkedInUrl,
        profileImg: data.profileImg,
        domain: data.domain || "",
        phoneNumber: data.phoneNumber || null,
        about: data.about || "",
        role: data.role || "guest",
        position: data.position || "",
        isContributor: data.isContributor || false,
        isProvidedBasicData: true,
      };

      const newDoc = await addDoc(userCollection, newUser);

      if (!newDoc) {
        throw new Error("Failed to create a new user document.");
      }

      result = true;
      return { result, error };
    }

    // For existing user updates
    if (!id) {
      throw new Error("User ID is required for updating details.");
    }

    const docRef = doc(userCollection, id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      throw new Error("User not found. Cannot update details.");
    }

    const userData = userDoc.data();

    // Check if basic data is already provided
    if (userData?.isProvidedBasicData) {
      // Update existing data without overwriting sensitive fields
      const updatedData: Partial<UserData> = {
        name: data.name || userData.name,
        batch: data.batch || userData.batch,
        linkedInUrl: data.linkedInUrl || userData.linkedInUrl,
        profileImg: data.profileImg || userData.profileImg,
        domain: data.domain || userData.domain,
        phoneNumber: data.phoneNumber || userData.phoneNumber,
        about: data.about || userData.about,
      };

      if (isAdmin) {
        updatedData.role = data.role || userData.role;
        updatedData.position = data.position || userData.position;
        updatedData.isContributor =
          data.isContributor ?? userData.isContributor;
      }

      await updateDoc(docRef, updatedData);
    } else {
      // Add basic data if not provided yet
      const newBasicData = {
        name: data.name,
        batch: data.batch,
        linkedInUrl: data.linkedInUrl,
        profileImg: data.profileImg,
        domain: data.domain || "",
        phoneNumber: data.phoneNumber || null,
        about: data.about || "",
        role: isAdmin ? data.role : "guest",
        position: isAdmin ? data.position : "",
        isContributor: isAdmin ? data.isContributor : false,
        isProvidedBasicData: true,
      };

      await updateDoc(docRef, newBasicData);
    }

    result = true;
  } catch (err) {
    error = handleError(err, "addOrUpdateUserDetails");
  }

  return { result, error };
};

// delete user by id
export const deleteUserById = async (id: string) => {
  let result = false;
  let error: string | null = null;

  try {
    const docRef = doc(userCollection, id);

    if (!docRef.id) {
      throw new Error("User not found. Cannot delete.");
    }

    await deleteDoc(docRef);

    result = true;
  } catch (err) {
    error = handleError(err, "deleteUserById");
  }

  return { result, error };
};

// verify access token
export const verifyAccessToken = async (token: string) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    const q = query(userCollection, where("accessToken", "==", token));
    const querySnapshot = await getDocs(q);
    result = !querySnapshot.empty;
  } catch (err) {
    error = handleError(err, "verifyAccessToken");
  }

  return { result, error };
};

// add resource
export const addResource = async (data: ResourceType) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    const res = await addDoc(resourceCollection, data);

    result = res ? true : false;
  } catch (err) {
    error = handleError(err, "addResource");
  }

  return { result, error };
};

// fetch all resources
export const fetchResources = async (domain?: string) => {
  let result = null;
  let error: string | null = null;

  try {
    let q = query(resourceCollection);

    if (domain) {
      q = query(q, where("domain", "==", domain));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: {
        id: string;
      } & ResourceType = {
        id: doc.id,
        name: data.name,
        url: data.url,
        domain: data.domain,
        uploadedOn: data.uploadedOn,
        author: data.author,
      };

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err, "fetchResources");
  }
  return { result, error };
};

// add magazine
export const addMagazine = async (data: MagazineType) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    const res = await addDoc(magazineCollection, data);

    result = res ? true : false;
  } catch (err) {
    error = handleError(err, "addMagazine");
  }

  return { result, error };
};

// fetch all magazines
export const fetchMagazines = async () => {
  let result = null;
  let error: string | null = null;

  try {
    const querySnapshot = await getDocs(magazineCollection);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: {
        id: string;
      } & MagazineType = {
        id: doc.id,
        title: data.title,
        url: data.url,
        image: data.image,
        uploadedOn: data.uploadedOn,
      };

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err, "fetchMagazines");
  }
  return { result, error };
};

// add event
export const addEvent = async (data: EventType) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    const res = await addDoc(eventCollection, data);

    result = res ? true : false;
  } catch (err) {
    error = handleError(err, "addEvent");
  }

  return { result, error };
};

// fetch all events
export const fetchEvents = async () => {
  let result = null;
  let error: string | null = null;

  try {
    const querySnapshot = await getDocs(eventCollection);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData = {
        id: doc.id,
        ...data,
      };

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err, "fetchEvents");
  }

  return { result, error };
};
