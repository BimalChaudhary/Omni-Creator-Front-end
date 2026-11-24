import {
  Eraser,
  FileText,
  Hash,
  House,
  Images,
  SquarePen,
  User,
} from "lucide-react";
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
  const pathname = usePathname();

  return (
    <aside
      className={`z-20 flex w-60 flex-col items-center justify-between border-r border-slate-200 bg-white max-sm:absolute max-sm:bottom-0 max-sm:top-14 ${
        sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <nav aria-label="Main navigation" className="my-5 w-full px-4">
        <div className="space-y-1 text-sm font-medium text-slate-600">
          {navItems.map(({ to, label, Icon }) => {
            const isActive = pathname === to;
            return (
              <Link
                key={to}
                href={to}
                onClick={() => setSidebar(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                    : "hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="w-full border-t border-slate-200 p-4 text-xs text-slate-400">
        OmniCreator
      </div>
    </aside>
  );
};

export default Sidebar;
