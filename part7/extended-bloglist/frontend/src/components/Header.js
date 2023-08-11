import UserHeaderInfo from "./UserHeaderInfo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"}>blogs</Link>
      <Link to={"/users"}>users</Link>
      <UserHeaderInfo />
    </div>
  );
};

export default Header;
