<template>
  <CollapseAccordion
    ref="accordion"
    v-model="model"
    :items="items"
    class="MenuStep"
  >
    <slot />
  </CollapseAccordion>
</template>

<script>
import { map, first, last } from 'lodash'
import { CollapseAccordion } from '@/components/Collapse'

export default {
  name: 'MenuStep',

  components: {
    CollapseAccordion
  },

  model: {
    prop: 'step',
    event: 'change'
  },

  props: {
    step: {
      type: [Number, String],
      required: false,
      default: null
    }
  },

  data: () => ({
    items: []
  }),

  computed: {
    model: {
      get () {
        return this.step
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  },

  mounted () {
    this.items = this.collectItems()
  },

  methods: {
    collectItems () {
      const steps = this.collections_filterChilds('MenuStepItem', this.$refs.accordion) || []
      const collapses = map(steps, step => step.$refs.collapse)

      // The first and last items has a different style and text on the default footer
      const firstStep = first(steps)
      if (firstStep) {
        firstStep.isFirstItem = true
      }

      const lastStep = last(steps)
      if (lastStep) {
        lastStep.isLastItem = true
      }

      return collapses
    }
  }
}
</script>
