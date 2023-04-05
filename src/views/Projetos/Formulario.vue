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
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/tipo-de-mutacao';

export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data: () => {
        return {
            nomeDoProjeto: '',
            // projetos: [] as IProjeto[]
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                } as IProjeto)
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            this.nomeDoProjeto = ''
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        return { store }
    }
});
</script>
