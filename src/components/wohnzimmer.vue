<template>
    <div class="centered-image">
      <img ondragstart="return false;" ondrop="return false;" class="fill" src="@/assets/wohnzimmer.png" alt="Image description">
    </div>
    <img :style="styleSocke1" @click="rotateSocke('socke1')" class="socke1 socke" ondragstart="return false;" ondrop="return false;" src="@/assets/socke1.png" alt="Image description">
    <img :style="styleSocke2" @click="rotateSocke('socke2')" class="socke2 socke" ondragstart="return false;" ondrop="return false;" src="@/assets/socke2.png" alt="Image description">
    <img :style="styleSocke3" @click="rotateSocke('socke3')" class="socke3 socke" ondragstart="return false;" ondrop="return false;" src="@/assets/socke3.png" alt="Image description">
    <img :style="styleSocke4" @click="rotateSocke('socke4')" class="socke4 socke" ondragstart="return false;" ondrop="return false;" src="@/assets/socke4.png" alt="Image description">
    <img :style="styleSocke5" @click="rotateSocke('socke5')" class="socke5 socke" ondragstart="return false;" ondrop="return false;" src="@/assets/socke5.png" alt="Image description">
    <div class="clickzone zurueck" @click="inFlur"><h2>Zurück in Flur</h2></div>
    <div class="overlay" v-if="step==1">
      <h1>Unlocked</h1>
      <h3>Du hast den Geheimgang freigeschaltet!</h3>
      <button class="weiter" @click="letsGo">Weiter</button>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  import { useGlobalGameStateStore } from '@/store/globalGameState';

  export default {
    name: 'Wohnzimmer',
    setup() {
        const globalGameState = useGlobalGameStateStore();

        return { globalGameState };
    },
    computed: {
        styleSocke1() {
            return 'transform: rotate(' + this.globalGameState.$state.rotationSocke1 + 'deg);';
        },
        styleSocke2() {
            return 'transform: rotate(' + this.globalGameState.$state.rotationSocke2 + 'deg);';
        },
        styleSocke3() {
            return 'transform: rotate(' + this.globalGameState.$state.rotationSocke3 + 'deg);';
        },
        styleSocke4() {
            return 'transform: rotate(' + this.globalGameState.$state.rotationSocke4 + 'deg);';
        },
        styleSocke5() {
            return 'transform: rotate(' + this.globalGameState.$state.rotationSocke5 + 'deg);';
        },
    },
    methods: {
      letsGo() {
        this.step = 0;
      },
      inFlur() {
        router.push('/flur');
      },
      rotateSocke(socke) {
        this.globalGameState.rotateSocke(socke)
        if (this.globalGameState.isRaetselSolved) {
          this.step++;
        } else {
          this.step = 0;
        }
      }
    },
    data() {
      return {
        step: 0,
      }
    }
  }
  </script>
  
  <style scoped>
  .socke {
    position: absolute;
  }
  .socke1 {
    top: 530px;
    left: 530px;
  }
  .socke2 {
    top: 530px;
    left: 590px;
    transform: rotate(30deg);
  }
  .socke3 {
    top: 530px;
    left: 660px;
  }
  .socke4 {
    top: 530px;
    left: 720px;
  }
  .socke5 {
    top: 530px;
    left: 780px;
  }
  </style>