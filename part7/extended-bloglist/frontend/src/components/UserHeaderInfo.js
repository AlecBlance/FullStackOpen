import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";

const UserHeaderInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const config = genConfig(user.name);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="text-sm text-slate-400 flex items-center">
      <Avatar className="h-7 w-7" {...config} />
      <p className="ml-2 mr-5 font-semibold">{user.name}</p>
      <button onClick={handleLogout} className="h-7 w-7">
        <svg
          className="fill-teal-400 h-4 w-4 hover:fill-teal-300"
          id="Layer_1"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <path d="m363.335 488a24 24 0 0 1 -24 24h-226.253a80.09 80.09 0 0 1 -80-80v-352a80.09 80.09 0 0 1 80-80h226.253a24 24 0 0 1 0 48h-226.253a32.035 32.035 0 0 0 -32 32v352a32.034 32.034 0 0 0 32 32h226.253a24 24 0 0 1 24 24zm108.553-248.97-114.051-114.052a24 24 0 1 0 -33.937 33.941l73.077 73.081h-188.936a24 24 0 1 0 0 48h188.935l-73.08 73.08a24 24 0 1 0 33.941 33.941l114.051-114.05a24 24 0 0 0 0-33.941z" />
        </svg>
      </button>
    </div>
  );
};

export default UserHeaderInfo;
