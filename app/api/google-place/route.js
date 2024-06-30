import { NextResponse } from "next/server";

const BASE_URL = "https://maps.googleapis.com/maps/api/place";

async function fetchPlaces(category, radius, lat, lng, pageToken = "") {
  let url = `${BASE_URL}/textsearch/json?query=${category}&location=${lat},${lng}&radius=${radius}&key=${process.env.GOOGLE_API_KEY}`;

  if (pageToken) {
    url += `&pagetoken=${pageToken}`;
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching Google Place data: ${res.statusText}`);
  }

  return res.json();
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const radius = searchParams.get("radius");
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  let allResults = [];
  let nextPageToken = "";

  try {
    do {
      const data = await fetchPlaces(category, radius, lat, lng, nextPageToken);
      allResults = [...allResults, ...data.results];
      nextPageToken = data.next_page_token;
      if (nextPageToken) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    } while (nextPageToken);

    return NextResponse.json({ results: allResults });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
