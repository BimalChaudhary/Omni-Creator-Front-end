import { useClerk, useUser } from "@clerk/nextjs";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Images,
  LogOut,
  Scissors,
  SquarePen,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { to: "/layout/dashboard", label: "Dashboard", Icon: House },
  { to: "/layout/writearticle", label: "Write Article", Icon: SquarePen },
  { to: "/layout/blogtitles", label: "Blog Titles", Icon: Hash },
  { to: "/layout/generateimages", label: "Generate Images", Icon: Images },
  { to: "/layout/removebackground", label: "Remove Background", Icon: Eraser },
  // { to: "/layout/removeobject", label: "Remove Object", Icon: Scissors },
  { to: "/layout/reviewresume", label: "Review Resume", Icon: FileText },
  { to: "/layout/community", label: "Community", Icon: User },
];

interface SidebarProps {
  sidebar: boolean;
  setSidebar: (value: boolean) => void;
}

const Sidebar = ({ sidebar, setSidebar }: SidebarProps) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const pathname = usePathname();

  return (
    <div
      className={`w-60 bg-white border-r border-slate-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 z-20 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        {user?.imageUrl && (
          <Image
            src={user.imageUrl}
            width={52}
            height={52}
            className="rounded-full mx-auto"
            alt="User avatar"
          />
        )}
        <h1 className="mt-1 text-center">{user?.fullName}</h1>

        <div className="px-4 mt-7 space-y-1 text-sm font-medium text-slate-600">
          {navItems.map(({ to, label, Icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                href={to}
                onClick={() => setSidebar(false)}
                className={`px-3.5 py-2.5 flex items-center gap-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />{" "}
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full border-t border-slate-200 p-4 px-5 flex items-center justify-between">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => openUserProfile()}
        >
          {user?.imageUrl && (
            <Image
              src={user.imageUrl}
              width={32}
              height={32}
              alt="User avatar"
              className="rounded-full"
            />
          )}
          <div>
            <span className="text-sm font-medium block">{user?.fullName}</span>
            <span className="text-xs text-gray-500">
              {user?.publicMetadata?.plan === "premium" ? "Premium" : "Free"}{" "}
              Plan
            </span>
          </div>
        </div>
        <LogOut
          onClick={() => signOut()}
          className="w-4.5  text-gray-400 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
