import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { Logo } from "./icons/logo";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
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
        <img src="https://occ-0-2086-3662.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABYPt3lJsvK4CYb5m1jvGYzu8Is-KABjou0aC8-q8s-SnucAMp5g5X6aH9RrQKsB_fZFw_BQ3h8s4ZXlvTlF7ib8LChWNetM.png?r=7f4" />
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
