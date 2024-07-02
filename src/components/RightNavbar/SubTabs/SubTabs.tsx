import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import SubTab from "./SubTab";

export default function SubTabs() {
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);

  return (
    <div className={'RightNavbar-SubTabs RightNavbar-SubTabs-' + subTabSelected + ' relative'}>
      {(subTabSelected === "Mint" || subTabSelected === "Burn" || subTabSelected === "NFTs") &&
      <>
        <SubTab subTabType='Mint' subTabLabel='Mint' id="Mint" />
        <SubTab subTabType='Burn' subTabLabel='Burn' id="Burn" />
        <SubTab subTabType='NFTs' subTabLabel='NFTs' id="NFTs" />
      </>}
      {(subTabSelected === "Zap" || subTabSelected === "Deposit" || subTabSelected === "Withdraw") &&
      <>
        <SubTab subTabType='Zap' subTabLabel='Zap' id="Zap" />
        <SubTab subTabType='Deposit' subTabLabel='Deposit' id="Deposit" />
        <SubTab subTabType='Withdraw' subTabLabel='Withdraw' id="Withdraw" />
      </>}
      {(subTabSelected === "Help" || subTabSelected === "Currency" || subTabSelected === "Signals") &&
      <>
        <SubTab subTabType='Help' subTabLabel='Help' id="Help" />
        <SubTab subTabType='Currency' subTabLabel='Currency' id="Currency" />
        <SubTab subTabType='Signals' subTabLabel='Signals' id="Signals" />
      </>}
      {(subTabSelected === "Merge" || subTabSelected === "BurnNFT") &&
      <>
        <SubTab subTabType='Merge' subTabLabel='Merge' id="Merge" />
        <SubTab subTabType='BurnNFT' subTabLabel='Burn' id="BurnNFT" />
      </>}
      {(subTabSelected === "Harvest" || subTabSelected === "Claim") &&
      <>
        <SubTab subTabType='Harvest' subTabLabel='Harvest' id="Harvest" />
        <SubTab subTabType='Claim' subTabLabel='Claim' id="Claim" />
      </>}
      {(subTabSelected === "Distribute" || subTabSelected === "Manage" || subTabSelected === "ClaimNFT") &&
      <>
        <SubTab subTabType='Distribute' subTabLabel='Distribute' id="Distribute" />
        <SubTab subTabType='Manage' subTabLabel='Manage' id="Manage" />
        <SubTab subTabType='ClaimNFT' subTabLabel='Claim' id="ClaimNFT" />
      </>}
    </div>
  )
}