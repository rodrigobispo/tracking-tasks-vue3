import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";


interface EstadoDaAplicacao {
    projetos: IProjeto[]
}

/* eh preciso definir uma chave de acesso para o compontente obter a store */
export const key: InjectionKey<Store<EstadoDaAplicacao>> = Symbol()

export const store = createStore<EstadoDaAplicacao>({
    state: {
        projetos: [
            {
                id: new Date().toISOString(),
                nome: 'TypeScript'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vue'
            },
            {
                id: new Date().toISOString(),
                nome: 'Vuex'
            }
        ]
    }
})