import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";

type CreationItemProps = {
  item: {
    prompt: string;
    type: string;
    content: string;
    created_at: string | number | Date;
  };
};

const CreationItem = ({ item }: CreationItemProps) => {
  const [expanded, setExpended] = useState(false);
  return (
    <article className="max-w-5xl rounded-xl border border-slate-200 bg-white text-sm transition-colors hover:border-indigo-200">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setExpended(!expanded)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <div>
          <h2 className="font-medium text-slate-800">{item.prompt}</h2>

          <p className="mt-1 text-xs capitalize text-slate-500">
            {item.type} · {new Date(item.created_at).toLocaleString()}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium capitalize text-indigo-700">
          {expanded ? "Close" : "View"}
        </span>
      </button>
      {expanded && (
        <div className="border-t border-slate-100 px-4 pb-4">
          {" "}
          {item.type === "image" ? (
            <div>
              <Image
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 max-h-96 overflow-y-auto text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default CreationItem;
