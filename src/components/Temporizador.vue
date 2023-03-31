<template>
    <section class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :segundos="tempoEmSegundos"/>
        <Botao @clique="iniciar" classIcone="fas fa-play" texto="Play" v-bind:desabilitado="cronometroRodando" />
        <Botao @clique="finalizar" classIcone="fas fa-stop" texto="Stop" v-bind:desabilitado="!cronometroRodando" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

export default defineComponent({
    name: 'Temporizador',
    emits: ['aoEncerrarTemporizador'],
    components: {
        Cronometro, Botao
    },

    data: () => {
      return {
          tempoEmSegundos: 0,
          cronometro: 0,
          cronometroRodando: false
      }
    },
    methods: {
      iniciar() {
        this.cronometro = setInterval(() => {
          this.tempoEmSegundos += 1
        }, 1000)
        this.cronometroRodando = true
      },
      finalizar() {
        clearInterval(this.cronometro)
        this.cronometroRodando = false
        this.$emit('aoEncerrarTemporizador', this.tempoEmSegundos)
        this.tempoEmSegundos = 0
      }
    },
})
</script>