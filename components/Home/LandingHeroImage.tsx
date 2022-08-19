import { FC } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const DynamicDrone = dynamic(() => import('./Drone'), {
  ssr: false,
  loading: () => {
    return <div>loading...</div>
  },
})

export const LandingHeroImage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-96 relative md:col-start-2 md:row-start-1 mt-4 md:mt-0"
    >
      <DynamicDrone />
    </motion.div>
  )
}
