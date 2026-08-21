"use client";
import { assets } from "@/src/assets/assets";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import { SignIn, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  return isSignedIn ? (
    <div className="flex flex-col h-screen">
      <nav className="w-full px-8 h-14 flex items-center justify-between border-b border-gray-200 shrink-0">
        <Image
          src={assets.logo}
          alt="logo"
          width={176}
          height={40}
          onClick={() => router.push("/")}
          className="cursor-pointer w-32 sm:w-44"
        />
        <Menu
          onClick={() => setSidebar(!sidebar)}
          className="w-6 h-6 text-gray-600 sm:hidden"
        />
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {sidebar && (
          <div
            className="fixed inset-0 bg-black/30 z-10 sm:hidden"
            onClick={() => setSidebar(false)}
          />
        )}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}
