import React from "react";

import { Button } from "@/components/ui/button";

export function ReportTable({ data }) {
  return (
    <div className="flex flex-col mt-2 space-y-5 h-full py-5">
      <section className="flex justify-between">
        <div className="flex space-x-10 ">
          <div className="w-[250px] font-semibold uppercase text-md font-sans px-5">Title</div>
          <div className="w-[250px] font-semibold uppercase text-md font-sans px-5">Description</div>
        </div>
        {/* <div>Action</div> */}
      </section>
      <div className="flex flex-col space-y-2  h-full overflow-auto">
        {data?.map((d) => (
          <section className="flex justify-between px-5 py-1 rounded-[50px] bg-[#DFE8FA]">
            <div className="flex space-x-10 items-center">
              <div className="w-[250px] text-sm ">{d.rpt_title}</div>
              <div className="w-[250px] text-sm line-clamp-2 capitalize ">{d.rpt_desc}</div>
            </div>
            <Button className="bg-[#2b2D42] px-8 py-2 rounded-[25px] ">
              Resolve Report
            </Button>
          </section>
        ))}
      </div>
    </div>
  );
}
