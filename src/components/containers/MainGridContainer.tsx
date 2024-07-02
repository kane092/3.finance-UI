import React, { ReactNode, useState, UIEvent, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import classNames from "classnames";

import Header from "components/Header/Header";
import LeftNavbar from "components/LeftNavbar/LeftNavbar";
import RightNavbar from "components/RightNavbar/RightNavbar";
import WalletConnectModal from "components/WalletConnectModal";

import useProgressiveImage from "hooks/useProgressiveImage";

import { RootState } from "store/store";

import BackgroundLPsCrosshairsOnload from "assets/images/background-lps-crosshairs-onload.png";
import BackgroundLPsInsidering from "assets/images/background-lps-insidering.png";
import BackgroundLPsOutsidering from "assets/images/background-lps-outsidering.png";
import BackgroundMissionWorld from "assets/images/background-mission-world.png";
import BackgroundWealthWorld from "assets/images/background-wealth-world.png";
import BackgroundWorkWorld from "assets/images/background-work-world.png";
import BackgroundCommunityWorld from "assets/images/background-community-world.png";
import PlaceholderAppBackgroundImg from "assets/images/background-lp-min.png";
import SourceAppBackgroundImg from "assets/images/background-lp.png";

export default function MainGridContainer({
  children,
}: {
  children: ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const loaded = useProgressiveImage(SourceAppBackgroundImg);

  const [showHeaderSticky, setShowHeaderSticky] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );
  const location = useLocation();
  //   const leftNavbarShow = useSelector(
  //     (state: RootState) => state.navbar.leftNavbarShow
  //   );
  //   const rightNavbarShow = useSelector(
  //     (state: RootState) => state.navbar.rightNavbarShow
  //   );
  const [leftNavbarGrid, setLeftNavbarGrid] = useState(0);
  const [bodyContentGrid, setBodyContentGrid] = useState(12);

  useEffect(() => {
    if (location.pathname == "/") {
      setLeftNavbarGrid(0);
      setBodyContentGrid(12);
      return;
    }
    switch (leftNavbarShow) {
      case "Opened":
        setLeftNavbarGrid(4);
        setBodyContentGrid(8);
        return;
      case "Collapsed":
        setLeftNavbarGrid(1);
        setBodyContentGrid(10);
        return;
      case "Minimized":
        switch (rightNavbarShow) {
          case "Opened":
            setLeftNavbarGrid(1);
            setBodyContentGrid(8);
            return;
          case "Minimized":
            setLeftNavbarGrid(1);
            setBodyContentGrid(10);
            return;
        }
        return;
    }
  }, [location, leftNavbarShow, rightNavbarShow]);

  const handleUIEvent = (event: UIEvent<HTMLDivElement>) => {
    if (ref.current?.scrollTop && ref.current?.scrollTop > 120) {
      setShowHeaderSticky(true);
    } else {
      setShowHeaderSticky(false);
    }
  };

  useEffect(() => {
    const onPageLoad = () => {
      setIsPageLoaded(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  //   useEffect(() => {
  //     // if (location.pathname == "/") {
  //     //   setLeftNavbarGrid(0);
  //     //   setBodyContentGrid(12);
  //     //   return;
  //     // }
  //     // switch (leftNavbarShow) {
  //     //   case "Opened":
  //     //     setLeftNavbarGrid(4);
  //     //     setBodyContentGrid(8);
  //     //     return;
  //     //   case "Collapsed":
  //     //     setLeftNavbarGrid(1);
  //     //     setBodyContentGrid(10);
  //     //     return;
  //     //   case "Minimized":
  //     //     switch (rightNavbarShow) {
  //     //       case "Opened":
  //     //         setLeftNavbarGrid(1);
  //     //         setBodyContentGrid(8);
  //     //         return;
  //     //       case "Minimized":
  //     //         setLeftNavbarGrid(1);
  //     //         setBodyContentGrid(10);
  //     //         return;
  //     //     }
  //     //     return;
  //     // }
  //   }, [location, leftNavbarShow, rightNavbarShow]);

  return (
    <div
      style={{
        backgroundImage: `url(${loaded || PlaceholderAppBackgroundImg})`,
      }}
      className={classNames(
        "App",
        location.pathname === "/" ? "App-LP" : "",
        location.pathname === "/mission" ||
          location.pathname === "/wealth" ||
          location.pathname === "/work" ||
          location.pathname === "/community"
          ? "App-LPs"
          : ""
      )}
      onScroll={handleUIEvent}
      ref={ref}
    >
      {(location.pathname === "/mission" ||
        location.pathname === "/wealth" ||
        location.pathname === "/work" ||
        location.pathname === "/community") && (
        <>
          <div className="w-screen h-screen flex justify-center items-center fixed z-[12]">
            <img
              loading="lazy"
              alt=""
              className="fixed transition-all duration-900"
              src={BackgroundLPsOutsidering}
              style={
                location.pathname === "/mission"
                  ? { transform: "rotate(0deg)" }
                  : location.pathname === "/wealth"
                  ? { transform: "rotate(135deg)" }
                  : location.pathname === "/work"
                  ? { transform: "rotate(225deg)" }
                  : { transform: "rotate(90deg)" }
              }
            />
            <img
              loading="lazy"
              alt=""
              className="fixed transition-all duration-900 opacity-80"
              src={BackgroundLPsInsidering}
              style={
                location.pathname === "/mission"
                  ? { transform: "rotate(0deg)" }
                  : location.pathname === "/wealth"
                  ? { transform: "rotate(-45deg)" }
                  : location.pathname === "/work"
                  ? { transform: "rotate(-135deg)" }
                  : { transform: "rotate(-270deg)" }
              }
            />
            <img
              loading="lazy"
              alt=""
              className="fixed"
              src={
                location.pathname === "/mission"
                  ? BackgroundMissionWorld
                  : location.pathname === "/wealth"
                  ? BackgroundWealthWorld
                  : location.pathname === "/work"
                  ? BackgroundWorkWorld
                  : BackgroundCommunityWorld
              }
            />
            <img
              loading="lazy"
              src={BackgroundLPsCrosshairsOnload}
              className="fixed mt-[38px] ml-[38px]"
              alt=""
            />
            {/* <img loading="lazy" src={BackgroundLPsGrid} className='fixed' alt='' /> */}
          </div>
        </>
      )}

      {
        // Do not show header with coming soon page
        location.pathname !== "/" && (
          <Header showHeaderSticky={showHeaderSticky} />
        )
      }

      {
        // Do not show leftNavbar on landing page
        location.pathname !== "/" && <LeftNavbar />
      }

      <hr className="w-full fixed top-[80px] z-[13] border-[#A7A8AB]/[0.22]" />

      <Grid
        container
        className={`min-h-screen duration-900 ${
          location.pathname !== "/" ? "bg-mask" : ""
        }`}
      >
        <Grid item sm={0} md={leftNavbarGrid} className="duration-900" />
        {/* <Grid item sm={12} md={bodyContentGrid} className='App-Content mt-[90px!important] duration-900'> */}
        <Grid
          item
          sm={12}
          md={bodyContentGrid}
          className={
            !isPageLoaded
              ? "App-Content mt-[90px!important]"
              : "App-Content mt-[90px!important] duration-900"
          }
        >
          {children}
        </Grid>
      </Grid>

      <RightNavbar />

      {/* <Footer /> */}

      <WalletConnectModal />
      {/* {walletConnectModalShow && <WalletConnectModal />} */}
    </div>
  );
}
