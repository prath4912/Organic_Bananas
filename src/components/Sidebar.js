import React, { useContext,useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Fruitcontext from "../context/Fruitcontext";

export default function Sidebar(props) {
  const a = useContext(Fruitcontext);
  const history = useHistory();

  useEffect(() => {
    a.getuserdata();
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    props.setcount(props.count + 1);
    a.setpdata(null);
    a.setpdata(null) ;
    history.push("/login");
  };
  return (
    <div className="pt-4 h-100">
      <ul className="flex-column d-flex justify-content-between h-75">
        <li className="my-2 "><Link  className="nav-link" to={`/user/${a.profileData ? a.profileData.name : ""}`}>
            Profile
          </Link></li>
        <li className="my-2 ">WishList</li>
        <li className="my-2 ">Profile</li>
       
        <li className="mt-auto">
          <Link onClick={handlelogout} className="nav-link" to="/">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
