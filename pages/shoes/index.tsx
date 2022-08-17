import { useContext, useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { UserType } from '../../types'
import Navbar from '../../components/Shoes/Navbar'
import { Button } from '@mui/material'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { errorLog } from '../../utils/logger'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useRouter } from 'next/router'

//FRAMER MOTION VARIANTS
const leftColVariants: Variants = {
  hidden: {
    opacity: 0,
    x: '-200vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.5, type: 'spring', damping: 15 },
  },
}

const rightColVariants: Variants = {
  hidden: {
    opacity: 0,
    x: '200vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.5, type: 'spring', damping: 15 },
  },
}

const styles = {
  row: 'h-screen overflow-x-hidden md:h-auto justify-center p-5 flex flex-col-reverse md:gap-0 md:flex-row md:justify-around items-center text-black text-center',
  heading: 'text-5xl md:text-7xl uppercase font-fasterOne',
  description: 'text-2xl my-6 font-vastShadow',
  shopNowBtn: 'bg-[#579F36] capitalize',
  learnMoreBtn: 'border-2 border-[#579F36] text-black ml-4 capitalize',
}

type ShoesPropType = {
  auth: false
  user: UserType
}
const Shoes: NextPage<ShoesPropType> = (props) => {
  const { auth, user } = props
  const { setAuth, setUser } = useContext(AuthContext)
  const router = useRouter()

  //store auth and user in context
  useEffect(() => {
    let willUnmount: boolean = false

    if (willUnmount === false) {
      setAuth(auth)
      setUser(user)
    }

    return () => {
      willUnmount = true
    }
  }, [user, setUser, auth, setAuth])

  const handleShopNow = () => {
    router.push('/shoes/shop')
  }

  return (
    <>
      <Head>
        <title>Shoes</title>
      </Head>
      <Navbar>
        <div className={styles.row}>
          <motion.div
            variants={leftColVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={styles.heading}>run faster</h1>
            <p className={styles.description}>Made for high speed running</p>
            <div>
              <Button
                variant="contained"
                size="large"
                className={styles.shopNowBtn}
                onClick={handleShopNow}
              >
                shop now
              </Button>
              <Button
                variant="outlined"
                size="large"
                className={styles.learnMoreBtn}
              >
                learn more
              </Button>
            </div>
          </motion.div>
          <motion.div
            variants={rightColVariants}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/shoes.webp"
              width={600}
              height={610}
              alt="hero shoe image"
            />
          </motion.div>
        </div>
      </Navbar>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //parse the cookies
  const { refreshToken } = parseCookies(context)

  //if not refresh token present
  if (!refreshToken) {
    return {
      props: {
        auth: false,
        user: null,
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
        },
      }
    }

    //store auth and user in context
    return {
      props: {
        auth: res.data.auth,
        user: res.data.userData,
      },
    }
  } catch (e: any) {
    errorLog(e.message, 'shoes signin page')

    return {
      props: {
        auth: false,
        user: null,
      },
    }
  }
}

export default Shoes
