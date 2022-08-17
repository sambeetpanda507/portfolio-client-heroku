import { FC, useEffect } from 'react'
import { educationCardType } from '../../types'
import {
  motion,
  useAnimation,
  Variants,
  AnimationControls,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'

//variants
const educationVariant: Variants = {
  hidden: { y: 800, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 1, delay: 0.6 },
  },
}

//main component
export const EducationCard: FC<educationCardType> = ({
  cardTitle,
  place,
  startDate,
  endDate,
  cardDescription,
}) => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  //side effect for animation
  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <div ref={ref}>
      <motion.div
        variants={educationVariant}
        initial="hidden"
        animate={controls}
        className="card"
      >
        <h2 className="text-xl font-semibold mb-4">
          {cardTitle}
          <span className="italic text-teal-400">{place}</span>
        </h2>
        <span className="text-teal-400 text-sm">{startDate}</span>-
        <span className="text-teal-400 text-sm">{endDate}</span>
        <p className="text-sm mt-4">{cardDescription}</p>
      </motion.div>
    </div>
  )
}
