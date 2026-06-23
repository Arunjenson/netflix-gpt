import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Logo } from "./icons/logo";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { handleGptSearch as toggleGptSearch } from "../utils/gptSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isGptEnabled } = useSelector((state) => state.gpt);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
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
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearch());
  };
  return (
    <div className="absolute top-0 left-0 right-0 px-4 sm:px-8 py-3 bg-gradient-to-b from-black to-transparent flex items-center justify-between w-full z-50">
      <div>
        <Logo />
      </div>
      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="bg-purple-600 text-white text-sm px-2 py-1.5 sm:px-4 sm:py-2 rounded font-semibold cursor-pointer"
            onClick={handleGptSearchClick}
          >
            {!isGptEnabled ? "GPT Search" : "Homepage"}
          </button>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
          )}
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white text-sm px-2 py-1.5 sm:px-4 sm:py-2 rounded font-semibold cursor-pointer"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
