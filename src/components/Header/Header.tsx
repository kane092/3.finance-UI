import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import Grid from "@mui/material/Unstable_Grid2";

import { RootState } from "../../store/store";
import {
  updateWalletConnected,
  updateWalletConnectModalShow,
} from "../../store/actions/globalAction";
import {
  // updateBodyContentGrid,
  // updateLeftNavbarGrid,
  updateLeftNavbarShow,
} from "../../store/actions/navbarAction";

import HeaderMenu from "../../assets/images/header-menu.png";
import HeaderLogo from "../../assets/images/navbar-logo.png";
import WalletMain from "../../assets/images/wallet-main.png";
import WalletMetaMask from "../../assets/images/wallet-metamask.png";
import "../../assets/scss/Header.scss";
import { getCRVWalletStatus } from "../../utils/utils";
import { FieldType } from "../../types/types";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type props = {
  showHeaderSticky: boolean;
};

export default function Header({ showHeaderSticky }: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );
  const location = useLocation();
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

  return (
    // <Grid container className='Header h-[80px] flex md:flex-col justify-between md:justify-end items-center'>
    <Grid
      container
      className={classNames(
        "Header h-[80px] items-center md:h-[80px] z-[11] bg-black md:bg-inherit duration-900",
        location.pathname === "/" ? "Header-LP" : "",
        location.pathname === "/mission" ||
          location.pathname === "/wealth" ||
          location.pathname === "/work" ||
          location.pathname === "/community"
          ? "Header-LPs"
          : ""
      )}
    >
      <Grid md={leftNavbarGrid} className="duration-900" />
      <Grid md={bodyContentGrid} className="hidden md:block duration-900">
        <div
          id="myHeader"
          className={classNames(
            "mt-[7px] mx-[10px] p-[10px] transition-opacity duration-300",
            rightNavbarShow === "Opened"
              ? "md:mx-[30px]"
              : leftNavbarShow === "Opened"
              ? "md:ml-[30px] md:mr-[70px]"
              : "md:mx-[70px]",
            showHeaderSticky ? "opacity-100" : "opacity-0"
          )}
        >
          {location.pathname === "/deposits" && (
            <Grid container spacing={2}>
              <Grid xs={4} md={3}>
                <p className="text-[18px] hidden md:block">Pool iD</p>
                <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
                  Symbol and name
                </span>
              </Grid>
              <Grid xs={4} md={4}>
                <p className="text-[18px] hidden md:block">
                  Rates and emissions
                </p>
                <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
                  Annualised percentages
                </span>
              </Grid>
              <Grid xs={4} md={5}>
                <p className="text-[18px] hidden md:block">Deposit values</p>
                <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
                  {walletConnected === "Connected"
                    ? "Total values"
                    : "Total value locked (TVL)"}
                </span>
              </Grid>
            </Grid>
          )}

          {location.pathname === "/emissions" && (
            <Grid container spacing={2}>
              <Grid xs={4} md={3}>
                <p className="text-[18px] hidden md:block">Token iDs</p>
                <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
                  Symbol and name
                </span>
              </Grid>
              <Grid xs={4} md={4}>
                {/* <p className='text-[18px] hidden md:block'>Total claimable emissions</p> */}
                <p className="text-[18px] hidden md:block">
                  {fieldData
                    .filter((field: FieldType) => {
                      return field.type === "3FiCollateralWallets";
                    })
                    .map((field: FieldType) => {
                      if (
                        walletConnected === "Connected" &&
                        field.emissionsBalance &&
                        field.emissionsBalance > 0 &&
                        getCRVWalletStatus(fieldData)
                      )
                        return "Signals & claimable emissions";
                      else return "Total claimable emissions";
                    })}
                </p>
                <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
                  Value accrued in USD
                </span>
              </Grid>
              <Grid xs={4} md={5}>
                <p className="text-[18px] hidden md:block">Rates</p>
                <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
                  Annualized percentages
                </span>
              </Grid>
            </Grid>
          )}
        </div>
      </Grid>
      <img
        loading="lazy"
        alt=""
        src={HeaderMenu}
        className="block md:hidden w-[20px] h-[14px] ml-[10px] mr-[calc(50vw-39px)] cursor-pointer"
        onClick={() => {
          dispatch(updateLeftNavbarShow("Opened"));
          // dispatch(updateLeftNavbarGrid(4));
          // dispatch(updateBodyContentGrid(8));
        }}
      />
      <img
        loading="lazy"
        src={HeaderLogo}
        alt=""
        className="w-[24px] h-[33px] block md:hidden"
      />
      <div className="Header-Connect-Wallet absolute top-[27px] md:top-[20px] right-[10px] md:right-[70px]">
        {walletConnected === "Disconnected" && location.pathname !== "/" && (
          <>
            <span
              className={classNames(
                location.pathname === "/mission" ||
                  location.pathname === "/wealth" ||
                  location.pathname === "/work" ||
                  location.pathname === "/community"
                  ? "hidden"
                  : "hidden md:block"
              )}
              onClick={() => {
                // Only occur with landing pages
                if (
                  location.pathname === "/mission" ||
                  location.pathname === "/wealth" ||
                  location.pathname === "/work" ||
                  location.pathname === "/community"
                ) {
                  dispatch(updateWalletConnectModalShow(true));
                }
                // Do not occur with landing pages
                if (
                  location.pathname !== "/mission" &&
                  location.pathname !== "/wealth" &&
                  location.pathname !== "/work" &&
                  location.pathname !== "/community"
                ) {
                  dispatch(updateWalletConnectModalShow(true));
                }
              }}
            >
              Connect Wallet
            </span>
            <span
              className="block md:hidden"
              onClick={() => {
                // Only occur with landing pages
                if (
                  location.pathname === "/mission" ||
                  location.pathname === "/wealth" ||
                  location.pathname === "/work" ||
                  location.pathname === "/community"
                ) {
                  dispatch(updateWalletConnectModalShow(true));
                }
                // Do not occur with landing pages
                if (
                  location.pathname !== "/mission" &&
                  location.pathname !== "/wealth" &&
                  location.pathname !== "/work" &&
                  location.pathname !== "/community"
                ) {
                  dispatch(updateWalletConnectModalShow(true));
                }
              }}
            >
              Connect
            </span>
          </>
        )}
        {walletConnected === "Connected" && (
          <div onClick={() => dispatch(updateWalletConnected("Disconnected"))}>
            <span className="Header-Connect-Wallet-Main">
              <img
                loading="lazy"
                src={WalletMain}
                alt=""
                className="w-[24px] h-[24px]"
              />
              <p
                className={classNames(showHeaderSticky ? "hidden" : "md:block")}
              >
                1,234,567.00
              </p>
            </span>
            <span className="Header-Connect-Wallet-Metamask">
              <img
                loading="lazy"
                src={WalletMetaMask}
                className="w-[24px] h-[24px]"
                alt=""
              />
              <p
                className={classNames(
                  showHeaderSticky ? "hidden" : "hidden md:block"
                )}
              >
                0x1234...5678
              </p>
            </span>
          </div>
        )}
      </div>
    </Grid>
  );
}
