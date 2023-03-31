<template>
  <main class="columns is-gapless is-multiline modo-escuro">
    <div class="column is-one-quarters">
      <BarraLateral></BarraLateral>
    </div>
    <div class="column is-three-quarters conteudo">
      <Formulario @aoSalvarTarefa="salvaTarefa"></Formulario>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" v-bind:key="index" :tarefa="tarefa" />
        <Box v-show="listaVazia" :msgAviso=true>
          Você não registrou tarefas hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Box from './components/Box.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa.js';

export default defineComponent({
    name: "App",
    components: {
      BarraLateral,
      Formulario,
      Tarefa,
      Box
    },
    data: () => {
      return {
        tarefas: [] as ITarefa[]
      }
    },
    methods: {
      salvaTarefa(tarefa: ITarefa) {
        this.tarefas.push(tarefa)
      }
    },
    computed: {
      listaVazia(): boolean {
        return this.tarefas.length === 0
      }
    }
});
</script>

<style scoped>
.lista {
  padding: 0.5rem;
}
main {
  /* variaveis */
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #4b4c52;
  --texto-primario: #fff
}

.conteudo {
  background-color: var(--bg-primario);
}

</style>
