import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  FaDirections,
  FaStar,
  FaPlaneDeparture,
} from "react-icons/fa";
import "./NearShopSearchPage.css";

/* ---------------- LEAFLET ICON FIX ---------------- */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------------- MOCK DATA ---------------- */

const SHOPS = [
  {
    id: 1,
    name: "Fresh Mart",
    category: "Grocery",
    lat: 24.7969,
    lng: 88.0039,
    rating: 4.5,
  },
  {
    id: 2,
    name: "MediCare Pharmacy",
    category: "Medical",
    lat: 24.8001,
    lng: 85.0112,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Tech Hub",
    category: "Electronics",
    lat: 24.7915,
    lng: 80.0201,
    rating: 4.7,
  },
];

const CATEGORIES = ["All", "Grocery", "Medical", "Electronics"];

/* ---------------- HELPERS ---------------- */

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lat2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}

/* ---------------- FLY TO SHOP ---------------- */

function FlyToShop({ shop }) {
  const map = useMap();

  useEffect(() => {
    if (shop) {
      map.flyTo([shop.lat, shop.lng], 16, { duration: 1.2 });
    }
  }, [shop, map]);

  return null;
}

/* ---------------- RESIZE FIX ---------------- */

function ResizeFix() {
  const map = useMapEvents({});

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);

  return null;
}

/* ---------------- FIT ROUTE TO VIEW ---------------- */

function FitRouteBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length) {
      const bounds = L.latLngBounds(route);
      map.fitBounds(bounds, {
        padding: [60, 60],
        animate: true,
      });
    }
  }, [route, map]);

  return null;
}

/* ---------------- NAV BUTTON ---------------- */

function StartNavigationBtn({ onStart, disabled }) {
  return (
    <div className="nav-control">
      <button
        onClick={onStart}
        disabled={disabled}
        className="nav-start-btn"
      >
        <FaPlaneDeparture /> Start
      </button>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function NearShopSearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [filtered, setFiltered] = useState(SHOPS);
  const [selectedShop, setSelectedShop] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [eta, setEta] = useState(null);
  const [navigating, setNavigating] = useState(false);

  /* ---------- GEO LOCATION ---------- */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserLocation({ lat: 24.79, lng: 85.0 })
    );
  }, []);

  /* ---------- FILTER ---------- */

  useEffect(() => {
    let list = SHOPS.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );

    if (category !== "All") {
      list = list.filter((s) => s.category === category);
    }

    if (userLocation) {
      list = list
        .map((s) => ({
          ...s,
          distance: getDistanceKm(
            userLocation.lat,
            userLocation.lng,
            s.lat,
            s.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    }

    setFiltered(list);
  }, [query, category, userLocation]);

  /* ---------- ROUTING ---------- */

  const fetchRoute = async (shop) => {
    if (!userLocation || !shop) return;

    const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${shop.lng},${shop.lat}?overview=full&geometries=geojson`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.routes?.length) {
      const route = data.routes[0];

      const coords = route.geometry.coordinates.map(
        ([lng, lat]) => [lat, lng]
      );

      setRouteCoords(coords);
      setSelectedShop(shop);
      setNavigating(true);

      const mins = Math.round(route.duration / 60);
      setEta(mins);
    }
  };

  return (
    <>
      {/* SEARCH */}
      <div className="search-panel">
        <input
          className="search-input"
          placeholder="Search shop name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="nearshop-page">
        <h1 className="page-title">Find Nearby Shops</h1>

        <div className="content-grid">
          {/* SHOP LIST */}
          <div className="shop-list">
            {filtered.map((shop) => (
              <div
                key={shop.id}
                className={`shop-card ${
                  selectedShop?.id === shop.id ? "active" : ""
                }`}
              >
                <div
                  className="shop-main"
                  onClick={() => setSelectedShop(shop)}
                >
                  <h3>{shop.name}</h3>
                  <p className="category">{shop.category}</p>

                  <div className="rating">
                    <FaStar /> {shop.rating}
                  </div>

                  {shop.distance && (
                    <p className="distance">{shop.distance} km away</p>
                  )}
                </div>

                <button
                  className="direction-btn"
                  onClick={() => fetchRoute(shop)}
                >
                  <FaDirections />
                </button>
              </div>
            ))}
          </div>

          {/* MAP */}
          <div className="map-wrapper">
            {userLocation && (
              <MapContainer
                center={[userLocation.lat, userLocation.lng]}
                zoom={14}
                className="map leaflet-container"
              >
                <ResizeFix />

                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <FlyToShop shop={selectedShop} />
                <FitRouteBounds route={routeCoords} />

                {/* USER */}
                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>You are here</Popup>
                </Marker>

                {/* SHOPS */}
                {filtered.map((shop) => (
                  <Marker key={shop.id} position={[shop.lat, shop.lng]}>
                    <Popup>
                      <strong>{shop.name}</strong>
                      <br />
                      {shop.category}
                      <br />
                      ⭐ {shop.rating}
                      <br />
                      {shop.distance && `${shop.distance} km away`}
                    </Popup>
                  </Marker>
                ))}

                {/* ROUTE */}
                {routeCoords.length > 0 && (
                  <Polyline positions={routeCoords} />
                )}

                {/* START BUTTON */}
                <StartNavigationBtn
                  disabled={!selectedShop}
                  onStart={() => fetchRoute(selectedShop)}
                />

                {/* ETA */}
                {eta && navigating && (
                  <div className="eta-box">
                    ⏱ {eta} min to {selectedShop?.name}
                  </div>
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
