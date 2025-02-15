"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import React, { useState } from "react";
import { columns } from "./components/columns";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Loader2, Loader } from "@/components/ui/loader";
import { ReportTable } from "./components/table";
const page = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  const onFilter = (e) => {
    setGlobalFilter(e.target.value);
  };

  const { data, status } = useQueryProcessor({
    url: "/report",
    key: ["reports"],
    queryParams: {},
  });

  const villageTypeReports =
    status === "success" &&
    data?.filter((report) => report.rpt_type === "village");
  const systemTypeReports = status === "success" &&
  data?.filter((report) => report.rpt_type === "system");

  return (
    <div className="flex flex-col h-full w-full items-center space-y-10 ">
      <Button className="bg-[#2b2D42] px-8 py-2 rounded-[25px] self-end mr-10">
        Resolved Reports
      </Button>
      <div className="bg-white  h-[40%] w-[95%] rounded-[50px] px-10 py-5 overflow-hidden">
        <h1 className="text-[20px] font-semibold font-sans">Village Reports</h1>
        {
          (() => {
              if(status === "pending") {
                return <div className="flex justify-center items-center h-full"><Loader2 size={50} className={""}/></div>
              }

              else if (status == "success" && villageTypeReports?.length === 0) {
                return <div className="flex justify-center items-center h-full"><h2 className="text-slate-400 font-normal text-lg">Nothing to see here. Yay!</h2></div>
              }

              else if (status === "error") {
                return <div className="flex justify-center items-center h-full"><h2 className="text-slate-400 font-normal text-lg">Something went wrong :(</h2></div>
              }
              else {
                return <ReportTable data={villageTypeReports}/>
              }
          })()
        }
          
      </div>
      <div className="bg-white  h-[40%] w-[95%] rounded-[50px] px-10 py-5 overflow-hidden">
        <h1 className="text-[20px] font-semibold font-sans">System Reports</h1>
        {
          (() => {
              if(status === "pending") {
                return <div className="flex justify-center items-center h-full"><Loader2 size={50} className={""}/></div>
              }
              else if (status == "success" && systemTypeReports?.length === 0) {
                return <div className="flex justify-center items-center h-full"><h2 className="text-slate-400 font-normal text-lg">Nothing to see here. Yay!</h2></div>

              }
              else if (status === "error") {
                return <div className="flex justify-center items-center h-full"><h2 className="text-slate-400 font-normal text-lg">Something went wrong :(</h2></div>
              }
              else {
                return <ReportTable data={systemTypeReports}/>
              }
          })()
        }
      </div>
    </div>
  );
};

export default page;
