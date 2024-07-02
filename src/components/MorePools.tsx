import { useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import classNames from 'classnames';

import { RootState } from '../store/store';

type props = {
  showLiquidDeposits: boolean
  setShowLiquidDeposits: (showLiquidDeposits: boolean) => void
}

export default function MorePools({
  showLiquidDeposits,
  setShowLiquidDeposits
}: props) {
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);

  return (
    <Grid
      container
      spacing={2}
      xs={12}
      className='bg-[#22262F] Field-More border-[1px] border-[#2A2E3B]/[0.85] text-[16px] xl:text-[18px]'
      onClick={() => setShowLiquidDeposits(!showLiquidDeposits)}
    >
      <Grid xs={7}>1,234 more pools</Grid>
      <Grid xs={5} className='relative flex justify-end'>
        {leftNavbarShow === "Minimized" &&
        <>
          <span className='ml-[5px] hidden xl:block'>APR</span>
          <span
            className={classNames(
              'text-right w-full hidden md:block',
              showLiquidDeposits ? 'px-[15px] 2xl:px-[55px] 3xl:px-[65px]' : 'pl-[10px] 2xl:pl-[40px] 3xl:pl-[50px] 2xl:pr-[30px] 3xl:pr-[45px]'
            )}
          >
            17.12 to 228.86 %
          </span>
        </>}
        <div className={showLiquidDeposits ? 'text-[#00FFFF] cursor-pointer w-[65px] min-w-[65px] text-end text-[14px]' : 'text-[#00FFFF] cursor-pointer min-w-[90px] w-[90px] text-end text-[14px]'}>
          {showLiquidDeposits ? "Hide All" : "Display All"}
        </div>
      </Grid>
    </Grid>
  )
}