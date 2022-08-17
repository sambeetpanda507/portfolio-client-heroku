import * as Yup from 'yup'

export const contactSchema = Yup.object({
  firstName: Yup.string().required("First name can't left empty."),
  lastName: Yup.string().required("Last name can't left empty."),
  email: Yup.string().email().required("Email can't left empty."),
  message: Yup.string().required("Message can't left empty."),
})
