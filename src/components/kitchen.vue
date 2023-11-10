<template>
    <div class="centered-image">
      <img ondragstart="return false;" ondrop="return false;" class="fill" src="@/assets/kitchen.png" alt="Image description">
    </div>
    <div v-if="this.globalGameState.isRaetselSolved" @click="incrementState" class="clickzone geheim"></div>
    <div class="clickzone zurueck" @click="inFlur"><h2>Zurück in Flur</h2></div>
    <div class="overlay" v-if="this.globalGameState.$state.kitchenState == 1">
      <h1>Du hast den Geheimgang gefunden!</h1>
      <h3>Kannst du ihn öffnen? Vielleicht hat sich der Weihnachtsmann eingesperrt.</h3>
      <button class="weiter" @click="incrementState">Weiter!</button>
    </div>
    <div class="overlay" v-if="this.globalGameState.$state.kitchenState == 2">
      <h1>Der Geheimgang ist verschlossen</h1>
      <h3>Gib den Code ein, um das Schloss zu öffnen:</h3>
      <div class="keydial">
        <div v-for="(circle, index) in code">
            <div class="circle" :class="[circle ? 'filled' : null ]"></div>
        </div>
      </div>
      <div class="keypad">
        <div v-for="(key, index) in keypadValues">
            <div @click="keyInput(key)" class="code-button">{{ key === 11 ? '&#10006;' : key === 12 ? '&#10004;' : key }}</div>
        </div>
      </div>
      <button class="weiter" @click="incrementState">Weiter!</button>
    </div>
  </template>
  
  <script>
  import router from '@/router';
  import { useGlobalGameStateStore } from '@/store/globalGameState';

  export default {
    name: 'Kitchen',
    setup() {
        const globalGameState = useGlobalGameStateStore();

        return { globalGameState };
    },
    methods: {
      inFlur() {
        router.push('/flur');
      },
      incrementState() {
        this.globalGameState.incrementKitchenState();
      },
      keyInput(key) {
        if (key == 11) {
            for (let i = 3; i > -1; i--) {
                if (this.code[i] != null) {
                    this.code[i] = null;
                    break;
                }
            }
        } else if (key == 12) {
            if (this.code[0] == 8 && this.code[1] == 5 && this.code[2] == 1 && this.code[3] == 4) {
                this.globalGameState.incrementFlurState;
            }
        } else {
            for (let i = 0; i < 4; i++) {
                if (this.code[i] == null) {
                    this.code[i] = key;
                    break;
                }
            }
        }
        console.log(this.code);
      }
    },
    data() {
      return {
        code: [null, null, null, null],
        keypadValues: [7,8,9,4,5,6,1,2,3,11,0,12]
      }
    }
  }
  </script>
  
  <style scoped>
  .overlay {
    left: 400px;
    width: 600px;
    height: auto;
  }
  .geheim {
    border: 1px solid white;
    width: 200px;
    height: 150px;
    position: absolute;
    top: 530px;
    left: 440px;
  }
  .keydial {
    box-sizing: border-box;
    width: 100%;
    padding: 0 90px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .circle {
    border: 2px solid black;
    border-radius: 30px;
    width: 30px;
    height: 30px;
  }
  .filled {
    background-color: black;
  }
  .keypad {
    box-sizing: border-box;
    width: 100%;
    padding: 0 150px;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .keypad > div {
    flex: 0 0 33.33%;
  }
  .code-button {
    cursor: pointer;
    border: 2px solid black;
    border-radius: 50px;
    background-color: rgba(0,0,0,0.1);
    width: 50px;
    height: 50px;
    color: black;
    font-size: 30px;
    padding: 5px;
    margin: 5px;
    text-align: center;
  }
  </style>