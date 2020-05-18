var filas = 10;
var canvasTam = 300;
var ctx;
var celulaTam;
var arreglo;

function inicializar() {

    var canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = canvasTam;
    canvas.height = canvasTam;

    celulaTam = Math.floor(canvasTam / filas);

    arreglo = construyeArreglo();

    inicializarCelulas(arreglo);

    setInterval(function () {
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        console.log("Nuevo ciclo");
        for (x = 0; x < filas; x++) {
            for (y = 0; y < filas; y++) {
                arreglo[x][y].dibujarCelula();
            }
        }
        for (x = 0; x < filas; x++) {
            for (y = 0; y < filas; y++) {
                arreglo[x][y].reglas();
            }
        }
        for (x = 0; x < filas; x++) {
            for (y = 0; y < filas; y++) {
                arreglo[x][y].cambiarEstado();
            }
        }
    }, 5000);
}
function construyeArreglo() {
    var arr = new Array(filas);
    for (i = 0; i < filas; i++) {
        arr[i] = new Array(filas);
    }
    return arr;
}

function inicializarCelulas(arreglo) {
    arreglo[2][2] = 1;
    arreglo[3][2] = 1;
    arreglo[3][3] = 1;
    arreglo[3][4] = 1;
    arreglo[4][3] = 1;

    for (x = 0; x < filas; x++) {
        for (y = 0; y < filas; y++) {
            if (arreglo[x][y] == 1) {
                arreglo[x][y] = new Celula(x, y, 1);
            }
            else {
                arreglo[x][y] = new Celula(x, y, 0);
            }
            arreglo[x][y].dibujarCelula();
        }
    }
    for (x = 0; x < filas; x++) {
        for (y = 0; y < filas; y++) {
            arreglo[x][y].vecinos();
        }
    }
}

function Celula(x, y, estado) {
    this.x = x;
    this.y = y;
    this.estado = estado;
    this.dibujarCelula = dibujarCelula;
    this.vecinos = vecinos;
    this.estadoSig = 0;
    this.cambiarEstado = cambiarEstado;
    this.reglas = reglas;
}

function dibujarCelula() {
    var color;
    if (this.estado == 0) {
        color = "black";
    }
    else {
        color = "white";
    }
    ctx.fillStyle = color;
    ctx.fillRect(this.x * celulaTam, this.y * celulaTam, celulaTam, celulaTam);

}
function vecinos() {

    var numVecinos =
        arreglo[(this.x + filas - 1) % filas][(this.y + filas - 1) % filas].estado +
        arreglo[(this.x + filas - 1) % filas][(this.y + filas) % filas].estado +
        arreglo[(this.x + filas - 1) % filas][(this.y + 1 + filas) % filas].estado +
        arreglo[(this.x + filas) % filas][(this.y + filas - 1) % filas].estado +
        arreglo[(this.x + filas) % filas][(this.y + 1 + filas) % filas].estado +
        arreglo[(this.x + 1 + filas) % filas][(this.y + filas - 1) % filas].estado +
        arreglo[(this.x + 1 + filas) % filas][(this.y + filas) % filas].estado +
        arreglo[(this.x + 1 + filas) % filas][(this.y + 1 + filas) % filas].estado;

    this.vecinos = numVecinos;

    console.log("La celula " + this.x, this.y + " es " + this.estado + " y tiene " + this.vecinos + " vecinos");

}

function reglas(){
    //this.vecinos();
    if (this.estado == 0) {//si está muerto 
        if (this.vecinos == 3) {//y si tiene 3 vecinos vivos
            this.estadoSig = 1;//nace
        }
        else {
            this.estadoSig = 0;//sino sigue muerto
        }
    }
    else {//si está vivo
        if (this.vecinos == 2 || this.vecinos == 3) {//y si tiene 2 o 3 vecinos vivos
            this.estadoSig = 1;//sigue viviendo
        }
        else {
            this.estadoSig = 0;//sino muere
        }

    }
}

function cambiarEstado() {
    this.estado = this.estadoSig;
}