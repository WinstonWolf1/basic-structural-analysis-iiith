//// params = {
////     beamLength : "",
////     supportLocations : [], // x coordinate of supports
//// }
//// loads = {
////     position : load
////     0.23 : 2;
////     0.5 : 4;
//// }
// function calcSFBMConc(parameters, loads){ // loads is map with keys as x and value as load at x, parameters has length of beam, locations of supports
//     beamLength = parameters.beamLength;
//     var n = 1000; //Number of discretisations of x axis
//     var delta_x = beamLength / n; // Value to increment x
//     var values_x = [];
//     var shearForce = [];
//     var bendMoment = []; 

//     for(let i = 0; i <= n; i++){
//         values_x[i] = i * delta_x;
//     }

//     for(let x of loads.keys()){
//         for(let i = 0; i <= n; i++){
//         values_x[i] = i * delta_x;
//         shearForce[i] = 
//         }
//     }
// }


function calcSFBMConcMid(parameters, loads){
    beamLength = parameters.beamLength;
    var n = 1000; //Number of discretisations of x axis
    var delta_x = beamLength / n; // Value to increment x
    var values_x = [];
    var shearForce = [];
    var bendMoment = [];
    
}