import { useState } from 'react'
import Cards from './Card'
import { Field } from 'react-final-form'
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from './CreditCard'
const FieldCard = ({ values, active }:any) => {
  return (
    <>
      <Cards
        number={values.number || ''}
        name={values.name || ''}
        expiry={values.expiry || ''}
        cvc={values.cvc || ''}
        focused={active}
      />
      <div>
        <Field
          name="number"
          component="input"
          type="text"
          pattern="[\d| ]{16,22}"
          placeholder="Card Number"
          format={formatCreditCardNumber}
          style={{ width: '100%', margin: '10px 0' }}
        />
      </div>
      <div>
        <Field
          style={{ width: '100%', margin: '10px 0' }}
          name="nameCard"
          component="input"
          type="text"
          placeholder="Name"
        />
      </div>
      <div>
        <Field
          name="expiry"
          component="input"
          type="text"
          pattern="\d\d/\d\d"
          placeholder="Valid Thru"
          format={formatExpirationDate}
          style={{ width: '48%', margin: '10px 8px 10px 0' }}
        />
        <Field
          name="cvc"
          component="input"
          type="text"
          pattern="\d{3,4}"
          placeholder="CVC"
          format={formatCVC}
          style={{ width: '48%', margin: '10px 0 10px 7px' }}
        />
      </div>
    </>
  )
}

export default FieldCard
