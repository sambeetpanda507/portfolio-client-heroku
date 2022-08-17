import React, { useEffect } from 'react'
import {
  useAnimation,
  AnimationControls,
  Variants,
  motion,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface IProps {
  text: string
  className?: string
}

const headingVariant: Variants = {
  hidden: {
    y: 800,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.5 },
  },
}

const HeadingAnimate: React.FC<IProps> = (props) => {
  const { text, className } = props
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])

  return (
    <div ref={ref}>
      <motion.h1
        variants={headingVariant}
        initial="hidden"
        animate={controls}
        className={className}
      >
        {text}
      </motion.h1>
    </div>
  )
}

export default HeadingAnimate
