import { INotificacao, TipoNotificacaoEnum } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-de-mutacao"

export const notificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacaoEnum, titulo: string, texto: string): void {
            store.commit(NOTIFICAR, {
                tipo,
                titulo,
                texto
            } as INotificacao)
        }
    }
}
