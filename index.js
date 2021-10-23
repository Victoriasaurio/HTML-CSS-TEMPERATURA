const element = document.createElement('ul')

async function getAllTemperatures() {
  let temperatures = await axios.get('http://localhost:3800/v1/temperature/data')

  createList(temperatures.data)
}

function createList(temperature) {
  let section = document.getElementById('info_listed')
  element.innerHTML = ''

  let temp_array = temperature.slice(temperature.length-5).reverse()

  for(data of temp_array) {
    element.innerHTML += `
    <li class='info'>
      <h3 class='temp_info'>
      Temperatura: ${Math.round(data.Temp)}°
      </h3>
      <h3 class='temp_info'>
        Humedad: ${Math.round(data.Hum)}%
      </h3>
      <h3 class='temp_info'>
      Fecha: ${data.createdAt ? data.createdAt .substr(0,10):'No disponible'}
    </h3>
    </li>`
  }
  section.appendChild(element)
}