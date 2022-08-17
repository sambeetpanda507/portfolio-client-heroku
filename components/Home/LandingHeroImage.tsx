import { FC } from 'react'
import { motion } from 'framer-motion'

export const LandingHeroImage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-96 relative md:col-start-2 md:row-start-1 mt-4 md:mt-0"
    >
      {/* circle 1 */}
      <div className="w-72 md:w-96 aspect-square bg-gray-100 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      {/* circle 2 */}
      <div className="w-60 md:w-80 aspect-square bg-gray-200 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      {/* circle 3 */}
      <div className="w-48 md:w-64 aspect-square bg-gray-300 absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src="https://picsum.photos/1000/1000?random=1"
          alt="picture"
          className="w-full aspect-square rounded-full"
        />
      </div>
    </motion.div>
  )
}
