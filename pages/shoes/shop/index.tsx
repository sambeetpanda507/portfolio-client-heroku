import { FC, useContext, useEffect } from 'react'
import Navbar from '../../../components/Shoes/Navbar'
import Head from 'next/head'
import ShoeCard from '../../../components/Shoes/ShoeCard'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { errorLog } from '../../../utils/logger'
import { UserType, ProductType } from '../../../types'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'

type ShopPropsType = {
  auth: boolean
  user: UserType
  products: ProductType[]
}

//CSS
const styles = {
  container:
    'px-4 md:px-0 pt-[70px] md:pt-2 md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-4',
}

const Shop: FC<ShopPropsType> = (props) => {
  const { auth, user, products } = props
  const { setAuth, setUser } = useContext(AuthContext)

  //store auth and user to context
  useEffect(() => {
    let willUnmount: boolean = false
    if (willUnmount === false) {
      setAuth(auth)
      setUser(user)
    }
    return () => {
      willUnmount = true
    }
  }, [auth, user, setAuth, setUser])

  return (
    <Navbar>
      <Head>
        <title>Shop</title>
      </Head>
      <section className={styles.container}>
        {products.map((product) => {
          return (
            <ShoeCard
              key={product._id}
              _id={product._id}
              img={product.img}
              title={product.title}
              mrp={product.mrp}
              price={product.price}
              details={product.details}
            />
          )
        })}
      </section>
    </Navbar>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //FETCH PRODUCTS DATA
  const products = await axios.get(`${process.env.BASE_URI}/api/products`)

  //parse the cookies
  const { refreshToken } = parseCookies(context)

  //if not refresh token present
  if (!refreshToken) {
    return {
      props: {
        auth: false,
        user: null,
        products: products.data.products,
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
          products: products.data.products,
        },
      }
    }

    //store auth and user in context
    return {
      props: {
        auth: res.data.auth,
        user: res.data.userData,
        products: products.data.products,
      },
    }
  } catch (e: any) {
    errorLog(e.message, 'shoes signin page')

    return {
      props: {
        auth: false,
        user: null,
        products: products.data.products,
      },
    }
  }
}

export default Shop
