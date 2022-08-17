import React, {
  createContext,
  ReactElement,
  FC,
  useState,
  useEffect,
} from 'react'

type InitialStateType = {
  cart: CartType[]
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>
  totalAmount: number
}

type ShoeProviderPropType = {
  children: ReactElement
}

type CartType = {
  _id: string
  img: string
  mrp: number
  price: number
  count: number
  title: string
}

export const ShoeContext = createContext<InitialStateType>(
  {} as InitialStateType
)

export const ShoeProvider: FC<ShoeProviderPropType> = ({ children }) => {
  const [cart, setCart] = useState<CartType[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  useEffect(() => {
    let willUnmount: boolean = false

    if (!willUnmount) {
      let total = 0
      for (let c of cart) {
        total += c.mrp * c.count
      }
      setTotalAmount(total)
      total = 0
    }

    return () => {
      willUnmount = true
    }
  }, [cart])

  return (
    <ShoeContext.Provider value={{ cart, setCart, totalAmount }}>
      {children}
    </ShoeContext.Provider>
  )
}
