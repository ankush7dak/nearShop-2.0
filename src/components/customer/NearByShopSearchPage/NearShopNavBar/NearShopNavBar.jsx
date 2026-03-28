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
       
      </div>
    </header>
  );
}
