import { FC } from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
import { progressBarType } from '../../types'

const CircularProgressWithLabel: FC<progressBarType> = ({
  width,
  skillName,
}) => (
  <div>
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: () => 'lightgray',
        }}
        size={100}
        thickness={3}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        value={width}
        size={100}
        thickness={3}
        sx={{
          position: 'absolute',
          color: () => '#2dd4bf',
          left: 0,
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(width)}%`}
        </Typography>
      </Box>
    </Box>
    <p className="text-sm">{skillName}</p>
  </div>
)

export default CircularProgressWithLabel
