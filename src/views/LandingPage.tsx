import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { updateLeftNavbarPageSelected } from '../store/actions/navbarAction';

import LogoLP from "../assets/images/logo-lp.png";
import Button from "@mui/material/Button/Button";
import Tooltip from "@mui/material/Tooltip";

import "../assets/scss/Content.scss";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
// import {
//   updateBodyContentGrid,
//   updateLeftNavbarGrid,
// } from "store/actions/navbarAction";
import { updateNftMarketPlaceShow } from "store/actions/globalAction";

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [animReverse, setAnimReverse] = useState(false);

  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  const rightNavbarShow = useSelector(
    (state: RootState) => state.navbar.rightNavbarShow
  );

  const dispatch: Dispatch<any> = useDispatch();

  // useEffect(() => {
  //   dispatch(updateLeftNavbarGrid(0));
  //   dispatch(updateBodyContentGrid(12));
  // }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={`landing-content ${animReverse ? "anim-reverse" : ""}`}>
      <img
        loading="lazy"
        src={LogoLP}
        className="w-[84px] md:w-[169px] mb-[20px]"
        alt="logolp"
      />
      <p className="text-center text-[60px] md:text-[90px] leading-[76px] md:leading-[114px] tracking-[.02em] text-shadow-landing-page">
        A growth protocol
      </p>
      <p className="text-center text-[27px] leading-[34px] text-shadow-landing-page landing-description">
        With a goal of fueling wealth sovereignty in DeFi, 3Fi’s focus is on
        building tools that promote sound and sustainable growth.
      </p>
      <div className="landing-btns">
        <Tooltip
          title="For crypto natives who want full control and optionality."
          placement="bottom"
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
          <Button
            variant="contained"
            sx={{
              color: "#4A4D58",
              backgroundColor: "#00FFF0",
              borderColor: "#00FFF0",
              border: "2px #00FFF0 solid",
            }}
          >
            {/* <a href='/dashboard'>Learn More</a> */}
            <p
              // to='/dashboard'
              onClick={() => {
                setAnimReverse(true);
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
                dispatch(updateNftMarketPlaceShow(false));
                setTimeout(() => {
                  // dispatch(updatePathName('/dashboard'));
                  // dispatch(updateLeftNavbarPageSelected('dashboard' as Page));
                  navigate("/dashboard");
                }, 300);
              }}
            >
              Open App
            </p>
          </Button>
        </Tooltip>
        <Tooltip
          title="For crypto culturalist’s who adore simplicity."
          placement="bottom"
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
          onClose={handleClose}
          onOpen={handleOpen}
          arrow
        >
          <Button
            variant="contained"
            sx={{
              color: "#00FFF0",
              backgroundColor: "#00FFF000",
              border: "2px #00FFF0 solid",
            }}
            className="relative"
            onClick={() => {
              setAnimReverse(true);
              // switch (leftNavbarShow) {
              //   case "Opened":
              //     dispatch(updateLeftNavbarGrid(4));
              //     dispatch(updateBodyContentGrid(8));
              //     break;
              //   case "Collapsed":
              //     dispatch(updateLeftNavbarGrid(1));
              //     dispatch(updateBodyContentGrid(10));
              //     break;
              //   default:
              //     dispatch(updateLeftNavbarGrid(4));
              //     dispatch(updateBodyContentGrid(8));
              //     break;
              // }
              dispatch(updateNftMarketPlaceShow(true));
              setTimeout(() => {
                // dispatch(updatePathName('/dashboard'));
                // dispatch(updateLeftNavbarPageSelected('dashboard' as Page));
                navigate("/nft/gallery");
              }, 300);
            }}
          >
            Buy Assets
            <p className={`coming-label ${open ? "block" : "hidden"}`}>
              Available Soon
            </p>
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
