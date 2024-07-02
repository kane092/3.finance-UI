import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import NumberField from '../../NumberField';

import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import { updateRightNavbarAssetSelected, updateRightNavbarCurValue } from '../../../store/actions/navbarAction';
import { RootState } from '../../../store/store';

import { getFieldLP } from '../../../utils/utils';

import NavbarFlag from '../../../assets/images/navbar-flag.png';

export default function Withdraw() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  // const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  // const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const [radioSelected, setRadioSelected] = useState('');
  // console.log(getFieldLP(fieldData, 1))
  // console.log(fieldSelected)
  // console.log(fieldData)

  useEffect(() => {
    // console.log(assetSelected)
    if (maxValue > 0) setRadioSelected(fieldSelected.tokens[1])
  }, []);

  useEffect(() => {
    dispatch(updateRightNavbarAssetSelected(radioSelected))
  }, [radioSelected]);
  
  return (
    <>
      <p className='RightNavbar-SubTab-Content'>‘Withdraw’ moves assets to the connected wallet.<br />The withdraw function also provides format options for those tokens specific to this pool. </p>
      {walletConnected == "Disconnected" &&
      <span
        className='Connect-Wallet-Button'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected == "Connected" &&
      <>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={radioSelected}
          onChange={
            (event) =>  {
              setRadioSelected(event.target.value)
              // dispatch(updateRightNavbarAssetSelected(event.target.value))
              dispatch(updateRightNavbarCurValue(0))
            }
          }
        >
          <Grid container className={maxValue ? 'text-[14px] text-white' : 'text-[14px] text-[#63717A]'}>
            {/* <Grid xs={8} className='text-white'><p className='mb-[14px]'>Deposit balance: ({fieldSelected.type === "CompoundFields" ? 3 : ''}{fieldSelected.tokens && fieldSelected.tokens[fieldSelected.tokens.length-1]})</p></Grid> */}
            <Grid xs={8} className='text-white'><p className='mb-[14px]'>Deposit balance: ({fieldSelected.tokens && fieldSelected.tokens[0]})</p></Grid>
            <Grid xs={4} className={maxValue ? 'text-right' : 'text-right text-red-600'}>{maxValue ? <NumberField value={maxValue} digit={2} /> : 'No balance'}</Grid>
            <Grid xs={12} className='text-white'>Withdraw balance as:</Grid>
            {
              fieldSelected.tokens && fieldSelected.tokens.map((token: string, index: number) => {
                return (
                  <div style={{display: 'contents'}} key={`token-${index}`}>
                    <Grid xs={8} className={index === 1 ? 'flex' : ''}>
                      <FormControlLabel
                        value={token}
                        control={
                          <Radio
                            sx={maxValue ?
                            {
                              color: '#00FFF0',
                              '&.Mui-checked': {
                                color: '#00FFF0',
                              },
                            } :
                            {
                              color: '#63717A',
                              '&.Mui-checked': {
                                color: '#63717A',
                              },
                              '&.Mui-disabled': {
                                color: '#63717A',
                              },
                            }}
                            disabled={maxValue == 0}
                            // onClick={() => {
                            //   // console.log(token)
                            //   dispatch(updateRightNavbarAssetSelected(token))
                            //   dispatch(updateRightNavbarCurValue(0))
                            // }}
                          />
                        }
                        label={token}
                        sx={maxValue ?
                          {
                            '& .MuiTypography-root': {
                              color: '#00FFF0 !important',
                              fontSize: '14px',
                            },
                          } :
                          {
                            '& .MuiTypography-root': {
                              color: '#63717A !important',
                              fontSize: '14px',
                            },
                          }
                        }
                      />
                      {index === 1 ?
                        <div className='flex w-full items-center ml-[20px]'>
                          Best Price
                          <img loading="lazy" src={NavbarFlag} className='w-[22px] h-[20px]' />
                        </div> :
                        <></>
                      }
                    </Grid>
                    <Grid xs={4} className='text-right flex items-center justify-end'>{maxValue ? <NumberField value={maxValue * (1 + index / 100)} digit={2} /> : 'No balance'}</Grid>
                  </div>
                )
              })
            }
            {maxValue ?
            <>
              <Grid xs={8} className='text-left mb-[10px]'>Selected Format:</Grid>
              <Grid xs={4} className='text-right'>{radioSelected}</Grid>
              <Grid xs={12} className='text-left'>Enter amount to withdraw:</Grid>
            </> :
            <></>}
          </Grid>
        </RadioGroup>
        {maxValue ?
        <></> :
        <Grid xs={12} className='text-white mt-[19px]'><p className='text-[14px] text-right'>It looks like you don’t have any of these tokens in your wallet. Have a look at the action summary below for tips on how to obtain these assets</p></Grid>}
      </>}
    </>
  )
}