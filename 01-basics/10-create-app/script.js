import {defineComponent, createApp} from 'vue/dist/vue.esm-browser.js'

const App = defineComponent({
  name: 'App',
  setup() {

    function getCurrentDateInLocalFormat() {
      return new Date().toLocaleString(navigator.language, {
        dateStyle: 'long'
      })
    }

    return {
      getCurrentDateInLocalFormat
    }
  },

  template: `
    <div>Сегодня {{ getCurrentDateInLocalFormat() }}</div>
  `,
})

createApp(App).mount('#app')
