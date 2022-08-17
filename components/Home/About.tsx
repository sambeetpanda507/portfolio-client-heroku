import React, { FC, useEffect } from 'react'
import { cardType } from '../../types'
import { AboutDescription } from './AboutDescription'
import { AboutImage } from './AboutImage'
import CodeIcon from '../Icons/CodeIcon'
import AboutCard from './AboutCard'
import TwoColFrame from './TwoColFrame'
import {
  motion,
  useAnimation,
  AnimationControls,
  Variants,
} from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import HeadingAnimate from '../custom/HeadingAnimate'

const cardVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: 0.5 },
  },
}

// about card data
const cardData: cardType[] = [
  {
    id: 1,
    cardTitle: 'Frontend Development',
    description:
      'I use react js as a javascript library. Next js as a react js framework. Tailwind css and material ui for css utility tool and framework respectively. I prefer to use typescript as the programing language.',
    icon: <CodeIcon />,
  },
  {
    id: 2,
    cardTitle: 'Backend Development',
    description:
      'I use node js and express js for backend development. I prefer using typescript as the programing language. I write REST apis and GraphQL apis. I prefer to use mongodb for my database with mongoose as the ODM.',
    icon: <CodeIcon />,
  },
  {
    id: 3,
    cardTitle: 'Testing & PWA',
    description:
      'I use cypress as the automation and end to end testing for my react application. I use next-pwa to convert my next js application to progressive web application to get native app features.',
    icon: <CodeIcon />,
  },
]

//heading component
const Heading: React.FC = () => {
  return (
    <HeadingAnimate
      text="What I do"
      className="text-3xl text-center font-semibold tracking-wider mt-11 mb-7"
    />
  )
}

export const About: FC = () => {
  const control: AnimationControls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) control.start('visible')
  }, [control, inView])

  return (
    <div id="about" className="min-h-screen grid place-items-center px-4">
      <TwoColFrame>
        {/* about image */}
        <AboutImage />
        {/* about description */}
        <AboutDescription />
      </TwoColFrame>
      {/* heading */}
      <Heading />
      <motion.div
        ref={ref}
        variants={cardVariant}
        initial="hidden"
        animate={control}
      >
        {/* cards */}
        <div className="w-full grid md:grid-cols-3 gap-4 md:max-w-5xl">
          {/* card */}
          {cardData.map((card) => (
            <AboutCard
              key={card.id}
              cardTitle={card.cardTitle}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
