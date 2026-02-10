import HamburgerMenu from "../../../Hamburgers/HamburgerMenu";
import "./NearShopNavBar.css";

export default function NearShopNavBar({
  query,
  setQuery,
  category,
  setCategory,
  distance,
  setDistance,
  categories,
  distances,
}) {
  return (
    <header className="nearshop-navbar">
      <div className="nearshop-nav-inner">
        {/* BRAND */}
        <HamburgerMenu></HamburgerMenu>
        <div className="nav-brand">NearShop</div>

        {/* SEARCH */}
        <input
          className="nav-search"
          placeholder="Search shops..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="nav-select"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* DISTANCE */}
        <select
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="nav-select"
        >
          {distances.map((d) => (
            <option key={d} value={d}>
              {d} km
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
