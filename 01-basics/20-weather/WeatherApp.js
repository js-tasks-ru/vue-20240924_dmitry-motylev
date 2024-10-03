import {defineComponent} from 'vue'
import {getWeatherData, WeatherConditionIcons} from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()

    function formatKelvinTempToCelsius(kelvinTemp) {
      return (kelvinTemp - 273.15).toFixed(1) + " °C"
    }

    function getWeatherIconById(id) {
      return WeatherConditionIcons[id]
    }

    function formatHPaPressureToMmHg(hPaPressure) {
      return (hPaPressure * 0.75).toFixed(0)
    }

    function nowNight(dt, sunrise, sunset) {
      return sunrise > dt && dt < sunset;
    }

    function nowNightForCurrent(current) {
      return nowNight(current.dt, current.sunrise, current.sunset)
    }

    return {
      weatherData,
      formatKelvinTempToCelsius,
      getWeatherIconById,
      formatHPaPressureToMmHg,
      nowNightForCurrent,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="item in weatherData" class="weather-card"
            :class="{'weather-card--night' : nowNightForCurrent(item.current)}">
          <div v-if="item.alert !== null" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">
              {{ getWeatherIconById(item.current.weather.id) }}
            </div>
            <div class="weather-conditions__temp">
              {{ formatKelvinTempToCelsius(item.current.temp) }}
            </div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">
                {{ formatHPaPressureToMmHg(item.current.pressure) }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">
                {{ item.current.humidity }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">
                {{ item.current.clouds }}
              </div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">
                {{ item.current.wind_speed }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
