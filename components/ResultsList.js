import React, { useContext, useRef } from "react";
import ResultLocation from "./ResultLocation";
import { ResultsContext } from "@/context/ResultsContext";

function ResultsList({ resultsList }) {
  const elementRef = useRef(null);
  const { setSelectedResult } = useContext(ResultsContext);

  const slideRight = (element) => {
    element.scrollLeft += 500;
  };
  const slideLeft = (element) => {
    element.scrollLeft -= 500;
  };
  if (resultsList.length === 0) return null;

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        onClick={() => slideLeft(elementRef.current)}
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 absolute rotate-180 top-[35%] z-10
            bg-[#283618] border-2 border-[#D4D4D4] cursor-pointer p-1 rounded-full text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
      <div
        className="flex overflow-scroll  overflow-x-auto gap-4
    scrollbar-hide scroll-smooth min-h-[220px]"
        ref={elementRef}
      >
        {resultsList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedResult(item)}
            className={`${index === 0 ? "ml-12" : ""}`}
          >
            <ResultLocation result={item} />
          </div>
        ))}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => slideRight(elementRef.current)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 absolute right-0 top-[35%]
            bg-[#283618] border-2 border-[#D4D4D4] cursor-pointer p-1 rounded-full text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}

export default ResultsList;
