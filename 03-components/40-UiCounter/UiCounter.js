import {defineComponent, toRef} from 'vue'
import {UiButton} from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    }
  },

  emits: ['update:count'],

  setup(props, {emit}) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне
    const refCount = toRef(() => props.count)

    function handleDecrementClick(value) {
      emit('update:count', --value)
    }

    function handleIncrementClick(value) {
      emit('update:count', ++value)
    }

    return {
      handleDecrementClick,
      handleIncrementClick,
      refCount
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" @click="handleDecrementClick(refCount)" :disabled="refCount <= min">➖</UiButton>
      <span class="count" data-testid="count">{{ refCount }}</span>
      <UiButton aria-label="Increment" @click="handleIncrementClick(refCount)" :disabled="refCount >= max">➕</UiButton>
    </div>
  `,
})
