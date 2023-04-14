<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-7">{{ tarefa.descricao || 'Tarefa sem descrição' }}</div>
            <div class="column is-3">{{ tarefa.projeto?.nome || 'N/D' }}</div>
            <div class="column">
                <Cronometro :segundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from './Box.vue';

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
    setup(props, { emit }) {
        const tarefaClicada = (): void => {
            emit('aoTarefaClicada', props.tarefa)
        }

        return {
            tarefaClicada
        }
    }
})
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>