import * as Yup from 'yup'

const productSchema = Yup.object({
  img: Yup.string().url().required("Product image can't left empty"),
  title: Yup.string().required("Title can't left empty"),
  mrp: Yup.number().integer().required("MRP can't left empty"),
  price: Yup.number().integer().required("Price can't left empty"),
  details: Yup.string().required("Product details can't left empty"),
})

export default productSchema
