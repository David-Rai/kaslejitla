import React from "react";
import { useLocation, Link } from "react-router";
import { Volume2, VolumeOff } from "lucide-react";
import { Home, MessageCircle, Info } from "lucide-react";

const links = [
  { path: "/", name: "Home", icon: Home },
  { path: "/promotion", name: "Promotion", icon: Home },
  // { path: "/opinions", name: "Opinions", icon: MessageCircle },
  { path: "/Review", name: "Review", icon: MessageCircle },
  { path: "/about", name: "About", icon: Info },
];

const NavLink = ({ link, pathname, mobile = false }) => {
  const isActive = pathname === link.path;
  const Icon = link.icon;

  if (mobile) {
    return (
      <Link
        to={link.path}
        className={`
          flex flex-col items-center gap-1 px-4 py-2 rounded-xl 
          font-dm text-xs font-${isActive ? "semibold" : "normal"} 
          ${isActive ? "text-red-500 bg-red-100" : "text-gray-400"}
          transition-all duration-200
        `}
      >
        <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
        <span>{link.name}</span>
      </Link>
    );
  }

  return (
    <Link
      to={link.path}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg
        font-dm text-sm font-${isActive ? "semibold" : "normal"}
        ${isActive ? "text-red-500 bg-red-100" : "text-gray-500"}
        transition-all duration-200
      `}
    >
      <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
      <span>{link.name}</span>
    </Link>
  );
};

const Nav = ({ isSound, SetIsSound }) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1 p-1 py-4 bg-white/80 backdrop-blur-md border border-black/10 rounded-xl shadow-sm">
        {links.map((link) => (
          <NavLink key={link.path} link={link} pathname={pathname} />
        ))}
        <button
          className="px-4  text-gray-400 cursor-pointer"
          onClick={() => SetIsSound(!isSound)}
        >
          {isSound ? <Volume2 /> : <VolumeOff />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className="fixed bottom-0 left-0 
      right-0 flex justify-center gap-2 p-2 
      pb-[calc(8px+env(safe-area-inset-bottom))]
       bg-white/90 backdrop-blur-lg border-t
        border-black/10 shadow-lg z-50 md:hidden"
      >
        {links.map((link) => (
          <NavLink key={link.path} link={link} pathname={pathname} mobile />
        ))}
        <button
          className="px-4  text-gray-400 cursor-pointer"
          onClick={() => SetIsSound(!isSound)}
        >
          {isSound ? <Volume2 /> : <VolumeOff />}
        </button>
      </nav>
    </>
  );
};

export default Nav;
