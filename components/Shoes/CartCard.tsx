import { FC, useContext } from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import { Add, Remove } from '@mui/icons-material'
import { ShoeContext } from '../../context/ShoeContext'

type CartCardPropType = {
  img: string
  _id: string
  title: string
  mrp: number
  price: number
  count: number
}

export const CartCard: FC<CartCardPropType> = (props) => {
  const { img, title, mrp, price, count, _id } = props
  const { setCart, cart } = useContext(ShoeContext)

  const handleAdd = () => {
    setCart((prev) => {
      return prev.map((c) => {
        return c._id === _id ? { ...c, count: c.count + 1 } : { ...c }
      })
    })
  }

  const handleRemove = () => {
    const count = cart.filter((c) => c._id === _id)[0].count
    if (count === 1) return
    setCart((prev) => {
      return prev.map((c) => {
        return c._id === _id ? { ...c, count: c.count - 1 } : { ...c }
      })
    })
  }

  const handleRemoveFromCart = () => {
    setCart((prev) => {
      return prev.filter((p) => p._id !== _id)
    })
  }

  return (
    <div className="flex max-w-2xl mx-auto my-4 gap-4 bg-white p-4 rounded-md shadow-md">
      <div className="relative w-full max-w-sm border-2 border-gray-200 rounded-md">
        <Image
          alt="cart shoe image"
          src={img}
          layout="fill"
          className="object-cover rounded-md"
        />
      </div>
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p style={{ textDecoration: 'line-through' }} className="font-semibold">
          M.R.P&#58;&nbsp; &#8377; {price}
        </p>
        <p className="font-semibold">
          Price&#58;&nbsp; <span className="text-red-500">&#8377; {mrp}</span>
        </p>
        <p className="font-semibold">
          You Save&#58;&nbsp;
          <span className="text-red-500">
            &#8377; {price - mrp} &#40;
            {Math.floor(((price - mrp) / price) * 100)}
            &#37;&#41;
          </span>
        </p>
        <div className="flex justify-between items-center gap-2 my-2 font-semibold">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={handleAdd}
            className="bg-green-600"
          >
            <Add fontSize="small" />
          </Button>
          <div className="border-2 border-red-500 p-2 w-10 text-center h-7 flex justify-center items-center">
            {count}
          </div>
          <Button
            variant="contained"
            color="warning"
            size="small"
            onClick={handleRemove}
            className="bg-orange-600"
          >
            <Remove fontSize="small" />
          </Button>
        </div>
        <Button
          variant="contained"
          color="error"
          fullWidth={true}
          className="capitalize bg-red-600"
          onClick={handleRemoveFromCart}
        >
          Remove from cart
        </Button>
      </div>
    </div>
  )
}

export default CartCard
