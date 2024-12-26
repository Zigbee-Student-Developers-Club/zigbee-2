// Import the functions you need from the SDKs you need
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// TODO: Add types for Firebase products that you want to use
// Follow instructions here: https://firebase.google.com/docs/web/learn-more#typescript

// Your web app's Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Your web app's Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Analytics (Only on the client side)
let analytics: Promise<ReturnType<typeof getAnalytics> | null> | null = null;

if (typeof window !== "undefined") {
  analytics = isSupported().then((supported) =>
    supported ? getAnalytics(firebaseApp) : null
  );
}

export { analytics };
export default firebaseApp;
