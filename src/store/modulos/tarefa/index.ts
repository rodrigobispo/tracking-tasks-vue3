import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { EstadoDaAplicacao } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, EXCLUIR_TAREFA, EXCLUIR_TODAS_TAREFAS } from "@/store/tipo-de-acoes";
import { ADICIONA_TAREFA, DEFINIR_TAREFAS, ALTERA_TAREFA, REMOVE_TAREFA, LIMPA_TODAS_TAREFAS } from "@/store/tipo-de-mutacao";
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
      const index = state.tarefas.findIndex((tar) => tar.id === tarefa.id)
      state.tarefas[index] = tarefa
    },
    [REMOVE_TAREFA](state, idTarefa: number) {
      state.tarefas = state.tarefas.filter(tar => tar.id != idTarefa)
    },
    [LIMPA_TODAS_TAREFAS](state) {
      state.tarefas = [] as ITarefa[]
    }
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas'

      if (filtro) {
        url += '?descricao=' + filtro
      }
      http.get(url).then((response) => commit(DEFINIR_TAREFAS, response.data))
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.post('/tarefas', tarefa).then(resposta => commit(ADICIONA_TAREFA, resposta.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http.put(`/tarefas/${tarefa.id}`, tarefa).then(() => commit(ALTERA_TAREFA, tarefa))
    },
    [EXCLUIR_TAREFA]({ commit }, idTarefa: number) {
      return http.delete(`/tarefas/${idTarefa}`)
        .then(() => commit(REMOVE_TAREFA, idTarefa))
    },
    [EXCLUIR_TODAS_TAREFAS]({ commit }, tarefas: ITarefa[]) {
      for (const [i, tarefa] of tarefas.entries()) {
        http.delete(`/tarefas/${tarefa.id}`).then(() => {
          if (i === tarefas.length - 1) {
            commit(LIMPA_TODAS_TAREFAS)
          }
        })
      }
    }
  }
}