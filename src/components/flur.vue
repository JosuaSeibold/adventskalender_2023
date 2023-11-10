<template>
    <div class="centered-image">
      <img ondragstart="return false;" ondrop="return false;" class="fill" src="@/assets/corridor.png" alt="Image description">
    </div>
    <div class="clickzone dachboden" @click="dachboden"></div>
    <div class="clickzone wohnzimmer" @click="wohnzimmer"></div>
    <div class="clickzone kitchen" @click="kitchen"></div>
    <div class="blocker" v-if="this.globalGameState.$state.flurState < 1"></div>
    <div class="overlay" v-if="this.globalGameState.$state.flurState==0">
      <h1>Sehr gut!</h1>
      <h3>Wo möchtest du als nächstes hin?</h3>
      <button class="weiter" @click="this.globalGameState.incrementFlurState">Weiter</button>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  import { useGlobalGameStateStore } from '@/store/globalGameState';

  export default {
    name: 'Flur',
    setup() {
        const globalGameState = useGlobalGameStateStore();

        return { globalGameState };
    },
    methods: {
      dachboden() {
        router.push('/dachboden');
      },
      wohnzimmer() {
        router.push('/wohnzimmer');
      },
      kitchen() {
        router.push('/kitchen');
      }
    },
    data() {
      return {
      }
    }
  }
  </script>
  
  <style>
  .clickzone {
    z-index: 90;
    cursor: pointer;
  }

  .zurueck {
    width: 800px;
    height: 100px;
    position: absolute;
    top: 1000px;
    left: 140px;
    cursor: pointer;
  }

  .zurueck > h2 {
    color: black;
  }

  .dachboden {
    width: 250px;
    height: 800px;
    position: absolute;
    top: 50px;
    left: 800px;
  }

  .wohnzimmer {
    width: 250px;
    height: 800px;
    position: absolute;
    top: 50px;
    left: 25px;
  }

  .kitchen {
    width: 200px;
    height: 400px;
    position: absolute;
    top: 350px;
    left: 435px;
  }

  .centered-image {
    width: 1084px;
    height: 1084px;
  }

  .fill {
    width: 1084px;
    height: 1084px;
  }

  .key {
    z-index: 100;
    position: absolute;
    width: 40px;
    top: 350px;
    right: -320px;
  }

  .drop {
    position: absolute;
    width: 50px;
    height: 100px;
    top: 640px;
    right: 290px;
  }
  </style>
  