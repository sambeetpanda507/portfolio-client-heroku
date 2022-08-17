import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { FileDownload } from '@mui/icons-material'
import {
  motion,
  useAnimation,
  Variants,
  AnimationControls,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import _axios from '../../utils/axios.config'
import axios from 'axios'

const toolData: { id: number; name: string; img: string }[] = [
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'typescript',
    img: '/images/typescript.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'javascript',
    img: '/images/javascript.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'mongodb',
    img: '/images/mongodb-ar21.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'express js',
    img: '/images/expressjs-ar21.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'react js',
    img: '/images/reactjs-icon.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'node js',
    img: '/images/nodejs-horizontal.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'css',
    img: '/images/css3.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'css',
    img: '/images/tailwind-css.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'next js',
    img: '/images/next-js.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'html',
    img: '/images/w3_html5-icon.svg',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    name: 'PWA',
    img: '/images/pwa-logo.svg',
  },
]

const initVariant: Variants = {
  hidden: {
    y: 800,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1,
    },
  },
}

export const AboutDescription: FC = () => {
  const control: AnimationControls = useAnimation()
  const [ref, inView] = useInView()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (inView) control.start('visible')
  }, [control, inView])

  //FUNCTION: DOWNLOAD RESUME
  const downloadResume = async () => {
    try {
      setLoading(true)
      const axiosRes = await axios.get('/api/downloadResume', {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([axiosRes.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'resume.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
      setLoading(false)
    } catch (e: any) {
      console.error(e.message)
      setLoading(false)
    }
  }

  return (
    <div ref={ref}>
      <motion.div
        variants={initVariant}
        initial="hidden"
        animate={control}
        className="text-center md:text-left text-gray-700 md:ml-4"
      >
        {/* heading */}
        <h1 className="capitalize text-3xl font-semibold my-5">about me</h1>
        {/* description */}
        <p className="text-sm leading-6 mb-8">
          Hello, I&apos;m Sambeet Sekhar Panda, full stack web developer based
          on Odisha, India. I have rich experience in modern web development
          practices, creation and management of APIs, interactive web pages and
          automation testing with cypress. I love MERN stack and new technology
          facinates me.
        </p>
        {/* tools */}
        <ul className="flex flex-wrap justify-center items-center  md:justify-start gap-2">
          {toolData.map((tool) => (
            <li key={tool.id}>
              <Image
                src={tool.img}
                alt={tool.name}
                height={50}
                width={65}
                className="object-contain"
              />
            </li>
          ))}
        </ul>
        {/* download cv button */}
        <div className="my-4">
          <Button
            endIcon={<FileDownload />}
            variant="contained"
            size="large"
            className="bg-teal-300 capitalize font-extrabold rounded-[100vmax] first-letter:hover:bg-teal-400 py-3"
            onClick={downloadResume}
            disabled={loading}
          >
            Download Resume
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
