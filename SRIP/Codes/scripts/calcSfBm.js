// params = {
//     beamLength : "",
//     supportLocations : [],
// }

function calcSFBM(parameters, loads){ // loads is map with keys as x and value as load at x, parameters has length of beam, locations of supports
    beamLength = parameters.beamLength;
    var n = 1000; //Number of discretisations of x axis
    var delta_x = beamLength / n; // Value to increment x
    var values_x = [];
    var shearForce = [];
    var bendMoment = [];


    // for(let i = 0; i <= n; i++){

    //     shearForce[i] = 
    // }

}