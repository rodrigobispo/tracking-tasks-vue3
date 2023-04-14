<template>
    <Formulario @aoSalvarTarefa="salvaTarefa"></Formulario>
    <div class="lista">
        <Box v-show="listaVazia" :msgAviso=true>
            Você não registrou tarefas hoje :(
        </Box>
        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas"
            v-bind:key="index"
            :tarefa="tarefa"
            @ao-tarefa-clicada="selecionarTarefa">
        </Tarefa>
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button @click="fecharModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                    <div class="field">
                        <div for="descricaoDaTarefa" class="label">
                            Descrição:
                        </div>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
                    <button @click="fecharModal" class="button">Cancelar</button>
                </footer>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Box from '../components/Box.vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa.js';
import { useStore } from '@/store';
import { NOTIFICAR } from '@/store/tipo-de-mutacao';
import { INotificacao, TipoNotificacaoEnum } from '@/interfaces/INotificacao';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, OBTER_PROJETOS } from '@/store/tipo-de-acoes';

export default defineComponent({
    name: "Tarefas",
    components: {
        Formulario,
        Tarefa,
        Box
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
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
            return this.tarefas?.length === 0
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);

        const filtro = ref("");

        const tarefas = computed(() =>
            store.state.tarefa.tarefas.filter(
                (t) => !filtro.value || t.descricao.includes(filtro.value)
            )
        );

        return {
            store,
            tarefas,
            filtro
        }
    }
});
</script>
  
  