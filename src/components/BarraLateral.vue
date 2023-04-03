<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="Tracker Tasks">
    </h1>
    <button class="button" @click="alterarTema">
      {{ textoBotao }}
    </button>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link :to="{ name: 'Tarefas' }" class="link">
            <i class="fas fa-tasks"></i> Tarefas
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Projetos' }" class="link">
            <i class="fas fa-project-diagram"></i> Projetos
          </router-link>
        </li>
      </ul>
    </nav>
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
      return this.modoEscuroAtivado ? 'Modo Claro' : 'Modo Escuro'
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

.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>