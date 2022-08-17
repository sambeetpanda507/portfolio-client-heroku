import { FC, useEffect, useContext, useState } from 'react'
import Navbar from '../../components/Shoes/Navbar'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { errorLog } from '../../utils/logger'
import { UserType } from '../../types'
import { AuthContext } from '../../context/AuthContext'
import { AlertContext } from '../../context/AlertContext'
import axios from 'axios'

//TYPES
type OrderPropType = {
  user: UserType
  auth: boolean
}

type ordersType = {
  _id: string
  amount: number
  paymentId: string
  orders: {
    _id: string
    title: string
    count: number
    mrp: number
    price: number
  }[]
}

//CSS
const styles = {
  container: 'mt-[70px] md:mt-0 p-4',
  tableContainer: 'max-w-xl mx-auto my-4',
  paymentId: 'lg:text-lg mb-4 underline font-semibold tracking-wide',
  table: 'w-full text-center lg:text-lg',
}

//COMPONENT: MAIN
const Orders: FC<OrderPropType> = (props) => {
  const { user, auth } = props
  const { setUser, setAuth } = useContext(AuthContext)
  const { setShow, setSeverity, setMessage } = useContext(AlertContext)
  const [orders, setOrders] = useState<ordersType[]>([])

  //SIDE EFFECT: STORE USER AND AUTH IN CONTEXT
  useEffect(() => {
    let willUnmount: boolean = false

    if (!willUnmount) {
      setUser(user)
      setAuth(auth)
    }

    return () => {
      willUnmount = true
    }
  }, [setUser, user, setAuth, auth])

  //SIDE EFFECT: DATA FETCHING
  useEffect(() => {
    let willUnmount: boolean = false

    if (!willUnmount && user) {
      axios({
        method: 'POST',
        url: '/api/orders',
        data: { email: user.email },
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((orderDetails) => {
          setMessage(orderDetails.data.message)
          setSeverity('success')
          setShow(true)
          setOrders(orderDetails.data.orderDetails)
        })
        .catch((e: any) => {
          console.error(e.message)
          setSeverity('error')
          setMessage(e?.response?.data?.error?.message ?? e?.message)
          setShow(true)
        })
    }

    return () => {
      willUnmount = true
    }
  }, [user])

  return (
    <Navbar>
      <section className={styles.container}>
        {orders.map((order, j) => {
          return (
            <div key={order._id} className={styles.tableContainer}>
              <h1 className={styles.paymentId}>
                {j + 1}.Payment Id: {order._id}
              </h1>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>&#35;</th>
                    <th>Name</th>
                    <th>Count</th>
                    <th>M.R.P</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orders.map((o, i) => {
                    return (
                      <tr
                        key={o._id}
                        className="paymentTableRow odd:bg-zinc-400/50"
                      >
                        <td>{i + 1}</td>
                        <td>{o.title}</td>
                        <td>{o.count}</td>
                        <td>{o.price}</td>
                        <td>{o.mrp}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </section>
    </Navbar>
  )
}

//DATA FETCHING: SSR
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

export default Orders
