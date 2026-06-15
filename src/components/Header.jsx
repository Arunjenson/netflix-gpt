import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Logo } from "./icons/logo";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate("/");
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
      <div className="flex items-center gap-4">
        {user?.photoURL && (
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
    </div>
  );
};

export default Header;
