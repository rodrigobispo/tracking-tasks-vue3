<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro' : modoEscuroAtivo }">
    <div class="column is-one-quarters">
      <BarraLateral @aoAlterTema="trocarTema"/>
    </div>
    <div class="column is-three-quarters conteudo">
      <router-view></router-view>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';

export default defineComponent({
    name: "App",
    components: {
      BarraLateral
    },
    data: () => {
      return {
        modoEscuroAtivo: false
      }
    },
    methods: {
      trocarTema(modoEscuroAtivado: boolean) {
        this.modoEscuroAtivo = modoEscuroAtivado
      }
    },
    computed: {}
});
</script>

<style>
.lista {
  padding: 0.95rem;
}

main {
  /* variaveis */
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #4b4c52;
  --texto-primario: #9597a6
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
