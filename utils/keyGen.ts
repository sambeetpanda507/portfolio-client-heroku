//create key
const keyGen = (str1: string, str2: string): string => {
  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()
  return [str1, str2].sort().join('-')
}

export default keyGen
