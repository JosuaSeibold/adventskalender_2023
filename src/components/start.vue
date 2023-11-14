<template>
    <div class="centered-image">
      <img ondragstart="return false;" ondrop="return false;" class="fill" src="@/assets/eingang.png" alt="Image description">
      <img @touchstart="onTouch" class="key" src="@/assets/keyy.png" alt="key">
    </div>
    <div ref="dropZoneRef" class="drop"></div>
    <div class="blocker" v-if="step < 2"></div>
    <div class="overlay" v-if="step==0">
      <h1>Hilfe!</h1>
      <h3>Der Weihnachtsmann hat sich in seinem eigenen Haus verlaufen! Kannst du ihn Retten?</h3>
      <button class="weiter" @click="letsGo">Los!</button>
    </div>
    <div class="overlay" v-if="step==1">
      <h1>Trete Ein!</h1>
      <h3>Hier muss irgendwo der Schlüssel für die Tür sein.</h3>
      <button class="weiter" @click="letsGo">Los!</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useDropZone } from '@vueuse/core';
  import router from '@/router';
  export default {
    name: 'Start',
    setup() {
      const dropZoneRef = ref(null);

      function onDrop() {
        router.push('/flur')
      }

      const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);

      return { dropZoneRef, isOverDropZone }
    },
    methods: {
      letsGo() {
        this.step += 1;
      },
      onTouch() {
        router.push('/flur');
      }
    },
    data() {
      return {
        step: 0,
      }
    }
  }
  </script>
  
  <style>
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
    top: 380px;
    left: 1020px;
  }

  .drop {
    position: absolute;
    width: 50px;
    height: 100px;
    top: 640px;
    left: 395px;
  }

  .weiter {
    cursor: pointer;
    color: white;
    font-size: 20px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 20px;
    width: 200px;
  }

  .blocker {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 150;
    width: 1085px;
    height: 1085px;
  }
  
  .overlay {
    z-index: 200;
    background-color: rgba(255, 255, 255, 0.6);
    box-sizing: border-box;
    border-radius: 30px;
    padding: 30px;
    width: 300px;
    height: 300px;
    position: absolute;
    left: 539px;
    top: 30%;
    margin-left: -150px;
    margin-top: -150px;
  }

  @media screen and (max-width: 1084px) {
    .overlay {
      left: 50%;
      top: 30%;
    }
  }
  </style>
  