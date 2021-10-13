const form = document.querySelector('form')
const input = document.querySelector('input[type="text"]')
const forecastHeading= document.querySelector('h6')
const message = document.querySelector('p')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  
  message.innerText = 'Loading...'

  getWeather(input.value)

  form.reset()
})

const getWeather = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`)
  .then(res => res.json())
  .then(data => {
    formatForecast(data)
  })
  .catch(err => {
    console.log(err)
  })
}

const formatForecast = ({ 
  error = undefined, 
  address, 
  forecast: {temperature, weather_descriptions, precip} = {} 
}) => {
  if (error) {
    forecastHeading.innerText = ''
    message.classList.add('error')
    message.innerText = error
  } else {
    message.classList.remove('error')
    forecastHeading.innerText = `Forecast for ${address}`
    message.innerText = `The temperature is ${temperature}°. The weather is ${weather_descriptions.join(', ').toLowerCase()} with a ${precip}% of precipitation.`
  }
}

