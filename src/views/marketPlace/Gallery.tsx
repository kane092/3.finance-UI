import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import Grid from '@mui/material/Unstable_Grid2';

import { RootState } from 'store/store';
import {
  updateRightNavbarShow,
  updateRightNavbarTabSelected,
  updateRightNavbarSubTabSelected,
//   updateLeftNavbarGrid,
//   updateBodyContentGrid
} from 'store/actions/navbarAction';

import type { FieldType } from 'types/types';

import { getFieldLP } from 'utils/utils';

import Field from 'components/Field';
import PossibleLiquidityField from 'components/PossibleLiquidityField';
import SpecialField from 'components/SpecialField';
import MorePools from 'components/MorePools';

import ArrowRight from 'assets/images/arrow-right.png';
// import FilterIcon from 'assets/images/filter.png';
// import SearchIcon from 'assets/images/search.png';
import 'assets/scss/Deposits.scss';
import LightToolTip from 'components/LightToolTip';
import { useLocation, useParams } from 'react-router-dom';
import { updateFieldSelected, updatePathName } from 'store/actions/globalAction';

const emptyField: FieldType = {
  "name": "",
  "type": ""
}

export default function Gallery() {
  const dispatch: Dispatch<any> = useDispatch();
  // const location = useLocation()
  const { search } = useLocation(); 
  const { testvalue } = useParams();
  const [showLiquidDeposits, setShowLiquidDeposits] = useState(false);
  const [myLiquidDepositsCount, setMyLiquidDepositsCount] = useState(0);
  const [possibleLiquidDepositsCount, setPossibleLiquidDepositsCount] = useState(0);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const rightNavbarShow = useSelector((state: RootState) => state.navbar.rightNavbarShow);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const leftNavbarPageSelectedHistory = useSelector((state: RootState) => state.navbar.leftNavbarPageSelectedHistory);
  let tmp = 0;
  let specialFieldFlag = false;
  let animClass = '';
  const historyLen = leftNavbarPageSelectedHistory.length;
  leftNavbarPageSelectedHistory[historyLen - 1] > leftNavbarPageSelectedHistory[historyLen - 3] && (animClass = 'bottom-animation');
  leftNavbarPageSelectedHistory[historyLen - 1] < leftNavbarPageSelectedHistory[historyLen - 3] && (animClass = 'top-animation');

  const showSpecialField = (field: FieldType) => {
    if (rightNavbarShow !== 'Opened') return false;
    if (walletConnected !== 'Connected') return false;
    if (field.type !== '3FiCollateral') return false;

    if ((subTabSelected === "NFTs" && fiTVL && curveTVL) || (subTabSelected === "Merge" && maxValue > 0)) {
      /**
       * Do not show special field if the NFT has value
       */
      let flag = false;
      if (field.depositsFullName === "3Fi NFTs - " + nftSelected.name && !field.depositsLP) {
        flag = true;
        specialFieldFlag = true;
      }
      return flag;
    }
    return false;
  }

  useEffect(() => {
    if (new URLSearchParams(search).get('from') === "Dashboard") {
      fieldData.filter((field: FieldType) => {
        if (field.symbol === "3FiToken") {
            dispatch(updateFieldSelected(field))
            dispatch(updateRightNavbarTabSelected("Actions"))
            dispatch(updateRightNavbarSubTabSelected("NFTs"))
            dispatch(updateRightNavbarShow("Opened"))
            // if (leftNavbarShow === "Minimized") {
            //   dispatch(updateLeftNavbarGrid(1));
            //   dispatch(updateBodyContentGrid(8));
            // }
            dispatch(updatePathName('/deposits'))
        }
      })
    }
  }, []);
  
//   useEffect(() => {
//     switch (leftNavbarShow) {
//       case "Opened":
//         dispatch(updateLeftNavbarGrid(4));
//         dispatch(updateBodyContentGrid(8));
//         break;
//       case "Collapsed":
//         dispatch(updateLeftNavbarGrid(1));
//         dispatch(updateBodyContentGrid(10));
//         break;
//       case "Minimized":
//         switch (rightNavbarShow) {
//           case "Opened":
//             dispatch(updateLeftNavbarGrid(1));
//             dispatch(updateBodyContentGrid(8));
//             break;
//           case "Minimized":
//             dispatch(updateLeftNavbarGrid(1));
//             dispatch(updateBodyContentGrid(10));
//             break;
//         }
//         break;
//     }
//   }, [])

  useEffect(() => {
    let tmp = fieldData.filter((field: FieldType) => {
      return field.type === 'OtherFields' && field.depositsFlag && field.depositsLP;
    });
    setMyLiquidDepositsCount(tmp.length);

    tmp = fieldData.filter((field: FieldType) => {
      return field.type === 'OtherFields' && field.depositsFlag && !field.depositsLP;
    });
    setPossibleLiquidDepositsCount(tmp.length);
  }, [fieldData]);

  return (
    <div
      className={classNames(
        'Deposits p-[10px]',
        rightNavbarShow === "Opened" ? 'mx-[10px] md:mx-[30px]' : leftNavbarShow === "Opened" ? 'ml-[10px] md:ml-[30px] mr-[10px] md:mr-[70px] text-[10px]' : leftNavbarShow === "Collapsed" ? 'mx-[10px] md:ml-[100px] md:mr-[70px] text-[10px]' : 'mx-[10px] md:ml-[100px] md:mr-[70px] text-[10px]',
        animClass
      )}
    >
      <div>
        <p className="text-[14px] leading-[21px] mb-[13px]">Collections</p>
        <h1>3.NFT Preview.</h1>
        <hr />
      </div>
    </div>
  )
}