import Link from 'next/link'
import { FC, useState, useEffect } from 'react'
import { navbarLinkType } from '../../types'
import { useRouter, NextRouter } from 'next/router'
import { motion } from 'framer-motion'

export const NavLinks: FC<navbarLinkType> = ({ link, linkName }) => {
  const [active, setActive] = useState<boolean>(false)
  const router: NextRouter = useRouter()

  useEffect(() => {
    let willUnmout = false

    if (router.asPath === link && !willUnmout) {
      setActive(true)
    } else if (!willUnmout && router.asPath !== link) {
      setActive(false)
    }

    return () => {
      willUnmout = true
    }
  }, [router.asPath, link])

  return (
    <motion.li
      initial={{
        y: '-100vh',
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="pb-2 tracking-wide hover:text-teal-400 transition duration-200"
      style={{
        borderBottom: `${active ? '2px solid #5eead4' : '0px'}`,
        color: `${active ? '#5eead4' : '#1f2937'}`,
      }}
    >
      <Link href={link}>
        <a>{linkName}</a>
      </Link>
    </motion.li>
  )
}
