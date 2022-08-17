import { FC, useEffect } from 'react'
import Image from 'next/image'
import {
  motion,
  AnimationControls,
  useAnimation,
  Variants,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

export const AboutImage: FC = () => {
  const control: AnimationControls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) control.start('visible')
  }, [control, inView])

  return (
    <div ref={ref}>
      <motion.div
        variants={initVariant}
        initial="hidden"
        animate={control}
        className="flex justify-center relative h-80 md:h-full"
      >
        <Image
          src="/images/about.png"
          layout="fill"
          className="object-contain"
          priority={true}
          alt="about image"
        />
      </motion.div>
    </div>
  )
}
