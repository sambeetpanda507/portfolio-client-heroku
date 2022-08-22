import { FC } from 'react'
import { educationCardType, experienceCardType } from '../../types'
import { EducationCard } from './EducationCard'
import { ExperienceCard } from './ExperienceCard'
import TwoColFrame from './TwoColFrame'
import HeadingAnimate from '../custom/HeadingAnimate'

const educationCardData: educationCardType[] = [
  {
    id: 1,
    cardTitle: 'Bachelor Of Technology from ',
    place: 'Biju Patnaik University Of Technology',
    startDate: '2014',
    endDate: '2018',
    cardDescription:
      'I have done my B.tech in Aeronautical Engineering and passed out with 81%',
  },
  {
    id: 2,
    cardTitle: 'Higher Secondary Education From ',
    place: 'Kendriya Vidyalaya Puri',
    startDate: '2012',
    endDate: '2014',
    cardDescription:
      'I have completed my higher secondary education having PCMB with an agrigate marks of 65%',
  },
  {
    id: 3,
    cardTitle: 'Secondary School Certificate From ',
    place: 'Kendriya Vidyalaya Puri',
    startDate: '2001',
    endDate: '2012',
    cardDescription:
      'I have completed my secondary school certificate having CGPA of 9.0',
  },
]

const experienceCardData: experienceCardType[] = [
  {
    id: 1,
    cardTitle: 'Associate Full Stack Developer From WebMOBI',
    startDate: 'Apr 2021 ',
    endDate: 'May 2022',
    responsibility: [
      'Event management tools with react js and Material ui.',
      'Payments page integration with chargebee payment gateway along with webhooks.',
      'Implemented complete authentication workflow to make the application secure. Created APIs and integrated with the frontend.',
      'Implemented websocket based infrastructure for duplex connection between admin and attendee.',
      'Project management.',
    ],
  },
  {
    id: 2,
    cardTitle: 'Frontend Developer Internship from HungryPixels Technology',
    startDate: 'Dec 2020',
    endDate: 'Feb 2021',
    responsibility: [
      'Created homepage and landing pages with html and css',
      'Created virtual host connection with nginx',
      'Worked on Figma design tools',
    ],
  },
]

export const Experiences: FC = () => {
  return (
    <div id="experiences" className="min-h-screen grid place-items-center px-4">
      <TwoColFrame>
        {/* education */}
        <div>
          <HeadingAnimate
            text="Education"
            className="text-3xl font-semibold tracking-wider mt-11 mb-7 text-center"
          />

          {/* education cards */}
          {educationCardData.map((education) => (
            <EducationCard
              key={education.id}
              cardTitle={education.cardTitle}
              place={education.place}
              cardDescription={education.cardDescription}
              startDate={education.startDate}
              endDate={education.endDate}
            />
          ))}
        </div>

        {/* work experience */}
        <div>
          <HeadingAnimate
            text="Work Experience"
            className="text-3xl font-semibold tracking-wider mt-11 mb-7 text-center"
          />

          {/* education cards */}
          {experienceCardData.map((experience) => (
            <ExperienceCard
              key={experience.id}
              cardTitle={experience.cardTitle}
              startDate={experience.startDate}
              endDate={experience.endDate}
              responsibility={experience.responsibility}
            />
          ))}
        </div>
      </TwoColFrame>
    </div>
  )
}
