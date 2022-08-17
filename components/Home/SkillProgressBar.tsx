import { FC, useEffect } from 'react'
import { progressBarType } from '../../types'
import {
  motion,
  AnimationControls,
  Variants,
  useAnimation,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const progressVariant: Variants = {
  hidden: { y: 800, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'springg', bounce: 0.4, duration: 1, delay: 0.4 },
  },
}

export const LineProgress: FC<progressBarType> = ({ skillName, width }) => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [inView, controls])
  return (
    <div ref={ref}>
      <motion.div
        variants={progressVariant}
        initial="hidden"
        animate={controls}
        className="my-4"
      >
        <div className="flex justify-between">
          <p>{skillName}</p>
          <p>{width}%</p>
        </div>
        <div className="h-[0.4rem] bg-gray-200 rounded-md">
          <div
            className="h-full rounded-md bg-teal-400"
            style={{ width: width + '%' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
