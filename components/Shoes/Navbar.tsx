import React, { useState, useContext } from 'react'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { useRouter, NextRouter } from 'next/router'
import { AuthContext } from '../../context/AuthContext'
import { AlertContext } from '../../context/AlertContext'
import { ShoppingCartRounded } from '@mui/icons-material'
import { ShoeContext } from '../../context/ShoeContext'
import axios from 'axios'

type NavbarPropType = {
  children: React.ReactNode
}

function getHeaderVariants(height: string): Variants {
  const headerVariants: Variants = {
    hidden: {
      height: '70px',
    },
    visible: {
      height,
      transition: { duration: 0.5, type: 'spring', damping: 10 },
    },
  }
  return headerVariants
}

const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: 'spring', damping: 10 },
  },
}

//CSS
const styles = {
  container: 'min-h-screen bg-[#C4C4C4] font-roboto',
  header: 'py-4 sticky top-0 hidden md:block bg-inherit z-10',
  headerListContainer:
    'flex items-center justify-center gap-8 text-3xl text-[#579F36]',
  active: 'border-b-[2.5px] border-[#579F36]',
  inactive: 'border-b-[2.5px] border-[#C4C4C4]',
  logoutBtn: 'cursor-pointer uppercase',
}

const mobileStyles = {
  header:
    'fixed z-20 w-full top-0 left-0 flex justify-between p-5 md:hidden bg-[#C4C4C4]',
  menuIconContainer:
    'w-6 h-6 flex flex-col justify-between items-center cursor-pointer',
  menuLine1: 'h-1 w-full bg-black rounded-full',
  menuLine2: 'h-1 w-[115%] bg-black rounded-full',
  menuLine3: 'h-1 w-full bg-black rounded-full',
  headerListContainer: 'text-xl text-[#579F36] h-fit',
}

//COMPONENT: MOBILE NAVIGATION BAR
const MobileNavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { auth, setUser, setAuth } = useContext(AuthContext)
  const { setMessage, setSeverity, setShow } = useContext(AlertContext)
  const { cart } = useContext(ShoeContext)
  const router = useRouter()

  //FUNCTION: HANDLE MENU CLICK
  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev)
  }

  //FUNCTION: LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      const axiosRes = await axios.get('/api/logout', {
        withCredentials: true,
      })

      setUser(null)
      setAuth(axiosRes.data.auth)
      setSeverity('success')
      setMessage(axiosRes.data.message)
      setShow(true)
      router.replace('/shoes/shop')
    } catch (e: any) {
      setSeverity('error')
      setMessage(e?.response?.data?.error?.msg ?? e?.message)
      setShow(true)
    }
  }

  return (
    <>
      <motion.nav
        variants={
          auth ? getHeaderVariants('168px') : getHeaderVariants('145px')
        }
        initial="hidden"
        animate={menuOpen ? 'visible' : 'hidden'}
        className={mobileStyles.header}
      >
        <motion.ul
          variants={menuVariants}
          initial="hidden"
          animate={menuOpen ? 'visible' : 'hidden'}
          className={mobileStyles.headerListContainer}
        >
          <li>
            <Link href="/shoes">
              <a>HOME</a>
            </Link>
          </li>
          <li className="my-2">
            <Link href="/shoes/shop">
              <a>SHOES</a>
            </Link>
          </li>
          {auth && (
            <li className="my-2">
              <Link href="/shoes/orders">
                <a>ORDERS</a>
              </Link>
            </li>
          )}
          {auth ? (
            <li className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li>
              <Link href="/shoes/signin">
                <a>SIGNIN</a>
              </Link>
            </li>
          )}
        </motion.ul>
        <div
          className={mobileStyles.menuIconContainer}
          onClick={handleMenuClick}
        >
          <div className={mobileStyles.menuLine1}></div>
          <div className={mobileStyles.menuLine2}></div>
          <div className={mobileStyles.menuLine3}></div>
        </div>
      </motion.nav>
      {auth && (
        <div className="md:hidden h-14 w-14 fixed z-20 bottom-2 right-2 bg-[#E89595] rounded-full flex items-center justify-center">
          <Link href="/shoes/cart">
            <a>
              <ShoppingCartRounded className="mr-3" />
              <span className="absolute  bottom-6 right-2 h-4 w-4 p-3 bg-red-500 rounded-full text-sm text-white flex items-center justify-center">
                {cart.length}
              </span>
            </a>
          </Link>
        </div>
      )}
    </>
  )
}

const Navbar: React.FC<NavbarPropType> = (props) => {
  const router: NextRouter = useRouter()
  const { children } = props
  const { auth, setUser, setAuth } = useContext(AuthContext)
  const { setMessage, setSeverity, setShow } = useContext(AlertContext)
  const { cart } = useContext(ShoeContext)

  //FUNCTION: LOGOUT HANDLER
  const handleLogout = async () => {
    try {
      const axiosRes = await axios.get('/api/logout', {
        withCredentials: true,
      })

      setUser(null)
      setAuth(false)
      setSeverity('success')
      setMessage(axiosRes.data.message)
      setShow(true)
      router.replace('/shoes/shop')
    } catch (e: any) {
      console.error('error: ', e.message)
      setSeverity('error')
      setMessage(e?.response?.data?.error?.msg ?? e?.message)
      setShow(true)
    }
  }

  return (
    <section className={styles.container}>
      {/* --- DESKTOP NAV BAR --- */}
      <nav className={styles.header}>
        <ul className={styles.headerListContainer}>
          <li
            className={
              router.asPath === '/shoes' ? styles.active : styles.inactive
            }
          >
            <Link href="/shoes">
              <a>HOME</a>
            </Link>
          </li>
          <li
            className={
              router.asPath === '/shoes/shop' ? styles.active : styles.inactive
            }
          >
            <Link href="/shoes/shop">
              <a>SHOES</a>
            </Link>
          </li>
          {auth && (
            <li
              className={
                router.asPath === '/shoes/orders'
                  ? styles.active
                  : styles.inactive
              }
            >
              <Link href="/shoes/orders">
                <a>ORDERS</a>
              </Link>
            </li>
          )}
          {auth && (
            <li className="relative">
              <Link href="/shoes/cart">
                <a>
                  <ShoppingCartRounded fontSize="large" />
                  <span className="absolute -top-2 right-0 h-5 w-5 p-3 bg-red-500 rounded-full text-sm text-white flex items-center justify-center">
                    {cart.length}
                  </span>
                </a>
              </Link>
            </li>
          )}
          {auth ? (
            <li className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li
              className={
                router.asPath === '/shoes/signin'
                  ? styles.active
                  : styles.inactive
              }
            >
              <Link href="/shoes/signin">
                <a>SIGNIN</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* --- mobile nav bar --- */}
      <MobileNavBar />
      {/* --- children --- */}
      {children}
    </section>
  )
}

export default Navbar
