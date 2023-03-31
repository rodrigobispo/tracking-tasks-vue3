<template>
    <button class="button" @click="clique" v-bind:disabled="desabilitado">
        <span class="icon">
            <i :class="classIcone"></i>
        </span>
        <span>{{ texto }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Botao',
    emits: ['clique'],
    props: {
        classIcone: {
            type: String,
            required: true
        },
        texto: {
            type: String,
            required: true
        },
        desabilitado: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        clique(): void {
            this.$emit('clique')
        }
    }
})
</script>