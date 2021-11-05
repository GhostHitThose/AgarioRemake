class Canvas {
  constructor(){
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  init(){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.background = '#222';
  }

  addEventListener(event, action){
    canvas.addEventListener(event, action);
  }
};