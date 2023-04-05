export enum TipoNotificacaoEnum {
    SUCCESS,
    ERROR,
    WARNING
}

export interface INotificacao {
    tipo: TipoNotificacaoEnum,
    titulo: string,
    texto: string,
    id: number
}