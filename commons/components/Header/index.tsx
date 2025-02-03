import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownNotification from "./DropdownNotification";
import SearchForm from "./SearchForm";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

interface Props {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  account?: any;
}

const Header = (props: Props) => {
  return (
    <header className="sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark">
      <div className="flex flex-grow items-center justify-between px-4 py-5 shadow-2 md:px-5 2xl:px-10">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-dark-3 dark:bg-dark-2 lg:hidden"
          >
            <MenuIcon />
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden xl:block">
          <div>
            <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
              Sistem Informasi
            </h1>
            <p className="font-medium">Sistem Informasi Komplain Produk</p>
          </div>
        </div>

        <div className="flex items-center justify-normal gap-2 2xsm:gap-4 lg:w-full lg:justify-between xl:w-auto xl:justify-normal">
          <div></div>

          {/* <!-- User Area --> */}
          <DropdownUser account={props.account} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
