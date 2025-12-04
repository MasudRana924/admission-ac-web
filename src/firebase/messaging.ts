import { getMessaging, getToken, isSupported, type Messaging } from 'firebase/messaging';

import { getFirebaseApp } from './config';

const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || undefined;

const getMessagingInstance = async (): Promise<Messaging | null> => {
  if (typeof window === 'undefined') {
    return null;
  }

  const supported = await isSupported();
  if (!supported) {
    console.warn('Firebase messaging is not supported in this browser.');
    return null;
  }

  const app = getFirebaseApp();
  return getMessaging(app);
};

const ensureServiceWorker = async (): Promise<ServiceWorkerRegistration | undefined> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return undefined;
  }

  const existingRegistration = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');
  if (existingRegistration) {
    return existingRegistration;
  }

  try {
    return await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  } catch (error) {
    console.error('Failed to register Firebase messaging service worker', error);
    return undefined;
  }
};

export const requestFcmToken = async (): Promise<string | null> => {
  if (typeof window === 'undefined' || typeof Notification === 'undefined') {
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted.');
      return null;
    }

    const messaging = await getMessagingInstance();
    if (!messaging) {
      return null;
    }

    const serviceWorkerRegistration = await ensureServiceWorker();

    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration,
    });

    return token ?? null;
  } catch (error) {
    console.error('Failed to retrieve FCM token', error);
    return null;
  }
};


