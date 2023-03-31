<template>
  <div v-if="msgAviso" class="box has-text-weight-bold" :style="estiloNormal">
    <slot></slot>
  </div>
  <div v-else class="box has-text-weight-bold" :style="estiloSemTarefa">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Box',
  data: () => {
    return {
      estiloNormal: {
        backgroundColor: '#ffd1d1' //padrão camel case
      },
      estiloSemTarefa: {
        'background-color': '#f8fad6' //kebab case (outra maneira)
      },
    }
  },
  props: {
    msgAviso: {
        type: Boolean,
        required: false
    }
  },
})
</script>