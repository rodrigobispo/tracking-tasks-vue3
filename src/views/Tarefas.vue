<template>
    <Formulario @aoSalvarTarefa="salvaTarefa"></Formulario>
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" v-bind:key="index" :tarefa="tarefa" />
        <Box v-show="listaVazia" :msgAviso=true>
            Você não registrou tarefas hoje :(
        </Box>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa.js';
import { useStore } from '@/store';
import { ADICIONA_TAREFA, NOTIFICAR } from '@/store/tipo-de-mutacao';
import { INotificacao, TipoNotificacaoEnum } from '@/interfaces/INotificacao';

export default defineComponent({
    name: "Tarefas",
    components: {
        Formulario,
        Tarefa,
        Box
    },
    data: () => {
        return {
            // tarefas: [] as ITarefa[],
        }
    },
    methods: {
        salvaTarefa(tarefa: ITarefa) {
            if (!tarefa.projeto) {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Tarefa inválida',
                    texto: 'Não há projeto relacionado para a tarefa.',
                    tipo: TipoNotificacaoEnum.ERROR
                } as INotificacao)
                return
            }
            this.store.commit(ADICIONA_TAREFA, tarefa)
        }
    },
    computed: {
        listaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            tarefas: computed(() => store.state.tarefas)
        }
    }
});
</script>
  
  