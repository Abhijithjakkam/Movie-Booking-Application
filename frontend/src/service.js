const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const saveSubscription = async (subscription) => {
  const response = await fetch(
    "https://localhost:3000/api/notification/add_subscription",
    {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subscription),
    }
  );

  return response.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BORNiMxIHeXXornTwCKSsj_RO1rxFJmNTbLG54B0s65RJoVfSHU3JstKgKJMEmpVz3YPom_crEhiaPxa8YonSFM"
    ),
  });

  const response = await saveSubscription(subscription);
});

self.addEventListener("push", (e) => {
  self.registration.showNotification("New Notification!!", {
    body: e.data.text(),
  });
});
