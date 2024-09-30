import {defineComponent, createApp} from 'vue/dist/vue.esm-browser.js'

const App = defineComponent({
  name: 'App',
  setup() {
  },

  template: `
    <div>Сегодня {{
        new Date().toLocaleDateString('ru-RU', {
          dateStyle: 'long'
        })
      }}
    </div>
  `,
})

createApp(App).mount('#app')
