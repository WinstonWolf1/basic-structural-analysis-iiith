
//  loads = {
//     positions : [x1, x2],
//     weights : [P1, P2]
// }


function calcSFBMConcMid(beamLength, loads){
    // beamLength = beamParameters.beamLength;
    var n = 5000; //Number of discretisations of x axis
    var delta_x = beamLength / n; // Value to increment x
    var values_x = new Array(n+1);
    var shearForce = new Array(n+1);
    var bendMoment = new Array(n+1);
    var supportRxns = new Array(3);
    
    var loadPos = loads.positions;
    var loadWt = loads.weights;

    var middleSupportPos = 0;
    
    // for (let [x, w] of loads){
        //     console.log("position is " + x + ". load is " + w)
        //     loadPos = x;
        //     loadWt = w;
        // }

    if(loadWt[1] === null){
        supportRxns[0] = 13 * loadWt[0] / 32;
        supportRxns[1] = 22 * loadWt[0] / 32;
        supportRxns[2] = -3 * loadWt[0] / 32;
        middleSupportPos = beamLength / 2;
    }
    else{
        supportRxns[0] =  5 * loadWt[0] / 16;
        supportRxns[1] = 22 * loadWt[0] / 16;
        supportRxns[2] = 11 * loadWt[0] / 16;
        middleSupportPos = beamLength / 2;
    }

    for(let i = 0; i < n; i++){
        values_x[i] = (i * delta_x);

        switch(getportion(values_x[i], beamLength, loadPos)){
            case 1:
                shearForce[i] = supportRxns[0];
                bendMoment[i] = supportRxns[0] * values_x[i];
                break;
            case 2:
                shearForce[i] = supportRxns[0] - loadWt[0];
                bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * (values_x[i] - loadPos[0]));
                break;
            case 3:
                shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1];
                bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * (values_x[i] - loadPos[0])) + (supportRxns[1] * (values_x[i] - middleSupportPos));
                break;
        }


        // if(values_x[i] < loadPos[0]){
            // shearForce[i] = supportRxns[0];
            // bendMoment[i] = supportRxns[0] * values_x[i];
        // }
        // else if(values_x < middleSupportPos){
            // shearForce[i] = supportRxns[0] - loadWt[0];
            // bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * (values_x[i] - loadPos[0]));
        // }
        // else if(values_x < beamLength){
            // shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1];
            // bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * (values_x[i] - loadPos[0])) + (supportRxns[1] * (values_x[i] - middleSupportPos));
        // }


        // if (values_x[i] < loadPos){
        //     shearForce[i] = R1;
        //     bendMoment[i] = R1 * values_x[i];
        // }
        // else{
        //     shearForce[i] = R1 - loadWt;
        //     bendMoment[i] = (R1 * values_x[i]) - (loadWt * (values_x[i] - loadPos));
        // }
    }
    values_x[n] = beamLength;
    shearForce[n] = 0;
    bendMoment[n] = 0;

    return {values_x : values_x,
            shearForce : shearForce,
            bendMoment : bendMoment};

}

function getportion(x, beamLength, loadPos){
    if(x < loadPos[0]){
        return 1;
    }
    if(x < beamLength / 2){
        return 2;
    }
    if(x < beamLength){
        return 3;
    }
}