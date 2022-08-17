import React, { useState, useRef, useContext, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TextField, InputAdornment, Button, AlertColor } from '@mui/material'
import {
  PersonRounded,
  MailRounded,
  LockRounded,
  LockOutlined,
  AddCircleRounded,
} from '@mui/icons-material'
import { inputErrorHelperType, registerInputType, UserType } from '../../types'
import { AlertContext } from '../../context/AlertContext'
import { useRouter } from 'next/router'
import { storage } from '../../utils/firebase'
import {
  ref,
  StorageReference,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { GetServerSideProps } from 'next/types'
import { parseCookies } from 'nookies'
import { AuthContext } from '../../context/AuthContext'
import { errorLog } from '../../utils/logger'
import { NextPageWithLayout } from '../../types'
import Navbar from '../../components/Shoes/Navbar'
import axios from 'axios'
import Head from 'next/head'

interface IRegisterProps {
  auth: boolean
  user: UserType
}

//main component
const Register: NextPageWithLayout<IRegisterProps> = ({ user, auth }) => {
  const [picData, setPicData] = useState<File | null>(null)
  const [picUrl, setPicUrl] = useState<string>('')
  const [registerData, setRegisterData] = useState<registerInputType>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errObj, setErrObj] = useState<inputErrorHelperType>({
    param: '',
    msg: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const defaultProfilePic = useRef<string>('/images/avatar.svg')
  const { setMessage, setSeverity, setShow } = useContext(AlertContext)
  const { setUser, setAuth } = useContext(AuthContext)
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
  }, [auth, user, setAuth, setUser])

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
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //validate confirm password and password
    if (registerData.password !== registerData.confirmPassword) {
      return setErrObj({
        param: 'confirmPassword',
        msg: 'Password is not matching',
      })
    }

    //image upload firebase
    if (picData === null)
      return showAlert('Please upload a profile pic.', true, 'warning')

    //create reference for firebase storage
    const imageRef: StorageReference = ref(
      storage,
      `portfolio/chatApp/${picData.name}-${uuidv4()}`
    )

    try {
      setLoading(true)
      //upload the image

      await uploadBytes(imageRef, picData)

      const downloadUrl: string = await getDownloadURL(imageRef)

      //call the api to save user data
      const axiosRes = await axios({
        url: '/api/register',
        method: 'POST',
        data: {
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          avatar: downloadUrl,
        },
      })

      if (axiosRes.status === 201) {
        setLoading(false)
        showAlert(`Welcome ${axiosRes.data.userData.name}`, true, 'success')
        router.push('/shoes')
      }
    } catch (e: any) {
      setLoading(false)

      const errMsg = e.response?.data?.error?.message ?? e.message

      errorLog(errMsg)

      //delete image from storage
      await deleteObject(imageRef)

      if (e.response.data.error.param) {
        return setErrObj({
          msg: errMsg,
          param: e.response.data.error.param,
        })
      }

      showAlert(errMsg, true, 'error')
    }
  }

  //handle input field change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errObj.msg.length > 0 || errObj.param.length > 0) {
      setErrObj({
        param: '',
        msg: '',
      })
    }
    setRegisterData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  //image upload handler fn
  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //if file is null
    if (e.target.files === null)
      return showAlert('Please add a profile picture.', true, 'warning')

    //whitelist mime types
    const mimeTypes = ['image/jpeg', 'image/png', 'image/svg + xml']

    // mime type validaton
    if (!mimeTypes.includes(e.target.files[0].type))
      return showAlert('Please add an image file.', true, 'warning')

    //create blob url for preview
    const blobUrl = URL.createObjectURL(e.target.files[0])

    //store data
    setPicData(e.target.files[0])
    setPicUrl(blobUrl)
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Navbar>
        <section className="bg-[#C4C4C4] flex items-start justify-center p-6 md:py-0 mt-[70px] md:mt-0">
          {/* --- form ---  */}
          <form
            className="bg-white w-full max-w-4xl shadow-md px-5 py-12 rounded-xl border-2 border-gray-200 grid md:grid-cols-2 md:gap-3"
            onSubmit={handleRegister}
          >
            {/* --- col 1 --- */}
            <div className="md:px-8">
              {/* --- heading --- */}
              <h1 className="text-center text-4xl font-bold mb-8">Sign up</h1>
              {/* --- input:profilePic --- */}
              <div className="flex justify-center">
                <div
                  style={{
                    backgroundImage: `url(${
                      picUrl.length === 0 ? defaultProfilePic.current : picUrl
                    })`,
                  }}
                  className="bg-gray-100 w-28 h-28 aspect-square bg-cover rounded-full relative shadow-lg"
                >
                  <label
                    htmlFor="profilePic"
                    className="absolute bottom-2 right-1 z-10"
                  >
                    <AddCircleRounded
                      fontSize="small"
                      className="cursor-pointer text-green-500 hover:text-green-600"
                    />
                  </label>
                  <input
                    type="file"
                    name="profilePic"
                    id="profilePic"
                    accept="image/jpeg, image/png, image/svg+xml"
                    onChange={handleImgUpload}
                    hidden
                  />
                </div>
              </div>
              {/* --- input:name --- */}
              <div className="mt-6">
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  variant="standard"
                  fullWidth={true}
                  placeholder="Your name"
                  value={registerData.name}
                  onChange={handleInputChange}
                  error={errObj.param === 'name'}
                  helperText={errObj.param === 'name' && errObj.msg}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </div>
              {/* --- input:email --- */}
              <div className="mt-6">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  variant="standard"
                  placeholder="Your Email"
                  value={registerData.email}
                  onChange={handleInputChange}
                  error={errObj.param === 'email'}
                  helperText={errObj.param === 'email' && errObj.msg}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  required
                  fullWidth
                />
              </div>
              {/* --- input:password --- */}
              <div className="mt-6">
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  variant="standard"
                  placeholder="Your Password"
                  value={registerData.password}
                  error={errObj.param === 'password'}
                  helperText={errObj.param === 'password' && errObj.msg}
                  onChange={handleInputChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  required
                  fullWidth
                />
              </div>
              {/* --- input:confirmPassword --- */}
              <div className="mt-6">
                <TextField
                  id="confirmPassword"
                  type="confirmPassword"
                  name="confirmPassword"
                  variant="standard"
                  placeholder="confirm Password"
                  value={registerData.confirmPassword}
                  onChange={handleInputChange}
                  error={errObj.param === 'confirmPassword'}
                  helperText={errObj.param === 'confirmPassword' && errObj.msg}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  required
                  fullWidth
                />
              </div>
              {/* --- register btn --- */}
              <div className="mt-6 text-center">
                <Button
                  type="submit"
                  size="large"
                  aria-label="register"
                  variant="contained"
                  className="bg-sky-500 hover:bg-sky-600 capitalize px-8 py-3 tracking-widest w-full"
                  disabled={loading}
                >
                  {loading ? 'please wait' : 'Register'}
                </Button>
              </div>
            </div>
            {/*  --- col 2 --- */}
            <div className="flex flex-col">
              {/* --- image --- */}
              <div className="text-center mt-8">
                <Image
                  src="/images/signup-image.jpg"
                  height={300}
                  width={300}
                  className="bg-cover"
                  alt="avatar"
                />
              </div>
              {/* --- signin link --- */}
              <div className="text-center mt-6 md:mt-auto">
                <Link href="/shoes/signin">
                  <a className="underline">Already registered user</a>
                </Link>
              </div>
            </div>
          </form>
        </section>
      </Navbar>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //parse the cookies
  const { refreshToken } = parseCookies(context)

  //if refresh token is present
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

export default Register
