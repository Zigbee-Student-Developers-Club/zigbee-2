import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import firebaseApp from "./config";
import { FirebaseFetchUserType, UserData } from "../types";
import { sendVerificationEmail } from "../resend/utils";
import { generateToken } from "../jwt";

const db = getFirestore(firebaseApp);

// handling error
const handleError = (err: unknown): string => {
  console.error("Firebase Error:", err); // Log the error
  return "An unexpected error occurred. Please try again later.";
};

// check if a user is registered
export const checkUserRegistered = async (email: string) => {
  let result = false;
  let error = null;

  try {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    result = !querySnapshot.empty;
  } catch (err) {
    error = handleError(err);
  }

  return { result, error };
};

// send OTP to user
export const sendOtp = async (email: string) => {
  let result = false;
  let error = null;

  const tempOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const data = {
    email,
    tempOtp,
    isVerified: false,
  };

  try {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // send OTP
    const response = await sendVerificationEmail(email, tempOtp);

    if (!querySnapshot.empty) {
      const id = querySnapshot.docs[0].id;
      await updateDoc(doc(db, "users", id), {
        tempOtp,
        isVerified: false,
        accessToken: null,
      });
    } else {
      await addDoc(userCollection, data);
    }

    if (!response.success) {
      return {
        result: false,
        error: response.message,
      };
    }

    result = true;
  } catch (err) {
    error = handleError(err);
  }

  return { result, error };
};

// verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  let result = null;
  let error = null;

  try {
    const userCollection = collection(db, "users");
    const q = query(
      userCollection,
      where("email", "==", email),
      where("tempOtp", "==", otp)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0];

      const token = generateToken(docData.id);

      await updateDoc(doc(db, "users", docData.id), {
        tempOtp: "",
        isVerified: true,
        accessToken: token,
      });

      result = {
        isProvidedBasicData: !!docData.data().isProvidedBasicData,
        token,
      };
    }
  } catch (err) {
    error = handleError(err);
  }

  return { result, error };
};

// check user by id
export const getUserById = async (id: string) => {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, "users", id);
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
    result = null;
    error = handleError(err);
  }
  return { result, error };
};

// fetch all users
export const fetchUser = async (role?: string, batch?: string) => {
  let result = null;
  let error = null;

  try {
    const userCollection = collection(db, "users");

    let q = query(userCollection);

    if (role) {
      q = query(q, where("role", "==", role));
    }

    const numBatch = Number(batch);

    if (batch) {
      q = query(q, where("batch", "==", numBatch));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: FirebaseFetchUserType = {
        id: doc.id,
        ...data,
      };

      delete filteredData.tempOtp;
      delete filteredData.accessToken;
      delete filteredData.isProvidedBasicData;
      delete filteredData.isVerified;

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err);
  }
  return { result, error };
};

export const fetchUserByField = async (
  field: string,
  value: string | boolean
) => {
  let result = null;
  let error = null;

  try {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where(field, "==", value));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { result, error };
    }

    result = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const filteredData: FirebaseFetchUserType = {
        id: doc.id,
        ...data,
      };

      delete filteredData.tempOtp;
      delete filteredData.accessToken;
      delete filteredData.isProvidedBasicData;
      delete filteredData.isVerified;
      delete filteredData.role;
      delete filteredData.email;
      delete filteredData.phoneNumber;

      return filteredData;
    });

    return { result, error };
  } catch (err) {
    error = handleError(err);
  }
  return { result, error };
};

// Check user role
export const checkUserRole = async (id: string) => {
  let result = null;
  let error = null;

  try {
    const docRef = doc(db, "users", id);
    const userDoc = await getDoc(docRef);

    if (!userDoc.exists()) {
      error = "User not found.";
      return { result, error };
    }

    const userData = userDoc.data();

    result = userData.role;
  } catch (err) {
    error = handleError(err);
  }

  return { result, error };
};

// Add or update user details
export const addOrUpdateUserDetails = async (
  id: string | null,
  data: UserData,
  isAdmin: boolean
) => {
  let result: boolean = false;
  let error = null;

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

      const userCollection = collection(db, "users");
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

    const docRef = doc(db, "users", id);
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
    error = null;
    return { result, error };
  } catch (err) {
    console.error("Error in addOrUpdateUserDetails:", err);

    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred.";
    result = false;
    error = errorMessage;
    return { result, error };
  }
};

// delete user by id
export const deleteUserById = async (id: string) => {
  let result = false;
  let error = null;

  try {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);

    result = true;
  } catch (err) {
    error = handleError(err);
  }

  return { result, error };
};
