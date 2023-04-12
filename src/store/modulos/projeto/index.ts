import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { EstadoDaAplicacao } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, EXCLUIR_PROJETO } from "@/store/tipo-de-acoes";
import { ADICIONA_PROJETO, ALTERA_PROJETO, REMOVE_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-de-mutacao";
import { Module } from "vuex";

//estado do modulo projeto
export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, EstadoDaAplicacao> = {
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
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETOS, resposta.data))
        },
        [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
            return http.post('/projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`/projetos/${projeto.id}`, projeto)
        },
        [EXCLUIR_PROJETO]({ commit }, idProjeto: string) {
            return http.delete(`/projetos/${idProjeto}`)
                .then(() => commit(REMOVE_PROJETO, idProjeto))
        },
    }
}