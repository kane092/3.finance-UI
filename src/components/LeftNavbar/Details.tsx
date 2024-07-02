import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import Grid from "@mui/material/Unstable_Grid2";

import { RootState } from "../../store/store";
import {
  // updateBodyContentGrid,
  // updateLeftNavbarGrid,
  updateLeftNavbarShow,
} from "../../store/actions/navbarAction";

import ArrowRight from "../../assets/images/arrow-right.png";
import InformationIcon from "../../assets/images/information-icon.png";
import "../../assets/scss/LeftNavbar.scss";
import LightToolTip from "../LightToolTip";

type props = {
  selected: boolean;
  page: string;
};

function DisconnectedShowHideButton() {
  const dispatch: Dispatch<any> = useDispatch();
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );

  return (
    <div className="Navbar-Body-Hide">
      {leftNavbarShow === "Opened" ? (
        <span
          onClick={() => {
            dispatch(updateLeftNavbarShow("Collapsed"));
            // dispatch(updateLeftNavbarGrid(1));
            // dispatch(updateBodyContentGrid(10));
          }}
        >
          Hide
        </span>
      ) : (
        <span
          onClick={() => {
            dispatch(updateLeftNavbarShow("Opened"));
            // dispatch(updateLeftNavbarGrid(4));
            // dispatch(updateBodyContentGrid(8));
          }}
        >
          Show
        </span>
      )}
    </div>
  );
}

