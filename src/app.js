const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('dotenv').config()

const getForecast = require('./utils/getForecast')
const getLatLong = require('./utils/getLatLong')

const app = express()

app.use(express.static('public'))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {

  })
})

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide address to get weather report!'
    })
  }

  try {
    const {place_name, center} = await getLatLong(req.query.address)
    const forecastData = await getForecast(center)
    res.send({
      forecast: forecastData,
      address: place_name
    })
  } catch (err) {
    res.send({
      error: 'Could not find that address. Try another search!'
    })
  }
})

app.get('/help', (req, res) => {
  res.render('help', {

  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    message: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    message: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log(`Server running on port ${port}`)
})