import { INotificacao, TipoNotificacaoEnum } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-de-mutacao"

// explicitando o que deseja ser exportado:
type Notificador = {
    notificar: (tipo: TipoNotificacaoEnum, titulo: string, texto: string) => void
}

export default (): Notificador => {

    const notificar = (tipo: TipoNotificacaoEnum, titulo: string, texto: string): void => {
        store.commit(NOTIFICAR, {
            tipo,
            titulo,
            texto
        } as INotificacao)
    }

    return {
        notificar
    }
}
