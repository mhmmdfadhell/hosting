import React, { useState } from "react";
import "./_sidebar.scss";

import {
  MdHome,
  MdProductionQuantityLimits,
} from "react-icons/md";

import {GrTransaction} from "react-icons/gr"
import {GiMeat} from "react-icons/gi"
import {
    FiUserPlus,
  } from "react-icons/fi";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
    const router = useHistory();
    const location = useLocation();
    const { pathname } = location;

    const handleButtonClick = (pages) => {
      router.push(`/${pages}`);
    };
  
  return (
    <nav
      className={sidebar ? "sidebar open" : "sidebar"}
      onClick={() => handleToggleSidebar(false)}
    >
    
        <li className={pathname === '/' ? 'active' : ''}>
            <MdHome onClick={() => handleButtonClick('')} size={23} />
            <span>Home</span>
        </li>
        <li className={pathname === '/users' ? 'active' : ''}>
            <FiUserPlus onClick={() => handleButtonClick('users')} size={23} />
            <span>Users</span>
        </li>
        <li className={pathname === '/toppings' ? 'active' : ''}>
            <GiMeat onClick={() => handleButtonClick('toppings')} size={23} />
            <span>Topping</span>
        </li>
        <li className={pathname === '/products' ? 'active' : ''}>
            <MdProductionQuantityLimits onClick={() => handleButtonClick('products')} size={23} />
            <span>Product</span>
        </li>
        <li className={pathname === '/transaction' ? 'active' : ''}>
            <GrTransaction onClick={() => handleButtonClick('transaction')} size={23} />
            <span>Transaction</span>
        </li>
      <hr />
    </nav>
  );
};

export default Sidebar;