import { FC, useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { errorLog } from '../../../utils/logger'
import { UserType, ProductType } from '../../../types'
import { AuthContext } from '../../../context/AuthContext'
import { ShoeContext } from '../../../context/ShoeContext'
import { AlertContext } from '../../../context/AlertContext'
import Navbar from '../../../components/Shoes/Navbar'
import Image from 'next/image'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { motion, Variants } from 'framer-motion'
import axios from 'axios'

type DetailsPropType = {
  user: UserType
  auth: boolean
  product: ProductType
}

//CSS
const styles = {
  cardContainer:
    'bg-white rounded-md shadow-md overflow-hidden max-w-sm mx-auto my-4 md:w-[95%]',
  imgContainer: 'h-60 relative',
  cardContentContainer: 'px-2 py-4',
  price: {
    text: 'font-semibold',
    span: 'text-red-500',
  },
  title: 'text-xl font-bold',
  btnGroup: {
    container: 'mt-2 flex flex-wrap gap-2',
    btn: 'w-full lg:w-fit',
  },
}

//VARIANTS
const cardVariants: Variants = {
  hidden: {
    y: '-200vh',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.25,
      type: 'spring',
    },
  },
}

const Details: FC<DetailsPropType> = (props) => {
  const { user, auth, product } = props
  const { setUser, setAuth, auth: isLoggedIn } = useContext(AuthContext)
  const { cart, setCart } = useContext(ShoeContext)
  const { setSeverity, setMessage, setShow } = useContext(AlertContext)
  const router = useRouter()

  useEffect(() => {
    let willUnmount: boolean = false

    if (willUnmount === false) {
      setUser(user)
      setAuth(auth)
    }

    return () => {
      willUnmount = true
    }
  }, [user, auth, setUser, setAuth])

  //FUNCTION: ADD TO CART
  const addToCart = () => {
    const foundIndex = cart.findIndex((c) => router.query.id === c._id)

    if (foundIndex > -1) {
      setMessage('Already added to cart')
      setSeverity('warning')
      setShow(true)
      return
    }

    setCart((prev) => {
      const { _id, img, title, mrp, price } = product
      return [...prev, { _id, img, title, mrp, price, count: 1 }]
    })
    //ALERT: SUCCESS
    setMessage('Added To Cart')
    setSeverity('success')
    setShow(true)
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Navbar>
        <section className="p-4 mt-[70px] md:mt-0">
          {/*---CARD CONTAINER---*/}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={styles.cardContainer}
          >
            {/*---IMAGE CONTAINER---*/}
            <div className={styles.imgContainer}>
              <Image
                alt="details image"
                src={product.img}
                layout="fill"
                className="object-cover"
              />
            </div>
            {/*---CONTENT CONTAINER---*/}
            <div className={styles.cardContentContainer}>
              <p className={styles.title}>{product.title}</p>
              <p
                style={{ textDecoration: 'line-through' }}
                className={styles.price.text}
              >
                M.R.P&#58;&nbsp; &#8377; {product.price}
              </p>
              <p className={styles.price.text}>
                Price&#58;&nbsp;{' '}
                <span className={styles.price.span}>&#8377; {product.mrp}</span>
              </p>
              <p className={styles.price.text}>
                You Save&#58;&nbsp;
                <span className={styles.price.span}>
                  &#8377; {product.price - product.mrp} &#40;
                  {Math.floor(
                    ((product.price - product.mrp) / product.price) * 100
                  )}
                  &#37;&#41;
                </span>
              </p>
              <p className="mt-4">{product.details}</p>
              {/*--- BUTTON GROUP ---*/}
              <div className="mt-4">
                <Button
                  variant="outlined"
                  color="primary"
                  aria-label="details button"
                  fullWidth={true}
                  onClick={addToCart}
                  disabled={!isLoggedIn}
                >
                  Add to cart
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
      </Navbar>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //FETCH PRODUCTS DATA
  const productId = context.query?.id

  const product = await axios.get(
    `${process.env.BASE_URI}/api/products/${productId}`
  )

  //parse the cookies
  const { refreshToken } = parseCookies(context)

  //if not refresh token present
  if (!refreshToken) {
    return {
      props: {
        auth: false,
        user: null,
        product: product.data.product,
      },
    }
  }

  try {
    //check valid refresh_token
    const res = await axios.get(`${process.env.BASE_URI}/api/getAccessToken`, {
      headers: {
        Cookie: `refreshToken=${refreshToken};`,
      },
    })

    if (res.status !== 200) {
      return {
        props: {
          auth: false,
          user: null,
          product: product.data.product,
        },
      }
    }

    //store auth and user in context
    return {
      props: {
        auth: res.data.auth,
        user: res.data.userData,
        product: product.data.product,
      },
    }
  } catch (e: any) {
    errorLog(e.message, 'shoes shop details page')

    return {
      props: {
        auth: false,
        user: null,
        product: product.data.product,
      },
    }
  }
}

export default Details
