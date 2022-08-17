import * as Yup from 'yup'

const loginSchema = Yup.object({
  email: Yup.string().email().required("Email can't left empty"),
  password: Yup.string().required("Password can't left empty"),
})

export default loginSchema
