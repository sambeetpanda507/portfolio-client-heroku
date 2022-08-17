import { FC } from 'react'
import ContactForm from './ContactForm'
import TwoColFrame from './TwoColFrame'
import ContactImage from './ContactImage'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2dd4bf',
    },
  },
})

export const Contact: FC = () => (
  <div id="contacts" className="min-h-screen grid place-items-center px-4">
    <TwoColFrame>
      {/* contact form */}
      <ThemeProvider theme={theme}>
        <ContactForm />
      </ThemeProvider>
      {/* contact image */}
      <ContactImage />
    </TwoColFrame>
  </div>
)
