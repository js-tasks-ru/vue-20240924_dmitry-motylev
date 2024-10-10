import {defineComponent, ref, watch} from 'vue'
import {getMeetup} from './meetupsService.ts'

const meetupIdList = [1, 2, 3, 4, 5]

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedId = ref(1)
    const title = ref('')

    async function setMeetupTitle(id) {
      const dto = await getMeetup(id);
      title.value = dto.title;
    }

    watch(selectedId, setMeetupTitle, {immediate: true})

    return {
      meetupIdList,
      selectedId,
      title,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary"
                type="button"
                @click="selectedId--"
                :disabled="selectedId === meetupIdList[0]">
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div v-for="meetupId in meetupIdList" class="radio-group__button">
            <input
              :id="'meetup-id-' + meetupId"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="meetupId"
              v-model="selectedId"
            />
            <label :for="'meetup-id-' + meetupId" class="radio-group__label">{{ meetupId }}</label>
          </div>
        </div>

        <button class="button button--secondary"
                type="button"
                @click="selectedId++"
                :disabled="selectedId === meetupIdList[meetupIdList.length - 1]">
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ title }}</h1>
        </div>
      </div>

    </div>
  `,
})
