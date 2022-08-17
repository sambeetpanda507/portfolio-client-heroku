import { FC, useEffect } from 'react'
import { experienceCardType } from '../../types'
import {
  motion,
  useAnimation,
  Variants,
  AnimationControls,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const expVariants: Variants = {
  hidden: { y: 800, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 1, delay: 0.6 },
  },
}

export const ExperienceCard: FC<experienceCardType> = ({
  cardTitle,
  startDate,
  endDate,
  responsibility,
}) => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <div ref={ref}>
      <motion.div
        variants={expVariants}
        initial="hidden"
        animate={controls}
        className="card"
      >
        <h2 className="text-xl font-semibold mb-4">{cardTitle}</h2>
        <span className="text-teal-400 text-sm">{startDate}</span>-
        <span className="text-teal-400 text-sm">{endDate}</span>
        <p className="text-sm mt-4">Responsibility:</p>
        <ul className="pl-4 text-sm">
          {responsibility.map((value, index) => {
            return (
              <li key={index} className="mt-2 list-disc">
                {value}
              </li>
            )
          })}
        </ul>
      </motion.div>
    </div>
  )
}