export default function Details({ selected, page }: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector(
    (state: RootState) => state.global.walletConnected
  );
  const leftNavbarShow = useSelector(
    (state: RootState) => state.navbar.leftNavbarShow
  );
  // const leftNavbarPageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);

  return (
    <>
      {walletConnected === "Disconnected" && (
        <div
          className={classNames(
            "Navbar-Body flex justify-between left-[30px] md:w-[calc(33.33vw-105px)]",
            page === "Dashboard" || page === "Mission" || page === "Gallery" ? "top-[50px]" : "",
            page === "Deposits" || page === "Wealth" || page === "Performance" ? "top-[80px]" : "",
            page === "Emissions" || page === "Work" || page === "Analytics" ? "top-[130px]" : "",
            page === "MoneyApps" || page === "Community" || page === "Subscriptions" ? "top-[180px]" : "",
            leftNavbarShow === "Minimized"
              ? "opacity-0"
              : selected
              ? "Navbar-Body-Selected opacity-100"
              : "opacity-0"
          )}
          style={{
            height: selected ? "min(430px, 100vh - 370px)" : 0,
          }}
        >
          {page === "Mission" && leftNavbarShow === "Opened" && (
            <div>
              <p className="text-[27px] leading-[34px] mb-[30px]">
                ‘Through our collective experience, we understand what it takes
                to master money and live life on our own terms.’
              </p>
              <p className="text-[16px] leading-[21px]">
                That’s why we’ve developed this growth protocol, with the DeFi
                tools to help you find your own path to living financially free.
              </p>
            </div>
          )}
          {page === "Wealth" && leftNavbarShow === "Opened" && (
            <div>
              <p className="text-[27px] leading-[34px] mb-[30px]">
                ‘Wealth sovereignty is only possible by compounding interest ’
              </p>
              <p className="text-[16px] leading-[21px]">
                Our entry-level product aspires to grows wealth autonomously,
                accruing and auto-compounding token emissions to build a solid
                asset foundation, ready to empower your next phase of
                growth.&nbsp;
                <a href="/dashboard">
                  <span className="text-[#00FFFF]">
                    Explore our app
                    <img
                      loading="lazy"
                      src={ArrowRight}
                      className="inline-block ml-[5px]"
                      alt=""
                    />
                  </span>
                </a>
              </p>
            </div>
          )}
          {page === "Work" && leftNavbarShow === "Opened" && (
            <div>
              <p className="text-[27px] leading-[34px] mb-[30px]">
                ‘We help you utilize your compounded wealth in sustainable
                ways.’
              </p>
              <p className="text-[16px] leading-[21px]">
                Our premium product focuses on building collateral from your
                asset foundation, allowing you to engage in higher risk plays
                that yield disposable income, without putting your foundation at
                risk.&nbsp;
                <a href="/dashboard">
                  <span className="text-[#00FFFF]">
                    Explore our app
                    <img
                      loading="lazy"
                      src={ArrowRight}
                      className="inline-block ml-[5px]"
                      alt=""
                    />
                  </span>
                </a>
              </p>
            </div>
          )}
          {page === "Community" && leftNavbarShow === "Opened" && (
            <div>
              <p className="text-[27px] leading-[34px] mb-[30px]">
                ‘We believe in the power of community to change the world’
              </p>
              <p className="text-[16px] leading-[21px] mb-[40px]">
                3.Finance is a unique home for developers to plug in their
                protocols and connect to a global network of DeFi natives who
                are looking to utilize their collateral holdings to maximize
                their wealth sovereignty.&nbsp;
                <a href="/dashboard">
                  <span className="text-[#00FFFF]">
                    Show me
                    <img
                      loading="lazy"
                      src={ArrowRight}
                      className="inline-block ml-[5px]"
                      alt=""
                    />
                  </span>
                </a>
                <br />
                <br />
                Do you have a powerful DeFi protocol that can help us create
                meaningful impact?
              </p>
              <span className="bg-[#00FFF0] mt-[10px] py-[10px] px-[15px] rounded-[28px] text-[#22262F] text-[14px] leading-[18px] cursor-pointer">
                Contact team
              </span>
            </div>
          )}
          {page === "Dashboard" && leftNavbarShow === "Opened" && (
            <div>
              <p className="Navbar-Body-Header">A birds eye view</p>
              <p className="Navbar-Body-Content">
                Our 3.Finance dashboard is designed to ensure you have full
                visibility of asset activity, identify growth opportunities and
                seek ways to improve efficiencies.
                <br />
                <br />
                Our dashboard works with ‘<b>Money Apps</b>’ to achieve this.
                Getting a Money App, loads its widget here for immediate
                visibility over existing positions and immediate access to
                related controls and analytics.
                <br />
                <br />
                Click on another space below to learn more.
              </p>
            </div>
          )}
          {page === "Deposits" && leftNavbarShow === "Opened" && (
            <div>
              <p className="Navbar-Body-Header">Liquid deposits</p>
              <p className="Navbar-Body-Content">
                Grow your foundations wisely: earn, don’t spend.
                <br />
                Deposit your assets and earn emissions to fuel growth in your
                Compound deposit pools.
              </p>
              <p className="Navbar-Body-Header">Compound deposits</p>
              <p className="Navbar-Body-Content">
                Sovereign wealth requires strong asset foundations.
                <br />
                Our compound pools maximise wealth accrual while making these
                foundations composable, enabling you to build your own
                Collateral.
              </p>
              <p className="Navbar-Body-Header">3Fi Collateral</p>
              <p className="Navbar-Body-Content">
                Wealth sovereignty comes from the ability to attain disposable
                income in a sustainable manner.
                <br />
                <br />
                Transform your compound deposits into 3Fi collateral to access
                these disposable income streams.
              </p>
            </div>
          )}
          {page === "Emissions" && leftNavbarShow === "Opened" && (
            <div>
              <p className="Navbar-Body-Header">Liquid emissions</p>
              <p className="Navbar-Body-Content">
                Harvesting, swaps and adds liquid emissions to compound
                deposits, expediting the speed at which your positions grow.
                Claiming, will withdraw these emissions to the connected wallet.
              </p>
              <p className="Navbar-Body-Header">Compound emissions</p>
              <p className="Navbar-Body-Content">
                Increase your share of protocol revenue by harvesting these
                emissions to grow your compound deposits.
              </p>
              <p className="Navbar-Body-Header">3Fi Collateral wallet</p>
              <p className="Navbar-Body-Content">
                These wallets work together with our community of Money Apps.
                Collateral in these wallets are distributed on harvest based on
                your allocations to each Money App. To access and begin using
                Money Apps, mint 3Fi NFTs.
              </p>
            </div>
          )}
          {page === "MoneyApps" && leftNavbarShow === "Opened" && (
            <div>
              <p className="Navbar-Body-Header">Developers</p>
              <p className="Navbar-Body-Content">
                Help us create meaningful impact. Plug in your protocol and
                connect to 3Fi’s global network of DeFi natives who are looking
                to utilize their collateral holdings.
              </p>
              <p className="Navbar-Body-Header">Community</p>
              <p className="Navbar-Body-Content">
                Maximize your wealth by allocating your 3Fi votes to the apps
                that you feel will influence your portfolio to the greatest
                effect.
                <br />
                <br />A widget will be added to your Dashboard for each app you
                get.
              </p>
            </div>
          )}
          {page === "Gallery" && leftNavbarShow === "Opened" && (
            <div>
              <p className="text-[20px] leading-[28px]">
                DeFi cashflow made easy.
              </p>
              <p className="text-[14px] mb-[20px]">
                3.Finance asset backed NFTs make accessing the benefits of DeFi
                simple. Just buy, build and collect.
              </p>
              <p className="text-[20px] leading-[28px]">
                How to move stars:
              </p>
              <p className="text-[14px]">
                We are all motivated by the desire to attain our own freedom.
                The meaning & measure of which differs for each of us. 3Fi-NFTs
                were built to light the way. Our NFTs are receipts to a specific
                number of DeFi assets; defined by the power level of each NFT.
                Power levels help define how many NFTs we will need to achieve a
                freedom that is meaningful to ourselves. More than this,
                3Fi-NFTs provide insight into the ever changing cost of that
                freedom we are each so determined to attain. With this as our
                north star, the power to move stars and change our own fate is
                finally in our hands.
              </p>
            </div>
          )}
          {page === "Performance" && leftNavbarShow === "Opened" && (
            <div>
            </div>
          )}
          {page === "Analytics" && leftNavbarShow === "Opened" && (
            <div>
            </div>
          )}
          {page === "Subscriptions" && leftNavbarShow === "Opened" && (
            <div>
            </div>
          )}
        </div>
      )}

      {walletConnected === "Connected" && (
        <div
          className={classNames(
            "Navbar-Body flex justify-between left-[30px]",
            leftNavbarShow !== "Collapsed" ? "md:w-[calc(33.33vw-105px)]" : "",
            page === "Dashboard" || page === "Gallery" ? "top-[50px]" : "",
            page === "Deposits" || page === "Performance" ? "top-[80px]" : "",
            page === "Emissions" || page === "Analytics" ? "top-[130px]" : "",
            page === "MoneyApps" || page === "Subscriptions" ? "top-[180px]" : "",
            // leftNavbarShow === 'Minimized' ? '' : (selected ? 'Navbar-Body-Selected' : '')
            leftNavbarShow === "Minimized"
              ? "opacity-0"
              : selected
              ? "Navbar-Body-Selected"
              : "opacity-0"
          )}
          style={{
            height: selected ? "min(430px, 100vh - 370px)" : 0,
          }}
        >
          {leftNavbarShow === "Collapsed" && (
            <p
              className="Navbar-Body-Hide"
              onClick={() => {
                dispatch(updateLeftNavbarShow("Opened"));
                // dispatch(updateLeftNavbarGrid(4));
                // dispatch(updateBodyContentGrid(8));
              }}
            >
              <span>Show</span>
            </p>
          )}

          {leftNavbarShow !== "Collapsed" && (
            <div
              className={
                leftNavbarShow !== "Opened"
                  ? "Navbar-Details opacity-0"
                  : "Navbar-Details"
              }
            >
              {page === "Dashboard" && (
                <>
                  <div className="Navbar-Body-First-Row">
                    <p className="Navbar-Body-Header flex">
                      Summary
                      <LightToolTip title="This is an ‘<b>At-a-glance</b>’ view of your portfolio. For more; take a look at your connected widgets or navigate to the ‘Deposits’ space for a more detailed breakdown."></LightToolTip>
                      {/* <img loading="lazy" src={InformationIcon} className='ml-[5px] mt-[5px] w-[12px] h-[12px]' alt='' /> */}
                    </p>
                    <p className="Navbar-Body-Hide">
                      <span
                        onClick={() => {
                          dispatch(updateLeftNavbarShow("Collapsed"));
                          // dispatch(updateLeftNavbarGrid(1));
                          // dispatch(updateBodyContentGrid(10));
                        }}
                      >
                        Hide
                      </span>
                    </p>
                  </div>
                  <div className="Navbar-Body-Content">
                    <Grid container spacing={2}>
                      <Grid xs={7}># of deposits:</Grid>
                      <Grid xs={5} className="text-right">
                        0
                      </Grid>
                      <Grid xs={7}># of emissions collected:</Grid>
                      <Grid xs={5} className="text-right">
                        0
                      </Grid>
                      <Grid xs={7}># of money apps connected:</Grid>
                      <Grid xs={5} className="text-right">
                        0
                      </Grid>
                    </Grid>
                  </div>
                </>
              )}
              {page === "Deposits" && (
                <>
                  <div className="Navbar-Body-First-Row">
                    <p className="Navbar-Body-Header flex">
                      Summary
                      <LightToolTip title="This is an ‘<b>At-a-glance</b>’ view of your working positions. This summary view will update to reflect key details of each deposit group you choose to build."></LightToolTip>
                      {/* <img loading="lazy" src={InformationIcon} className="ml-[5px] mt-[5px] w-[12px] h-[12px]" alt='' /> */}
                    </p>
                    <p className="Navbar-Body-Hide">
                      <span
                        onClick={() => {
                          dispatch(updateLeftNavbarShow("Collapsed"));
                          // dispatch(updateLeftNavbarGrid(1));
                          // dispatch(updateBodyContentGrid(10));
                        }}
                      >
                        Hide
                      </span>
                    </p>
                  </div>
                  <div className="Navbar-Body-Content">
                    <Grid container spacing={2}>
                      <Grid xs={12}>You have not deposited anything yet.</Grid>
                      <Grid xs={7}>Est. deposts valuation:</Grid>
                      <Grid xs={3}>$</Grid>
                      <Grid xs={2} className="text-right">
                        0.00
                      </Grid>
                      <Grid xs={7}>Average annualised APR:</Grid>
                      <Grid xs={3}>%</Grid>
                      <Grid xs={2} className="text-right">
                        0.00
                      </Grid>
                      <Grid xs={12}>
                        <hr />
                      </Grid>
                      <Grid xs={7}>Est. 24hr change:</Grid>
                      <Grid xs={3}>$</Grid>
                      <Grid xs={2} className="text-right">
                        0.00
                      </Grid>
                    </Grid>
                  </div>
                </>
              )}
              {page === "Emissions" && (
                <>
                  <div className="Navbar-Body-First-Row">
                    <p className="Navbar-Body-Header flex">
                      Summary
                      <LightToolTip title="This is an ‘<b>At-a-glance</b>’ view of the tokens you are collecting. This summary view will update to reflect key details of each emission group you receive."></LightToolTip>
                      {/* <img loading="lazy" src={InformationIcon} className="ml-[5px] mt-[5px] w-[12px] h-[12px]" alt='' /> */}
                    </p>
                    <p className="Navbar-Body-Hide">
                      <span
                        onClick={() => {
                          dispatch(updateLeftNavbarShow("Collapsed"));
                          // dispatch(updateLeftNavbarGrid(1));
                          // dispatch(updateBodyContentGrid(10));
                        }}
                      >
                        Hide
                      </span>
                    </p>
                  </div>
                  <div className="Navbar-Body-Content">
                    <Grid container spacing={2}>
                      <Grid xs={12}>
                        No compound emissions are being collected.
                      </Grid>
                      <Grid xs={12}>
                        No compound emissions are being collected.
                      </Grid>
                      <Grid xs={6}>Learn about signaling.</Grid>
                      <Grid xs={6}>
                        <a
                          href="/"
                          className="flex justify-end items-center text-[#00FFF0]"
                        >
                          More
                          <img
                            loading="lazy"
                            src={ArrowRight}
                            className="w-[14px] h-[12px] ml-[6px]"
                            alt=""
                          />
                        </a>
                      </Grid>
                      <Grid xs={12}>
                        <hr />
                      </Grid>
                      <Grid xs={7}>Total claimable emissions:</Grid>
                      <Grid xs={3}>$</Grid>
                      <Grid xs={2} className="text-right">
                        0.00
                      </Grid>
                      <Grid xs={7}>Est. 24hr emissions:</Grid>
                      <Grid xs={3}>$</Grid>
                      <Grid xs={2} className="text-right">
                        0.00
                      </Grid>
                    </Grid>
                  </div>
                </>
              )}
              {page === "MoneyApps" && (
                <div className="flex">
                  <div>
                    <p className="Navbar-Body-Header">Developers</p>
                    <p className="Navbar-Body-Content">
                      Help us create meaningful impact. Plug in your protocol
                      and connect to 3Fi’s global network of DeFi natives who
                      are looking to utilize their collateral holdings.
                    </p>
                    <p className="Navbar-Body-Header">Community</p>
                    <p className="Navbar-Body-Content">
                      Maximize your wealth by allocating your 3Fi votes to the
                      apps that you feel will influence your portfolio to the
                      greatest effect.
                      <br />
                      <br />A widget will be added to your Dashboard for each
                      app you get.
                    </p>
                  </div>
                  <DisconnectedShowHideButton />
                </div>
              )}{page === "Gallery" && leftNavbarShow === "Opened" && (
                <div>
                  <p className="text-[20px] leading-[28px]">
                    DeFi cashflow made easy.
                  </p>
                  <p className="text-[14px] mb-[20px]">
                    3.Finance asset backed NFTs make accessing the benefits of DeFi
                    simple. Just buy, build and collect.
                  </p>
                  <p className="text-[20px] leading-[28px]">
                    How to move stars:
                  </p>
                  <p className="text-[14px]">
                    We are all motivated by the desire to attain our own freedom.
                    The meaning & measure of which differs for each of us. 3Fi-NFTs
                    were built to light the way. Our NFTs are receipts to a specific
                    number of DeFi assets; defined by the power level of each NFT.
                    Power levels help define how many NFTs we will need to achieve a
                    freedom that is meaningful to ourselves. More than this,
                    3Fi-NFTs provide insight into the ever changing cost of that
                    freedom we are each so determined to attain. With this as our
                    north star, the power to move stars and change our own fate is
                    finally in our hands.
                  </p>
                </div>
              )}
              {page === "Performance" && leftNavbarShow === "Opened" && (
                <div>
                </div>
              )}
              {page === "Analytics" && leftNavbarShow === "Opened" && (
                <div>
                </div>
              )}
              {page === "Subscriptions" && leftNavbarShow === "Opened" && (
                <div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
