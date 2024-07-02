import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';

export default function Claim() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);

  return (
    <>
      {(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') ?
      <p className='RightNavbar-SubTab-Content'>
        Compound emissions are not claimable.<br />If you wish to retrieve compound assets, they must be withdrawn via the Deposits screens.
      </p> :
      <p className='RightNavbar-SubTab-Content'>
        On claim, liquid emissions will be transferred to the connected wallet. This action will reduce the speed at which your porfolio can compound.
      </p>}
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && 
      <div className='w-full'>
        {fieldSelected.receivedDepositPools ?
        <>
          <div className='flex justify-between my-[10px]'>
            <p>Emission status:</p>
            <p>Received by 6 deposit pools</p>
          </div>
          <hr className='my-[10px]' />
          <div className='flex justify-between mb-[10px]'>
            <p>Tokens accured: (CRV)</p>
            <p>1,234,567,890.00</p>
          </div>
          <div className='flex justify-between'>
            <p>Value accured: (USD)</p>
            <p>1,234,567,890.00</p>
          </div>
        </> :
        <div className='flex justify-between my-[10px]'>
          <p>Emission status:</p>
          <p className='text-red-600'>Not currently being received</p>
        </div>}
      </div>}
    </>
  )
}