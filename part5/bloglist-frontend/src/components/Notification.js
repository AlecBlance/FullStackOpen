const Notification = ({ info: { message, error } }) => (
  <div className={`notification ${error ? 'error' : 'success'}`}>
    {message}
  </div>
)

export default Notification