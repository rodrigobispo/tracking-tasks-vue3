<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <cronometro :segundos="tempoEmSegundos"/>
        <button class="button" @click="iniciar" v-bind:disabled="cronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" v-bind:disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
export default defineComponent({
    name: 'Temporizador',
    components: {
        Cronometro
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
      }
    },
})
</script>