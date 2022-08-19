import '@google/model-viewer'
import { FC } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': MyElementAttributes
    }
    interface MyElementAttributes {
      src: string
      alt: string
      autoplay: any
    }
  }
}

const Drone: FC = () => {
  return (
    <div className="modelContainer">
      <model-viewer
        src="/robot.glb"
        alt="A 3D model of an astronaut"
        shadow-intensity="10"
        auto-rotate
        rotation-per-second="150%"
        autoplay
      />
    </div>
  )
}

export default Drone
