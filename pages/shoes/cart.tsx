import { FC, useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { errorLog } from '../../utils/logger'
import { UserType } from '../../types'
import { AuthContext } from '../../context/AuthContext'
import { ShoeContext } from '../../context/ShoeContext'
import { AlertContext } from '../../context/AlertContext'
import Navbar from '../../components/Shoes/Navbar'
import Head from 'next/head'
import CartCard from '../../components/Shoes/CartCard'
import CartEmpty from '../../components/Shoes/CartEmpty'
import { Button } from '@mui/material'
import axios from 'axios'

//TYPE
type CartPropsType = {
  auth: boolean
  user: UserType
}

//CSS
const styles = {
  container: 'px-4 md:px-0 py-[70px] md:py-2',
}

//FUNCTION: LOAD SCRIPT
function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script: HTMLScriptElement = document.createElement('script')
    script.src = src
    document.body.appendChild(script)

    script.onload = () => {
      return resolve(true)
    }

    script.onerror = () => {
      return resolve(false)
    }
  })
}

//MAIN COMPONENT
const Cart: FC<CartPropsType> = (props) => {
  const { auth, user } = props
  const { setAuth, setUser } = useContext(AuthContext)
  const { cart, totalAmount, setCart } = useContext(ShoeContext)
  const { setShow, setMessage, setSeverity } = useContext(AlertContext)

  //SIDE EFFECT
  useEffect(() => {
    let willUnmount: boolean = false

    if (!willUnmount) {
      setAuth(auth)
      setUser(user)
    }

    return () => {
      willUnmount = true
    }
  }, [user, setUser, auth, setAuth])

  //LOAD RAZOR PAY SCRIPT
  useEffect(() => {
    const src: string = 'https://checkout.razorpay.com/v1/checkout.js'
    loadScript(src)
      .then((isScriptLoaded) => {
        console.log('payment gateway init: ', isScriptLoaded)
      })
      .catch((e: any) => {
        console.error(e.message)
      })

    return () => {
      //REMOVE SCRIPT AND RAZOR PAY CONTAINER ON UNMOUNT
      const scripts: HTMLCollectionOf<HTMLScriptElement> =
        document.getElementsByTagName('script')
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === src) {
          scripts[i].remove()
          const razorpayContainer = document.querySelector(
            '.razorpay-container'
          )
          if (razorpayContainer) razorpayContainer.remove()
          break
        }
      }
    }
  }, [])

  //FUNCTION: CHECK A SCRIPT PRESENT IN DOM OR NOT
  const isScriptPresent = (url: string): boolean => {
    const scripts: HTMLCollectionOf<HTMLScriptElement> =
      document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src === url) {
        return true
      }
    }
    return false
  }

  //FUNCTION: CLEAR CART
  const clearCart = () => {
    setCart([])
  }

  //FUNCTION: STORE PAYMENT DATA IN DB
  const storePaymentData = async (paymentId: string) => {
    try {
      const paymentRes = await axios.post('/api/paymentData', {
        paymentId,
        cart,
      })
      setMessage(paymentRes.data.message)
      setSeverity('success')
      setShow(true)
      clearCart()
    } catch (e: any) {
      setMessage(e?.response?.data?.error?.message ?? e.message)
      setSeverity('error')
      setShow(true)
    }
  }

  //FUNCTION: CHECKOUT HANDLER
  const handleCheckout = async () => {
    //FETCH ORDER ID
    try {
      //IF PAYMENT GATEWAY NOT LOADED
      if (!isScriptPresent('https://checkout.razorpay.com/v1/checkout.js'))
        return window.alert('Payment gateway failed to lead.')

      //FETCH ORDER ID
      const paymentRes = await axios.post('/api/razorpay', {
        amount: totalAmount,
        email: user?.email,
      })
      window.alert(paymentRes.data.message)

      //OPTIONS
      const options = {
        key: process.env.NEXT_PUBLIC_RZ_PAY_API_KEY,
        amount: totalAmount * 100,
        currency: 'INR',
        name: 'Shoes Checkout',
        description: 'make payment',
        image: process.env.NEXT_PUBLIC_FAVICON!,
        order_id: paymentRes.data.orderId,
        handler: async function (response: any) {
          alert(response.razorpay_payment_id)
          await storePaymentData(response.razorpay_payment_id)
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: '#e6192e',
        },
        readonly: {
          email: true,
          name: true,
        },
      }
      const _window = window as any
      const rzp = new _window.Razorpay(options)
      rzp.open()
    } catch (e: any) {
      console.log(e.message)
    }
  }

  return (
    <Navbar>
      <>
        <Head>
          <title>Cart</title>
        </Head>
        <section className={styles.container}>
          {cart.length === 0 ? (
            <CartEmpty />
          ) : (
            cart.map((c) => {
              return (
                <CartCard
                  key={c._id}
                  _id={c._id}
                  price={c.price}
                  mrp={c.mrp}
                  title={c.title}
                  img={c.img}
                  count={c.count}
                />
              )
            })
          )}
          {totalAmount !== 0 && (
            <div className="text-center font-semibold text-2xl tracking-wider text-[#579f36] flex flex-wrap gap-2 w-full items-center justify-center mt-4">
              <p>Total Amount: {totalAmount}</p>
              <Button
                variant="contained"
                className="bg-blue-600"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          )}
        </section>
      </>
    </Navbar>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //PARSE THE COOKIES
  const { refreshToken } = parseCookies(context)

  //IF NOT REFRESH TOKEN PRESENT REDIRECT TO HOME PAGE
  if (!refreshToken) {
    return {
      redirect: {
        destination: '/shoes',
        permanent: false,
      },
    }
  }

  try {
    //CHECK VALID REFRESH_TOKEN
    const res = await axios.get(`${process.env.BASE_URI}/api/getAccessToken`, {
      headers: {
        Cookie: `refreshToken=${refreshToken};`,
      },
    })

    if (res.status !== 200) {
      return {
        redirect: {
          destination: '/shoes',
          permanent: false,
        },
      }
    }

    //STORE AUTH AND USER IN CONTEXT
    return {
      props: {
        auth: res.data.auth,
        user: res.data.userData,
      },
    }
  } catch (e: any) {
    errorLog(e.message, 'shoes cart page')
    return {
      redirect: {
        destination: '/shoes',
        permanent: false,
      },
    }
  }
}

export default Cart
