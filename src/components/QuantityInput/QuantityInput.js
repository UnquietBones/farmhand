import React from 'react'
import { func, number } from 'prop-types'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import NumberFormat from 'react-number-format'
import TextField from '@material-ui/core/TextField'

import AnimatedNumber from '../AnimatedNumber'

import { integerString } from '../../utils'

import './QuantityInput.sass'

const QuantityNumberFormat = ({ inputRef, min, max, onChange, ...rest }) => (
  <NumberFormat
    isNumericString
    thousandSeparator
    {...{
      ...rest,
      allowNegative: false,
      decimalScale: 0,
      onValueChange: ({ floatValue = 0 }) =>
        onChange(Math.min(floatValue, max)),
    }}
  />
)

const QuantityTextInput = ({
  handleSubmit,
  handleUpdateNumber,
  maxQuantity,
  value,
}) => (
  <TextField
    {...{
      value,
      inputProps: {
        pattern: '[0-9]*',
        min: 0,
        max: maxQuantity,
      },
      onChange: handleUpdateNumber,
      // Bind to keyup to prevent spamming the event handler.
      onKeyUp: ({ which }) => {
        // Enter
        if (which === 13) {
          handleSubmit()
        }
      },

      InputProps: {
        inputComponent: QuantityNumberFormat,
      },
    }}
  />
)

const QuantityInput = ({
  handleSubmit,
  handleUpdateNumber,
  maxQuantity,
  setQuantity,
  value,
}) => (
  <div className="QuantityInput">
    <QuantityTextInput
      {...{ handleSubmit, handleUpdateNumber, maxQuantity, value }}
    />
    <span className="quantity">
      /{' '}
      <AnimatedNumber {...{ number: maxQuantity, formatter: integerString }} />
    </span>
    <div className="number-nudger-container">
      <Fab
        {...{
          'aria-label': 'Increment',
          color: 'primary',
          onClick: () => setQuantity(++value > maxQuantity ? 1 : value),
          size: 'small',
        }}
      >
        <KeyboardArrowUp />
      </Fab>
      <Fab
        {...{
          'aria-label': 'Decrement',
          color: 'primary',
          onClick: () => setQuantity(--value === 0 ? maxQuantity : value),
          size: 'small',
        }}
      >
        <KeyboardArrowDown />
      </Fab>
    </div>
  </div>
)

QuantityInput.propTypes = {
  handleSubmit: func.isRequired,
  handleUpdateNumber: func.isRequired,
  maxQuantity: number.isRequired,
  setQuantity: func.isRequired,
  value: number.isRequired,
}

export default QuantityInput
