import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../commonComponents/navbar";
import SideBar from "../../commonComponents/sidebar";

const OutletComponent = (props) => {
  const [open, setOpen] = useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpen(true);
  };

  return (
    <>
      <Navbar open={open} handleDrawer={handleDrawer} />

      <div
        style={{ display: "flex", flexDirection: "row", background: "#f5f7fb" }}
      >
        <SideBar
          open={open}
          handleDrawer={handleDrawer}
          handleDrawerClose={handleDrawerClose}
        />

        <Outlet />
      </div>
    </>
  );
};

export default OutletComponent;
