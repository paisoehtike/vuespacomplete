console.log("Service Worker Loaded...");
// const messaging = firebase.messaging();
// messaging.onMessage(function(payload){
//     console.log("asdjajd");
//     console.log('onMessage',payload);
// })
// notification.onclick = function(event) {
//     event.preventDefault(); // prevent the browser from focusing the Notification's tab
//     window.open('http://www.mozilla.org', '_blank');
//   }
self.addEventListener('notificationclick', function (event) {
    if (!event.action) {
        // Was a normal notification click
        console.log(event.action, 'Notification Click.');
        return;
    }
    else {
        console.log(event.action, "event data", event.data, "event", event);
    }
});
self.addEventListener("push", e => {
    const data = e.data.json();
    console.log(data);
    const notification = JSON.parse(data.data.notification);
    console.log("noti data without action", notification);
    notification.onclick = function (event) {
        event.preventDefault();
        // prevent the browser from focusing the Notification's tab
        window.open('http://www.mozilla.org', '_blank');
    }
    const options = {
        body: notification.body,
    };

    self.registration.showNotification(notification.title, options);
    console.log("noti data", data, "json", notification.title, notification.body, notification.icon)
    // self.registration.showNotification(notification.title, {
    //     body: notification.body,
    //     //   icon: notification.icon,
    //     icon:'https://www.pngfind.com/pngs/m/74-745493_png-file-svg-png-notification-icon-free-transparent.png',
    //     action: 'like-post-action',
    // });
});
