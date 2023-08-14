import UserHeaderInfo from "./UserHeaderInfo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between py-5 px-20">
      <ul className="font-semibold list-none flex text-sm text-slate-200 items-center">
        <li>
          <Link to={"/"} className="mr-10 hover:text-teal-400">
            Blogs
          </Link>
        </li>
        <li>
          <Link to={"/users"} className="hover:text-teal-400">
            Users
          </Link>
        </li>
      </ul>
      <UserHeaderInfo />
    </div>
  );
};

export default Header;
