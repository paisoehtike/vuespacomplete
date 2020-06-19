// // //Give the service worker access to Firebase Messaging.
// // // Note that you can only use Firebase Messaging here, other Firebase libraries
// // // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing in the
// // messagingSenderId.
// firebase.initializeApp({
//     'messagingSenderId': '413811952157'
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();

// // messaging.onMessage((payload) => {
// //     console.log('Message received. ', payload);
// //     // ...
// // });

// // messaging.setBackgroundMessageHandler(function (payload) {
// //     console.log('[firebase-messaging-sw.js] Received background message ', payload);
// //     // Customize notification here
// //     const notificationTitle = 'Background Message Title';
// //     const notificationOptions = {
// //         body: 'Background Message body.',
// //         icon: '/firebase-logo.png'
// //     };

// //     return self.registration.showNotification(notificationTitle,
// //         notificationOptions);
// // });

// self.addEventListener("push", e => {
//     const data = e.data.json()
//     console.log('Background', data)
//     // Customize notification here
//     const notificationTitle = data.notification['title'];
//     const notificationOptions = {
//         body: data.data['gcm.notification.message']
//         // icon: 'https://www.pngfind.com/pngs/m/74-745493_png-file-svg-png-notification-icon-free-transparent.png'
//     };

//     return this.registration.showNotification(notificationTitle,
//         notificationOptions);
// });
