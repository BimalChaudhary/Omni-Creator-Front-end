"use client";

import { dummyPublishedCreationData } from "@/src/assets/assets";
import { useUser } from "@clerk/nextjs";
import { Heart, Image as ImageIcon, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

type SortMode = "popular" | "recent";

export default function CommunityPage() {
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("popular");
  const [likedIds, setLikedIds] = useState<number[]>([]);

  const creations = useMemo(() => {
    const filtered = dummyPublishedCreationData.filter((item) => item.prompt.toLowerCase().includes(query.trim().toLowerCase()));
    return [...filtered].sort((a, b) => sort === "popular" ? (b.likes.length + Number(likedIds.includes(b.id))) - (a.likes.length + Number(likedIds.includes(a.id))) : new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [query, sort, likedIds]);

  const toggleLike = (id: number) => setLikedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <div className="min-h-full bg-[#f7f8fc] px-4 py-7 text-slate-800 sm:px-7 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-7">
        <header className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white sm:px-9 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl"><span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-indigo-100"><Sparkles className="h-3.5 w-3.5" /> COMMUNITY GALLERY</span><h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Made with imagination.</h1><p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">Explore AI artwork from the community and find a little inspiration for your next idea.</p></div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-500/20 text-indigo-200"><ImageIcon className="h-5 w-5" /></span><div><p className="text-lg font-semibold">{dummyPublishedCreationData.length}</p><p className="text-xs text-slate-400">featured creations</p></div></div>
          </div>
        </header>

        <section aria-label="Community creations">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-lg font-semibold text-slate-900">Featured work</h2><p className="mt-1 text-sm text-slate-500">A collection of images created with OmniCreator.</p></div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm focus-within:border-indigo-400"><Search className="h-4 w-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search prompts" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:w-44" /></label>
              <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm" aria-label="Sort creations">{(["popular", "recent"] as const).map((mode) => <button key={mode} type="button" onClick={() => setSort(mode)} className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${sort === mode ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`}>{mode}</button>)}</div>
            </div>
          </div>

          {creations.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {creations.map((creation) => {
              const liked = likedIds.includes(creation.id) || creation.likes.includes(user?.id ?? "");
              const count = creation.likes.length + (likedIds.includes(creation.id) ? 1 : 0);
              return <article key={creation.id} className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100"><Image src={creation.content} alt={creation.prompt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" /><span className="absolute left-3 top-3 rounded-full border border-white/30 bg-slate-950/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">AI artwork</span></div>
                <div className="p-4"><p className="line-clamp-2 min-h-12 text-sm font-medium leading-6 text-slate-800">{creation.prompt}</p><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">{creation.user_id === user?.id ? (user?.firstName?.[0] ?? "Y") : "C"}</span><div><p className="text-xs font-medium text-slate-700">{creation.user_id === user?.id ? "You" : "Community creator"}</p><p className="text-[11px] text-slate-400">{new Date(creation.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p></div></div><button type="button" onClick={() => toggleLike(creation.id)} aria-label={liked ? "Unlike creation" : "Like creation"} aria-pressed={liked} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition ${liked ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600"}`}><Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />{count}</button></div></div>
              </article>;
            })}
          </div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><Search className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-3 font-medium text-slate-800">No creations found</h3><p className="mt-1 text-sm text-slate-500">Try a different search term.</p></div>}
        </section>
        <p className="text-center text-xs text-slate-400">Likes are a local preview. Community posts are currently sample gallery content.</p>
      </div>
    </div>
  );
}
