import { FC } from 'react'
import { motion } from 'framer-motion'

export const LandingHeroImage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-96 relative md:col-start-2 md:row-start-1 mt-4 md:mt-0 overflow-hidden"
    >
      <video
        autoPlay
        muted
        playsInline
        loop
        className="w-full h-full scale-[1.65]"
      >
        <source src="/drone.webm" type="video/webm" />
      </video>
    </motion.div>
  )
}
