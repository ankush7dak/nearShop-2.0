import { useEffect, useState, useMemo } from "react";
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
import { FaDirections, FaStar } from "react-icons/fa";
import "./NearShopSearchPage.css";
import { useCustomer } from "../CustomerContext/CustomerContext";
import { useNavigate } from "react-router-dom";
import NearShopNavBar from "./NearShopNavBar/NearShopNavBar";

/* ---------------- LEAFLET ICON FIX ---------------- */

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ---------------- MOCK DATA ---------------- */

const shopDistances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const SHOPS = [ { id: 1, name: "Fresh Mart", category: "Grocery", lat: 22.5892, lng: 88.4215, rating: 4.5 }, { id: 2, name: "MediCare Pharmacy", category: "Pharmacy", lat: 22.5841, lng: 88.4152, rating: 4.2 }, { id: 3, name: "Tech Hub", category: "Electronics", lat: 22.5928, lng: 88.4104, rating: 4.7 }, { id: 4, name: "Green Veggies", category: "Vegetables", lat: 22.5876, lng: 88.4269, rating: 4.4 }, { id: 5, name: "Daily Needs", category: "Convenience Store", lat: 22.5819, lng: 88.4183, rating: 4.1 }, { id: 6, name: "Healthy Basket", category: "Organic Store", lat: 22.5943, lng: 88.4238, rating: 4.6 }, { id: 7, name: "City Gadgets", category: "Mobile Store", lat: 22.5901, lng: 88.4075, rating: 4.3 }, { id: 8, name: "WellCare", category: "Medical Supplies", lat: 22.5834, lng: 88.4291, rating: 4.0 }, { id: 9, name: "Fruit Bazaar", category: "Fruit Shop", lat: 22.5965, lng: 88.4167, rating: 4.5 }, { id: 10, name: "Smart Grocery Hub", category: "Supermarket", lat: 22.5858, lng: 88.4099, rating: 4.4 }, { id: 11, name: "Sweet Treats", category: "Bakery", lat: 22.5825, lng: 88.4123, rating: 4.3 }, { id: 12, name: "Meat Express", category: "Meat Shop", lat: 22.5952, lng: 88.4199, rating: 4.1 }, { id: 13, name: "Ocean Catch", category: "Fish Market", lat: 22.5911, lng: 88.4244, rating: 4.4 }, { id: 14, name: "Spice Corner", category: "Spice Store", lat: 22.5869, lng: 88.4141, rating: 4.2 }, { id: 15, name: "Milk Palace", category: "Dairy", lat: 22.5837, lng: 88.4068, rating: 4.0 }, { id: 16, name: "Wine World", category: "Liquor Store", lat: 22.5972, lng: 88.4213, rating: 4.5 }, { id: 17, name: "Pet Planet", category: "Pet Shop", lat: 22.5888, lng: 88.4271, rating: 4.3 }, { id: 18, name: "Baby Care Hub", category: "Baby Store", lat: 22.5805, lng: 88.4207, rating: 4.1 }, { id: 19, name: "Fashion Street", category: "Clothing", lat: 22.5923, lng: 88.4322, rating: 4.6 }, { id: 20, name: "Shoe Plaza", category: "Footwear", lat: 22.5846, lng: 88.4115, rating: 4.2 }, { id: 21, name: "Gold Palace", category: "Jewellery", lat: 22.5939, lng: 88.4083, rating: 4.4 }, { id: 22, name: "Home Essentials", category: "Home Decor", lat: 22.5861, lng: 88.4305, rating: 4.1 }, { id: 23, name: "FixIt Hardware", category: "Hardware Store", lat: 22.5894, lng: 88.4178, rating: 4.0 }, { id: 24, name: "Paint World", category: "Paint Store", lat: 22.5955, lng: 88.4136, rating: 4.3 }, { id: 25, name: "Book Haven", category: "Book Store", lat: 22.5813, lng: 88.4255, rating: 4.5 }, { id: 26, name: "Stationery Hub", category: "Stationery", lat: 22.5872, lng: 88.4088, rating: 4.1 }, { id: 27, name: "Cycle Point", category: "Bicycle Shop", lat: 22.5909, lng: 88.4226, rating: 4.2 }, { id: 28, name: "Auto Parts", category: "Car Accessories", lat: 22.5961, lng: 88.4109, rating: 4.3 }, { id: 29, name: "Bike Zone", category: "Bike Repair", lat: 22.5829, lng: 88.4331, rating: 4.0 }, { id: 30, name: "Fitness Arena", category: "Gym Equipment", lat: 22.5884, lng: 88.4057, rating: 4.4 }, { id: 31, name: "Sports Hub", category: "Sports Store", lat: 22.5948, lng: 88.4181, rating: 4.5 }, { id: 32, name: "Toy Town", category: "Toy Store", lat: 22.5851, lng: 88.4277, rating: 4.2 }, { id: 33, name: "Gift Gallery", category: "Gift Shop", lat: 22.5832, lng: 88.4149, rating: 4.1 }, { id: 34, name: "Flower Market", category: "Florist", lat: 22.5917, lng: 88.4299, rating: 4.3 }, { id: 35, name: "Print House", category: "Printing Shop", lat: 22.5975, lng: 88.4072, rating: 4.0 }, { id: 36, name: "Laundry Express", category: "Laundry Service", lat: 22.5864, lng: 88.4211, rating: 4.2 }, { id: 37, name: "Salon Pro", category: "Salon", lat: 22.5921, lng: 88.4158, rating: 4.6 }, { id: 38, name: "Spa Heaven", category: "Spa", lat: 22.5817, lng: 88.4092, rating: 4.3 }, { id: 39, name: "Tailor Works", category: "Tailor", lat: 22.5899, lng: 88.4327, rating: 4.1 }, { id: 40, name: "Repair Zone", category: "Mobile Repair", lat: 22.5942, lng: 88.4252, rating: 4.0 }, { id: 41, name: "Cyber Cafe Plus", category: "Cyber Cafe", lat: 22.5821, lng: 88.4187, rating: 4.2 }, { id: 42, name: "Travel Desk", category: "Travel Agency", lat: 22.5886, lng: 88.4126, rating: 4.3 }, { id: 43, name: "Courier Point", category: "Courier Service", lat: 22.5957, lng: 88.4301, rating: 4.1 }, { id: 44, name: "Event Planners", category: "Event Service", lat: 22.5905, lng: 88.4062, rating: 4.4 }, { id: 45, name: "Photo Studio", category: "Photography", lat: 22.5842, lng: 88.4229, rating: 4.5 }, { id: 46, name: "Music World", category: "Music Store", lat: 22.5933, lng: 88.4162, rating: 4.2 }, { id: 47, name: "Game Zone", category: "Gaming Store", lat: 22.5815, lng: 88.4284, rating: 4.3 }, { id: 48, name: "Watch House", category: "Watch Store", lat: 22.5969, lng: 88.4095, rating: 4.1 }, { id: 49, name: "Optical Care", category: "Optical Store", lat: 22.5879, lng: 88.4202, rating: 4.4 }, { id: 50, name: "Furniture Hub", category: "Furniture Store", lat: 22.5926, lng: 88.4263, rating: 4.5 } ];
const CATEGORIES = [ "All", "Grocery", "Pharmacy", "Electronics", "Vegetables", "Convenience Store", "Organic Store", "Mobile Store", "Medical Supplies", "Fruit Shop", "Supermarket", "Bakery", "Meat Shop", "Fish Market", "Spice Store", "Dairy", "Liquor Store", "Pet Shop", "Baby Store", "Clothing", "Footwear", "Jewellery", "Home Decor", "Hardware Store", "Paint Store", "Book Store", "Stationery", "Bicycle Shop", "Car Accessories", "Bike Repair", "Gym Equipment", "Sports Store", "Toy Store", "Gift Shop", "Florist", "Printing Shop", "Laundry Service", "Salon", "Spa", "Tailor", "Mobile Repair", "Cyber Cafe", "Travel Agency", "Courier Service", "Event Service", "Photography", "Music Store", "Gaming Store", "Watch Store", "Optical Store", "Furniture Store" ];

