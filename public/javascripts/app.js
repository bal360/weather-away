const form = document.querySelector('form')
const input = document.querySelector('input[type="text"]')
const forecastHeading= document.querySelector('h6')
const message = document.querySelector('p')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  
  getWeather(input.value)

  form.reset()
})

const getWeather = (location) => {
  fetch(`/weather?address=${location}`)
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
    forecastHeading.innerText = `${address}`
    message.innerText = `The temperature is ${temperature}°. Expecting ${weather_descriptions.join(', ').toLowerCase()} with a ${precip}% of precipitation.`
  }
}

