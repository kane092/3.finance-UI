import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { RootState } from '../store/store';
import { updateRightNavbarCurValue } from '../store/actions/navbarAction';

import '../assets/scss/InputWithPercentage.scss';

const textFieldStyle:React.CSSProperties[] = [
  { // Validated
    width: "100%",
    height: "50px",
    border: "2px solid #61F8EF",
    borderRadius: '9px',
    color: 'white',
    fontSize: '27px',
    textAlign: 'right',
  },
  { // Not Validated
    width: "100%",
    height: "50px",
    border: "2px solid #61F8EF",
    borderRadius: '9px',
    color: 'red',
    fontSize: '27px',
    textAlign: 'right',
  },
  { // Disabled
    width: "100%",
    height: "50px",
    border: "2px solid #63717A",
    borderRadius: '9px',
    color: '#63717A',
    fontSize: '27px',
    textAlign: 'right',
  }
]

interface Asset {
  symbol: string
  amount: number
}

type props = {
  asset: Asset | undefined
  disabled: boolean
  value: number
  setValue: Function
}

export default function InputWithPercentage({
  asset,
  disabled,
  value,
  setValue
}: props) {

  function changePercentage (percent: number) {
    if (asset && value <= asset?.amount && asset?.amount !== 0) setValue(asset.amount * percent / 100)
  }

  return (
    <div className='my-[20px]'>
      <FormControl variant="outlined">
        <OutlinedInput
          id="outlined-adornment-weight"
          type="number"
          startAdornment={
            <InputAdornment
              position="start"
              sx={disabled ?
              {
                '& .MuiTypography-root': {
                  color: '#63717A !important',
                  fontSize: '18px',
                },
              }:
              {
                '& .MuiTypography-root': {
                  color: 'white !important',
                  fontSize: '18px',
                },
              }}
            >
              
              {asset === undefined ? "No asset selected" : asset.symbol}
            </InputAdornment>
          }
          style={disabled ?
            textFieldStyle[2] :
            ((asset && value > asset?.amount) || asset?.amount === 0) ? textFieldStyle[1] : textFieldStyle[0]
          }
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          value={value >= 0 ? value : 0}
          onChange={(event) => {
            setValue(Number(event.target.value))
          }}
          readOnly={disabled}
        />
      </FormControl>
      <div className='flex justify-between mt-[10px] text-[14px]'>
        {(!asset || (asset && value <= asset?.amount && asset?.amount !== 0)) &&
        <>
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => changePercentage(25)}
          >
            25%
          </span>
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => changePercentage(50)}
          >
            50%
          </span>
          
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => changePercentage(75)}
          >
            75%
          </span>
        </>
        }
        {(asset && value > asset?.amount || asset?.amount === 0) &&
        <span className='text-[#FF0000]'>You have exceeded your availability limit.</span>}
        <span
          className={
          disabled ?
          'text-[#63717A] cursor-not-allowed' :
          (asset && value >= asset?.amount) ? 'text-[#C3D6E2] cursor-pointer' : 'text-[#00FFF0] cursor-pointer'}
          onClick={() => changePercentage(100)}
        >
            MAX
        </span>
      </div>
    </div>
  )
}