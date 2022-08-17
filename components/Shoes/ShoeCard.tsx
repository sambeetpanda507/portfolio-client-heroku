import { FC, useContext } from 'react'
import Image from 'next/image'
import { Button } from '@mui/material'
import { ProductType } from '../../types'
import { useRouter } from 'next/router'
import { ShoeContext } from '../../context/ShoeContext'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'
import { motion, Variants } from 'framer-motion'

//CSS
const styles = {
  cardContainer:
    'bg-white rounded-md shadow-md overflow-hidden max-w-sm mx-auto my-4 md:w-[95%]',
  imgContainer: 'h-48 relative',
  cardContentContainer: 'px-2 py-4',
  price: {
    text: 'font-semibold',
    span: 'text-red-500',
  },
  title: 'text-xl font-bold',
  btnGroup: {
    container: 'mt-2 flex flex-wrap lg:flex-nowrap gap-2 justify-between',
    btn: 'w-full text-sm capitalize',
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay: 0.24,
      type: 'spring',
    },
  },
}

const ShoeCard: FC<ProductType> = (props) => {
  const router = useRouter()
  const { img, title, mrp, price, _id } = props
  const { cart, setCart } = useContext(ShoeContext)
  const { setSeverity, setMessage, setShow } = useContext(AlertContext)
  const { auth } = useContext(AuthContext)

  const handleDetails = () => {
    router.push(`/shoes/shop/${_id}`)
  }

  const addToCart = () => {
    const foundIndex = cart.findIndex((c) => _id === c._id)

    if (foundIndex > -1) {
      setMessage('Already added to cart')
      setSeverity('warning')
      setShow(true)
      return
    }

    setCart((prev) => {
      return [...prev, { _id, img, title, mrp, price, count: 1 }]
    })

    //ALERT: SUCCESS
    setMessage('Added To Cart')
    setSeverity('success')
    setShow(true)
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={styles.cardContainer}
    >
      {/*--- CARD IMAGE CONTAINER ---*/}
      <div className={styles.imgContainer}>
        <Image
          src={img}
          layout="fill"
          alt="shoe image"
          className="object-cover"
        />
      </div>
      {/*--- CARD CONTENT ---*/}
      <div className={styles.cardContentContainer}>
        <p className={styles.title}>{title}</p>
        <p
          style={{ textDecoration: 'line-through' }}
          className={styles.price.text}
        >
          M.R.P&#58;&nbsp; &#8377; {price}
        </p>
        <p className={styles.price.text}>
          Price&#58;&nbsp;{' '}
          <span className={styles.price.span}>&#8377; {mrp}</span>
        </p>
        <p className={styles.price.text}>
          You Save&#58;&nbsp;
          <span className={styles.price.span}>
            &#8377; {price - mrp} &#40;
            {Math.floor(((price - mrp) / price) * 100)}
            &#37;&#41;
          </span>
        </p>
        {/*--- BUTTON GROUP ---*/}
        <div className={styles.btnGroup.container}>
          <Button
            variant="outlined"
            color="error"
            aria-label="details button"
            className={styles.btnGroup.btn}
            onClick={handleDetails}
          >
            Get Details
          </Button>
          <Button
            variant="outlined"
            color="primary"
            aria-label="details button"
            className={styles.btnGroup.btn}
            onClick={addToCart}
            disabled={!auth}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ShoeCard
