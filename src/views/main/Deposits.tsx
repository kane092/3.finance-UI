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
  updateLeftNavbarShow,
} from "store/actions/navbarAction";

import type { FieldType } from "types/types";

import { getFieldLP } from "utils/utils";

import Field from "components/Field";
import PossibleLiquidityField from "components/PossibleLiquidityField";
import SpecialField from "components/SpecialField";
import MorePools from "components/MorePools";

import ArrowRight from "assets/images/arrow-right.png";
// import FilterIcon from 'assets/images/filter.png';
// import SearchIcon from 'assets/images/search.png';
import "assets/scss/Deposits.scss";
import LightToolTip from "components/LightToolTip";
import { useLocation, useParams } from "react-router-dom";
import {
  updateFieldSelected,
  updatePathName,
} from "store/actions/globalAction";

const emptyField: FieldType = {
  name: "",
  type: "",
};

export default function Deposits() {
  const dispatch: Dispatch<any> = useDispatch();
  // const location = useLocation()
  const { search } = useLocation();
  const { testvalue } = useParams();
  const [showLiquidDeposits, setShowLiquidDeposits] = useState(false);
  const [myLiquidDepositsCount, setMyLiquidDepositsCount] = useState(0);
  const [possibleLiquidDepositsCount, setPossibleLiquidDepositsCount] =
    useState(0);
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );
  const subTabSelected = useSelector(
    (state: RootState) => state.navbar.rightNavbarSubTabSelected
  );
  const nftSelected = useSelector(
    (state: RootState) => state.navbar.rightNavbarNFTSelected
  );
  const maxValue = useSelector(
    (state: RootState) => state.navbar.rightNavbarMaxValue
  );
  const leftNavbarPageSelectedHistory = useSelector(
    (state: RootState) => state.navbar.leftNavbarPageSelectedHistory
  );
  let tmp = 0;
  let specialFieldFlag = false;
  let animClass = "";
  const historyLen = leftNavbarPageSelectedHistory.length;
  leftNavbarPageSelectedHistory[historyLen - 1] >
    leftNavbarPageSelectedHistory[historyLen - 3] &&
    (animClass = "bottom-animation");
  leftNavbarPageSelectedHistory[historyLen - 1] <
    leftNavbarPageSelectedHistory[historyLen - 3] &&
    (animClass = "top-animation");

  const showSpecialField = (field: FieldType) => {
    if (rightNavbarShow !== "Opened") return false;
    if (walletConnected !== "Connected") return false;
    if (field.type !== "3FiCollateral") return false;

    if (
      (subTabSelected === "NFTs" && fiTVL && curveTVL) ||
      (subTabSelected === "Merge" && maxValue > 0)
    ) {
      /**
       * Do not show special field if the NFT has value
       */
      let flag = false;
      if (
        field.depositsFullName === "3Fi NFTs - " + nftSelected.name &&
        !field.depositsLP
      ) {
        flag = true;
        specialFieldFlag = true;
      }
      return flag;
    }
    return false;
  };

  useEffect(() => {
    if (new URLSearchParams(search).get("from") === "Dashboard") {
      fieldData.filter((field: FieldType) => {
        if (field.symbol === "3FiToken") {
          dispatch(updateFieldSelected(field));
          dispatch(updateRightNavbarTabSelected("Actions"));
          dispatch(updateRightNavbarSubTabSelected("NFTs"));
          dispatch(updateLeftNavbarShow("Minimized"));
          dispatch(updateRightNavbarShow("Opened"));
          // dispatch(updateLeftNavbarGrid(1));
          // dispatch(updateBodyContentGrid(8));
          dispatch(updatePathName("/deposits"));
        }
      });
    } else {
      // switch (leftNavbarShow) {
      //   case "Opened":
      //     dispatch(updateLeftNavbarGrid(4));
      //     dispatch(updateBodyContentGrid(8));
      //     break;
      //   case "Collapsed":
      //     dispatch(updateLeftNavbarGrid(1));
      //     dispatch(updateBodyContentGrid(10));
      //     break;
      //   case "Minimized":
      //     switch (rightNavbarShow) {
      //       case "Opened":
      //         dispatch(updateLeftNavbarGrid(1));
      //         dispatch(updateBodyContentGrid(8));
      //         break;
      //       case "Minimized":
      //         dispatch(updateLeftNavbarGrid(1));
      //         dispatch(updateBodyContentGrid(10));
      //         break;
      //     }
      //     break;
      // }
    }
  }, []);

  useEffect(() => {
    let tmp = fieldData.filter((field: FieldType) => {
      return (
        field.type === "OtherFields" && field.depositsFlag && field.depositsLP
      );
    });
    setMyLiquidDepositsCount(tmp.length);

    tmp = fieldData.filter((field: FieldType) => {
      return (
        field.type === "OtherFields" && field.depositsFlag && !field.depositsLP
      );
    });
    setPossibleLiquidDepositsCount(tmp.length);
  }, [fieldData]);

  return (
    <div
      className={classNames(
        "Deposits p-[10px]",
        rightNavbarShow === "Opened"
          ? "mx-[10px] md:mx-[30px]"
          : leftNavbarShow === "Opened"
          ? "ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px] text-[10px]"
          : leftNavbarShow === "Collapsed"
          ? "mx-[10px] md:ml-[100px] md:mr-[70px] text-[10px]"
          : "mx-[10px] md:ml-[100px] md:mr-[70px] text-[10px]",
        animClass
      )}
    >
      <div className="flex justify-between">
        <h1>Deposits</h1>
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
          <p className="text-[18px] hidden md:block">Pool iD</p>
          <p className="text-[18px] text-[#C3D6E2] block md:hidden">Pool</p>
          <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
            Symbol and name
          </span>
        </Grid>
        <Grid xs={4} md={4}>
          <p className="text-[18px] hidden md:block">Rates and emissions</p>
          <p className="text-[18px] text-[#C3D6E2] block md:hidden">APR</p>
          <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
            Annualised percentages
          </span>
        </Grid>
        <Grid xs={4} md={5}>
          <p className="text-[18px] hidden md:block">Deposit values</p>
          <p className="text-[18px] text-[#C3D6E2] block md:hidden">Deposits</p>
          <span className="text-[14px] leading-[18px] text-[#C3D6E2] hidden md:block">
            {walletConnected === "Connected"
              ? "Total values"
              : "Total value locked (TVL)"}
          </span>
        </Grid>
        <Grid xs={12}>
          <hr />
        </Grid>
        <div className="w-full relative mt-[10px]">
          <Grid xs={12} className="w-full text-[20px]">
            <span className="leading-[28px]">
              3Fi Collateral:
              <LightToolTip title="3.Finance has 2 types of collateral:<br>1. 3Fi tokens. Mint these to gain governance rights.<br>2. 3Fi NFTs. Mint these to gain access to advanced features and protocol revenue share."></LightToolTip>
            </span>
          </Grid>
          {fieldData
            .filter((field: FieldType) => {
              return field.type === "3FiCollateral";
            })
            .map(
              (field: FieldType, index: number) =>
                showSpecialField(field) && (
                  <Grid
                    key={`3FiCollateral-${index}`}
                    className="py-[3px!important]"
                  >
                    <SpecialField field={emptyField} />
                  </Grid>
                )
            )}
          {fieldData
            .filter((field: FieldType) => {
              return field.type === "3FiCollateral";
            })
            .map((field: FieldType, index: number) => {
              const isNFT =
                field.depositsFullName &&
                field.depositsFullName.includes("3Fi NFTs");
              if (isNFT && !field.depositsLP) tmp = tmp - 1;
              tmp = tmp + 1;

              return (
                <Grid
                  key={`3FiCollateral-${index}`}
                  className={
                    isNFT && !field.depositsLP
                      ? "Field-Hidden"
                      : "py-[0px!important]"
                  }
                >
                  <Field
                    key={field.name}
                    field={field}
                    fieldFlag={1}
                    firstField={specialFieldFlag && tmp === 1}
                  />
                </Grid>
              );
            })}
        </div>
        <div className="w-full relative mt-[17px]">
          <Grid xs={12} className="w-full text-[20px]">
            <span className="leading-[28px]">
              Compound deposits:
              <LightToolTip title="These are 3.Finance’s first C.D.Ps.<br>Compound Deposit Pools are auto-compounding: fed by the emission signals you set. You may also use your C.D.P receipts to mint collateral."></LightToolTip>
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
                    fieldFlag={1}
                    firstField={false}
                  />
                </Grid>
              );
            })}
        </div>
        {walletConnected === "Connected" && myLiquidDepositsCount !== 0 && (
          <div className="w-full relative mt-[17px]">
            <Grid xs={12} className="w-full text-[20px]">
              <span className="leading-[28px]">
                My liquid deposits:
                <LightToolTip title="Liquid Deposit Pools do not auto-compound. Instead, emissions from these pools are used to boost your C.D.P positions. See ‘<b>Emissions</b>’ to learn more."></LightToolTip>
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
                      fieldFlag={1}
                      firstField={false}
                    />
                  </Grid>
                );
              })}
          </div>
        )}
        {walletConnected === "Connected" &&
          possibleLiquidDepositsCount !== 0 && (
            <div className="w-full relative mt-[17px]">
              <Grid xs={12} className="w-full text-[20px]">
                <span className="leading-[28px]">Liquidity I can deposit:</span>
              </Grid>
              {fieldData
                .filter((field: FieldType) => {
                  return (
                    field.type === "OtherFields" &&
                    field.depositsFlag &&
                    !field.depositsLP
                  );
                })
                .map((field: FieldType, index: number) => {
                  return (
                    <Grid
                      key={`CanOtherFields-${index}`}
                      className="py-[0px!important]"
                    >
                      <PossibleLiquidityField
                        // key={`${field.name}-${index}`}
                        field={field}
                        fieldFlag={1}
                        firstField={false}
                      />
                    </Grid>
                  );
                })}
            </div>
          )}
        <div className="w-full relative mt-[17px]">
          <Grid xs={12} className="w-full filter-bar text-[20px]">
            <span className="leading-[28px]">
              {walletConnected === "Connected" &&
              (myLiquidDepositsCount !== 0 || possibleLiquidDepositsCount !== 0)
                ? "Other liquid opportunities:"
                : "Liquid deposits:"}
              {(walletConnected === "Disconnected" ||
                myLiquidDepositsCount === 0) && (
                <LightToolTip title="Liquid Deposit Pools do not auto-compound. Instead, emissions from these pools are used to boost your C.D.P positions. See ‘<b>Emissions</b>’ to learn more."></LightToolTip>
              )}
            </span>
            {/* <div className='flex'>
              <img loading="lazy"
                alt=''
                src={SearchIcon}
                className=''
              />
              <img loading="lazy"
                alt=''
                src={FilterIcon}
                className='pl-[15px]'
              />
            </div> */}
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
                if (walletConnected === "Connected")
                  return field.type === "OtherFields" && !field.depositsFlag;
                else return field.type === "OtherFields";
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
                      fieldFlag={1}
                      firstField={false}
                    />
                  </Grid>
                );
              })}
        </div>
        {/* {
          depositData.map((deposit: DepositData) => {
            let tmp = 0;
            return (
              <div key={deposit.type} className='w-full relative mt-[10px]'>
                <Grid xs={12} className='w-full text-[20px]'>
                  <span className='leading-[28px]'>{deposit.type}</span>
                </Grid>
                {showSpecialField(deposit) &&
                <SpecialField field={emptyField} />}
                {deposit.type == "Other liquid opportunities:" &&
                <MorePools
                  showLiquidDeposits={showLiquidDeposits}
                  setShowLiquidDeposits={setShowLiquidDeposits}
                />}
                {(deposit.type != "Other liquid opportunities:" || (deposit.type == "Other liquid opportunities:" && showLiquidDeposits)) &&
                  deposit.fields.map((field) => {
                    const isNFT = (field.fieldFullName.includes("3Fi NFTs"));
                    if (isNFT && !field.fieldLP) tmp = tmp - 1;
                    tmp = tmp + 1;
                    return (
                      <Field
                        key={field.fieldFullName}
                        field={field}
                        firstField={showSpecialField(deposit) && tmp == 1}
                      />
                    )
                  })
                }
              </div>
            )
          })
        } */}
      </Grid>
    </div>
  );
}
