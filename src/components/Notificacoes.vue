<template>
    <div class="notificacoes">
        <article class="message"
            :class="contextoDeMensagem[notificacao.tipo]"
            v-for="notificacao in notificacoes"
            :key="notificacao.id">
            <div class="message-header"><p>{{ notificacao.titulo }}</p></div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { TipoNotificacaoEnum } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'Notificacoes',
    data() {
        return {
            contextoDeMensagem: {
                [TipoNotificacaoEnum.SUCCESS]: 'is-success',
                [TipoNotificacaoEnum.ERROR]: 'is-danger',
                [TipoNotificacaoEnum.WARNING]: 'is-warning',
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            store,
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes {
    padding: 10px;
    position: absolute;
    right: 0;
    width: 350px;
    z-index: 105;
}
</style>