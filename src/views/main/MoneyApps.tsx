import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Unstable_Grid2";

import { RootState } from "store/store";
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected,
  // updateLeftNavbarGrid,
  // updateBodyContentGrid,
} from "store/actions/navbarAction";

import ArrowRight from "assets/images/arrow-right.png";
import ServicesApp from "assets/images/servicesApp.png";
import StrategiesApp from "assets/images/strategiesApp.png";
import UtilitiesApp from "assets/images/utilitiesApp.png";
import "assets/scss/MoneyApps.scss";
import classNames from "classnames";
import LightToolTip from "components/LightToolTip";
import { useEffect } from "react";

const moneyApps = [
  {
    name: "Services",
    icon: ServicesApp,
    content:
      "Do you offer a service that accepts crypto? Contact the team to be listed here.",
    toolTip:
      "If you specialize in the service sector and accept Crypto as payment, you can apply to be listed here.",
  },
  {
    name: "Strategies",
    icon: StrategiesApp,
    content:
      "Do you offer crypto strategies? Contact the team to be listed here.",
    toolTip:
      "If you specialize in innovative ways of generating yield with Crypo, you can apply to be listed here.",
  },
  {
    name: "Utilities",
    icon: UtilitiesApp,
    content:
      "Do you offer a utility that accepts crypto? Contact the team to be listed here.",
    toolTip:
      "If you specialize in the utility sector to leverage additional benefits using Crypto, you can apply to be listed here.",
  },
];

export default function MoneyApps() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );

  // useEffect(() => {
  //   switch (leftNavbarShow) {
  //     case "Opened":
  //       dispatch(updateLeftNavbarGrid(4));
  //       dispatch(updateBodyContentGrid(8));
  //       break;
  //     case "Collapsed":
  //       dispatch(updateLeftNavbarGrid(1));
  //       dispatch(updateBodyContentGrid(10));
  //       break;
  //     case "Minimized":
  //       switch (rightNavbarShow) {
  //         case "Opened":
  //           dispatch(updateLeftNavbarGrid(1));
  //           dispatch(updateBodyContentGrid(8));
  //           break;
  //         case "Minimized":
  //           dispatch(updateLeftNavbarGrid(1));
  //           dispatch(updateBodyContentGrid(10));
  //           break;
  //       }
  //       break;
  //   }
  // }, []);

  return (
    <div
      className={classNames(
        "MoneyApps bottom-animation",
        rightNavbarShow === "Opened"
          ? "mx-[10px] md:mx-[30px]"
          : leftNavbarShow === "Opened"
          ? "ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px]"
          : "mx-[10px] md:mx-[70px]"
      )}
    >
      <div className="flex justify-between">
        <h1>Money Apps</h1>
        {walletConnected === "Connected" && (
          <p
            className="flex items-center text-[#00FFF0] cursor-pointer"
            onClick={() => {
              dispatch(updateRightNavbarTabSelected("Settings"));
              dispatch(updateRightNavbarSubTabSelected("Help"));
              dispatch(updateRightNavbarShow("Opened"));
              // if (leftNavbarShow === "Minimized") {
              // dispatch(updateLeftNavbarGrid(1));
              // dispatch(updateBodyContentGrid(8));
              // }
            }}
          >
            Settings
            <img
              loading="lazy"
              src={ArrowRight}
              className="w-[14px] h-[12px] ml-[5px]"
              alt=""
            />
          </p>
        )}
      </div>
      <Grid xs={12}>
        <hr className="mb-[22px] mt-[6px]" />
      </Grid>
      {moneyApps.map((moneyApp, index) => {
        return (
          <Grid
            key={`moneyApp-${index}`}
            container
            spacing={2}
            className="text-[#00FFF0]"
          >
            <Grid xs={12} className="text-white flex mb-[10px]">
              {moneyApp.name}:
              <LightToolTip title={moneyApp.toolTip}></LightToolTip>
            </Grid>
            <Grid
              container
              xs={12}
              spacing={2}
              className="flex items-center border-dashed border-[1px] border-[#63717A] rounded-[9px] p-0 mb-[20px]"
              sx={{ margin: "0px 0px 30px 0px" }}
            >
              <Grid xs={4} md={3} className="text-[#63717A] flex items-center">
                <img
                  loading="lazy"
                  src={moneyApp.icon}
                  className="mr-[10px]"
                  alt=""
                />
                Add services
              </Grid>
              <Grid xs={8} md={9}>
                {moneyApp.content}
              </Grid>
              {/* <Grid xs={6} className='hidden md:block'>{moneyApp.content}</Grid> */}
              {/* <Grid xs={6} md={3}>
                <p className='flex items-center justify-end cursor-pointer'>
                  Prototype
                  <img loading="lazy" src ={ArrowRight} className='ml-[5px] w-[14px] h-[12px]' alt='' />
                </p>
              </Grid> */}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
