import {defineComponent} from "vue";
import {WeatherConditionIcons} from './weather.service.ts';

export default defineComponent({
  name: 'WeatherItem',

  props: {
    weatherItem: {
      type: Object,
      required: true,
    },
  },

  setup() {

    function formatKelvinTempToCelsius(kelvinTemp) {
      return (kelvinTemp - 273.15).toFixed(1) + " °C"
    }

    function getWeatherIconById(id) {
      return WeatherConditionIcons[id]
    }

    function formatHPaPressureToMmHg(hPaPressure) {
      return (hPaPressure * 0.75).toFixed(0)
    }

    return {
      formatKelvinTempToCelsius,
      getWeatherIconById,
      formatHPaPressureToMmHg,
    }
  },

  template: `
    <div v-if="weatherItem.alert !== null" class="weather-alert">
      <span class="weather-alert__icon">⚠️</span>
      <span class="weather-alert__description">
        {{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}
      </span>
    </div>
    <div>
      <h2 class="weather-card__name">
        {{ weatherItem.geographic_name }}
      </h2>
      <div class="weather-card__time">
        {{ weatherItem.current.dt }}
      </div>
    </div>
    <div class="weather-conditions">
      <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">
        {{ getWeatherIconById(weatherItem.current.weather.id) }}
      </div>
      <div class="weather-conditions__temp">
        {{ formatKelvinTempToCelsius(weatherItem.current.temp) }}
      </div>
    </div>
    <div class="weather-details">
      <div class="weather-details__item">
        <div class="weather-details__item-label">Давление, мм рт. ст.</div>
        <div class="weather-details__item-value">
          {{ formatHPaPressureToMmHg(weatherItem.current.pressure) }}
        </div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Влажность, %</div>
        <div class="weather-details__item-value">
          {{ weatherItem.current.humidity }}
        </div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Облачность, %</div>
        <div class="weather-details__item-value">
          {{ weatherItem.current.clouds }}
        </div>
      </div>
      <div class="weather-details__item">
        <div class="weather-details__item-label">Ветер, м/с</div>
        <div class="weather-details__item-value">
          {{ weatherItem.current.wind_speed }}
        </div>
      </div>
    </div>
  `,
})
