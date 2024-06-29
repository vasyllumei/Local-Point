import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useContext } from "react";
import ResultLocation from "./ResultLocation";
import { ResultsContext } from "@/context/ResultsContext";

function Markers({ result }) {
  const { selectedResult, setSelectedResult } = useContext(ResultsContext);
  return (
    <div>
      <MarkerF
        position={result.geometry.location}
        onClick={() => setSelectedResult(result)}
        icon={{
          url: "/circle.svg",
          scaledSize: {
            width: 10,
            height: 10,
          },
        }}
      >
        {selectedResult.reference === result.reference ? (
          <OverlayView
            position={result.geometry.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="ml-[-90px] mt-[-230px]">
              <ResultLocation result={result} showDir={true} />
            </div>
          </OverlayView>
        ) : null}
      </MarkerF>
    </div>
  );
}

export default Markers;
