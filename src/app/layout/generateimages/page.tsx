"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ImageIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00AD25]" />
          {/* Fix 1: Typo "Generatro" → "Generator" */}
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Describe Your Image</p>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image..."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>
        {/* Fix 2: Removed non-standard "sm:max-w-9/11" class */}
        <div className="mt-3 flex gap-3 flex-wrap">
          {imageStyle.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedStyle === item
                  ? "bg-green-50 text-green-700 border-green-300"
                  : "text-gray-500 border-gray-300"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Fix 3: "gap2" → "gap-2" */}
        <div className="my-6 flex items-center gap-2">
          {/* Fix 4: Restructured toggle so peer sibling works correctly */}
          <label className="relative cursor-pointer w-9 h-5 block">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition absolute inset-0"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4"></span>
          </label>
          <p className="text-sm">Make this image public</p>
        </div>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#00AD25] to-[#04FF50] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <ImageIcon className="w-5 " />
          )}
          Generate Image
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 text-[#00AD25]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <ImageIcon className="w-9 h-9" />
              <p>Enter a prompt and click Generate Image to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            {/* Native img supports both Cloudinary URLs and data: URLs */}
            <img
              src={content}
              alt="Generated"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
