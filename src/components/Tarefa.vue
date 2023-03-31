<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-7">
                Descrição da tarefa
            </div>
            <div class="column">
                <Cronometro :segundos="15" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
    name: 'Tarefa',
    emits: ['clique'],
    components: { Cronometro },
    methods: {}
})
</script>

<style scoped>
.box {
    background: #f8fad6;
}
</style>