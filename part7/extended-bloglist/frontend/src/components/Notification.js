import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    notification && (
      <div
        className={`notification ${notification.error ? "error" : "success"}`}
      >
        {notification.message}
      </div>
    )
  );
};

export default Notification;
