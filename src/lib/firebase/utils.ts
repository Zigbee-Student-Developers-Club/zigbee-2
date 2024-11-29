import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import firebaseApp from './config';
import { userData } from '../types';

const db = getFirestore(firebaseApp);

// handling error
const handleError = (err: unknown): string => {
    console.error('Firebase Error:', err); // Log the error
    return 'An unexpected error occurred. Please try again later.';
};

// check if a user is registered
export const checkUserRegistered = async (email: string) => {
    let result = false;
    let error = null;

    try {
        const userCollection = collection(db, 'users');
        const q = query(userCollection, where('email', '==', email));
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

    const tempOtp = Math.floor(100000 + Math.random() * 900000);

    const data = {
        email,
        tempOtp,
        isVerified: false
    };

    try {
        const userCollection = collection(db, 'users');
        const q = query(userCollection, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const id = querySnapshot.docs[0].id;
            await updateDoc(doc(db, 'users', id), {
                tempOtp,
                isVerified: false
            });
        } else {
            await addDoc(userCollection, data);
        }

        result = true;
    } catch (err) {
        error = handleError(err);
    }

    return { result, error };
};

// verify OTP
export const verifyOtp = async (email: string, otp: number) => {
    let result = null;
    let error = null;

    try {
        const userCollection = collection(db, 'users');
        const q = query(userCollection, where('email', '==', email), where('tempOtp', '==', otp));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docData = querySnapshot.docs[0];
            await updateDoc(doc(db, 'users', docData.id), {
                tempOtp: 0,
                isVerified: true
            });

            result = {
                isProvidedBasicData: !!docData.data().isProvidedBasicData,
                id: docData.id
            };
        }
    } catch (err) {
        error = handleError(err);
    }

    return { result, error };
};

// add user's basic details
export const addUsersBasicDetails = async (id: string, data: userData) => {
    let result = null;
    let error = null;

    try {
        const docRef = doc(db, 'users', id);
        const user = await getDoc(docRef);

        if (user.data()?.isProvidedBasicData) {
            error = 'already added';
            return { result, error };
        }

        await updateDoc(docRef, {
            batch: data.batch,
            phoneNumber: data.phoneNumber || null,
            name: data.name,
            linkedInUrl: data.linkedInUrl,
            position: data.position || '',
            profileImg: data.profileImg,
            domain: data.domain,
            about: data.about || '',
            isProvidedBasicData: true,
            role: 'guest'
        });

        result = 'Basic details added successfully.';
    } catch (err) {
        error = handleError(err);
    }

    return { result, error };
};