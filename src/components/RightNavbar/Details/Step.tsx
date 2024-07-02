import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { StepListData } from '../../../types/types';

import { RootState } from '../../../store/store';
import { updateRightNavbarStepSelected } from '../../../store/actions/navbarAction';
import classNames from 'classnames';

type props = {
  step: StepListData
}

export default function Step({
  step
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const stepSelected = useSelector((state: RootState) => state.navbar.rightNavbarStepSelected);
  const isActive = (step.index <= stepSelected.index ? true : false)

  return (
    <div
      className={
        classNames(
          'crv-distribute step pt-[0px!important]',
          isActive ? 'active' : ''
        )
      }
      onClick={() => {
        dispatch(updateRightNavbarStepSelected(step))
      }}
    >
      <img loading="lazy"
        src={step.image}
        className={
          isActive ?
          'border-[2px] border-[solid] rounded-full border-[white]' :
          'border-[2px] border-[solid] rounded-full border-[#00FFF0]'
        }
        alt=''
      />
      {/* {isActive ?
      <p className='mb-[5px]'>{step.type}</p> :
      <p className='mb-[5px]'>sdfsdf</p>} */}
      {isActive ?
      <span className='text-[8px] text-[#FFFFFF] font-[500] leading-[25px]'>{step.type}</span>:
      <span className='text-[8px] text-[#00FFF0] font-[500] leading-[25px]'>{step.type}</span>}
    </div>
  )
}