import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-de-mutacao";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { TarefaEstado, tarefa } from "./modulos/tarefa";


export interface EstadoDaAplicacao {
    notificacoes: INotificacao[],
    projeto: EstadoProjeto,
    tarefa: TarefaEstado
}

/* eh preciso definir uma chave de acesso para o componente obter a store */
export const key: InjectionKey<Store<EstadoDaAplicacao>> = Symbol()

export const store = createStore<EstadoDaAplicacao>({
    state: {
        notificacoes: [],
        projeto: {
            projetos: []
        },
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        },
    },
    actions: {},
    modules: {
        projeto, tarefa
    }
})

export function useStore(): Store<EstadoDaAplicacao> {
    return vuexUseStore(key)
}