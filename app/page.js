"use client";
import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import debounce from "lodash.debounce";
import GlobalApi from "@/services/googlePlacesApi";
import ResultsList from "@/components/ResultsList";
import CategoryList from "@/components/CategoryList";
import GoogleMapView from "@/components/GoogleMapView";
import RadiusSlider from "@/components/RadiusSlider";
import ListLoading from "@/components/ListLoading";
import { LocationContext } from "@/context/LocationContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Search from "@/components/Search";
import { calculateDistance } from "@/utils";
import LoadingSpinner from "@/components/LoadingSpinner";
import Dropdown from "@/components/Dropdown";

export default function Home() {
  const { data: session, status } = useSession();
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [resultsList, setResultsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const cache = useRef({});
  const [profileClick, setProfileClick] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { location } = useContext(LocationContext);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/Login");
    }
  }, [status, router]);

  const getCachedData = (category, radius, lat, lng) => {
    const cacheKey = `${category}-${radius}-${lat}-${lng}`;
    return cache.current[cacheKey];
  };

  const setCachedData = (category, radius, lat, lng, data) => {
    const cacheKey = `${category}-${radius}-${lat}-${lng}`;
    cache.current[cacheKey] = data;
  };

  const debouncedGetGooglePlace = useMemo(
    () =>
      debounce((category, radius, lat, lng) => {
        const cachedData = getCachedData(category, radius, lat, lng);
        if (cachedData) {
          setResultsList(cachedData);
          setLoading(false);
          return;
        }

        if (category && lat && lng) {
          setLoading(true);
          GlobalApi.getGooglePlace(category, radius, lat, lng)
            .then((resp) => {
              const filteredResults = resp.data.results.filter((results) => {
                const distance = calculateDistance(
                  results.geometry.location.lat,
                  results.geometry.location.lng,
                  lat,
                  lng,
                );
                results.distance = distance;
                return distance <= radius;
              });
              setResultsList(filteredResults);
              setCachedData(category, radius, lat, lng, filteredResults);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching Google Place data:", error);
              setLoading(false);
            });
        }
      }, 500),
    [],
  );

  useEffect(() => {
    if (location) {
      debouncedGetGooglePlace(category, radius, location.lat, location.lng);
    }
  }, [category, radius, location, debouncedGetGooglePlace]);

  const handleSearchSubmit = (searchValue) => {
    setSearchValue(searchValue);
  };
  const handleImageClick = () => {
    setProfileClick(!profileClick);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 ">
      <div className="col-span-3 p-6 ">
        <GoogleMapView resultsList={resultsList} radius={radius} />
        <div className="md:absolute w-[90%]  md:w-[55%] col-span-3 relative ">
          {!loading ? (
            <ResultsList resultsList={resultsList} />
          ) : (
            <div
              className="flex overflow-scroll overflow-x-auto gap-4
    scrollbar-hide scroll-smooth mt-[20px] ml-[50px] md:ml-[45px]"
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <ListLoading key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-3 col-span-2">
        <div className="flex  items-center mb-2 mx-4">
          <div className="relative inline-block">
            <Image
              className="rounded-full cursor-pointer hover:border-[2px] border-[#B7B7A4]"
              src="/logo.png"
              alt="logo"
              width={60}
              height={60}
              onClick={handleImageClick}
              priority
            />
            <Dropdown
              profileClick={profileClick}
              onClickRefresh={handleRefresh}
              onClickLogout={() => signOut()}
            />
          </div>
          <Search handleSearchSubmit={handleSearchSubmit} />
        </div>

        <CategoryList
          onCategoryChange={(value) => setCategory(value)}
          searchCategory={searchValue}
        />
        <RadiusSlider radius={radius} onRadiusChange={setRadius} />
      </div>
    </div>
  );
}
