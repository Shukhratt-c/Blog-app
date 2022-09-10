import { useRouter } from "next/router";
import propTypes from "prop-types";
import React from "react";

const NavItem = ({ item }) => {
    const router = useRouter();
    return <>{router.pathname === "/" ? item : ""}</>;
  };

export default NavItem

NavItem.propTypes = {
    item: propTypes.string,
  };
