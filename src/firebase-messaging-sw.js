importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js");

firebase.initializeApp({
  messagingSenderId: "47531515164"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  const data = payload.data;

  return self.registration.showNotification("building...", {
    body: {},
    icon: "none",
    data: {}
  });
});
