import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";


interface EstadoDaAplicacao {
    projetos: IProjeto[]
}

/* eh preciso definir uma chave de acesso para o compontente obter a store */
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
        ]
    },
    mutations: {
        'ADICIONA_PROJETO'(state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        }
    }
})

export function useStore(): Store<EstadoDaAplicacao> {
    return vuexUseStore(key)
}