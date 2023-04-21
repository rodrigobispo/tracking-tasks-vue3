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
import { defineComponent, ref } from 'vue';
// import IProjeto from '../interfaces/IProjeto'
import { useStore } from '@/store';
import IProjeto from '@/interfaces/IProjeto';
import { TipoNotificacaoEnum } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador'
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-de-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    setup(props) {

        const store = useStore()
        const { notificar } = useNotificador()

        const nomeDoProjeto = ref("")
        const router = useRouter()

        if (props.id) {
            if (props.id) {
                const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
                nomeDoProjeto.value = projeto?.nome || '';
            }
        }

        const salvar = () => {
          if (props.id) {
            store.dispatch(ALTERAR_PROJETO, {
              id: props.id,
              nome: nomeDoProjeto.value
            } as IProjeto).then(() => lidarComSucesso())
              .catch((error) => console.log(`Erro ocorrido: ${error.response.data}`));
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso());
            }
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(
                TipoNotificacaoEnum.SUCCESS,
                'Novo projeto foi salvo.',
                'Prontinho :) seu projeto já está diponível.'
            );
            router.push('/projetos');
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
});
</script>
