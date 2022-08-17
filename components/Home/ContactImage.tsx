import { FC } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ContactImage: FC = () => {
  return (
    <div className="h-80 md:h-full hidden md:flex md:items-center md:justify-center">
      <motion.div
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
        className="h-80 w-full relative"
      >
        <Image
          src="/images/contact.svg"
          layout="fill"
          className="object-contain"
          alt="contact"
        />
      </motion.div>
    </div>
  )
}

export default ContactImage
