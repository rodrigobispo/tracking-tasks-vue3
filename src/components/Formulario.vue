<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <input type="text" 
          class="input" 
          placeholder="Qual tarefa você deseja iniciar?" 
          v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto...</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
          <Temporizador @aoEncerrarTemporizador="encerrarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { key } from '@/store';
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  data() {
    return {
      descricao: '',
      idProjeto: ''
    }
  },
  components: {
    Temporizador
  },
  methods: {
    encerrarTarefa(tempoDecorrido: number): void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      });
      this.descricao = ''
    }
  },
  setup() {
    const store = useStore(key);
    return {
      projetos: computed(() => store.state.projetos)
    }
  }
})

</script>

<style scoped>
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

.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>