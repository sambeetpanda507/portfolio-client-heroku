import { FirebaseApp, initializeApp } from 'firebase/app'
import { FirebaseStorage, getStorage } from 'firebase/storage'
import { GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSEGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

// Initialize Firebase
export const fireApp: FirebaseApp = initializeApp(firebaseConfig)
export const storage: FirebaseStorage = getStorage(fireApp)
export const provider: GoogleAuthProvider = new GoogleAuthProvider()
