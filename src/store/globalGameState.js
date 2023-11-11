import { defineStore } from 'pinia'

export const useGlobalGameStateStore = defineStore('globalGameState', {
    state: () => ({
        geheimgangFreigeschaltet: false,
        rotationSocke1: -70,
        rotationSocke2: 60,
        rotationSocke3: -110,
        rotationSocke4: 180,
        rotationSocke5: 20,
        flurState: 0,
        kitchenState: 0,
    }),
    getters: {
        isRaetselSolved() {
            return (this.rotationSocke1 % 360 === 0) && 
                (this.rotationSocke2 % 360 === 0) && 
                (this.rotationSocke3 % 360 === 0) && 
                (this.rotationSocke4 % 360 === 0) && 
                (this.rotationSocke5 % 360 === 0);
        }
    },
    actions: {
        rotateSocke(socke) {
          if (socke === "socke1") {
              this.rotationSocke1 += 10;
          }
          else if (socke === "socke2") {
              this.rotationSocke2 += 10;
          }
          else if (socke === "socke3") {
              this.rotationSocke3 += 10;
          }
          else if (socke === "socke4") {
              this.rotationSocke4 += 10;
          }
          else if (socke === "socke5") {
              this.rotationSocke5 += 10;
          }
        },
        incrementFlurState() {
            this.flurState += 1;
        },
        incrementKitchenState() {
            this.kitchenState += 1;
        }
    }
})