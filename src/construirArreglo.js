export default (filas) => {
    let celulas = [];
    let x, y;
    for (x = 0; x < filas; x++) {
        for (y = 0; y < filas; y++) {
            const celula = {
                id: x + "." + y,
                estado: Math.floor(Math.random()*2),
                x: x,
                y: y
            };
            celulas.push(celula);  
        }
    }
    return (celulas);
};