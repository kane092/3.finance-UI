import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateRightNavbarSubTabSelected } from '../../../store/actions/navbarAction';

import { SubTabType } from "../../../types/types";
import classNames from 'classnames';

type props = {
  subTabType: SubTabType
  subTabLabel: string
  id: string
}

export default function SubTab({
  subTabType,
  subTabLabel,
  id
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);

  return (
    <span
      id={id}
      className={classNames(
        'cursor-pointer text-[18px] ml-[20px]',
        subTabSelected === subTabType ? 'text-white' : 'text-[#00FFF0]'
      )}
      onClick={() => dispatch(updateRightNavbarSubTabSelected(subTabType))}
    >
      {subTabLabel}
    </span>
  )
}