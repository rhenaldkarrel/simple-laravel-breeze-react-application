import axios from 'lib/axios'

export const getCountries = async () => {
  const { data } = await axios.get('/api/countries')

  return data
}