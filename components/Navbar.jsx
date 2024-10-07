import Image from "next/image";
import { headerRound } from "../svgs";
import hamburger from "../public/images/hamburger.svg";

const Navbar = ({ setShowHomeSidebar }) => {
  return (
    <nav className="lg:hidden flex justify-between py-4 px-2 fixed shadow-sm fixed top-0 bg-white opacity-70 bg-transparent backdrop-blur-md  transition ease-out delay-100 duration-500 z-[100] w-full">
      <Image
        onClick={() => setShowHomeSidebar(true)}
        width={30}
        height={30}
        src={hamburger}
        alt=""
      />
      <div className="flex gap-x-2">
        {headerRound("#2056A7")}
        <Image width={40} height={20} alt="" src="/images/logo.jpg" />
      </div>
    </nav>
  );
};

export default Navbar;
