import * as Yup from 'yup'

const razorPaySchema = Yup.object({
  amount: Yup.number().required("Amount can't left empty"),
  email: Yup.string().email().required("Email can't left empty"),
})

export default razorPaySchema
