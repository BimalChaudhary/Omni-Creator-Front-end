"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Scissors, Sparkles } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
  const [input, setInput] = useState<File | null>(null);
  const [mask, setMask] = useState<File | null>(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) {
      toast.error("Please select an image first");
      return;
    }

    if (!object.trim() && !mask) {
      toast.error(
        "Please describe the object to remove or upload a mask image",
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", input);
      if (mask) formData.append("mask", mask);
      if (object.trim()) formData.append("object", object.trim());

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message || "Object removal failed");
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
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <input
          onChange={(e) => setInput(e.target.files?.[0] ?? null)}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="mt-6 text-sm font-medium">Optional Mask Image</p>
        <input
          onChange={(e) => setMask(e.target.files?.[0] ?? null)}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
        />
        <p className="text-xs text-gray-500 font-light mt-1">
          For the best object removal result, upload a mask image that marks the
          object to remove.
        </p>

        <p className="mt-6 text-sm font-medium">
          Describe Object name to remove
        </p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g., watch or spoon, only single object name"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-70"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
          Remove Object
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />

              <p>Upload an image and click Remove Object to get started</p>
            </div>
          </div>
        ) : (
          <Image
            src={content}
            alt="object removed"
            width={800}
            height={600}
            unoptimized
            className="mt-3 w-full h-auto rounded-md object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default Page;
