import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import HamburgerMenu from "../../components/Hamburgers/HamburgerMenu";

//----------------------------------------------------------------------------------

import NavBar from "../../components/Navbar/NavBar";
import ProductCardContainer from "../../components/customer/CustomerProductCardContainer/ProductCardContainer";
import CategoryScroller from "../../components/customer/CategoryScroller/CategoryScroller";
const CustomerHome = () => {
  return (
    <>
      <HamburgerMenu />
      <NavBar></NavBar>
      <CategoryScroller></CategoryScroller>
      <ProductCardContainer></ProductCardContainer>
    </>
  );
};

export default CustomerHome;
