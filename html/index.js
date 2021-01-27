class TrafficLight {
  constructor() {
    // Adiciona todos os possíveis estados
    this.states = [
      new Light({ color: 'red', time: 15000, message: 'VERMELHO' }),
      new Light({ color: 'yellow', time: 5000, message: 'AMARELO' }),
      new Light({ color: 'green', time: 10000, message: 'VERDE' }),
    ];
    // Adiciona o estado atual
    this.current = this.states[0];
  }

  change() {
    const currentIndex = this.states.findIndex((state) => state === this.current);
    this.resetColors();

    // Altera o estado adicionando o objeto correspondente ao estado atual
    if (currentIndex + 1 === this.states.length) {
      this.current = this.states[0];
    } else {
      this.current = this.states[currentIndex + 1];
    }

    this.changeColor();
    this.next();
  }

  resetColors() {
    // Remove todas as cores das lampadas
    const bulbEls = document.querySelectorAll('.traffic-light__bulb');

    bulbEls.forEach((bulb) => {
      bulb.style.backgroundColor = '';
    });
  }

  changeColor() {
    // Altera a cor da lampada segundo o estado atual
    const { color } = this.current;
    const bulbEl = document.querySelector(`.${color}`);
   
    bulbEl.style.backgroundColor = color;
  }

  next() {
    // Adiciona um timeout para mudar para o proximo estado
    setTimeout(() => {
      this.change();
    }, this.current.time);
  }

  start() {
    // Inicia o ciclo do semaforo
    this.changeColor();
    this.next();
    this.log();
  }

  printMessage() {
    console.log('Message: ', this.current.message);
  }

  log() {
    // Adiciona um interval para logar as mensagens
    this.printMessage();

    setInterval(() => {
      this.printMessage();
    }, 1000);
  }
}

class Light {
  constructor({ color, time, message }) {
    this.color = color;
    this.time = time;
    this.message = message;
  }
}

window.addEventListener('load', () => {
  const trafficLight = new TrafficLight();
  trafficLight.start();
});
