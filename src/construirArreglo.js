const numCelulas = 20;

export default()=>{
  let celulas=[];
  let x,y;
  for(x=0;x<numCelulas;x++){
    for(y=0;y<numCelulas;y++){    
    const celula = {
      estado: 1,
      x: x,
      y: y
    };
    celulas.push(celula);
    }
  }
  return (celulas);
};