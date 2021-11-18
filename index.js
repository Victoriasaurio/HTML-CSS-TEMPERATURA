const server_port = 3800
const server_host = 'localhost'
const element = document.createElement('ul')
let myChart

async function getAllTemperatures() {
  let temperatures = await axios.get(`http://${server_host}:${server_port}/v1/temperature/data`)

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

async function getTemperature() {
  let temperature = await axios.get(`http://${server_host}:${server_port}/v1/temperature/`)
  
  showTemperature(temperature)
}

function showTemperature(temperature) {
  let temp_element = document.getElementById('temp')
  let humidity_element = document.getElementById('humidity')
  let date_element= document.getElementById('date')

  temp_element.innerHTML = `<img src="https://img.icons8.com/emoji/48/000000/sun-behind-large-cloud.png"/> ${Math.round(temperature.data.data.Temp)}°C`
  humidity_element.innerHTML = `Humedad: ${Math.round(temperature.data.data.Hum)}%`
  date_element.innerHTML = `Fecha: ${temperature.data.data.createdAt ? temperature.data.data.createdAt .substr(0,10):'No disponible'}`
}

async function activateRele() {
  let response = await axios.post(`http://${server_host}:${server_port}/v1/temperature/`, { command: 'Activate' })
  let activate_element = document.getElementById('btn_activate_rele')
  let deactivate_element = document.getElementById('btn_deactivate_rele')
  
  activate_element.style.display = 'none'
  deactivate_element.style.display = 'inline-block'
  console.log(response)
}

async function deactivateRele() {
  let response = await axios.post(`http://${server_host}:${server_port}/v1/temperature/`, { command: 'Deactivate' })
  let activate_element = document.getElementById('btn_activate_rele')
  let deactivate_element = document.getElementById('btn_deactivate_rele')
  
  activate_element.style.display = 'inline-block'
  deactivate_element.style.display = 'none'
  console.log(response)
}


async function createChar() {
  let temperatures = await axios.get(`http://${server_host}:${server_port}/v1/temperature/data`)
  let temperature = temperatures.data
  let temp_array = temperature.slice(temperature.length-6).reverse()

  let temp_data = []
  let chart_labels = []

  for(data of temp_array) {
    chart_labels.push('H: '+Math.round(data.Hum)+"%")
    temp_data.push(data.Temp)
  }

  if(myChart) {
    document.getElementById('myChart').remove()
    let element_char = document.createElement('id')
    element_char.innerHTML = `<canvas id="myChart"></canvas>`
    document.getElementById('char').appendChild(element_char)
  }

  const ctx = document.getElementById('myChart').getContext('2d')


  myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: chart_labels,
          datasets: [{
              label: 'Ocultar datos',
              data: temp_data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
          title: {
            display: true,
            text: 'Temperaturas'
          }
        },
      }
  });
}