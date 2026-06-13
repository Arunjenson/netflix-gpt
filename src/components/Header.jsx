import { Logo } from "./icons/logo";

const Header = () => {
  return (
    <div className="absolute top-0 px-8 py-3 bg-linear-to-b from-black">
      <div className="test v2">
        <Logo />
      </div>
    </div>
  );
};

export default Header;
