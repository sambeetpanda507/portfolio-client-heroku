import React, { ReactElement, useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TextField, InputAdornment, Button, AlertColor } from '@mui/material'
import { MailRounded, LockRounded } from '@mui/icons-material'
import { inputErrorHelperType, loginInputType, UserType } from '../../types'
import { AlertContext } from '../../context/AlertContext'
import { AuthContext } from '../../context/AuthContext'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Google } from '@mui/icons-material'
import { provider } from '../../utils/firebase'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { NextPageWithLayout } from '../../types'
import Navbar from '../../components/Shoes/Navbar'
import axios from 'axios'

interface ISignInProp {
  auth: boolean
  user: UserType
}

const SignIn: NextPageWithLayout<ISignInProp> = ({ auth, user }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<loginInputType>({
    email: '',
    password: '',
  })
  const { setMessage, setShow, setSeverity } = useContext(AlertContext)
  const { setUser, setAuth } = useContext(AuthContext)
  const [errObj, setErrObj] = useState<inputErrorHelperType>({
    param: '',
    msg: '',
  })
  const router = useRouter()

  //side effect for storing userData
  useEffect(() => {
    let willUnmount = false
    if (willUnmount === false) {
      setAuth(auth)
      setUser(user)
    }
    return () => {
      willUnmount = true
    }
  }, [setAuth, setUser, auth, user])

  //HELPER: fn to show snackbar
  const showAlert = (
    message: string,
    show: boolean,
    severity: AlertColor | undefined
  ) => {
    setSeverity(severity)
    setMessage(message)
    setShow(show)
  }

  //form handler
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    //prevent default form submit
    e.preventDefault()
    try {
      //api call to login
      setLoading(true)

      const axiosRes = await axios.post(
        '/api/login',
        {
          email: userData.email,
          password: userData.password,
        },
        {
          withCredentials: true,
        }
      )

      //store user data in context
      setAuth(axiosRes.data.auth)
      setUser({
        ...axiosRes.data.userData,
      })
      router.replace('/shoes/shop')
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      const errorMsg = e?.response?.data?.error?.message ?? e?.message
      const param = e?.response?.data?.error?.param

      if (param) {
        return setErrObj({
          msg: errorMsg,
          param,
        })
      }

      showAlert(errorMsg, true, 'error')
    }
  }

  //handle change fn
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errObj.msg.length > 0 || errObj.param.length > 0) {
      setErrObj({
        param: '',
        msg: '',
      })
    }
    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  //login with google handler
  const handleGoogleLogin = () => {
    setLoading(true)
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user
        const data = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        }
        return axios.post('/api/googleOAuth', data, { withCredentials: true })
      })
      .then((axiosRes) => {
        //store user data in context
        setAuth(axiosRes.data.auth)
        setUser({
          ...axiosRes.data.userData,
        })
        router.replace('/shoes/shop')
        setLoading(false)
      })
      .catch((e) => {
        setLoading(false)
        const errorMsg = e?.response?.data?.error?.message ?? e?.message
        showAlert(errorMsg, true, 'error')
      })
  }

  return (
    <Navbar>
      <section className="bg-[#C4C4C4] flex items-start justify-center p-6 md:py-0 mt-[70px] md:mt-8">
        {/* --- form ---  */}
        <form
          className="bg-white w-full max-w-4xl shadow-md px-5 py-12 rounded-xl border-2 border-gray-200 grid md:grid-cols-2 md:gap-3"
          onSubmit={handleLogin}
        >
          {/* --- col 1 --- */}
          <div className="md:px-8">
            {/* --- heading --- */}
            <h1 className="text-center text-4xl font-bold mb-8">Sign in</h1>
            {/* --- input:email --- */}
            <div className="mt-8">
              <TextField
                id="email"
                type="email"
                name="email"
                variant="standard"
                placeholder="Your Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailRounded fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                value={userData.email}
                onChange={handleInputChange}
                error={errObj.param === 'email'}
                helperText={errObj.param === 'email' && errObj.msg}
                required
                fullWidth
              />
            </div>
            {/* --- input:password --- */}
            <div className="mt-8">
              <TextField
                id="password"
                type="password"
                name="password"
                variant="standard"
                placeholder="Your Password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                value={userData.password}
                onChange={handleInputChange}
                error={errObj.param === 'password'}
                helperText={errObj.param === 'password' && errObj.msg}
                required
                fullWidth
              />
            </div>
            {/* --- desktop signup link  */}
            <div className="mt-8 hidden md:block">
              <Link href="/shoes/register">
                <a className="underline">Create an account.</a>
              </Link>
            </div>

            {/* --- login btn group --- */}
            <div className="mt-8 text-center">
              <Button
                type="submit"
                size="large"
                aria-label="register"
                variant="contained"
                className="bg-sky-500 hover:bg-sky-600 capitalize px-8 py-3 tracking-widest w-full"
                disabled={loading}
              >
                {loading ? 'Please wait' : 'Sign In'}
              </Button>

              {/*--- google login button ---*/}
              <Button
                size="large"
                aria-label="register"
                variant="contained"
                className="mt-2 bg-red-500 hover:bg-red-600 capitalize px-8 py-3 tracking-widest w-full"
                startIcon={<Google />}
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                Login with google
              </Button>
            </div>
          </div>
          {/* --- col 2 --- */}
          <div className="flex flex-col md:col-start-1 md:row-start-1">
            {/* --- image --- */}
            <div className="text-center mt-8">
              <Image
                src="/images/signin-image.jpg"
                height={350}
                width={300}
                className="bg-cover"
                alt="sign in image"
              />
            </div>
            {/* --- signup link --- */}
            <div className="text-center mt-6 md:mt-auto md:hidden">
              <Link href="/shoes/register">
                <a className="hover:underline">Don&apos;t have an account ?</a>
              </Link>
            </div>
          </div>
        </form>
      </section>
    </Navbar>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //parse the cookies
  const { refreshToken } = parseCookies(context)

  //if refresh token present
  if (refreshToken) {
    return {
      redirect: {
        destination: '/shoes/shop',
        permanent: false,
      },
    }
  }

  return {
    props: {
      auth: false,
      user: null,
    },
  }
}

export default SignIn
