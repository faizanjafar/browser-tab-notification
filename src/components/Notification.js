import React, { useEffect, useState } from "react";

const Notification = () => {
  const [title] = useState("Browser Tab Notifications - Subtle UI");
  const [favicon, setFavicon] = useState(null);
  const [notificationFavicon, setNotificationFavicon] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    createFavicon();
  }, []);

  const createFavicon = () => {
    const faviconElement = document.getElementById("favicon");

    if (faviconElement) {
      setFavicon(faviconElement.href);

      const img = document.createElement("img");
      img.src = faviconElement.href;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, img.width, img.height);
        context.beginPath();
        context.arc(
          img.width - img.width / 5,
          img.height / 5,
          img.width / 5,
          0,
          2 * Math.PI
        );
        context.fillStyle = "#f00000";
        context.fill();
        setNotificationFavicon(canvas.toDataURL("image/png"));
      };
    } else {
      console.error("Favicon element with id 'favicon' not found");
    }
  };

  const addNotification = () => {
    const faviconElement = document.getElementById("favicon");

    if (faviconElement && notificationFavicon) {
      setNotificationCount((prevCount) => {
        const newCount = prevCount + 1;
        document.title = `(${newCount}) ${title}`;
        faviconElement.href = notificationFavicon;
        return newCount;
      });
    } else {
      console.error(
        "Cannot update favicon. Favicon element or notification favicon not available."
      );
    }
  };

  const clearNotification = () => {
    const faviconElement = document.getElementById("favicon");

    if (faviconElement && favicon) {
      setNotificationCount(0);
      document.title = title;
      faviconElement.href = favicon;
    } else {
      console.error(
        "Cannot clear favicon. Favicon element or original favicon not available."
      );
    }
  };

  return (
    <div>
      <button
        style={{
          marginRight: "1em",
          marginBottom: "1em",
        }}
        onClick={addNotification}
      >
        Add New Notification ({notificationCount})
      </button>
      <button onClick={clearNotification}>Clear Notifications</button>
    </div>
  );
};

export default Notification;
