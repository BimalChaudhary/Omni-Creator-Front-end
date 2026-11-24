"use client";
import { assets } from "@/src/assets/assets";
import Sidebar from "@/src/components/Sidebar/Sidebar";
import { SignIn, useClerk, useUser } from "@clerk/nextjs";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!isLoaded) return null;

  return isSignedIn ? (
    <div className="flex flex-col h-screen">
      <nav className="w-full px-4 sm:px-8 h-14 flex items-center justify-between border-b border-gray-200 shrink-0">
        <Image
          src={assets.logo}
          alt="logo"
          width={176}
          height={40}
          onClick={() => router.push("/")}
          className="cursor-pointer w-32 sm:w-44"
        />
        <div className="flex items-center gap-3 sm:gap-5">
          <button type="button" onClick={() => openUserProfile()} aria-label="Open account profile" className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition hover:bg-slate-50">
            {user?.imageUrl ? <Image src={user.imageUrl} width={36} height={36} alt="" className="h-9 w-9 rounded-full" /> : <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">{user?.firstName?.[0] ?? "U"}</span>}
            <span className="hidden sm:block">
              <span className="block text-sm font-medium leading-5 text-slate-800">{user?.fullName}</span>
              <span className="block text-xs text-slate-500">{user?.publicMetadata?.plan === "premium" ? "Premium" : "Free"} Plan</span>
            </span>
          </button>
          <button type="button" onClick={() => signOut()} aria-label="Sign out" title="Sign out" className="hidden rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 sm:block"><LogOut className="h-4 w-4" /></button>
          <button type="button" onClick={() => setSidebar(!sidebar)} aria-label="Toggle navigation menu" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:hidden"><Menu className="h-5 w-5" /></button>
        </div>
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
