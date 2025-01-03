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
  writeBatch,
} from "firebase/firestore";
import firebaseApp from "./config";
import {
  AlumniType,
  ContributorType,
  EventType,
  MagazineType,
  ResourceType,
  UserData,
  UserDataForBulk,
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
  if (process.env.NODE_ENV === "development") {
    console.error(`Firebase Error in ${method} :: `, err); // Log the error only in development
  }

  return "An unexpected error occurred. Please try again later.";
};

// check if a user is registered
export const checkUserRegistered = async (email: string) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    const q = query(
      userCollection,
      where("email", "==", email),
      where("isProvidedBasicData", "==", true)
    );
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
    name: string | null;
    profileImg: string | null;
    isProvidedBasicData: boolean;
    isAdmin: boolean;
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

    const data = docData.data();
    result = {
      name: data?.name,
      profileImg: data?.profileImg,
      isProvidedBasicData: !!data?.isProvidedBasicData,
      isAdmin: !!data?.isAdmin,
      token,
    };
  } catch (err) {
    error = handleError(err, "verifyOtp");
  }

  return { result, error };
};

// check user by id
export const getUserById = async (id: string) => {
  let result: Partial<UserData> | null = null;
  let error: string | null = null;

  try {
    const docRef = doc(userCollection, id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      throw new Error("User not found.");
    }

    const userData = userDoc.data();

    result = {
      id: userDoc.id,
      name: userData?.name,
      email: userData?.email,
      phoneNumber: userData?.phoneNumber,
      profileImg: userData?.profileImg,
      batch: userData?.batch,
      linkedInUrl: userData?.linkedInUrl,
      domain: userData?.domain,
      feedback: userData?.feedback,
      about: userData?.about,
      position: userData?.position,
    };
    error = null;
    return { result, error };
  } catch (err) {
    error = handleError(err, "getUserById");
  }
  return { result, error };
};

// fetch all users by role, batch with pagination
export const fetchUser = async (
  page: number = 1,
  countLimit: number = 20,
  role?: string,
  batch?: string,
  isAdmin?: string,
  isContributor?: string
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

    if (isAdmin) {
      q = query(q, where("isAdmin", "==", isAdmin === "true"));
    }

    if (isContributor) {
      q = query(q, where("isContributor", "==", isContributor === "true"));
    }

    // Apply ordering
    q = query(q, orderBy("name"));

    // Get total users
    const allDocs = await getDocs(q);
    totalUsers = allDocs.size;

    // Get all documents for determining the pagination starting point
    const allDocuments = await getDocs(q);
    const startIndex = (page - 1) * countLimit;

    // Determine the starting document for pagination
    let startDoc = null;
    if (startIndex > 0 && startIndex < allDocuments.docs.length) {
      startDoc = allDocuments.docs[startIndex];
    }

    // Apply pagination
    if (startDoc) {
      q = query(q, startAt(startDoc), limit(countLimit));
    } else {
      q = query(q, limit(countLimit));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, totalUsers, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: Partial<UserData> = {
        id: doc.id,
        name: data?.name,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        batch: data?.batch,
        linkedInUrl: data?.linkedInUrl,
        profileImg: data?.profileImg,
        domain: data?.domain,
        about: data?.about,
        feedback: data?.feedback,
        position: data?.position,
        role: data?.role,
        isAdmin: data?.isAdmin,
        isContributor: data?.isContributor,
      };

      return filteredData;
    });

    return { result, totalUsers, error };
  } catch (err) {
    error = handleError(err, "fetchUser");
  }
  return { result, totalUsers, error };
};

