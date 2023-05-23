"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useResizeDetector } from "react-resize-detector";
import { GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import mapData from "@lib/data/countries.json";

import MapTopBar from "@components/TopBar";

//holding space
//and more
import { AppConfig } from "@lib/AppConfig";

//more space
import MapContextProvider from "./MapContextProvider";
import useLeafletWindow from "./useLeafletWindow";
import useMapContext from "./useMapContext";
// import ColorPicker from "../ColorPicker";
// import { tailwindColorToString } from "@/lib/helper/tailwindColorToString";

const LeafletMap = dynamic(
  async () => (await import("./LeafletMap")).LeafletMap,
  {
    ssr: false,
  }
);

const MapInner = () => {
  const { map } = useMapContext();
  const leafletWindow = useLeafletWindow();
  // console.log(mapData.features[0].properties.ADMIN);

  // const [selectedColor, setSelectedColor] = useState("");
  const [color, setColor] = useState("#ff0000");
  const colorRef = useRef(color);
  const [countryColors, setCountryColors] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const changeCountryColor = (e: any) => {
    console.log("clicked");
    const countryName = e.target.feature.properties.ADMIN;
    console.log(countryName, " with color ", colorRef.current);
    setCountryColors((prev) => {
      return {
        ...prev,
        [countryName]: colorRef.current,
      };
    });
    console.log(countryColors);
  };

  const geoJsonStyle = (feature: any) => {
    const countryName = feature.properties.ADMIN;
    const fillColor = countryColors[countryName] || "#ff0000";
    return {
      weight: 1,
      fillColor,
    };
  };

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: "debounce",
    refreshRate: 200,
  });

  const onEachCountry = (country: any, layer: any) => {
    const countryName = country.properties.ADMIN;
    // console.log(countryName);
    layer.bindPopup(countryName);
    layer.on({
      click: changeCountryColor,
    });
  };

  const colorChange = (e: any) => {
    setColor(e.target.value);
  };

  // const changeCountryColorWithCustomPicker = (e: any) => {
  //   let thisColor = tailwindColorToString(selectedColor);
  //   console.log(selectedColor);
  //   console.log(thisColor);
  //   e.target.setStyle({
  //     fillColor: thisColor,
  //   });
  // };

  const isLoading =
    typeof window === "undefined" ||
    !map ||
    !leafletWindow ||
    !viewportWidth ||
    !viewportHeight;

  return (
    <div className="h-full w-full absolute overflow-hidden" ref={viewportRef}>
      <MapTopBar />

      <div
        className={`absolute w-full left-0 z-0 transition-opacity ${
          isLoading ? "opacity-0" : "opacity-1 "
        }`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? "100%",
          height: viewportHeight
            ? viewportHeight - AppConfig.ui.topBarHeight
            : "100%",
        }}
      >
        <LeafletMap
          center={AppConfig.baseCenter}
          zoom={AppConfig.defaultZoom}
          maxZoom={AppConfig.maxZoom}
          minZoom={AppConfig.minZoom}
        >
          {!isLoading ? (
            <GeoJSON
              data={mapData as GeoJsonObject}
              onEachFeature={onEachCountry}
              style={geoJsonStyle}
            />
          ) : (
            <>loading</>
          )}
        </LeafletMap>
      </div>
      <div className="absolute bottom-5 left-5 z-50">
        <input type="color" value={color} onChange={colorChange} />
      </div>
    </div>
  );
};

// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
);

export default Map;
