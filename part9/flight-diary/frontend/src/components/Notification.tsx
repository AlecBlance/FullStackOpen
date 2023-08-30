const Notification = ({ notification }: { notification: string | null }) => {
  if (!notification) return null;
  return <div style={{ color: "red" }}>{notification}</div>;
};
export default Notification;
