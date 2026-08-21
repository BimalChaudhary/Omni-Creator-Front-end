"use client";
import { dummyCreationData } from "@/src/assets/assets";
import { Gem, Sparkle } from "lucide-react";
import { useEffect, useState } from "react";
import { Show } from "@clerk/nextjs";
import CreationItem from "@/src/components/CreationItem/CreationItem";

const Page = () => {
  const [creations, setCreations] = useState<typeof dummyCreationData>([]);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setCreations(dummyCreationData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    getDashboardData();
  }, []);
  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creation</p>
            <h2>{creations.length}</h2>
          </div>
          <div className=" w-10 h-10 rounded-lg bg-linear-to-br  from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center ">
            <Sparkle className="w-5 h-5 text-white" />
          </div>
        </div>
        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>

            <Show when={{ plan: "premium" }} fallback={<h2>Free</h2>}>
              <h2>Premium</h2>
            </Show>
          </div>
          <div className=" w-10 h-10 rounded-lg bg-linear-to-br  from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center ">
            <Gem className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>

        {creations.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default Page;
