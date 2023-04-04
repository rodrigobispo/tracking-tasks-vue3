<template>
    <router-link :to="{ name: 'NovoProjeto' }" class="button">
        <span class="icon is-small">
            <i class="fas fa-plus"></i>
        </span>
        <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nome do projeto</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
                <td>
                    <router-link :to="{ name: 'EditarProjeto', params: { id: projeto.id } }" class="button">
                        <span class="icon is-small">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';
// import IProjeto from '../interfaces/IProjeto'
import { useStore } from '@/store';

export default defineComponent({
    name: "Projetos",
    data: () => {
        return {
            nomeDoProjeto: '',
            // projetos: [] as IProjeto[]
        }
    },
    methods: {
    },
    computed: {
    },
    setup() {
        const store = useStore()
        return {
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
});
</script>
