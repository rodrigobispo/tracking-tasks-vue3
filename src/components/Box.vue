<template>
  <div :class="estilo">
    <slot></slot>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Box',
  props: {
    msgAviso: {
        type: Boolean,
        required: false
    }
  },
  computed: {
    estilo() {
        return this.msgAviso ? 'box-error has-text-weight-bold' : 'box has-text-weight-bold'
    }
  }
})
</script>

<style scoped>
.box {
  background: #f8fad6;
}
.box-error {
  background: #ffd1d1;
  padding: 1.25rem;
}
</style>