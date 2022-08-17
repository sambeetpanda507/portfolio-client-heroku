import { FC, useEffect } from 'react'
import { progressBarType } from '../../types'
import CircularProgressWithLabel from './CircularProgressBar'
import { LineProgress } from './SkillProgressBar'
import TwoColFrame from './TwoColFrame'
import {
  motion,
  useAnimation,
  AnimationControls,
  Variants,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import HeadingAnimate from '../custom/HeadingAnimate'

const progressBarData: progressBarType[] = [
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 76,
    skillName: 'Typescript',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 86,
    skillName: 'Javascript',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 72,
    skillName: 'MongoDB',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 88,
    skillName: 'Express js',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 90,
    skillName: 'React js',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 85,
    skillName: 'Node js',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 85,
    skillName: 'Next js',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 90,
    skillName: 'CSS',
  },
  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 89,
    skillName: 'HTML',
  },

  {
    id: Math.floor(Math.random() * 9000 + 1000),
    width: 73,
    skillName: 'PWA',
  },
]

const professionalSkillsData: progressBarType[] = [
  {
    id: 1,
    width: 86,
    skillName: 'Communication',
  },
  {
    id: 2,
    width: 75,
    skillName: 'Team Work',
  },
  {
    id: 3,
    width: 80,
    skillName: 'Project Management',
  },
  {
    id: 4,
    width: 70,
    skillName: 'Creativity',
  },
]

const progressVariants: Variants = {
  hidden: { y: 800, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 1, delay: 0.4 },
  },
}

export const Skills: FC = () => {
  const [ref, inView] = useInView()
  const controls: AnimationControls = useAnimation()

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <div
      id="skills"
      className="min-h-screen text-center grid place-items-center px-4"
    >
      {/* container */}
      <TwoColFrame>
        <div>
          {/* title */}
          <HeadingAnimate
            text="Technical Skills"
            className="text-3xl font-semibold tracking-wider mt-11 mb-7"
          />
          {/* progress bars */}
          {progressBarData.map((progressBar) => {
            return (
              <LineProgress
                key={progressBar.id}
                skillName={progressBar.skillName}
                width={progressBar.width}
              />
            )
          })}
        </div>
        <div className="md:ml-4" ref={ref}>
          {/* title */}
          <HeadingAnimate
            text="Professional Skills"
            className="text-3xl font-semibold tracking-wider mt-11 mb-7"
          />
          {/* circular progress bars */}
          <motion.div
            variants={progressVariants}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-2 gap-2"
          >
            {professionalSkillsData.map((progressBar) => {
              return (
                <CircularProgressWithLabel
                  key={progressBar.id}
                  width={progressBar.width}
                  skillName={progressBar.skillName}
                />
              )
            })}
          </motion.div>
        </div>
      </TwoColFrame>
    </div>
  )
}
