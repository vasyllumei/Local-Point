import React from "react";

function ListLoading() {
  return (
    <div>
      <div className="border bg-[#B7B7A4] shadow rounded-md p-2 w-[187px]">
        <div className="animate-pulse flex flex-col ">
          <div className="rounded-lg bg-[#283618] h-[90px] w-[170px] animate-pulse"></div>
          <div className="flex-1 space-y-2 py-3 ">
            <div className="h-2 bg-[#283618] rounded animate-pulse"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-[#283618] rounded col-span-2 animate-pulse"></div>
                <div className="h-2 bg-[#283618] rounded col-span-1 animate-pulse"></div>
              </div>
              <div className="h-2 bg-[#283618] rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListLoading;
