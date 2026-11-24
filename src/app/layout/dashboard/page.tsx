"use client";

import { dummyCreationData } from "@/src/assets/assets";
import CreationItem from "@/src/components/CreationItem/CreationItem";
import { useUser, Show } from "@clerk/nextjs";
import { ArrowRight, Clock3, FileText, Gem, Image as ImageIcon, Sparkles, WandSparkles } from "lucide-react";
import Link from "next/link";

const tools = [
  { name: "Write an article", description: "Turn an idea into a polished first draft.", href: "/layout/writearticle", Icon: FileText, tone: "bg-blue-50 text-blue-600" },
  { name: "Generate an image", description: "Create original visuals from a prompt.", href: "/layout/generateimages", Icon: ImageIcon, tone: "bg-violet-50 text-violet-600" },
  { name: "Find a blog title", description: "Explore clear, memorable title ideas.", href: "/layout/blogtitles", Icon: Sparkles, tone: "bg-amber-50 text-amber-600" },
];

export default function DashboardPage() {
  const { user } = useUser();
  const creations = [...dummyCreationData].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const imageCount = creations.filter((item) => item.type === "image").length;
  const firstName = user?.firstName || "there";

  return (
    <div className="min-h-full bg-[#f7f8fc] px-4 py-7 text-slate-800 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">YOUR CREATIVE WORKSPACE</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Good to see you, {firstName}</h1>
            <p className="mt-2 text-slate-500">Pick up where you left off or start something new.</p>
          </div>
          <Link href="/layout/writearticle" className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
            <WandSparkles className="h-4 w-4" /> Create something <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Workspace overview">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">Total creations</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600"><Sparkles className="h-5 w-5" /></span></div>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{creations.length}</p><p className="mt-1 text-sm text-slate-500">Ideas saved in your workspace</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">Images created</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600"><ImageIcon className="h-5 w-5" /></span></div>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{imageCount}</p><p className="mt-1 text-sm text-slate-500">Visuals in your recent activity</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">Your plan</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600"><Gem className="h-5 w-5" /></span></div>
            <p className="mt-4 text-3xl font-semibold tracking-tight"><Show when={{ plan: "premium" }} fallback={<>Free</>}>
              Premium
            </Show></p><p className="mt-1 text-sm text-slate-500">Current account plan</p>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between"><div><h2 className="text-lg font-semibold text-slate-900">Start creating</h2><p className="mt-1 text-sm text-slate-500">A few popular tools to get you moving.</p></div></div>
          <div className="grid gap-4 md:grid-cols-3">
            {tools.map(({ name, description, href, Icon, tone }) => <Link key={href} href={href} className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
              <div className="flex items-start justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></span><ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" /></div>
              <h3 className="mt-4 font-semibold text-slate-900">{name}</h3><p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
            </Link>)}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4"><div><div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-indigo-600" /><h2 className="font-semibold text-slate-900">Recent activity</h2></div><p className="mt-1 text-sm text-slate-500">Your latest generated work.</p></div><span className="text-xs font-medium text-slate-400">{creations.length} items</span></div>
          {creations.length ? <div className="space-y-3">{creations.slice(0, 4).map((item) => <CreationItem key={item.id} item={item} />)}</div> : <p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">Your creations will show up here.</p>}
        </section>
        <p className="text-center text-xs text-slate-400">Your workspace activity is private to your account.</p>
      </div>
    </div>
  );
}
