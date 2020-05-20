export default () => {
    const filas = 20;
    let celulas = [];
    let x, y;
    let estado = 0;
    for (x = 0; x < filas; x++) {
        for (y = 0; y < filas; y++) {
            if((x===2&&y===2)||(x===2&&y===3)||(x===3&&y===3)||(x===3&&y===4)||(x===4&&y===3)){
                estado=1;
            }
            else{
                estado=0;
            }
            const celula = {
                id: x + "." + y,
                estado: estado,
                x: x,
                y: y

            };
            celulas.push(celula);  
        }
    }
    return (celulas);
};