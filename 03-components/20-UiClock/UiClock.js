import {defineComponent, onMounted, onUnmounted, ref} from 'vue'

function formatTime(time) {
  const mediumTime = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "medium"
  });
  return mediumTime.format(time)
}

export default defineComponent({
  name: 'UiClock',

  setup() {
    const interval = ref(0)
    const currentTime = ref(Date.now())

    function updateDate() {
      currentTime.value = Date.now()
    }

    onMounted(() => {
      interval.value = setInterval(updateDate, 1000)
    })

    onUnmounted(() => {
      clearInterval(interval.value)
    })

    return {
      currentTime,
      formatTime,
    }
  },

  template: `
    <div class="clock">
      {{ formatTime(currentTime) }}
    </div>`,
})
