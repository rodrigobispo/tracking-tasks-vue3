<template>
  <Box>
    <div class="columns">
      <div class="column is-5 clicavel" @click="tarefaClicada">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
      <div class="column is-4 clicavel" @click="tarefaClicada">{{ tarefa.projeto?.nome || 'N/D' }}</div>
      <div class="column is-1 clicavel" @click="tarefaClicada">
        <Cronometro :segundos="tarefa.duracaoEmSegundos" />
      </div>
      <div class="column">
        <button class="button ml-2 is-danger" @click="remover(tarefa.id)">
          <span class="icon is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from './Box.vue';
import { EXCLUIR_TAREFA } from '@/store/tipo-de-acoes';
import { useStore } from '@/store';

export default defineComponent({
  name: 'Tarefa',
  emits: ['aoTarefaClicada'],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },
  components: { Cronometro, Box },
  methods: {
    remover(id: number): void {
      this.store.dispatch(EXCLUIR_TAREFA, id)
      this.$router.push("/")
    }
  },
  setup(props, { emit }) {
    const store = useStore()

    const tarefaClicada = (): void => {
      emit('aoTarefaClicada', props.tarefa)
    }

    return {
      tarefaClicada,
      store,
    }
  }
})
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>