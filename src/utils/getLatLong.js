const axios = require('axios')

const BASE_MB_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

module.exports = getLatLong = async (location) => {
  // try {
    const { data } = await axios.get(`${BASE_MB_URL}/${encodeURIComponent(location)}.json?access_token=${process.env.MB_TOKEN}`)
    return data.features[0]
  // } catch (err) {
    throw new Error(err)
  // }
}