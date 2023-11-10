<template>
    <div class="centered-image">
      <img ondragstart="return false;" ondrop="return false;" class="fill" src="@/assets/keller.png" alt="Image description">
    </div>
    <div class="blocker" v-if="step < 1"></div>
    <div class="overlay" v-if="step==0">
      <h1>Sehr gut!</h1>
      <h3>Wo möchtest du als nächstes hin?</h3>
      <button class="weiter" @click="letsGo">Weiter</button>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  export default {
    name: 'Keller',
    methods: {
      letsGo() {
        this.step += 1;
      },
      inFlur() {
        router.push('/flur');
      }
    },
    data() {
      return {
        step: 2,
      }
    }
  }
  </script>
  
  <style scoped>
  </style>