import * as Yup from 'yup'

const googleOAuthSchema = Yup.object({
  name: Yup.string().required("Name can't left empty"),
  email: Yup.string().email().required("Email can't left empty"),
  avatar: Yup.string().url().required("Profile picture can't left empty."),
})

export default googleOAuthSchema
