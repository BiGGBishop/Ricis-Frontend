"use client";

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HomeSidebar from "./HomeSidebar";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }) => {
  const [showHomeSidebar, setShowHomeSidebar] = useState(false);
  const pathname = usePathname();
  const isContactUs = pathname === "/contact";
  console.log(pathname)

  return (
    <>
      {showHomeSidebar && (
        <HomeSidebar setShowHomeSidebar={setShowHomeSidebar} />
      )}
      <div>
        <Header />
        <Navbar setShowHomeSidebar={setShowHomeSidebar} />
        {children}
        {!isContactUs && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
