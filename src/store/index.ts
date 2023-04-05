import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, REMOVE_PROJETO } from "./tipo-de-mutacao";
import ITarefa from "@/interfaces/ITarefa";
import { INotificacao, TipoNotificacaoEnum } from "@/interfaces/INotificacao";


interface EstadoDaAplicacao {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[]
}

/* eh preciso definir uma chave de acesso para o componente obter a store */
export const key: InjectionKey<Store<EstadoDaAplicacao>> = Symbol()

export const store = createStore<EstadoDaAplicacao>({
    state: {
        projetos: [
            // estaticos/fixados
            // {
            //     id: new Date().toISOString(),
            //     nome: 'TypeScript'
            // },
            // {
            //     id: new Date().toISOString(),
            //     nome: 'Vue'
            // },
            // {
            //     id: new Date().toISOString(),
            //     nome: 'Vuex'
            // }
        ],
        tarefas: [],
        notificacoes: [
            {
                id: 1,
                tipo: TipoNotificacaoEnum.SUCCESS,
                titulo: 'sucesso',
                texto: 'Uma notificação de sucesso.'
            } as INotificacao,
            {
                id: 2,
                tipo: TipoNotificacaoEnum.ERROR,
                titulo: 'erro',
                texto: 'Uma notificação de erro.'
            } as INotificacao,
            {
                id: 3,
                tipo: TipoNotificacaoEnum.WARNING,
                titulo: 'aviso',
                texto: 'Uma notificação de aviso.'
            } as INotificacao,
        ]
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex((proj) => proj.id === projeto.id)
            state.projetos[index] = projeto
        },
        [REMOVE_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        }
    }
})

export function useStore(): Store<EstadoDaAplicacao> {
    return vuexUseStore(key)
}