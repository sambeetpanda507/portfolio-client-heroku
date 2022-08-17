import { AlertColor } from '@mui/material'
import React, { FC, createContext, useState } from 'react'
import { CustomAlert } from '../components/custom/Snackbar'

type initialStateType = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  severity: AlertColor | undefined
  setSeverity: React.Dispatch<React.SetStateAction<AlertColor | undefined>>
}

export const AlertContext = createContext<initialStateType>(
  {} as initialStateType
)

export const AlertProvider: FC<React.ReactNode> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined)
  return (
    <AlertContext.Provider
      value={{ show, setShow, message, setMessage, severity, setSeverity }}
    >
      <CustomAlert />
      {children}
    </AlertContext.Provider>
  )
}
