import { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import {
//   updateBodyContentGrid,
//   updateLeftNavbarGrid,
  updateLeftNavbarPageSelected,
  updateLeftNavbarShow,
  updateRightNavbarShow,
  updateRightNavbarSubTabSelected,
  updateRightNavbarTabSelected,
} from "store/actions/navbarAction";

import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button/Button";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import DashboardNFTImg from "assets/images/dashboard-nft.png";

import nftsJsonData from "assets/data/nfts.json";
import type { NFTData, FieldType } from "types/types";
import { getFieldLP } from "utils/utils";
import NFT from "../../RightNavbar/Actions/NFT";
import "assets/scss/Content.scss";
import classNames from "classnames";
import NumberField from "../../NumberField";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip/Tooltip";

let nftsData = nftsJsonData as NFTData[];

export default function NFTWidget() {
  const dispatch: Dispatch<any> = useDispatch();
  const [curValue, setCurValue] = useState(1000000);
  const [ownedNFTCount, setOwnedNFTCount] = useState(0);
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);

  const textFieldStyle: React.CSSProperties[] = [
    {
      // Validated
      width: "100%",
      height: "59px",
      border: "1px solid #00FFF0",
      borderRadius: "9px",
      color: "white",
      fontFamily: "mabry_proregular",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "28px",
      textAlign: "right",
    },
    {
      // Not Validated
      width: "100%",
      height: "59px",
      border: "1px solid #00FFF0",
      borderRadius: "9px",
      color: "red",
      fontFamily: "mabry_proregular",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "28px",
      textAlign: "right",
    },
    {
      // Disabled
      width: "100%",
      height: "59px",
      border: "1px solid #00FFF0",
      borderRadius: "9px",
      color: "#63717A",
      fontFamily: "mabry_proregular",
      fontWeight: 400,
      fontSize: "20px",
      lineHeight: "28px",
      textAlign: "right",
    },
  ];

  const periods = [
    {
      name: "daily",
      value: "1000000",
    },
    {
      name: "weekly",
      value: "2000000",
    },
    {
      name: "monthly",
      value: "4000000",
    },
  ];
  const [periodSelected, setPeriodSelected] = useState("monthly");

  useEffect(() => {
    let nftCount = 0;
    fieldData.filter((field: FieldType) => {
      if (
        field.depositsFullName &&
        field.depositsFullName.includes("3Fi NFTs") &&
        field.depositsLP &&
        field.depositsLP > 0
      ) {
        nftCount++;
      }
    });
    setOwnedNFTCount(nftCount);
  }, [[...fieldData]]);

  return (
    <Grid className="nft-widget w-[calc(100vw-40px)] md:w-[calc(33.33vw-78px)]">
      <div className="nft-widget-bg">
        <div className="flex items-center justify-between px-[30px] pt-[30px]">
          <div className="flex items-center">
            <img
              loading="lazy"
              src={DashboardNFTImg}
              className="w-[19px] h-[24px] mr-[15px]"
              alt=""
            />
            <p className="widget-title">
              {walletConnected === "Disconnected" ? "NFT" : "My NFTs"}
            </p>
          </div>
          <div>
            <p className="gradient-text">
              {walletConnected === "Disconnected"
                ? "1,234,567,890"
                : ownedNFTCount > 0
                ? "$1,234"
                : "0"}
            </p>
          </div>
        </div>
        <hr className="my-[15px] border-[#0FD1EC]/[0.6]" />
        {walletConnected === "Connected" && (
          <DragIndicatorIcon className="widget-drag-indicator" />
        )}
        {walletConnected === "Disconnected" && (
          <div className="overlay-area visitor">
            <div className="overlay-behind">
              <div className="px-[30px]">
                <p className="text-[14px] leading-[18px] pb-[5px]">
                  Select NFT to obtain rates:
                </p>
                <div className="nfts-list flex justify-between">
                  {nftsData.map((nft, index) => {
                    return (
                      <NFT
                        key={`nftData-${index}`}
                        nft={nft}
                        availability={
                          fiTVL >= nft.requirementA &&
                          curveTVL >= nft.requirementB
                            ? 1
                            : 0
                        }
                      />
                    );
                  })}
                </div>
              </div>
              <div className="nft-second-bg">
                <p className="text-[14px] leading-[18px] mb-[10px]">
                  Expected cash flow:
                </p>
                <div className="cash-flow-duration">
                  {periods.map((period, index) => {
                    return (
                      <span
                        key={`period-${index}`}
                        className={classNames(
                          "cursor-pointer",
                          periodSelected === period.name ? "" : "text-[#00FFFF]"
                        )}
                        onClick={() => setPeriodSelected(period.name)}
                      >
                        {period.name}
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-baseline">
                  {periods
                    .filter((period) => {
                      return period.name === periodSelected;
                    })
                    .map((period, index) => (
                      <p key={`period-${index}`} className="font-lg">
                        {period.value}
                      </p>
                    ))}
                  <span className="ml-[5px] text-[8px] leading-[10px]">
                    IN CRV or FRAX
                  </span>
                </div>
                <p className="text-[12px] leading-[15px] py-[10px]">
                  Currency: $ USD
                </p>
              </div>
            </div>
          </div>
        )}

        {walletConnected === "Connected" && (
          <div
            className={classNames(
              "overlay-area",
              ownedNFTCount > 0 ? "existing" : "new-user"
            )}
          >
            <div className="overlay-behind p-0">
              <div className="px-[30px]">
                <p className="text-[14px] leading-[18px] mb-[10px]">
                  Expected cash flow:
                </p>
                <div className="cash-flow-duration">
                  {periods.map((period, index) => {
                    return (
                      <span
                        key={`period-${index}`}
                        className={classNames(
                          "cursor-pointer",
                          periodSelected === period.name ? "" : "text-[#00FFFF]"
                        )}
                        onClick={() => setPeriodSelected(period.name)}
                      >
                        {period.name}
                      </span>
                    );
                  })}
                </div>
                <div className="flex items-baseline">
                  <p className="font-lg">
                    {ownedNFTCount > 0
                      ? periods
                          .filter((period) => {
                            return period.name === periodSelected;
                          })
                          .map((period, index) => (
                            <p key={`period-${index}`} className="font-lg">
                              {period.value}
                            </p>
                          ))
                      : "0"}
                  </p>
                  <span className="ml-[5px] text-[8px] leading-[10px]">
                    CRV
                  </span>
                </div>
                <p className="text-[12px] leading-[15px] py-[10px]">
                  WORTH:{ownedNFTCount > 0 ? " $4,000,000" : " $0"}
                </p>
              </div>
              <div className="nft-second-bg">
                <p className="text-[14px] leading-[18px] mb-[20px]">
                  Accrued cash flow to date:
                </p>
                <div className="nft-claim">
                  <FormControl variant="outlined" sx={{ marginRight: "10px" }}>
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      type="number"
                      startAdornment={
                        <InputAdornment
                          position="start"
                          sx={{
                            "& .MuiTypography-root": {
                              color: "white !important",
                              fontSize: "18px",
                            },
                          }}
                        >
                          <img
                            loading="lazy"
                            alt=""
                            src="./images/token12.png"
                            className="mr-[5px] w-[30px] md:w-[40px]"
                          />
                          <p className="text-white">CRV</p>
                          <p className="second-paragraph">
                            $ <NumberField value={curValue} digit={2} />
                          </p>
                        </InputAdornment>
                      }
                      style={
                        // disabled ?
                        textFieldStyle[0]
                        // :
                        // (curValue > maxValue || maxValue === 0) ? textFieldStyle[1] : textFieldStyle[0]
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          textAlign: "right",
                          fontSize: "18px",
                          paddingLeft: "inherit",
                        },
                        "& .MuiInputAdornment-root": {
                          textAlign: "right",
                          fontSize: "18px",
                          width: "100%",
                        },
                      }}
                      // value={commafy(Number(curValue), 2)}
                      value={curValue}
                      onChange={(event) => {
                        if (Number(event.target.value) >= 0) {
                          setCurValue(Number(event.target.value));
                        }
                      }}
                      // readOnly={disabled}
                    />
                  </FormControl>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      color: "#4A4D58",
                      height: "39px",
                      lineHeight: 0,
                      backgroundColor: "#00FFF0",
                      borderColor: "#00FFF0",
                      border: "2px #00FFF0 solid",
                    }}
                  >
                    Claim
                  </Button>
                </div>
              </div>
            </div>
            <div className="overlay-content">
              <div className="flex items-center mb-[8px]">
                <Link to={`/deposits?from=Dashboard`}>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(updateLeftNavbarPageSelected("Deposits"));
                      dispatch(updateLeftNavbarShow("Minimized"));
                      dispatch(updateRightNavbarShow("Opened"));
                    //   dispatch(updateLeftNavbarGrid(1));
                    //   dispatch(updateBodyContentGrid(8));
                    }}
                  >
                    <p className="font-lg text-[#00FFFF]">Mint</p>
                  </div>
                </Link>
                <p className="text-[12px] leading-[15px] px-[5px]">or</p>
                <Tooltip
                  title="Available Soon"
                  placement="top"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: "#FFFFFF00",
                        color: "#FFFFFF",
                        fontSize: 18,
                        textShadow: "0px 0px 9px #FFFFFF",
                      },
                    },
                  }}
                >
                  <p className="font-lg text-[#C3D6E2]">Buy</p>
                </Tooltip>
              </div>
              <p className="text-[14px] text-[#C3D6E2] leading-[18px]">
                an NFT To activate this widget.
              </p>
            </div>
          </div>
        )}
      </div>
    </Grid>
  );
}
