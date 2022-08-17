import { FC } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MailIcon } from '../Icons/MailIcon'
import { PhoneIcon } from '../Icons/PhoneIcon'
import { Location } from '../Icons/LocationIcon'

export const LandingAddress: FC = () => {
  return (
    <div className="text-center md:text-left text-gray-700">
      {/* header */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm tracking-wide font-semibold py-2.5 px-7 rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-none bg-teal-400 w-fit text-white mx-auto md:mx-0"
      >
        Hello I&apos;m
      </motion.p>
      {/* occupation */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[2.625rem] md:text-6xl font-semibold my-5 relative"
      >
        Sambeet <span className="animate-bounce absolute">👋</span>
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl md:text-2xl font-semibold"
      >
        Full Stack Web Developer
      </motion.h3>
      {/* contact */}
      <ul className="text-sm font-light pl-5">
        <motion.li
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-3 flex gap-1"
        >
          <MailIcon />
          sambeetsekharpanda10@gmail.com
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-3 flex gap-1"
        >
          <PhoneIcon />
          +91 63700-12039
        </motion.li>
        <motion.li
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-3 flex gap-1"
        >
          <Location />
          <address className="not-italic">Odisha, India 🇮🇳</address>
        </motion.li>
      </ul>
      {/* social media */}
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-flow-col auto-cols-max justify-center md:justify-start gap-4 mt-4"
      >
        <li className="hover:bg-gray-800 hover:text-white p-2 rounded-md transition-all duration-200 delay-75">
          <Link href="https://github.com/sambeetpanda507">
            <a target="_blank">
              <GitHubIcon fontSize="large" />
            </a>
          </Link>
        </li>
        <li className="hover:bg-gray-800 hover:text-white p-2 rounded-md transition-all duration-200 delay-75">
          <Link href="/">
            <a target="_blank">
              <LinkedInIcon fontSize="large" />
            </a>
          </Link>
        </li>
        <li className="hover:bg-gray-800 hover:text-white p-2 rounded-md transition-all duration-200 delay-75">
          <Link href="https://twitter.com/Sambeet_10k">
            <a target="_blank">
              <TwitterIcon fontSize="large" />
            </a>
          </Link>
        </li>
        <li className="hover:bg-gray-800 hover:text-white p-2 rounded-md transition-all duration-200 delay-75">
          <Link href="https://www.instagram.com/sambeet_10k/">
            <a target="_blank">
              <InstagramIcon fontSize="large" />
            </a>
          </Link>
        </li>
      </motion.ul>
    </div>
  )
}
