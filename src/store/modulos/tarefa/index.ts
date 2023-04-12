import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoDaAplicacao } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-de-acoes";
import { ADICIONA_TAREFA, DEFINIR_TAREFAS, ALTERA_TAREFA } from "@/store/tipo-de-mutacao";
import { Module } from "vuex";


export interface TarefaEstado {
    tarefas: ITarefa[]
}

export const tarefa: Module<TarefaEstado, EstadoDaAplicacao> = {
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex((t) => t.id === tarefa.id)
            state.tarefas[index] = tarefa
        }
    },
    actions: {
        [OBTER_TAREFAS]({ commit }) {
            http.get('tarefas')
                .then(response => commit(DEFINIR_TAREFAS, response.data))
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('/tarefas', tarefa).then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
        }
    }
}