import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateFieldSelected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import { updateRightNavbarMaxValue, updateRightNavbarCurValue } from '../../../store/actions/navbarAction';
import { getCRVWalletStatus } from '../../../utils/utils';

import Signal from '../Settings/Signal';

import NavbarExchange from '../../../assets/images/navbar-exchange.png';
import NotificationIcon from '../../../assets/images/notification-icon.png';
import classNames from 'classnames';
import NumberField from '../../NumberField';

export default function Harvest() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const globalSignalSaved = useSelector((state: RootState) => state.global.signalSaved);
  const fieldSignalSelected = fieldSelected.signalSelected;
  const signalSelected = fieldSignalSelected ? fieldSignalSelected : globalSignalSaved;
  const [direction, setDirection] = useState([true, true, true]);

  useEffect(() => {
    dispatch(updateRightNavbarMaxValue(fieldSelected.emissionsCollected));
    dispatch(updateRightNavbarCurValue(fieldSelected.emissionsCollected));

    if (!fieldSelected.signalSelected) {
      let res = '';
      if (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') {
        res = fieldSelected.name;
      } else if (fieldSelected.name === 'SDT') {
        res = 'Bent';
      } else {
        res = globalSignalSaved;
      }
      dispatch(updateFieldSelected({...fieldSelected, "signalSelected": res}));
    }
  }, [{...fieldSelected}]);

  const updateDirection = (index: number) => {
    let newDirection = [...direction]
    newDirection[index] = !direction[index]
    setDirection(newDirection)
  }

  return (
    <>
      {
      (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') ?
      <p className='RightNavbar-SubTab-Content'>
        On harvest, compound emissions are deposited into their respective C.D.Ps, each visible on the Deposits screens.
      </p> :
      <p className='RightNavbar-SubTab-Content'>
        On harvest, liquid emissions are swapped for compound emissions as per the set signal, before being deposited into their respective C.D.Ps, each visible on the Deposits screens.
      </p>}
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && fieldSelected.emissionsCollected === 0 &&
      <div className='w-full'>
        <div className='flex justify-between my-[10px]'>
          <p>Emission status:</p>
          <p className='text-red-600'>Not currently being received</p>
        </div>
      </div>
      }
      {walletConnected === "Connected" && fieldSelected.emissionsCollected !== 0 &&
      <div className='w-full'>
        <div className='flex justify-between my-[10px]'>
          <p>Emission status:</p>
          <p>Received by 6 deposit pools</p>
        </div>
        {
        (fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') ?
        <p className='mb-[10px]'>Emission directed towards:</p> :
        <p className='mb-[10px]'>Signal how you wish to direct emissions on harvest:</p>}
        <div className=
          {classNames(
            'flex items-start text-center mb-[30px]',
            fieldSelected.name === 'Curve' ? 'justify-start' : 'justify-between'
          )}
        >
          {
          /**
           * Show Curve Deposit for only Curve field
           * or other fields excluding Curve, Convex, and Bent
           * Disable Curve Deposit for SDT field
           */
          (fieldSelected.name === 'Curve' || !(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent')) &&
          <Signal
            fieldType="Curve"
            disabled={fieldSelected.name === 'SDT' ? true : false}
            indicatorShow={true}
          />}
          {
          /**
           * Show Convex Deposit for only Convex field
           * or other fields excluding Curve, Convex, and Bent
           * Disable Convex Deposit for SDT field
           */
          (fieldSelected.name === 'Convex' || !(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent')) &&
          <Signal
            fieldType="Convex"
            disabled={fieldSelected.name === 'SDT' ? true : false}
            indicatorShow={true}
          />}
          {
          /**
           * Show Bent Deposit for only Bent field
           * or other fields excluding Curve, Convex, and Bent
           */
          (fieldSelected.name === 'Bent' || !(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent')) &&
          <Signal fieldType="Bent" disabled={false} indicatorShow={true} />}
          {
          /**
           * Show 3Fi Wallet for only Curve field
           * or other fields excluding Curve, Convex, and Bent
           * Disable 3Fi Wallet for SDT field for empty wallet
           */
          (fieldSelected.name === 'Curve' || !(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent')) &&
          <Signal fieldType="CRV wallet" disabled={!getCRVWalletStatus(fieldData) || fieldSelected.name === 'SDT'} indicatorShow={true} />}
          {
          /**
           * Show 3Fi Wallet active message for only Curve field
           * with empty wallet
           */
          fieldSelected.name === 'Curve' && !getCRVWalletStatus(fieldData) &&
          <div className='flex items-center bg-[#CCCCCC]/[0.1] px-[15px] py-[10px] rounded-[21px] text-[8px] leading-[10px] tracking-widest uppercase text-left'>
            <img loading="lazy" src={NotificationIcon} className='w-[14px] h-[14px] mr-[10px]' alt='' />
            3Fi Wallet is only active when you hold 3Fi tokens or NFTs.
          </div>}
        </div>
        <hr className='my-[10px]' />
        <div className='flex justify-between mb-[10px]'>
          <p>Emissions earned: ({fieldSelected.tokens ? fieldSelected.tokens[0] : ''})</p>
          <p>{fieldSelected.emissionsCollected}</p>
        </div>
        <div className='flex justify-between'>
          {(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') &&
          <p>Emissions earned: (USD)</p>}
          {fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' &&
          <p>
            {(signalSelected === 'Curve' || signalSelected === 'CRV wallet') &&
            'Emissions earned: (CRV)'}
            {signalSelected === 'Convex' &&
            'Emissions earned: (CVX)'}
            {signalSelected === 'Bent' &&
            'Emissions earned: (BENT)'}
          </p>}
          {(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') &&
          <p>1,234,567,890.00</p>}
          {fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' &&
          <p>1,234,567,890.00</p>}
        </div>
        <hr className='my-[10px]' />
        <div className='flex justify-between'>
          <p>Exchange rate:</p>
          <div>
            {fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' &&
            <p className='flex justify-end mb-[10px]'>
              {(signalSelected === 'Curve' || signalSelected === 'CRV wallet') &&
              (
                direction[0] === true ?
                <>
                  1.00 {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} = {fieldSelected.emissionRateWithCRV} CRV 
                </> :
                <>
                  1.00 CRV = <NumberField value={1/fieldSelected.emissionRateWithCRV} digit={2} /> {fieldSelected.tokens ? fieldSelected.tokens[0] : ''}
                </>
              )}
              {signalSelected === 'Convex' &&
              (
                direction[0] === true ?
                <>
                  1.00 {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} = {fieldSelected.emissionRateWithCVX} CVX 
                </> :
                <>
                  1.00 CVX = <NumberField value={1/fieldSelected.emissionRateWithCVX} digit={2} /> {fieldSelected.tokens ? fieldSelected.tokens[0] : ''}
                </>
              )}
              {signalSelected === 'Bent' &&
              (
                direction[0] === true ?
                <>
                  1.00 {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} = {fieldSelected.emissionRateWithBENT} BENT 
                </> :
                <>
                  1.00 BENT = <NumberField value={1/fieldSelected.emissionRateWithBENT} digit={2} /> {fieldSelected.tokens ? fieldSelected.tokens[0] : ''}
                </>
              )}
              <img loading="lazy" src={NavbarExchange} className='exchange-icon' alt='' onClick={() => updateDirection(0)} />
            </p>
            }
            <p className='flex justify-end mb-[10px]'>
              {(fieldSelected.name === 'Curve' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && (signalSelected === 'Curve' || signalSelected === 'CRV wallet'))) &&
              (
                direction[1] === true ?
                <>
                  1.00 CRV = 1.00 sdCRV
                </> :
                <>
                  1.00 sdCRV = 1.00 CRV
                </>
              )}
              {(fieldSelected.name === 'Convex' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Convex')) &&
              (
                direction[1] === true ?
                <>
                  1.00 CVX = 1.00 vlBCVX
                </> :
                <>
                  1.00 vlBCVX = 1.00 CVX
                </>
              )}
              {(fieldSelected.name === 'Bent' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Bent')) &&
              (
                direction[1] === true ?
                <>
                  1.00 BENT = 1.00 vlBENT
                </> :
                <>
                  1.00 vlBENT = 1.00 BENT
                </>
              )}
              <img loading="lazy" src={NavbarExchange} className='exchange-icon' alt='' onClick={() => updateDirection(1)} />
            </p>
            <p className='flex justify-end'>
              {(fieldSelected.name === 'Curve' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && (signalSelected === 'Curve' || signalSelected === 'CRV wallet'))) &&
              (
                direction[2] === true ?
                <>
                  1.00 sdCRV = 1.00 3sdCRV
                </> :
                <>
                  1.00 3sdCRV = 1.00 sdCRV
                </>
              )}
              {(fieldSelected.name === 'Convex' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Convex')) &&
              (
                direction[2] === true ?
                <>
                  1.00 vlBCVX = 1.00 3vlBCVX
                </> :
                <>
                  1.00 3vlBCVX = 1.00 vlBCVX
                </>
              )}
              {(fieldSelected.name === 'Bent' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Bent')) &&
              (
                direction[2] === true ?
                <>
                  1.00 vlBENT = 1.00 3vlBENT
                </> :
                <>
                  1.00 3vlBENT = 1.00 vlBENT
                </>
              )}
              <img loading="lazy" src={NavbarExchange} className='exchange-icon' alt='' onClick={() => updateDirection(2)} />
            </p>
          </div>
        </div>
        <hr className='my-[10px]' />
      </div>
      }
    </>
  )
}