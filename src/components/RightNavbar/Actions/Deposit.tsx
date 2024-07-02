import { useEffect, useMemo, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Grid from '@mui/material/Unstable_Grid2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import InputWithPercentage from '../../InputWithPercentage';
import RerouteCheckBox from './RerouteCheckBox'
import AcceptTermsCheckBox from './AcceptTermsCheckBox'
import AssetCheckBox from './AssetCheckBox'
import DepositActionSummary from '../DepositActionSummary';
import NumberField from '../../NumberField';
import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import { updateDepositData, updateRightNavbarCurValue, updateRightNavbarDepositValue } from '../../../store/actions/navbarAction';

import InformationIcon from '../../../assets/images/information-icon.png';
import NotificationIcon from '../../../assets/images/notification-icon.png';
import { Asset } from '../../../types/types';

interface PropsType {
  setIsEmptyWallet: Function
}

export default function Deposit(props: PropsType) {

  const {setIsEmptyWallet} = props

  const dispatch: Dispatch<any> = useDispatch();

  const [selectMultipleAssets, setSelectMultipleAssets] = useState<boolean>(false)
  
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected)
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected)
  const depositData = useSelector((state: RootState) => state.navbar.depositData)
  const value = useSelector((state: RootState) => state.navbar.rightNavbarCurValue)
  const rerouteSelected = depositData.reroute
  const acceptTermsSelected = depositData.acceptTerms
  const selectedAssets: Asset[] = depositData.assets

  useEffect(() => {
    dispatch(updateDepositData({assets: [], reroute: false, acceptTerms: false, value: 0}))
  }, [])

  const assets = fieldSelected.tokens ? fieldSelected.tokens.map((each: string, key: number) => {
    return {
      symbol: each,
      amount: fieldSelected.depositsDepositAsset[key]
    }
  }) : []
  const rerouteAsset: Asset = fieldSelected.type === "CompoundFields" ? {symbol: (fieldSelected.symbol === "CRV" ? assets[assets.length - 1].symbol + "-gauge": assets[assets.length - 1].symbol + " LP"), amount: fieldSelected.depositsReRouteAsset} : {symbol: '', amount: 0}
  const isEmptyWallet = useMemo(() => {
    let i = 0
    while(i < assets.length) {
      if (assets[i].amount > 0) {
        setIsEmptyWallet(false)
        return false
      }
      i++
    }
    setIsEmptyWallet(true)
    return true
  }, [assets])

  function checkReroute(state: boolean) {
    if (state) {
      dispatch(updateDepositData({assets: [rerouteAsset], reroute: true, acceptTerms: false, value: 0}))
    } else {
      dispatch(updateDepositData({assets: [], reroute: false, acceptTerms: false, value: 0}))
    }
    setSelectMultipleAssets(false)
    dispatch(updateRightNavbarCurValue(0))
  }

  function checkAcceptTerms(state: boolean) {
    if (state) {
      const newAssets = [...selectedAssets]
      newAssets.push(assets[0])
      dispatch(updateDepositData({assets: newAssets, reroute: false, acceptTerms: true, value: 0}))
      if (newAssets.length > 1) setSelectMultipleAssets(true)
    }
    else {
      const index = selectedAssets.findIndex(each => each.symbol === assets[0].symbol)
      if (index !== -1) {
        let newAssets = [...selectedAssets]
        newAssets.splice(index, 1)
        dispatch(updateDepositData({assets: newAssets, reroute: false, acceptTerms: false, value: 0}))
        if (newAssets.length <= 1) setSelectMultipleAssets(false)
      }
    }
    dispatch(updateRightNavbarCurValue(0))
  }

  function checkAsset(asset: Asset, check: boolean) {
    const index = selectedAssets.findIndex(each => each.symbol === asset.symbol)
    if (check && index === -1) {
      let newAssets = [...selectedAssets]
      newAssets.push(asset)
      dispatch(updateDepositData({...depositData, assets: newAssets, reroute: false, value: 0}))
      if (newAssets.length > 1 && !selectMultipleAssets) setSelectMultipleAssets(true)
    }
    if (!check && index !== -1) {
      const index_order = fieldSelected.tokens.findIndex((each : any ) => each === asset.symbol)
      if (index_order === 0) {
        checkAcceptTerms(false)
      } else {
        let newAssets = [...selectedAssets]
        newAssets.splice(index, 1)
        if (newAssets.length === 1) dispatch(updateDepositData({...depositData, assets: newAssets, reroute: false, value: value}))
        else dispatch(updateDepositData({...depositData, assets: newAssets, reroute: false, value: 0}))
        if (newAssets.length <= 1 && selectMultipleAssets) setSelectMultipleAssets(false)
        if (newAssets.length === 0) dispatch(updateRightNavbarCurValue(0))
      }
    }
  }

  function inputValue(value: number) {
    dispatch(updateRightNavbarCurValue(value))
    dispatch(updateDepositData({...depositData, value: value}))
  }

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>
        ‘Deposit’ is the most direct and efficient way to add assets to your position. However this function will only accept assets that directly relate to this pool.
      </p>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && (
      <>
        <div className='w-full'>
          {fieldSelected.type === "CompoundFields" && <p className='mt-[-15px] text-right text-[14px] mb-[20px]'>{fieldSelected.depositsFullName} deposits are staked in {fieldSelected.symbol === "CRV" ? "StakeDAO." : "BentFinance."}</p>}
          {rerouteAsset && rerouteAsset.amount !== 0 &&
          <div
            className={classNames(
              'flex items-center w-full mb-[15px] px-[10px] border-[1px] border-[#00FFF0] rounded-[4px] py-[10px]',
              rerouteSelected ? 'border-[#C449FE] py-[10px]' : ''
            )}
          >
            <RerouteCheckBox
              label={fieldSelected.rerouteDepositMessage}
              small={true}
              setRerouteChecked={checkReroute}
              checked={rerouteSelected}
            />
            <img loading="lazy" src={InformationIcon} className="w-[12px] h-[12px]" alt='' />
          </div>}
          {fieldSelected.type === "CompoundFields" && !rerouteSelected && assets[0] && assets[0].amount > 0 &&
          <div className='flex bg-[#CCCCCC]/[0.1] mb-[10px] pt-[5px] px-[5px] border-[1px] border-[red] rounded-[4px] text-[12px] text-[#C3D6E2]'>
            <img loading="lazy" src={NotificationIcon} className='w-[12px] h-[12px] mt-[2px] mr-[10px]' alt='' />
            <div>
              <p>{fieldSelected.termsMessage}</p>
              <AcceptTermsCheckBox
                label="I understand and accept these terms."
                small={true}
                setAcceptTerms={checkAcceptTerms}
                checked={acceptTermsSelected}
              />
            </div>
          </div>}
          {!rerouteSelected &&
          <>
            <Grid container className={'text-[14px] text-white'}>
              <Grid xs={8} className='text-white'>Tokens accepted by this pool:</Grid>
              <Grid xs={4} className='text-right text-white'>Wallet balance</Grid>
            </Grid>
            {assets.map((asset: Asset, index: number) => {
              return (
                <Grid container className={'text-[14px] text-white'} key={`assets-${index}`}>
                  <Grid xs={8}>
                    <AssetCheckBox
                      label={asset.symbol}
                      small={false}
                      asset={asset}
                      checkAsset={checkAsset}
                      disabled={
                        fieldSelected.type === "CompoundFields" ?
                        index === 0 ?
                        (acceptTermsSelected ? false : true) :
                        (asset.amount > 0 ? false : true) :
                        false
                      }
                      checked={selectedAssets.findIndex(each => each.symbol === asset.symbol) !== -1}
                    />
                  </Grid>
                  <Grid
                    xs={4}
                    className={classNames(
                      'text-right flex items-center justify-end',
                      (asset.amount === 0) ? 'text-red-600' : 'text-white'
                    )}
                  >
                    {(asset.amount > 0) ? <NumberField value={asset.amount} digit={2} />: 'No Balance' }
                  </Grid>
                </Grid>
              )
            })}
          </>
          }
          {rerouteSelected &&
          <Grid container className={'text-[14px] text-white'}>
            <Grid xs={8} className='text-white'>Tokens to reroute:</Grid>
            <Grid xs={4} className='text-right text-white'>StakeDAO balance</Grid>
            <Grid xs={8}>
              <AssetCheckBox
                label={`${rerouteAsset.symbol} (staked)`}
                small={false}
                asset={rerouteAsset}
                checkAsset={() => {}}
                disabled={false}
                checked={selectedAssets.findIndex(each => each.symbol === rerouteAsset.symbol) !== -1}
              />
            </Grid>
            <Grid
              xs={4}
              className={classNames(
                'text-right flex items-center justify-end',
                'text-white'
              )}
            >
              <NumberField value={rerouteAsset.amount} digit={2} />
            </Grid>
          </Grid>
          }
          {isEmptyWallet &&
          <div className='w-full'>
            <p className='mt-[16px] text-right text-[14px] mb-[20px]'>It looks like you don't have any of these tokens in your wallet. Have a look at the action summary bellow for tips on how to obtain these assets</p>
          </div>
          }
        </div>
        {!selectMultipleAssets && !isEmptyWallet && (selectedAssets.length === 0 ? 
        <InputWithPercentage asset={undefined} disabled={selectedAssets.length === 0} value={value} setValue={inputValue} /> : 
        <InputWithPercentage asset={selectedAssets[0]} disabled={selectedAssets.length === 0} value={value} setValue={inputValue} />)
        }
        <DepositActionSummary subTab="Deposit" token={fieldSelected.name} depositsFullName={fieldSelected.depositsFullName} isEmpty={isEmptyWallet} />
      </>
      )
    }
    </>
  )
}