import {
  LEFT_NAVBAR_SHOW,
  LEFT_NAVBAR_PAGE_SELECTED,
  RIGHT_NAVBAR_SHOW,
  RIGHT_NAVBAR_TAB_SELECTED,
  RIGHT_NAVBAR_SUB_TAB_SELECTED,
  RIGHT_NAVBAR_MAX_VALUE,
  RIGHT_NAVBAR_CUR_VALUE,
  RIGHT_NAVBAR_NFT_SELECTED,
  RIGHT_NAVBAR_ASSET_SELECTED,
  RIGHT_NAVBAR_EMISSION_SELECTED,
  RIGHT_NAVBAR_STEP_SELECTED,
  RIGHT_NAVBAR_DEPOSIT_VALUE,
  RIGHT_NAVBAR_INDICATOR_FLAG,
  DEPOSIT_DATA
} from '../actionTypes';

import {
  ReduxDispatchType,
  Navbar,
  TabType,
  SubTabType,
  NFTData,
  Page,
  EmissionListData,
  StepListData,
  SignalType,
  DepositData
} from '../../types/types';

export const updateLeftNavbarShow = (show: Navbar) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: LEFT_NAVBAR_SHOW,
    payload: show
  })
}

export const updateLeftNavbarPageSelected = (selected: Page) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: LEFT_NAVBAR_PAGE_SELECTED,
    payload: selected
  })
}

export const updateRightNavbarShow = (show: Navbar) => (dispatch: ReduxDispatchType) => {
  // Hide LeftNavbar when RightNavbar opens
  if (show === "Opened") {
    dispatch({
      type: LEFT_NAVBAR_SHOW,
      payload: "Minimized"
    });
  }

  dispatch({
    type: RIGHT_NAVBAR_SHOW,
    payload: show
  })
}

export const updateRightNavbarTabSelected = (selected: TabType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_TAB_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarSubTabSelected = (selected: SubTabType) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_SUB_TAB_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarMaxValue = (value: number) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_MAX_VALUE,
    payload: value,
  })
}

export const updateRightNavbarCurValue = (value: number) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_CUR_VALUE,
    payload: value,
  })
}

export const updateRightNavbarNFTSelected = (selected: NFTData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_NFT_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarAssetSelected = (selected: string) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_ASSET_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarEmissionSelected = (selected: EmissionListData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_EMISSION_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarStepSelected = (selected: StepListData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_STEP_SELECTED,
    payload: selected,
  })
}

export const updateRightNavbarDepositValue = (value: number[]) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_DEPOSIT_VALUE,
    payload: value,
  })
}

export const updateRightNavbarIndicatorFlag = (flag: boolean) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: RIGHT_NAVBAR_INDICATOR_FLAG,
    payload: flag,
  })
}

export const updateDepositData = (data: DepositData) => (dispatch: ReduxDispatchType) => {
  dispatch({
    type: DEPOSIT_DATA,
    payload: data,
  })
}