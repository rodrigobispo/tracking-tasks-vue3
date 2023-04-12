<template>
    <form @submit.prevent="salvar">
        <div class="field">
            <div for="nomeDoProjeto" class="label">
                Nome do Projeto:
            </div>
            <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
        </div>
        <div class="field is-grouped">
            <div class="control">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </div>
    </form>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
// import IProjeto from '../interfaces/IProjeto'
import { useStore } from '@/store';
import IProjeto from '@/interfaces/IProjeto';
import { TipoNotificacaoEnum } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-de-acoes';

export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data: () => {
        return {
            nomeDoProjeto: '',
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                } as IProjeto).then(() => this.lidarComSucesso())
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso())
            }
        },
        lidarComSucesso() {
            this.nomeDoProjeto = ''
            this.notificar(TipoNotificacaoEnum.SUCCESS, 'Novo projeto foi salvo.', 'Prontinho :) seu projeto já está diponível.')
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
});
</script>
