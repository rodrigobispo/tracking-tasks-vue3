<template>
  <div class="box">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" 
          class="input" 
          placeholder="Qual tarefa você deseja iniciar?" 
          v-model="descricao" />
      </div>
      <div class="column">
          <Temporizador @aoEncerrarTemporizador="encerrarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'Formulario',
  data() {
    return {
      descricao: ''
    }
  },
  components: {
    Temporizador
  },
  methods: {
    encerrarTarefa(tempoDecorrido: number): void {
      console.log("Tempo da tarefa: " + tempoDecorrido);
      console.log("Descrição da tarefa: " + this.descricao);
      this.descricao = ''
    }
  }
})

</script>

<style>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>