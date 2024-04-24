const checkPermission = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No support for service worker!");
  }

  if (!("Notification" in window)) {
    throw new Error("No support for notification API");
  }

  if (!("PushManager" in window)) {
    throw new Error("No support for Push API");
  }
};

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register(
    "./src/service.js"
  );
  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission not granted");
  }
};

const registerNotification = async () => {
  checkPermission();
  await requestNotificationPermission();
  await registerSW();
};

export { registerNotification };
