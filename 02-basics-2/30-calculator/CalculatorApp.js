import {computed, defineComponent, ref} from 'vue'

function isNotEmpty(str) {
  return str !== null && str !== "";
}

export default defineComponent({
  name: 'CalculatorApp',

  setup() {

    const operator = ref(null)
    const firstOperand = ref(null)
    const secondOperand = ref(null)

    const output = computed(() => {
      let value = 0
      if (isNotEmpty(firstOperand.value) && isNotEmpty(secondOperand.value)) {
        switch (operator.value) {
          case 'sum':
            value = firstOperand.value + secondOperand.value
            break
          case 'subtract':
            value = firstOperand.value - secondOperand.value
            break
          case 'multiply':
            value = firstOperand.value * secondOperand.value
            break
          case 'divide':
            value = firstOperand.value / secondOperand.value
            break
          default:
            break
        }
      }
      return value
    })

    return {
      output,
      operator,
      firstOperand,
      secondOperand
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstOperand"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondOperand"/>

      <div>=</div>

      <output>{{ output }}</output>
    </div>
  `,
})
