import {defineComponent} from 'vue'
import WeatherItem from "./WeatherItem.js"

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherItem,
  },

  props: {
    weatherList: {
      type: Array,
      required: true,
    },
  },

  setup() {
    function nowNight(dt, sunrise, sunset) {
      return sunrise > dt || dt > sunset
    }

    function nowNightForItem(item) {
      return nowNight(item.dt, item.sunrise, item.sunset)
    }

    return {
      nowNightForItem,
    }
  },

  template: `
    <ul class="weather-list unstyled-list">
      <li v-for="weatherItem in weatherList"
          class="weather-card"
          :class="{'weather-card--night' : nowNightForItem(weatherItem.current)}">
        <WeatherItem :weather-item="weatherItem"/>
      </li>
    </ul>
  `,
})