/* ---- SHOPS + CATEGORIES remain unchanged ---- */

/* ---------------- DISTANCE ---------------- */

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((R * c).toFixed(2));
}

/* ---------------- MAP HELPERS ---------------- */

function FlyToShop({ shop }) {
  const map = useMap();

  useEffect(() => {
    if (shop) {
      map.flyTo([shop.lat, shop.lng], 16, { duration: 1.2 });
    }
  }, [shop, map]);

  return null;
}

function ResizeFix() {
  const map = useMapEvents({});

  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 300);
  }, [map]);

  return null;
}

function FitRouteBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route.length) {
      map.fitBounds(L.latLngBounds(route), {
        padding: [60, 60],
        animate: true,
      });
    }
  }, [route, map]);

  return null;
}

/* ---------------- MAIN ---------------- */

export default function NearShopSearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [shopDistRange, setShopDistRange] = useState(10);

  const navigate = useNavigate();
  const { setShopDetails } = useCustomer();

  /* ---------- GEO ---------- */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () =>
        setUserLocation({
          lat: 22.5892,
          lng: 88.4215,
        })
    );
  }, []);

  /* ---------- FILTER + SORT ---------- */

  const filtered = useMemo(() => {
    if (!userLocation) return [];

    let list = SHOPS.filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    );

    if (category !== "All") {
      list = list.filter((s) => s.category === category);
    }

    return list
      .map((s) => ({
        ...s,
        distance: getDistanceKm(
          userLocation.lat,
          userLocation.lng,
          s.lat,
          s.lng
        ),
      }))
      .filter((s) => s.distance <= shopDistRange)
      .sort((a, b) => a.distance - b.distance);
  }, [query, category, userLocation, shopDistRange]);

  /* ---------- CLEAR ROUTE WHEN FILTER CHANGES ---------- */

  useEffect(() => {
    setSelectedShop(null);
    setRouteCoords([]);
  }, [query, category, shopDistRange]);

  /* ---------- ROUTING ---------- */

  const fetchRoute = async (shop) => {
    if (!userLocation) return;

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${shop.lng},${shop.lat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.routes?.length) {
        const coords = data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );

        setRouteCoords(coords);
        setSelectedShop(shop);
      }
    } catch (err) {
      console.error("Route fetch failed:", err);
    }
  };

  /* ---------- SHOP NAV ---------- */

  const handleShopDetails = (shop) => {
    localStorage.setItem("shopDetails", JSON.stringify(shop));
    setShopDetails(shop);
    navigate("/customer/nearby-shops");
  };

  return (
    <>
      {/* SEARCH */}
      {/* <div className="search-panel">
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

        <select
          value={shopDistRange}
          onChange={(e) => setShopDistRange(Number(e.target.value))}
          className="category-select"
        >
          {shopDistances.map((d) => (
            <option key={d} value={d}>
              {d} km
            </option>
          ))}
        </select>
      </div> */}
      <NearShopNavBar
  query={query}
  setQuery={setQuery}
  category={category}
  setCategory={setCategory}
  distance={shopDistRange}
  setDistance={setShopDistRange}
  categories={CATEGORIES}
  distances={shopDistances}
/>

      <div className="nearshop-page">
        <h1 className="page-title">Find Nearby Shops</h1>

        <div className="content-grid">
          {/* LIST */}
          <div className="shop-list">
            {filtered.map((shop) => (
              <div
                key={shop.id}
                className={`shop-card-near-shop ${
                  selectedShop?.id === shop.id ? "active" : ""
                }`}
              >
                <div
                  className="shop-main"
                  onClick={() => {
                    setSelectedShop(shop);
                    setRouteCoords([]);
                  }}
                >
                  <h3>{shop.name}</h3>
                  <p className="category">{shop.category}</p>

                  <div className="rating">
                    <FaStar /> {shop.rating}
                  </div>

                  {shop.distance !== undefined && (
                    <p className="distance">{shop.distance} km away</p>
                  )}
                </div>

                <div className="visited-shop">
                  <button
                    onClick={() =>
                      handleShopDetails({
                        id: shop.id,
                        name: shop.name,
                      })
                    }
                  >
                    Start Shopping
                  </button>
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

                <Marker position={[userLocation.lat, userLocation.lng]}>
                  <Popup>You are here</Popup>
                </Marker>

                {filtered.map((shop) => (
                  <Marker key={shop.id} position={[shop.lat, shop.lng]}>
                    <Popup>
                      <strong>{shop.name}</strong>
                      <br />
                      {shop.category}
                      <br />
                      ⭐ {shop.rating}
                      <br />
                      {shop.distance !== undefined &&
                        `${shop.distance} km away`}
                    </Popup>
                  </Marker>
                ))}

                {routeCoords.length > 0 && (
                  <Polyline positions={routeCoords} />
                )}
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
