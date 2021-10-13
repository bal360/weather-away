const axios = require('axios')
const getLatLong = require('./getLatLong')

const BASE_WS_URL = 'http://api.weatherstack.com/'

module.exports = getForecast = async (longLatArray) => {
  const [long, lat] = longLatArray
  const latLong = lat + ',' + long
  
  const { data } = await axios.get(`${BASE_WS_URL}/forecast?access_key=${process.env.WS_KEY}&query=${latLong}&units=f`)

  return data.current
}