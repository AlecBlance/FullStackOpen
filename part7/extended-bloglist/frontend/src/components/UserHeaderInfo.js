import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const UserHeaderInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <p>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </p>
  );
};

export default UserHeaderInfo;
