import { useState, useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

import classNames from "classnames";

import type { Page, FieldType } from "../../types/types";

import { RootState } from "../../store/store";
import {
  updateFieldSelected,
  updatePathName,
} from "../../store/actions/globalAction";
import {
  updateLeftNavbarShow,
  updateLeftNavbarPageSelected,
  updateRightNavbarShow,
  // updateLeftNavbarGrid,
  // updateBodyContentGrid,
} from "../../store/actions/navbarAction";

import Details from "./Details";

import NavbarLogo from "../../assets/images/navbar-logo.png";
import NavbarShow from "../../assets/images/navbar-show.png";
import NavbarHide from "../../assets/images/navbar-hide.png";
import NavbarClose from "../../assets/images/navbar-close.png";
import "../../assets/scss/LeftNavbar.scss";
import useCheckMobileScreen from "../../hooks/useCheckMobileScreen";

const pages: Page[][] = [
  ["Mission", "Wealth", "Work", "Community"],
  ["Dashboard", "Deposits", "Emissions", "MoneyApps"],
  ["Gallery", "Performance", "Analytics", "Subscriptions"],
];

const emptyField: FieldType = {
  name: "",
  type: "",
};

export default function LeftNavbar() {
  const isMobile = useCheckMobileScreen();
  const dispatch: Dispatch<any> = useDispatch();
  const initLeftNavbar = () => {
    /**
     * Prevent default leftNavbar select when refresh on the other pages
     */
    switch (window.location.pathname) {
      case "/mission":
        dispatch(updateLeftNavbarPageSelected("Mission"));
        break;
      case "/wealth":
        dispatch(updateLeftNavbarPageSelected("Wealth"));
        break;
      case "/work":
        dispatch(updateLeftNavbarPageSelected("Work"));
        break;
      case "/community":
        dispatch(updateLeftNavbarPageSelected("Community"));
        break;
      case "/dashboard":
        dispatch(updateLeftNavbarPageSelected("Dashboard"));
        setPageArrayIndex(1);
        break;
      case "/deposits":
        dispatch(updateLeftNavbarPageSelected("Deposits"));
        setPageArrayIndex(1);
        break;
      case "/emissions":
        dispatch(updateLeftNavbarPageSelected("Emissions"));
        setPageArrayIndex(1);
        break;
      case "/moneyapps":
        dispatch(updateLeftNavbarPageSelected("MoneyApps"));
        setPageArrayIndex(1);
        break;
      case "/nft/gallery":
        dispatch(updateLeftNavbarPageSelected("Gallery"));
        setPageArrayIndex(2);
        break;
      case "/nft/performance":
        dispatch(updateLeftNavbarPageSelected("Performance"));
        setPageArrayIndex(2);
        break;
      case "/nft/analytics":
        dispatch(updateLeftNavbarPageSelected("Analytics"));
        setPageArrayIndex(2);
        break;
      case "/nft/subscriptions":
        dispatch(updateLeftNavbarPageSelected("Subscriptions"));
        setPageArrayIndex(2);
        break;
      default:
        dispatch(updateLeftNavbarPageSelected("LandingPage"));
        break;
    }
  };
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );
  const leftNavbarPageSelected = useSelector(
    (state: RootState) => state.navbar.leftNavbarPageSelected
  );
  const [pageArrayIndex, setPageArrayIndex] = useState(0);

  useEffect(() => {
    initLeftNavbar();
  });

  useEffect(() => {
    dispatch(updateRightNavbarShow("Minimized"));
    // if (leftNavbarShow === "Minimized") {
    //   dispatch(updateLeftNavbarGrid(1));
    //   dispatch(updateBodyContentGrid(10));
    // }
    dispatch(updateFieldSelected(emptyField));
  }, [dispatch, leftNavbarPageSelected]);

  return (
    <div
      className={classNames(
        "Navbar h-full z-[100] md:z-[12] fixed backdrop-blur-[17px] md:backdrop-blur-[8px]",
        leftNavbarShow === "Minimized"
          ? "translate-x-[calc(-100%)] md:translate-x-0 md:Navbar-Hide w-[calc(100%-10px)] md:w-[70px]"
          : "",
        leftNavbarShow === "Collapsed"
          ? "w-[calc(100%-10px)] md:w-1/12 table"
          : "",
        leftNavbarShow === "Opened" ? "w-[calc(100%-10px)] md:w-4/12" : ""
      )}
    >
      <div className="flex h-full w-full">
        <div className="py-0 w-full">
          <div className="hidden md:flex items-center min-h-[80px] h-[80px] ml-[22px] text-[24px] leading-[31px] font-[500]">
            <img loading="lazy" src={NavbarLogo} alt="" />
            <p
              className={
                leftNavbarShow !== "Minimized"
                  ? "ml-[5px] opacity-100 duration-300"
                  : "ml-[5px] opacity-0 duration-300"
              }
            >
              Finance
            </p>
          </div>

          <div className="flex justify-end mt-[40px] mr-[30px] mb-[70px] ml-[0px]">
            <img
              loading="lazy"
              src={NavbarClose}
              alt=""
              className="block md:hidden"
              onClick={() => {
                if (leftNavbarShow === "Minimized") {
                  /**
                   * Show LeftNavbar
                   * Minimize RightNavbar
                   */
                  dispatch(updateLeftNavbarShow("Opened"));
                  dispatch(updateRightNavbarShow("Minimized"));
                  // dispatch(updateLeftNavbarGrid(4));
                  // dispatch(updateBodyContentGrid(8));
                } else {
                  dispatch(updateLeftNavbarShow("Minimized"));
                  // switch (rightNavbarShow) {
                  //   case "Opened":
                  //     dispatch(updateLeftNavbarGrid(1));
                  //     dispatch(updateBodyContentGrid(8));
                  //     break;
                  //   case "Minimized":
                  //     dispatch(updateLeftNavbarGrid(1));
                  //     dispatch(updateBodyContentGrid(10));
                  //     break;
                  // }
                }
              }}
            />
            <img
              loading="lazy"
              src={leftNavbarShow !== "Minimized" ? NavbarHide : NavbarShow}
              onClick={() => {
                if (leftNavbarShow === "Minimized") {
                  /**
                   * Show LeftNavbar
                   * Minimize RightNavbar
                   */
                  dispatch(updateLeftNavbarShow("Opened"));
                  dispatch(updateRightNavbarShow("Minimized"));
                  dispatch(updateFieldSelected(emptyField));
                  // dispatch(updateLeftNavbarGrid(4));
                  // dispatch(updateBodyContentGrid(8));
                } else {
                  dispatch(updateLeftNavbarShow("Minimized"));
                  // switch (rightNavbarShow) {
                  //   case "Opened":
                  //     dispatch(updateLeftNavbarGrid(1));
                  //     dispatch(updateBodyContentGrid(8));
                  //     break;
                  //   case "Minimized":
                  //     dispatch(updateLeftNavbarGrid(1));
                  //     dispatch(updateBodyContentGrid(10));
                  //     break;
                  // }
                }
              }}
              className="hidden md:block cursor-pointer"
              alt=""
            />
          </div>

          <div
            className={classNames(
              "Navbar-Main flex justify-start ml-[30px] relative",
              leftNavbarShow === "Collapsed" ? "mr-[10px]" : "mr-[30px]"
            )}
          >
            <div className="flex pt-[4px] pb-[2px] fixed left-[30px]">
              <div
                className="w-[5px] min-w-[5px] opacity-50 bg-[#FFFFFF]/[0.31] backdrop-blur-[10px] br-[1px] br-solid br-[#D9D9D9]/[0.3]"
                style={{ height: "min(610px, 100vh - 190px)" }}
              />
              <div className="z-[10]">
                {pages[pageArrayIndex].map((page, index) => {
                  return (
                    <Link
                      to={"/" + page.toLowerCase()}
                      key={`0-${page}-${index}`}
                    >
                      <div
                        className={
                          leftNavbarPageSelected === page
                            ? "shadow-[0px_4px_rgba(0,0,0,0.25)] duration-1800 ml-[-10px] w-[15px] h-[15px] rounded-full cursor-pointer mb-[450px] bg-[white]"
                            : "shadow-[0px_4px_rgba(0,0,0,0.25)] duration-1800 ml-[-10px] w-[15px] h-[15px] rounded-full cursor-pointer mb-[30px] bg-[#00FFF0]"
                        }
                        style={
                          leftNavbarPageSelected === page
                            ? { marginBottom: "min(480px, 100vh - 320px)" }
                            : { marginBottom: "30px" }
                        }
                        onClick={() => {
                          dispatch(updateLeftNavbarPageSelected(page));
                        }}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div
              className={
                leftNavbarShow === "Minimized"
                  ? "Navbar-Main-Right ml-[30px] pointer-events-none"
                  : "Navbar-Main-Right ml-[30px]"
              }
            >
              {pages[pageArrayIndex].map((page, index) => {
                return (
                  <div key={`1-${page}-${index}`}>
                    <Link
                      to={
                        page === "Gallery" ||
                        page === "Analytics" ||
                        page === "Performance" ||
                        page === "Subscriptions"
                          ? "/nft/" + page.toLowerCase()
                          : "/" + page.toLowerCase()
                      }
                      onClick={(e) => {
                        if (
                          page === "Analytics" ||
                          page === "Performance" ||
                          page === "Subscriptions"
                        )
                          e.preventDefault();
                      }}
                    >
                      {page === "Analytics" ||
                      page === "Performance" ||
                      page === "Subscriptions" ? (
                        <Tooltip
                          title="For crypto culturalist’s who adore simplicity."
                          placement="right"
                          componentsProps={{
                            tooltip: {
                              sx: {
                                backgroundColor: "#FFFFFF",
                                color: "#111316",
                                fontSize: 11,
                                maxWidth: 180,
                                "& .MuiTooltip-arrow": { color: "#FFFFFF" },
                              },
                            },
                          }}
                          arrow
                        >
                          <p
                            className={classNames(
                              "text-[18px] cursor-pointer",
                              page === leftNavbarPageSelected
                                ? "text-white duration-300"
                                : "text-[#00FFF0]",
                              leftNavbarShow === "Minimized"
                                ? "opacity-0 duration-300"
                                : "opacity-100 duration-300",
                                "w-fit"
                            )}
                            style={
                              page === leftNavbarPageSelected
                                ? { marginBottom: "22px" }
                                : { marginBottom: "0" }
                            }
                          >
                            {page}
                          </p>
                        </Tooltip>
                      ) : (
                        <p
                          className={classNames(
                            "text-[18px] cursor-pointer",
                            page === leftNavbarPageSelected
                              ? "text-white duration-300"
                              : "text-[#00FFF0]",
                            leftNavbarShow === "Minimized"
                              ? "opacity-0 duration-300"
                              : "opacity-100 duration-300"
                          )}
                          onClick={() => {
                            if (page === "Gallery") {
                              if (isMobile) {
                                dispatch(updateLeftNavbarShow("Minimized"));
                                // dispatch(updateLeftNavbarGrid(1));
                                // dispatch(updateBodyContentGrid(10));
                              }
                              dispatch(updateLeftNavbarPageSelected(page));
                            } else {
                              if (isMobile) {
                                dispatch(updateLeftNavbarShow("Minimized"));
                                // switch (rightNavbarShow) {
                                //   case "Opened":
                                //     dispatch(updateLeftNavbarGrid(1));
                                //     dispatch(updateBodyContentGrid(8));
                                //     break;
                                //   case "Minimized":
                                //     dispatch(updateLeftNavbarGrid(1));
                                //     dispatch(updateBodyContentGrid(10));
                                //     break;
                                // }
                              }
                              dispatch(updateLeftNavbarPageSelected(page));
                            }
                          }}
                          style={
                            page === leftNavbarPageSelected
                              ? { marginBottom: "22px" }
                              : { marginBottom: "0" }
                          }
                        >
                          {page}
                        </p>
                      )}
                    </Link>
                    <Details
                      selected={leftNavbarPageSelected === page}
                      page={page}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={
            leftNavbarShow === "Opened"
              ? "min-w-[9px] w-[9px] bg-[#FFFFFF]/[0.1] border-r-[2px] border-r-[#D9D9D9]/[0.42]"
              : leftNavbarShow === "Minimized"
              ? "min-w-[2px] w-[2px] bg-[#FFFFFF]/[0.1] border-r-[2px] border-r-[#D9D9D9]/[0.42]"
              : "min-w-[9px] w-[9px] bg-[#FFFFFF]/[0.1] border-r-[2px] border-r-[#D9D9D9]/[0.42]"
          }
        />
      </div>
    </div>
  );
}
