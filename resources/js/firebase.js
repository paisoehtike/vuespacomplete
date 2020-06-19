// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/messaging";
import Axios from "axios";


var firebaseConfig = {
    apiKey: "AIzaSyA9PKyAAFcWZ3CkKuH2CRKfy-uSLAyOV_I",
    authDomain: "bb-lsp-team.firebaseapp.com",
    databaseURL: "https://bb-lsp-team.firebaseio.com",
    projectId: "bb-lsp-team",
    storageBucket: "bb-lsp-team.appspot.com",
    messagingSenderId: "574736599020",
    appId: "1:574736599020:web:080c5e35656399a3d4a2c9",
    measurementId: "G-49HGQ9GNHR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Add the public key generated from the console here.
messaging.usePublicVapidKey("BBWyuhmzfh7tvB-F91A9EoVRsnrNZnxx6Kcfdo5zMsvJP1Yu7RHepJGX4hNkREcidL6VxjpYGKBMJtMdEoa1FRk");

Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        console.log(messaging, 'firebase massaging');
        console.log('Notification permission granted.');
    } else {
        console.log('Unable to get permission to notify.');
    }
})

// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then((token) => {
    if (token) {
        console.log('Token', token)
        sendTokenToServer(token)
    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
});

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
    messaging.getToken().then((refreshedToken) => {
        console.log('Token refreshed.', refreshedToken);
        sendTokenToServer(refreshedToken)
    }).catch((err) => {
        console.log('Unable to retrieve refreshed token ', err);
    });
})

messaging.onMessage(payload => {
    // console.log('Message received. ', payload);
    window.dispatchEvent(new CustomEvent('newNotification', { detail: payload.data }))
})

// Authorization Header for API Auth
let headerConfig = {
    headers: {
        'Authorization': 'Bearer ' + getCookie('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
// Get Auth Token for Api
function getCookie(name) {
    let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function sendTokenToServer(token) {

    Axios.post('/api/fcm-web-tokens',
        {
            device_id: token,
            type: 'web'
        },
        headerConfig)
        .then(response => console.log(response.data))
        .catch(err => console.log('Unable to stor token.', err))


    Axios.post('/api/fcm-web-team-tokens',
        {
            device_id: token,
            type: 'team'
        },
        headerConfig)
        .then(response => console.log(response.data))
        .catch(err => console.log('Unable to stor token.', err))

}
