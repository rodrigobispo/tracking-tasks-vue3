<template>
    <Formulario @aoSalvarTarefa="salvaTarefa"></Formulario>
    <div class="lista">
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Box v-show="listaVazia" :msgAviso=true>
            Você não registrou tarefas hoje :(
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas"
            v-bind:key="index"
            :tarefa="tarefa"
            @ao-tarefa-clicada="selecionarTarefa">
        </Tarefa>
        <Modal :exibir="tarefaSelecionada != null">
            <template v-slot:cabecalho>
                <p class="modal-card-title">Editando uma tarefa</p>
                <button @click="fecharModal" class="delete" aria-label="close"></button>
            </template>
            <template v-slot:corpo>
                <!-- Content ... -->
                <div class="field">
                    <div for="descricaoDaTarefa" class="label">
                        Descrição:
                    </div>
                    <input type="text"
                        class="input"
                        v-if="tarefaSelecionada != null"
                        v-model="tarefaSelecionada.descricao"
                        id="descricaoDaTarefa">
                </div>
            </template>
            <template v-slot:rodape>
                <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </template>
        </Modal>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa.js';
import { useStore } from '@/store';
import { NOTIFICAR } from '@/store/tipo-de-mutacao';
import { INotificacao, TipoNotificacaoEnum } from '@/interfaces/INotificacao';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, OBTER_PROJETOS } from '@/store/tipo-de-acoes';
import Modal from '@/components/Modal.vue';

export default defineComponent({
    name: "Tarefas",
    components: {
        Formulario,
        Tarefa,
        Box,
        Modal
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
            this.store.dispatch(CADASTRAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    },
    computed: {
        listaVazia(): boolean {
            return this.tarefas?.length == 0
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const tarefaSelecionada = ref(null as ITarefa | null)
        const filtro = ref("");

        // const tarefas = computed(() =>
        //     store.state.tarefa.tarefas.filter(
        //         (t) => !filtro.value || t.descricao.includes(filtro.value)
        //     )
        // );

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })
        
        return {
            tarefas: computed(() => store.state.tarefa.tarefas),
            store,
            filtro,
            tarefaSelecionada
        }
    }
});
</script>
  
  