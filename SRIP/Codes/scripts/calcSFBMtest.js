function calcSFBMConcMid(beamLength, loads){
    // beamLength = beamParameters.beamLength;
    var n = 100000; //Number of discretisations of x axis
    var delta_x = beamLength / n; // Value to increment x
    var values_x = new Array(n+1);
    var shearForce = new Array(n+1);
    var bendMoment = new Array(n+1);
    var R1 = 0;
    var R2 = 0;
    
    var loadPos = loads.positions[0];
    var loadWt = loads.weights[0];


    // for (let [x, w] of loads){
    //     console.log("position is " + x + ". load is " + w)
    //     loadPos = x;
    //     loadWt = w;
    // }
    R1 = loadWt * (beamLength - loadPos) / beamLength;
    R2 = loadWt * (loadPos / beamLength);

    for(let i = 0; i <= n; i++){
        values_x[i] = (i * delta_x);
        if (values_x[i] < loadPos){
            shearForce[i] = R1;
            bendMoment[i] = R1 * values_x[i];
        }
        else{
            shearForce[i] = R1 - loadWt;
            bendMoment[i] = (R1 * values_x[i]) - (loadWt * (values_x[i] - loadPos));
        }
    }

    return {values_x : values_x,
            shearForce : shearForce,
            bendMoment : bendMoment};

}

