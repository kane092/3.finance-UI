import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from '../../../store/store';
import { updateRightNavbarEmissionSelected, updateRightNavbarStepSelected } from '../../../store/actions/navbarAction';

import { EmissionListData, StepListData } from '../../../types/types';

import Step from './Step';
import Emission from './Emission';

import ContractAddress from '../../../assets/images/contract-address.png';
import Step1 from '../../../assets/images/step1.png';
import Step2 from '../../../assets/images/step2.png';
import Step3 from '../../../assets/images/step3.png';
import Step4 from '../../../assets/images/step4.png';
import Step5 from '../../../assets/images/step5.png';

import Tab from '@mui/material/Tab/Tab';
import Tabs from '@mui/material/Tabs/Tabs';
import '../../../assets/scss/Toggle3Button.scss';

export default function Details() {
  const dispatch: Dispatch<any> = useDispatch();
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const pageSelected = useSelector((state: RootState) => state.navbar.leftNavbarPageSelected);
  const stepSelected = useSelector((state: RootState) => state.navbar.rightNavbarStepSelected);

  const steps = [
    {
      index: 1,
      title: 'Asset Foundations',
      type: 'C.D.P’s',
      image: Step1
    },
    {
      index: 2,
      title: 'Governance tokens',
      type: 'tokens',
      image: Step2
    }
    ,
    {
      index: 3,
      title: 'Protocol revenue',
      type: 'nfts',
      image: Step3
    }
    ,
    {
      index: 4,
      title: 'Collateral',
      type: 'wallets',
      image: Step4
    }
    ,
    {
      index: 5,
      title: 'Customisable, Composable.',
      type: 'apps',
      image: Step5
    }
  ]

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(0)
  }, [stepSelected])

  useEffect(() => {
    if (fieldSelected.name !== '') dispatch(updateRightNavbarEmissionSelected(fieldSelected.emissionList[0]))
    dispatch(updateRightNavbarStepSelected({index: 0,title: '',type: '',image: ''}))
  }, [fieldSelected]);
  const emissionSelected = useSelector((state: RootState) => state.navbar.rightNavbarEmissionSelected);

  return (
    <div className='RightNavbar-Content RightNavbar-Content-Details mr-[30px] ml-[40px] lg:ml-[50px] xl:ml-[60px] 2xl:ml-[70px] 3xl:ml-[80px]'>
      <div className='RightNavbar-Content-Left'>
        <p>&nbsp;{pageSelected === "Emissions" ? fieldSelected.fieldFullName || fieldSelected.emissionsFullName : fieldSelected.fieldFullName || fieldSelected.depositsFullName}</p>
        <p>Details</p>
        <p>What would you like to do?</p>
        <div className='RightNavbar-SubTabs RightNavbar-SubTabs-Overview relative'>
          <span
            className='cursor-pointer text-[18px] ml-[32px] xl:ml-[20px] 2xl:ml-[32px] text-white'
          >
            Overview
          </span>
        </div>
        {fieldSelected.symbol === 'CRVWallet' &&
        <p className='RightNavbar-SubTab-Content'>Collateral wallets are 3Fi's premium product & vision for the future of DeFi. Wallets represent a full-stack asset foundation with sustainable cash flows, ready for Money Apps to take your DeFi to the next level.</p>}
        {fieldSelected.symbol !== 'CRVWallet' &&
        <p className='RightNavbar-SubTab-Content'>Deep dive into the character of this pool.<br /><br />Scan through the Emissions and APR breakdown, then dig into the detail of tabled data to find growth opportunities that improve portfolio efficiencies.</p>}
      </div>
      {fieldSelected.symbol === 'CRVWallet' &&
      <div className='RightNavbar-Content-Right'>
        <p>Learn more about 3Fi's asset stack here:</p>
        <p className='pt-[12px]'>{stepSelected.index === 0 ? 'Select a step:' : stepSelected.index + '. ' + stepSelected.title}</p>
        <div className='RightNavbar-Content-Right-Emission'>
          {
            steps.map((step: StepListData) => {
              return (
                <Step 
                  key={step.image}
                  step={step} 
                />
              )
            })
          }
        </div>
        {
          stepSelected.index === 1 ?
          <div className='text-[#C3D6E2AA]'>
            <p className='mb-[10px]'>Emission accrual and composability via Compound Deposit Pools: C.D.P’s</p>
            <p>C.D.Ps accept assets carefully selected to facilitate sustainable long term portfolio growth:</p>
            <Tabs className="switch_3 step-switch my-[28px]"
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="CRV" />
              <Tab label="CVX" />
              <Tab label="BENT" />
            </Tabs>
            {
              value === 0 ?
              <p>CRV makes up the grassroots component of this asset foundation and is therefore also allocated the position of collateral at higher levels.</p> :
              value === 1 ?
              <p>CVX makes up the first of 2 control component to the asset foundation. Interestingly, our investigations showed; to achieve an efficient, stable & sustainable asset foundation, 2 control components are needed.</p> :
              <p>BENT makes up the second of 2 control component to the asset foundation. Seen by many as the underdog in the 3Fi ecosystem, BENT has proven itself to be the magic that makes the system work.</p>
            }
          </div> :
          stepSelected.index === 2 ?
          <div className='text-[#C3D6E2AA]'>
            <p className='mb-[10px]'>3Fi tokens hold governance rights.</p>
            <p className='mb-[10px]'>No pre-mined. 3Fi tokens can only be minted by locking both control assets.</p>
            <p>c3Fi tokens have a cap of 100M tokens. c3Fi tokens are those minted within the Curve stack.</p>
          </div> :
          stepSelected.index === 3 ?
          <div className='text-[#C3D6E2AA]'>
            <p className='mb-[10px]'>NFT’s receive protocol revenue. </p>
            <p className='mb-[10px]'>Make goal setting simple with standardized, composable & dependable NFT stacks.</p>
            <p>Levels 1 to 3 of 5:</p>
            <Tabs className="switch_3 step-switch my-[28px]"
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="ParAi" />
              <Tab label="TomAi" />
              <Tab label="MolAi" />
            </Tabs>
            {
              value === 0 ?
              <>
                <p className='mb-[10px]'>An ember of energy with the promise of so much more. To obtain ParAi, 1 lot of Control and 10 lots of Care must be committed:</p>
                <p>100 3Fi + 1,000 3sdCRV = 1 ParAi</p>
              </> :
              value === 1 ?
              <>
                <p className='mb-[10px]'>A tranee in the making with the goal of mastering the atomic relm. To obtain TomAi, 10 ParAi or 10 lots of Control and 100 lots of Care must be committed:</p>
                <p>1,000 3Fi + 10,000 3sdCRV = 1 TomAi</p>
              </> :
              <>
                <p className='mb-[10px]'>A master at moleclar manipulation poised at the gates to greatness. MolAi requires 100 ParAi or 10 TomAi or 100 lot of Control and 1,000 lots of Care must be committed:</p>
                <p>10,000 3Fi + 100,000 3sdCRV = 1 MolAi</p>
              </>
            }
          </div> :
          stepSelected.index === 4 ?
          <div className='text-[#C3D6E2AA]'>
            <p className='mb-[10px]'>NFT’s support onward composability of Money Apps via 3Fi Collateral wallets. Grassroot assets act as collateral for each asset stack.</p>
            <p>The Curve asset stack is our first Asset Foundation. CRV will therefore act as collateral for this stack.</p>
          </div> :
          stepSelected.index === 5 ?
          <div className='text-[#C3D6E2AA]'>
            <p>Like the App Stores of old, Money Apps allow for full customisation of individual Dashboards & the promise of furthur composability through ever evolving Services, Strategies and Utilities.</p>
          </div> :
          ''
        }
      </div>}
      {fieldSelected.symbol !== 'CRVWallet' &&
      <div className='RightNavbar-Content-Right'>
        <p>Emissions received:</p>
        <p>Select an emission to populate the table below</p>
        <div className='RightNavbar-Content-Right-Emission'>
          {
            fieldSelected.emissionList && fieldSelected.emissionList.map((emission: EmissionListData) => {
              return (
                <Emission 
                  key={emission.emissionLogo}
                  emission={emission} 
                />
              )
            })
          }
        </div>
        <p className='mb-[10px]'>Use the table below to seek out opportunities that boost compound deposit growth with outperforming liquid emissions.</p>
        <Grid container className='text-right'>
          <Grid xs={4} className='text-left mb-[5px]'>M.A:</Grid>
          <Grid xs={2}>1D</Grid>
          <Grid xs={2}>30D</Grid>
          <Grid xs={2}>90D</Grid>
          <Grid xs={2}>180D</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
          <Grid xs={4} className='text-left mb-[5px]'>CRV</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.One : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.Month : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.QuarterYear : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CRV.HalfYear : 0}</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
          <Grid xs={4} className='text-left mb-[5px]'>CVX</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.One : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.Month : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.QuarterYear : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.CVX.HalfYear : 0}</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
          <Grid xs={4} className='text-left mb-[5px]'>BENT</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.One : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.Month : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.QuarterYear : 0}</Grid>
          <Grid xs={2}>{emissionSelected.emissionAverage !== "" ? emissionSelected.emissionAverage.BENT.HalfYear : 0}</Grid>
          <Grid xs={12} className='mb-[5px]'><hr /></Grid>
        </Grid>
        <div className='RightNavbar-Content-Right-Contract'>
          <p>Contract address:</p>
          <p className='RightNavbar-Content-Right-Contract-Address'>
            0x1234....5678
            <img loading="lazy" src={ContractAddress} alt='' />
          </p>
        </div>
      </div>}
    </div>
  )
}