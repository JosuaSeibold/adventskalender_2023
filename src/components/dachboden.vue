<template>
    <div class="centered-image">
      <img ondragstart="return false;" ondrop="return false;" class="fill" src="@/assets/dachboden_raetsel.png" alt="Image description">
    </div>
    <div class="karte-container">
        <img @click="toggleTransform" ref="el" class="karte karte-klein" ondragstart="return false;" ondrop="return false;" src="@/assets/karte_text.png" alt="Image description">
    </div>
    <div class="clickzone zurueck" @click="inFlur"><h2>Zurück in Flur</h2></div>
  </template>
  
  <script>
  import router from '@/router';

  export default {
    name: 'Dachboden',
    methods: {
      inFlur() {
        router.push('/flur');
      },
      toggleTransform() {
        this.isTransformed = !this.isTransformed;

        if (this.isTransformed) {
            this.$refs.el.classList.add('karte-klein');
            this.$refs.el.classList.remove('karte-gros');
        } else {
            this.$refs.el.classList.add('karte-gros');
            this.$refs.el.classList.remove('karte-klein');
        }
      }
    },
    data() {
      return {
        isTransformed: true,
      }
    }
  }
  </script>
  
  <style scoped>
    .karte {
        cursor: pointer;
    }
    .karte-container {
        position: absolute;
        perspective: 1000px;
        top: 855px;
        left: 510px;
    }
    .karte-klein {
        width: 130px;
        transform: rotateX(59deg) rotateY(9deg) rotateZ(-51deg);
    }
    .karte-gros {
        width: 130px;
        transform: scale(6) translate(0, -50px);
    }
  </style>