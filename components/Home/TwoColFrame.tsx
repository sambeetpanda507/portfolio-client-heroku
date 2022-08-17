import React, { FC } from 'react'

const TwoColFrame: FC<React.ReactNode> = ({ children }) => (
  <div className="w-full grid gap-4 md:grid-cols-2 md:max-w-5xl">
    {children}
  </div>
)

export default TwoColFrame
