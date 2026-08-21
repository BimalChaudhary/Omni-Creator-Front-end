"use client";
import { Eraser, Sparkles } from "lucide-react";
import { useState } from "react";

const Page = () => {
  // Fix 1: Typed state as File | null instead of string, since we store a File object
  const [input, setInput] = useState<File | null>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          // Fix 3: files[0] may be undefined; fall back to null to match File | null type
          onChange={(e) => setInput(e.target.files?.[0] ?? null)}
          type="file"
          // Fix 4: Removed trailing space from "image/* " → "image/*"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />
        {/* Fix 5: Typo "formates" → "formats" */}
        <p className="text-xs text-gray-500 font-light mt-1">
          Supports JPG, PNG, and other image formats
        </p>
        {/* Fix 6: "bg-linear-to-r" → "bg-gradient-to-r" (valid Tailwind v3) */}
        <button className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Eraser className="w-5" />
          Remove Background
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Eraser className="w-9 h-9" />
            {/* Fix 7: Typo "Upload on image" → "Upload an image" */}
            <p>Upload an image and click Remove Background to get started</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
