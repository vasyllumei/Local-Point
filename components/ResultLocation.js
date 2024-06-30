import { LocationContext } from "@/context/LocationContext";
import Image from "next/image";
import React, { useContext } from "react";

function ResultLocation({ result, showDir = false }) {
  const photo_ref = result?.photos ? result?.photos[0]?.photo_reference : "";
  const { location } = useContext(LocationContext);

  const onDirectionClick = () => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&origin=" +
        location.lat +
        "," +
        location.lng +
        "&destination=" +
        result.geometry.location.lat +
        "," +
        result.geometry.location.lng +
        "&travelmode=driving",
    );
  };

  return (
    <div
      className="w-[195px] min-h-[180px] flex-shrink-0 p-2
         rounded-lg shadow-md mb-1
          bg-[#B7B7A4] hover:scale-110 transition-all mt-[20px] cursor-pointer"
    >
      <Image
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        alt={result.name}
        width={180}
        height={80}
        className="rounded-lg object-cover h-[90px]"
      />
      <h2 className="text-[13px] text-[#283618] font-bold mt-1 line-clamp-1">
        {result.name}
      </h2>
      <h2 className="text-[10px] text-w line-clamp-2">
        {result.formatted_address}
      </h2>
      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-3 h-3 text-yellow-500"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-[10px] font-bold">{result.rating}</h2>
      </div>
      {showDir ? (
        <div className="border-t-[1px] p-1 mt-1">
          <h2 className="text-[#283618] flex justify-between items-center">
            Dist: {Math.round(result.distance)} meters
            <span
              className="border-[1px] p-1 rounded-full border-[#283618] hover:text-white hover:bg-[#283618]"
              onClick={onDirectionClick}
            >
              Get Direction
            </span>
          </h2>
        </div>
      ) : null}
    </div>
  );
}

export default ResultLocation;
