import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../../store/store';
import { updateSignalSelected, updateFieldSelected } from '../../../store/actions/globalAction';

import type { SignalType } from '../../../types/types';

import NavbarEmissionPointer from '../../../assets/images/navbar-emission-pointer.png';

type props1 = {
  src: string
  isSelected: boolean
  disabled: boolean
}

function SignalImage({
  src,
  isSelected,
  disabled
}: props1) {
  return (
    <img loading="lazy"
      src={src}
      className={classNames(
        "border-[2px] rounded-full",
        (!isSelected && !disabled) ? 'border-[#00FFF0]' : ''
      )}
      alt=''
    />
  )
}

type props2 = {
  label: string
  isSelected: boolean
  disabled: boolean
}

function HarvestFieldLabel({
  label,
  isSelected,
  disabled
}: props2) {
  return (
    <p
      className={
        classNames(
          'text-[8px] leading-[10px] font-normal tracking-wider uppercase',
          (!isSelected && !disabled) ? 'text-[#00FFF0]' : ''
        )
      }
    >
      {label}
    </p>
  )
}

type props3 = {
  fieldType: SignalType
  disabled: boolean
  indicatorShow: boolean
}

export default function Signal({
  fieldType,
  disabled,
  indicatorShow
}: props3) {
  const dispatch: Dispatch<any> = useDispatch();
  const signalSaved = useSelector((state: RootState) => state.global.signalSaved);
  const signalSelected = useSelector((state: RootState) => state.global.signalSelected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const signal = signalSelected === '' ? signalSaved : signalSelected;
  const getIsSelected = () => {
    if (subTabSelected === 'Signals' && signal === fieldType)
      return true;
    if (subTabSelected === 'Harvest' && fieldSelected.name === fieldType)
      if (fieldSelected.signalSelected) {
        if (fieldType === fieldSelected.signalSelected)
          return true;
      }
    if (subTabSelected === 'Harvest' && fieldSelected.name !== fieldType) {
      if (fieldSelected.signalSelected) {
        if (fieldType === fieldSelected.signalSelected)
          return true;
      } else {
        if (fieldSelected.name !== "SDT" && fieldType === signalSaved)
          return true;
        if (subTabSelected === 'Harvest' && fieldSelected.name === "SDT" && fieldType === "Bent")
          return true;
      }
    }
    return false;
  }
  const isSelected = getIsSelected();

  return (
    <div
      className={
        classNames(
          'flex flex-col items-center mr-[10px] md:mr-[20px] signal-item',
          disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
        )
      }
      onClick={() => {
        /**
         * No click event for disabled status
         */
        if (disabled) return;

        if (subTabSelected === 'Signals') {
          dispatch(updateSignalSelected(fieldType));
        } else if (subTabSelected === 'Harvest') {
          dispatch(updateFieldSelected({...fieldSelected, "signalSelected": fieldType}));
        }
      }}
    >
      {fieldType === "Curve" &&
      <SignalImage src='./images/token2.png' isSelected={isSelected} disabled={disabled} />}
      {fieldType === "Convex" &&
      <SignalImage src='./images/token3.png' isSelected={isSelected} disabled={disabled} />}
      {fieldType === "Bent" &&
      <SignalImage src='./images/token4.png' isSelected={isSelected} disabled={disabled} />}
      {fieldType === "CRV wallet" &&
      <img loading="lazy" className='special-signal' src={disabled ? './images/token14.png' : isSelected ? './images/token16.png' : './images/token15.png'} alt='' />}
      {
      /**
       * Show pointer if field is selected
       */
      isSelected && indicatorShow ?
      <img loading="lazy" src={NavbarEmissionPointer} className="my-[5px]" alt='' /> :
      <p className='h-[18px]'>&nbsp;</p>}
      {fieldType === "Curve" &&
      <HarvestFieldLabel label="Curve C.D.P" isSelected={isSelected} disabled={disabled} />}
      {fieldType === "Convex" &&
      <HarvestFieldLabel label="Convex C.D.P" isSelected={isSelected} disabled={disabled} />}
      {fieldType === "Bent" &&
      <HarvestFieldLabel label="Bent C.D.P" isSelected={isSelected} disabled={disabled} />}
      {fieldType === "CRV wallet" &&
      <HarvestFieldLabel label="3Fi Wallet" isSelected={isSelected} disabled={disabled} />}
    </div>
  )
}