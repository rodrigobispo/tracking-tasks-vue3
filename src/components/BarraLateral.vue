<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Tracker Tasks">
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
  </header>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoAlterTema'],
  data() {
    return {
      modoEscuroAtivado: false
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivado = !this.modoEscuroAtivado
      this.$emit('aoAlterTema', this.modoEscuroAtivado)
    }
  },
  computed: {
    textoBotao(): string {
      if (this.modoEscuroAtivado) {
        return 'Desativar Modo Escuro'
      }
      return 'Ativar Modo Escuro'
    }
  }
})

</script>

<style scoped>
/* Todo o estilo do componente */
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>