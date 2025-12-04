import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyCTUCjAzhKt4Q1CW4Zrexk8Eis4-CpmWsA',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'notification-5b2d4.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'notification-5b2d4',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'notification-5b2d4.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '446005365686',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:446005365686:web:b2d0e689c1987d47338f17',
};

let appInstance: FirebaseApp | null = null;

export const getFirebaseApp = (): FirebaseApp => {
  if (appInstance) {
    return appInstance;
  }

  if (!getApps().length) {
    appInstance = initializeApp(firebaseConfig);
    return appInstance;
  }

  appInstance = getApps()[0]!;
  return appInstance;
};

export type { FirebaseApp };

