import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup)

const registerSchema = Yup.object({
  name: Yup.string().required("Name can't left empty."),
  email: Yup.string().email().required("Email can't left empty"),
  avatar: Yup.string().url().required("Profile picture can't left empty."),
  password: Yup.string()
    .required("Password can't left empty.")
    .min(8, 'Password too short - should be atleast 8 characters long.')
    .max(30, 'Password too long - Should not be greater than 30 characters.')
    .minLowercase(1, 'Password must contains atleast 1 lowercase letter.')
    .minUppercase(1, 'Password should atleast have 1 uppercase letter.')
    .minNumbers(1, 'Password must have atleast 1 number.')
    .minSymbols(1, 'Password must contains atleast 1 symbol.'),
})

export default registerSchema
