import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.userSlice);
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="flex justify-between relative z-10 bg-gradient-to-t from-black p-4">
      <img
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
        className="h-20 w-52 object-contain"
      />
      {userData && (
        <div className="flex">
          <img
            src={userData?.photoURL}
            alt="Login_image"
            className="w-10 h-10 rounded-full"
          />
          <button
            className="text-white h-10 rounded-lg"
            onClick={HandleSignOut}
          >
            {" "}
            Signout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
