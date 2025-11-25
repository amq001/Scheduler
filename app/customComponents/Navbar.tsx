import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import AuthModal from "./AuthModal";

export function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between gap-2">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className={"size-8 sm:size-10"} />
        <h4 className="text-2xl sm:text-3xl font-semibold">
          Sch<span className="text-blue-500">edular</span>
        </h4>
      </Link>
      <AuthModal />
    </div>
  );
}
