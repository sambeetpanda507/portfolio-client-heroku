import React, { createContext, FC, useState } from 'react'
import { UserType } from '../types'

interface IInitialState {
  user: UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  auth: boolean
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<IInitialState>({} as IInitialState)

export const AuthProvider: FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null)
  const [auth, setAuth] = useState<boolean>(false)

  return (
    <AuthContext.Provider value={{ user, setUser, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
