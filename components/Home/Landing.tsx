import { FC } from 'react'
import { LandingAddress } from './LandingAddress'
import { LandingHeroImage } from './LandingHeroImage'
import TwoColFrame from './TwoColFrame'

export const Landing: FC = () => {
  return (
    <div className="min-h-screen grid place-items-center px-4">
      {/* landing container */}
      <TwoColFrame>
        {/* Hero Image */}
        <LandingHeroImage />

        {/* Landing Address */}
        <LandingAddress />
      </TwoColFrame>
    </div>
  )
}
