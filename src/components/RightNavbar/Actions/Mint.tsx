import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';

import { getFieldLP } from '../../../utils/utils';
import NumberField from '../../NumberField';

export default function Mint() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const convexTVL = getFieldLP(fieldData, 2);
  const bentTVL = getFieldLP(fieldData, 3);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);

  return (
    <>
      <div className='RightNavbar-SubTab-Content'><p className="mb-[10px]">Use C.D.P. LP positions to mint 3Fi tokens.</p><p>3Fi tokens maintain all emission accruals and gain governance and voting rights over 3.Finance.</p></div>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" && 
      <div className='w-full'>
        <div className='text-[14px] my-[10px]'>
        Mint 3Fi governance tokens:
          <div className='flex text-[#C3D6E2] my-[10px]'>
            <img loading="lazy" src='./images/token1.png' alt='' />
            <div className='ml-[10px]'>
              <p className='mb-[5px]'>3Fi (Curve)</p>
              <p className={fiTVL ? 'text-left' : 'text-left text-red-600'}>{fiTVL ? <NumberField value={fiTVL} digit={2} /> : "No balance"}</p>
            </div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Available vlBCVX: (A)</div>
            <div className={convexTVL ? 'text-right' : 'text-right text-red-600'}>{convexTVL ? <NumberField value={convexTVL} digit={2} /> : "No balance"}</div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Available vlBENT: (B)</div>
            <div className={bentTVL ? 'text-right' : 'text-right text-red-600'}>{bentTVL ? <NumberField value={bentTVL} digit={2} /> : "No balance"}</div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Mint requirement: (A:B)</div>
            <div>1:1</div>
          </div>
          <hr className='mb-[5px] border-[#CCCCCC]/[0.23]' />
          <div className='flex justify-between mb-[5px]'>
            <div>Mint limited based on availability:</div>
            <div className={maxValue ? ((curValue > maxValue) ? 'text-right text-red-600' : 'text-right') : 'text-right text-red-600'}><NumberField value={maxValue} digit={2}/></div>
          </div>
        </div>
      </div>}
    </>
  )
}