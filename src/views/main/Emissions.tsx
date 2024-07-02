import { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import Grid from "@mui/material/Unstable_Grid2";

import { RootState } from "store/store";
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected,
  // updateLeftNavbarGrid,
  // updateBodyContentGrid,
} from "store/actions/navbarAction";

import type { FieldType } from "types/types";
import { getCRVWalletStatus } from "utils/utils";

import Toggle3Button from "components/ToggleButton/Toggle3Button";
import Field from "components/Field";
import SpecialField from "components/SpecialField";
import MorePools from "components/MorePools";

import ArrowRight from "assets/images/arrow-right.png";
import "assets/scss/Deposits.scss";
import "assets/scss/Emissions.scss";
import LightToolTip from "components/LightToolTip";

export default function Emissions() {
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
  const leftNavbarPageSelectedHistory = useSelector(
    (state: RootState) => state.navbar.leftNavbarPageSelectedHistory
  );
  const [showLiquidDeposits, setShowLiquidDeposits] = useState(false);
  const [myLiquidDepositsCount, setMyLiquidDepositsCount] = useState(0);
  const [marginBottomFlag, setMarginBottomFlag] = useState(false);

  let animClass = "";
  const historyLen = leftNavbarPageSelectedHistory.length;
  leftNavbarPageSelectedHistory[historyLen - 1] >
    leftNavbarPageSelectedHistory[historyLen - 3] &&
    (animClass = "bottom-animation");
  leftNavbarPageSelectedHistory[historyLen - 1] <
    leftNavbarPageSelectedHistory[historyLen - 3] &&
    (animClass = "top-animation");

  useEffect(() => {
    let tmp = 0;
    fieldData
      .filter((field: FieldType) => {
        if (
          field.type === "OtherFields" &&
          field.depositsFlag &&
          field.depositsLP
        )
          tmp++;
        return field.type === "3FiCollateralWallets";
      })
      .map((field: FieldType) => {
        if (!field.emissionsBalance) {
          setMarginBottomFlag(true);
        }
      });
    setMyLiquidDepositsCount(tmp);
  }, [fieldData]);

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
        "Emissions p-[10px]",
        rightNavbarShow === "Opened"
          ? "mx-[10px] md:mx-[30px]"
          : leftNavbarShow === "Opened"
          ? "ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px] text-[10px]"
          : "mx-[10px] md:mx-[70px] text-[10px]",
        animClass
      )}
    >
      <div className="flex justify-between">
        <h1>Emissions</h1>
        {walletConnected === "Connected" && (
          <p
            className="flex items-center text-[#00FFF0] text-[14px] cursor-pointer mb-[0px] md:mb-[10px] xl:mb-[10px] 2xl:mb-[10px] 3xl:mb-[10px]"
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
      <Grid container spacing={2}>
        <Grid xs={4} md={3}>
          <p className="text-[18px] hidden md:block">Token iDs</p>
          <p className="text-[18px] text-[#C3D6E2] block md:hidden">Token</p>
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
          <p className="text-[18px] text-[#C3D6E2] block md:hidden">T.C.E</p>
          <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
            Value accrued in USD
          </span>
        </Grid>
        <Grid xs={4} md={5}>
          <p className="text-[18px] hidden md:block">Rates</p>
          <p className="text-[18px] text-[#C3D6E2] block md:hidden">Rates</p>
          <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
            Annualized percentages
          </span>
        </Grid>
        <Grid xs={12}>
          <hr />
        </Grid>
        <Grid xs={12}>
          <Toggle3Button />
        </Grid>
        <div
          className={classNames(
            "w-full relative",
            marginBottomFlag ? "mb-[0px]" : ""
          )}
        >
          <Grid xs={12} className="w-full text-[20px]">
            <span className="leading-[28px]">
              3Fi Collateral wallets:
              <LightToolTip title="Balances reflected here come from harvesting NFTs and may be claimed or distributed to your Money Apps.<br>For advanced builders, auto-distribution is also possible."></LightToolTip>
            </span>
          </Grid>
          {fieldData
            .filter((field: FieldType) => {
              return field.type === "3FiCollateralWallets";
            })
            .map((field: FieldType, index: number) => {
              return (
                <Grid key={`3FiCollateral-${index}`}>
                  {walletConnected === "Connected" &&
                  getCRVWalletStatus(fieldData) ? (
                    <Field
                      key={field.name}
                      field={field}
                      fieldFlag={2}
                      firstField={false}
                    />
                  ) : (
                    <SpecialField field={field} />
                  )}
                </Grid>
              );
            })}
        </div>
        <div className="w-full relative mt-[10px]">
          <Grid xs={12} className="w-full text-[20px]">
            <span className="leading-[28px]">
              Compound emissions:
              <LightToolTip title="These emissions and any white-listed wrapped variants will be added to your C.D.P deposit balances.<br>Auto-compounding will begin after your first harvest."></LightToolTip>
            </span>
          </Grid>
          {fieldData
            .filter((field: FieldType) => {
              return field.type === "CompoundFields";
            })
            .map((field: FieldType, index: number) => {
              return (
                <Grid
                  key={`CompoundFields-${index}`}
                  className="py-[0px!important]"
                >
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={2}
                    firstField={false}
                  />
                </Grid>
              );
            })}
        </div>
        {walletConnected === "Connected" && myLiquidDepositsCount !== 0 && (
          <div className="w-full relative mt-[10px]">
            <Grid xs={12} className="w-full text-[20px]">
              <span className="leading-[28px]">
                My liquid emissions
                <LightToolTip title="Harvest these emissions to signal how you wish them to be used to boost C.D.P deposits. You only need do this once, unless you choose to amend your signal."></LightToolTip>
              </span>
            </Grid>
            {fieldData
              .filter((field: FieldType) => {
                return (
                  field.type === "OtherFields" &&
                  field.depositsFlag &&
                  field.depositsLP
                );
              })
              .map((field: FieldType, index: number) => {
                return (
                  <Grid
                    key={`MyOtherFields-${index}`}
                    className="py-[0px!important]"
                  >
                    <Field
                      key={field.name}
                      field={field}
                      fieldFlag={2}
                      firstField={false}
                    />
                  </Grid>
                );
              })}
          </div>
        )}
        <div className="w-full relative mt-[10px]">
          <Grid xs={12} className="w-full text-[20px]">
            <span className="leading-[28px]">
              {walletConnected === "Connected" && myLiquidDepositsCount !== 0
                ? "Other liquid opportunities:"
                : "Liquid emissions:"}
              {(walletConnected === "Disconnected" ||
                myLiquidDepositsCount === 0) && (
                <LightToolTip title="Harvest these emissions to signal how you wish them to be used to boost C.D.P deposits. You only need do this once, unless you choose to amend your signal."></LightToolTip>
              )}
            </span>
          </Grid>
          <Grid xs={12} className="py-[0px!important]">
            <MorePools
              showLiquidDeposits={showLiquidDeposits}
              setShowLiquidDeposits={setShowLiquidDeposits}
            />
          </Grid>
          {showLiquidDeposits &&
            fieldData
              .filter((field: FieldType) => {
                return field.type === "OtherFields" && !field.depositsFlag;
              })
              .map((field: FieldType, index: number) => {
                return (
                  <Grid
                    key={`OtherFields-${index}`}
                    className="py-[0px!important]"
                  >
                    <Field
                      key={field.name}
                      field={field}
                      fieldFlag={2}
                      firstField={false}
                    />
                  </Grid>
                );
              })}
        </div>
      </Grid>
    </div>
  );
}
