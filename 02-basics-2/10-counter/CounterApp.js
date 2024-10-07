import {defineComponent, ref, watch} from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0)

    watch(count, (value) => {
      if (value > 5) {
        count.value = 5
      }
      if (value < 0) {
        count.value = 0
      }
    })

    return {
      count
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="count--"
        :disabled="count === 0"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="count++"
        :disabled="count === 5"
      >➕</button>
    </div>
  `,
})
