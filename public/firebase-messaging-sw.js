importScripts('https://www.gstatic.com/firebasejs/12.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCTUCjAzhKt4Q1CW4Zrexk8Eis4-CpmWsA',
  authDomain: 'notification-5b2d4.firebaseapp.com',
  projectId: 'notification-5b2d4',
  storageBucket: 'notification-5b2d4.firebasestorage.app',
  messagingSenderId: '446005365686',
  appId: '1:446005365686:web:b2d0e689c1987d47338f17',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/favicon.ico',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