// fetch alumni
export const fetchAlumni = async (batch?: string) => {
  let result = null;
  let error: string | null = null;

  try {
    let q = query(userCollection, where("role", "in", ["student", "alumni"]));

    if (batch) {
      q = query(q, where("batch", "==", batch));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: AlumniType = {
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

      const filteredData: ContributorType = {
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
// export const checkUserRole = async (id: string) => {
//   try {
//     const docRef = doc(userCollection, id);
//     const userDoc = await getDoc(docRef);

//     if (!userDoc.exists()) {
//       return { result: null, error: "User not found." };
//     }

//     const role = userDoc.data()?.role || null;

//     return { result: role, error: null };
//   } catch (err) {
//     const error = handleError(err, "checkUserRole");
//     return { result: null, error };
//   }
// };

// check if admin or not
export const checkAdmin = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(userCollection, id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      return false;
    }

    const isAdmin = userDoc.data()?.isAdmin || false;

    return isAdmin;
  } catch (err) {
    handleError(err, "checkAdmin");
    return false;
  }
};

// Add or update user details
export const addOrUpdateUserDetails = async (
  id: string | null,
  data: Partial<UserData>,
  isAdmin: boolean
) => {
  let result: boolean = false;
  let error: string | null = null;

  try {
    // For new user creation by admin
    if (!id && isAdmin) {
      const newUser: Partial<UserData> = {
        name: data.name || "",
        profileImg: data.profileImg || "",
        phoneNumber: data.phoneNumber || "",
        batch: data.batch || "",
        linkedInUrl: data.linkedInUrl || "",
        domain: data.domain || "",
        about: data.about || "",
        role: data.role || "guest",
        position: data.position || "",
        isContributor: data.isContributor || false,
        isAdmin: data.isAdmin || false,
        isProvidedBasicData: false, // as no email is there
        // no need for feedback as admin cannot provide others feedback
      };

      const newDoc = await addDoc(userCollection, newUser);

      if (!newDoc) {
        throw new Error("Failed to create a new user document.");
      }

      result = true;
      return { result, error };
    }

    // For updating existing user details
    if (!id) {
      throw new Error("User ID is required for updating details.");
    }

    const docRef = doc(userCollection, id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      throw new Error("User not found. Cannot update details.");
    }

    const userData = userDoc.data();

    // Users updating their basic details
    if (!isAdmin) {
      const updatedData: Partial<UserData> = {
        name: data.name || userData.name || "",
        profileImg: data.profileImg || userData.profileImg || "",
        phoneNumber: data.phoneNumber || userData.phoneNumber || "",
        batch: data.batch || userData.batch || "",
        linkedInUrl: data.linkedInUrl || userData.linkedInUrl || "",
        domain: data.domain || userData.domain || "",
        about: data.about || userData.about || "",
        position: data.position || userData.position || "",
        feedback: data.feedback || userData.feedback || "",
        role: userData.role || "guest",
        isContributor: userData.isContributor || false,
        isAdmin: userData.isAdmin || false,
        isProvidedBasicData: true,
      };

      await updateDoc(docRef, updatedData);
    } else {
      // Admin updating sensitive details
      const adminUpdatedData: Partial<UserData> = {};

      if ("role" in data) adminUpdatedData.role = data.role || userData.role;
      if ("position" in data)
        adminUpdatedData.position = data.position || userData.position;
      if ("isContributor" in data) {
        adminUpdatedData.isContributor =
          data.isContributor || userData.isContributor;
      }
      if ("isAdmin" in data)
        adminUpdatedData.isAdmin = data.isAdmin || userData.isAdmin;

      await updateDoc(docRef, adminUpdatedData);
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

      const filteredData: ResourceType = {
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

      const filteredData: MagazineType = {
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

export const seedBulkData = async (data: UserDataForBulk[]) => {
  let error: string | null = null;

  try {
    // Initialize Firestore batch
    const batch = writeBatch(db);

    data.forEach(async (user) => {
      const { name, email, phoneNumber, batch, position, role } = user;

      const userDetails: UserDataForBulk = {
        name,
        email,
        phoneNumber,
        batch,
        position: position || "",
        role: role || "guest",
        isProvidedBasicData: true,
      };

      await addDoc(userCollection, userDetails);

    });

    // Commit batch write
    await batch.commit();

    return { result: true, error: null };
  } catch (err) {
    error = handleError(err, "seedBulkData");
    return { result: false, error };
  }
}