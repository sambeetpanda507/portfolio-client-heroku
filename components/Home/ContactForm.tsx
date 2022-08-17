import React, { FC, useState, useContext } from 'react'
import { Button, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import axios from 'axios'
import { AlertContext } from '../../context/AlertContext'

type errorType = {
  param: string
  message: string
} | null

const ContactForm: FC = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<errorType>(null)
  const {
    setMessage: setAlertMessage,
    setSeverity,
    setShow,
  } = useContext(AlertContext)
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name: string = e.target.name
    const value: string = e.target.value

    if (error !== null) setError(null)

    switch (name) {
      case 'firstName':
        setFirstName(value)
        break
      case 'lastName':
        setLastName(value)
        break
      case 'email':
        setEmail(value)
      default:
        break
    }
  }

  const handleMessage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(e.target.value)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const axiosRes = await axios.post(
        '/api/contact',
        {
          email,
          firstName,
          lastName,
          message,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )

      console.log(axiosRes.data)
      setSeverity('success')
      setAlertMessage(axiosRes.data.message)
      setShow(true)
      setFirstName('')
      setLastName('')
      setEmail('')
      setMessage('')
      setLoading(false)
    } catch (e: any) {
      setLoading(false)
      const message: string = e?.response?.data?.error?.message ?? e?.message
      const param: string = e?.response?.data?.error?.param

      if (message && param) setError({ message, param })
      else {
        setSeverity('error')
        setAlertMessage(message)
        setShow(true)
      }
    }
  }

  return (
    <div>
      <motion.h1
        initial={{ y: 800 }}
        whileInView={{
          y: 0,
          transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 1,
          },
        }}
        viewport={{ once: true, amount: 0.8, margin: '800px' }}
        className="text-3xl font-semibold tracking-wider  mb-7 text-center mt-16 md:mt-0"
      >
        Contact Me
      </motion.h1>
      <motion.form
        initial={{ y: 800 }}
        whileInView={{
          y: 0,
          transition: {
            type: 'spring',
            bounce: 0.4,
            duration: 1,
            delay: 0.4,
          },
        }}
        viewport={{ once: true, amount: 0.8, margin: '800px' }}
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-between gap-1">
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            type="text"
            color="primary"
            value={firstName}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            type="text"
            value={lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-5">
          <TextField
            label="Your Email"
            name="email"
            variant="outlined"
            type="email"
            value={email}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </div>
        <div className="mt-5">
          <TextField
            label="Your Message"
            name="message"
            variant="outlined"
            type="text"
            multiline
            rows={5}
            value={message}
            onChange={handleMessage}
            fullWidth
            required
          />
        </div>
        <div className="mt-5">
          <Button
            type="submit"
            className="py-3 bg-teal-300 hover:bg-teal-400  text-white font-bold text-md rounded-3xl"
            fullWidth
            disabled={loading}
          >
            Send Message
          </Button>
        </div>
      </motion.form>
    </div>
  )
}

export default ContactForm
