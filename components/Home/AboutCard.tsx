import { FC } from 'react'
import { cardType } from '../../types'

const AboutCard: FC<cardType> = ({ cardTitle, description, icon }) => {
  return (
    <div className="text-center card">
      {/* card icon */}
      <div className="flex justify-center">{icon}</div>
      {/* card title */}
      <h3 className="my-4 text-2xl font-semibold">{cardTitle}</h3>
      {/* card description */}
      <p className="text-sm tracking-wider">{description}</p>
    </div>
  )
}

export default AboutCard
