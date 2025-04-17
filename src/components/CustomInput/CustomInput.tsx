import React from 'react'
import styles from './CustomInput.module.scss'

interface CustomInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  icon: React.ReactNode
}

function CustomInput(props: CustomInputProps) {
  return (
    <div className={styles['custom-input']}>
      {props.icon}
      <input {...props} />
    </div>
  )
}

export default CustomInput
