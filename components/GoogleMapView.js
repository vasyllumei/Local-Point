import { LocationContext } from "@/context/LocationContext";
import { GoogleMap, MarkerF, Circle } from "@react-google-maps/api";
import React, { useContext, useEffect, useState } from "react";
import Markers from "./Markers";
import { ResultsContext } from "@/context/ResultsContext";
import { containerStyle, mapStyles } from "@/utils/mapStyles";

function GoogleMapView({ resultsList, radius }) {
  const [map, setMap] = useState(null);
  const { location } = useContext(LocationContext);
  const { selectedResult } = useContext(ResultsContext);

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    if (map && selectedResult) {
      map.panTo(selectedResult.geometry.location);
    }
  }, [selectedResult]);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          !selectedResult.name ? location : selectedResult.geometry.location
        }
        zoom={13}
        onLoad={onLoad}
        options={{ styles: mapStyles }}
      >
        <MarkerF position={location} />
        {resultsList.map((item, index) => (
          <Markers result={item} key={index} />
        ))}
        {radius && location && (
          <Circle
            center={{ lat: location.lat, lng: location.lng }}
            radius={Number(radius)}
            options={{
              strokeColor: "rgba(213,120,120,0.8)",
              fillColor: "rgba(67,118,213,0.59)",
              fillOpacity: 0.2,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapView;
