import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';

import { getFieldLP } from '../../../utils/utils';
import NumberField from '../../NumberField';

export default function Burn() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>Burn 3Fi tokens to retrieve C.D.P. L.P positions. Note: Governance and voting rights will be lost.</p>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && 
      <>
        <div className='text-[14px] my-[10px] w-full'>
          Burn 3Fi governance tokens:
          <div className={fiTVL ? 'flex my-[10px]' : 'flex text-[#C3D6E2] my-[10px]'}>
            <img loading="lazy" src='./images/token1.png' alt='' />
            <div className='ml-[10px]'>
              <p className='mb-[5px]'>3Fi (Curve)</p>
              <p className={maxValue ? 'text-left' : 'text-left text-red-600'}>{maxValue ? <NumberField value={maxValue} digit={2} /> : "No balance"}</p>
            </div>
          </div>
          <hr className='mb-[10px]' />
          
          {!fiTVL ?
          <p>You Don’t have any 3Fi tokens yet.</p> :
          <>
            <div className='flex justify-between mb-[5px]'>
              <div>Burn output per 3Fi token of type:</div>
              <div>3FiC</div>
            </div>
            <div className='flex justify-between mb-[5px]'>
              <div>Receivables: (vlBCVX : vlBENT)</div>
              <div>1:1</div>
            </div>
            <div className='flex justify-between mb-[5px]'>
              <div>Burn Limit based on 3Fi availability:</div>
              <div className={fiTVL && curValue > maxValue ? 'text-right text-red-600' : 'text-right'}><NumberField value={maxValue} digit={2} /></div>
            </div>
          </>}
        </div>
      </>}
    </>
  )
}