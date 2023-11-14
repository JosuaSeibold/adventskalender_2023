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
    <img @click="hebelClick" :style="styleHebel" class="hebel" src="@/assets/kitchen_asset.png" alt="nix gibts"/>
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
      <h4 v-if="keyMatcher">Da stimmt noch was nicht!</h4>
    </div>
		<div class="overlay" v-if="this.globalGameState.$state.kitchenState == 3">
      <h1>Es gibt noch einen Code?</h1>
      <h3>Gib das passende Muster ein.</h3>
			<div class="parent">
				<div v-for="(key, index) in pattern" :class="'div' + (index + 1)" @click="patternInput(index)">
					<p v-if="key">&#10008;</p>
				</div>
			</div>
			<h4 v-if="patternMatcher">Da stimmt noch was nicht!</h4>
      <button class="weiter" @click="finish">Mach auf jetzt!</button>
    </div>
    <div class="overlay" v-if="this.globalGameState.$state.kitchenState == 4 || this.globalGameState.$state.kitchenState == 6">
      <h1>Der Hebel!</h1>
      <h3>Die Tür ist noch mit einem Hebel gesichert.</h3>
      <button class="weiter" @click="hebelHandler">
        {{ globalGameState.$state.hebelStatus ? 'Ich will rein!' : 'Schließen' }}
      </button>
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
    computed: {
      styleHebel() {
        return 'transform: rotate(' + this.globalGameState.$state.rotateHebel + 'deg);';
      },
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
                this.incrementState();
            } else {
              this.keyMatcher = true;
              this.code = [null, null, null, null];
            }
        } else {
            for (let i = 0; i < 4; i++) {
                if (this.code[i] == null) {
                    this.code[i] = key;
                    break;
                }
            }
        }
      },
			patternInput(key) {
				this.pattern[key] = !this.pattern[key];
			},
			finish() {
				if (this.pattern[0] && this.pattern[2] && this.pattern[6] && this.pattern[9] && this.pattern[12] && this.pattern[13] && !this.pattern[1] && !this.pattern[3] && !this.pattern[4] && !this.pattern[5] && !this.pattern[7] && !this.pattern[8] && !this.pattern[10] && !this.pattern[11] && !this.pattern[14]) {
					if (this.globalGameState.$state.hebelStatus) {
            this.routeKeller();
          } else {
            this.globalGameState.incrementKitchenState();
          }
				} else {
					this.patternMatcher = true;
					this.pattern = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
				}
			},
      routeKeller() {
        router.push('/keller');
      },
      hebelClick() {
        this.globalGameState.hebelClick();
      },
      hebelHandler() {
        if (this.globalGameState.$state.hebelStatus) {
          this.routeKeller();
        } else {
          this.globalGameState.$state.kitchenState = 5;
        }
      }
    },
    data() {
      return {
        code: [null, null, null, null],
        keypadValues: [7,8,9,4,5,6,1,2,3,11,0,12],
				pattern: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				patternMatcher: false,
        keyMatcher: false
      }
    }
  }
  </script>
  
  <style scoped>
  .hebel {
    position: absolute;
    top: 483px;
    left: 785px;
    width: 75px;
    cursor: pointer;
  }
  .overlay {
    left: 400px;
    width: 600px;
    height: auto;
  }
  .geheim {
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

	.parent {
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(3, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
margin: 20px 50px;
}

.parent > div {
	height: 50px;
	cursor: pointer;
}
p {
	font-size: 35px;
	text-align: center;
	margin: 0;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 4; }
.div4 { grid-area: 1 / 4 / 2 / 5; }
.div5 { grid-area: 1 / 5 / 2 / 6; }
.div6 { grid-area: 2 / 1 / 3 / 2; }
.div7 { grid-area: 2 / 2 / 3 / 3; }
.div8 { grid-area: 2 / 3 / 3 / 4; }
.div9 { grid-area: 2 / 4 / 3 / 5; }
.div10 { grid-area: 2 / 5 / 3 / 6; }
.div11 { grid-area: 3 / 1 / 4 / 2; }
.div12 { grid-area: 3 / 2 / 4 / 3; }
.div13 { grid-area: 3 / 3 / 4 / 4; }
.div14 { grid-area: 3 / 4 / 4 / 5; }
.div15 { grid-area: 3 / 5 / 4 / 6; }

.div1, .div2, .div3, .div4, .div6, .div7, .div8, .div9, .div11, .div12, .div13, .div14 {
	border-right: 4px solid black;
}
.div1, .div2, .div3, .div4, .div5, .div6, .div7, .div8, .div9, .div10 {
	border-bottom: 4px solid black;
}

h4 {
	color: rgba(255,0,0,0.6);
}
  </style>