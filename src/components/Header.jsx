import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Logo } from "./icons/logo";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/error");
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="absolute top-0 px-8 py-3 bg-linear-to-b from-black flex items-center justify-between w-full">
      <div className="">
        <Logo />
      </div>
      {user && (
        <div className="flex items-center gap-4">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          )}
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
