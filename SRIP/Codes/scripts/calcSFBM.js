
//  loads = {
//     positions : [x1, x2],
//     weights : [P1, P2]
// }


function calcSFBMConcMid(beamLength, loads){
	// beamLength = beamParameters.beamLength;
	var n = 5000; //Number of discretisations of x axis
	var delta_x = beamLength / n; // Value to increment x
	var xValues = new Array(n+1);
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
		xValues[i] = (i * delta_x);
		switch(getportion(xValues[i], beamLength, loadPos)) {
			case 1:
				shearForce[i] = supportRxns[0];
				bendMoment[i] = supportRxns[0] * xValues[i];
				break;
			case 2:
				shearForce[i] = supportRxns[0] - loadWt[0];
				bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] - loadPos[0]));
				break;
			case 3:
				shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1];
				bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] - loadPos[0])) + (supportRxns[1] * (xValues[i] - middleSupportPos));
				break;
			case 4:
				shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1] - loadWt[1];
				bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] - loadPos[0])) + (supportRxns[1] * (xValues[i] - middleSupportPos)) - (loadWt[1] * (xValues[i] - loadPos[1]));
				break;
		}
	}
	xValues[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;

	return {xValues : xValues,
			shearForce : shearForce,
			bendMoment : bendMoment};

}

function calcSFBMConcMidUneq(beamLength, loads, middleSupportPos){
	let n = 5000; //Number of discretisations of x axis
	let delta_x = beamLength / n; // Value to increment x
	let xValues = new Array(n+1);
	let shearForce = new Array(n+1);
	let bendMoment = new Array(n+1);
	let supportRxns = new Array(3);
	let spanLength = [middleSupportPos, (beamLength - middleSupportPos)];
	
	let loadPos = loads.positions;
	let loadWt = loads.weights;

	let midSupportMoment = -3 / 16 * ((loadWt[0] * (spanLength[0] ** 2) + loadWt[1] * (spanLength[1] ** 2)) / (spanLength[0] + spanLength[1]));
	supportRxns[0] = ((midSupportMoment / spanLength[0]) + (loadWt[0] / 2));
	supportRxns[2] = ((midSupportMoment / spanLength[1]) + (loadWt[1] / 2));
	supportRxns[1] = loadWt[0] + loadWt[1] - supportRxns[0] - supportRxns[2];

	for(let i = 0; i < n; i++){
		xValues[i] = (i * delta_x);
		switch(getportion(xValues[i], beamLength, loadPos, middleSupportPos)){
			case 1:
				shearForce[i] = supportRxns[0];
				bendMoment[i] = supportRxns[0] * xValues[i];
				break;
			case 2:
				shearForce[i] = supportRxns[0] - loadWt[0];
				bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] - loadPos[0]));
				break;
			case 3:
				shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1];
				bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] - loadPos[0])) + (supportRxns[1] * (xValues[i] - middleSupportPos));
				break;
			case 4:
				shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1] - loadWt[1];
				bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] - loadPos[0])) + (supportRxns[1] * (xValues[i] - middleSupportPos)) - (loadWt[1] * (xValues[i] - loadPos[1]));
				break;
		}
	}
	xValues[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;

	return {xValues : xValues,
			shearForce : shearForce,
			bendMoment : bendMoment};

}

function calcSFBMUDLMid(beamLength, loads) {
	
	let n = 5000; //Number of discretisations of x axis
	let delta_x = beamLength / n; // Value to increment x
	let xValues = new Array(n+1);
	let shearForce = new Array(n+1);
	let bendMoment = new Array(n+1);
	let supportRxns = new Array(3);

	let spanLength = beamLength / 2;
	
	let loadWt = loads.weights;

	let middleSupportPos = beamLength / 2;

	if(loadWt[1] == null){
		supportRxns[0] =  7 * loadWt[0] * spanLength / 16;
		supportRxns[1] = 10 * loadWt[0] * spanLength / 16;
		supportRxns[2] = -1 * loadWt[0] * spanLength / 16;
		loadWt[1] = 0;
	}
	if(loadWt[1] !== null && loadWt[1] === loadWt[0]){
		supportRxns[0] =  3 * loadWt[0] * spanLength / 8;
		supportRxns[1] = 10 * loadWt[0] * spanLength / 8;
		supportRxns[2] =  3 * loadWt[0] * spanLength / 8;
	}

	for(let i = 0; i < n; i++){
		xValues[i] = (i * delta_x);
		if (xValues[i] < middleSupportPos) {
			shearForce[i] = supportRxns[0] - (loadWt[0] * xValues[i]);
			bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] ** 2) / 2);
		}
		else{
			shearForce[i] = supportRxns[0] - (loadWt[0] * spanLength) + supportRxns[1] - (loadWt[1] * (xValues[i] - spanLength));
			bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * spanLength * (xValues[i] - (spanLength / 2))) + (supportRxns[1] * (xValues[i] - spanLength)) - (loadWt[1] * ((xValues[i] - spanLength) ** 2) / 2);
		}
	}
	xValues[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;

	return {xValues : xValues,
			shearForce : shearForce,
			bendMoment : bendMoment};    
}

function calcSFBMUDLMidUneq(beamLength, loads, middleSupportPos){
	let n = 5000; //Number of discretisations of x axis
	let delta_x = beamLength / n; // Value to increment x
	let xValues = new Array(n+1);
	let shearForce = new Array(n+1);
	let bendMoment = new Array(n+1);
	let supportRxns = new Array(3);
	let spanLength = [middleSupportPos, (beamLength - middleSupportPos)];
	
	let loadWt = loads.weights;

	let midSupportMoment = 0;

	if((loadWt[1] !== null) && loadWt[0] === loadWt[1]){
		let midSupportMoment = - loadWt[0] * (((spanLength[0] ** 3) + (spanLength[1] ** 3)) / beamLength) / 8;
		supportRxns[0] = ((midSupportMoment / spanLength[0]) + (loadWt[0] * spanLength[0] / 2));
		supportRxns[2] = ((midSupportMoment / spanLength[1]) + (loadWt[0] * spanLength[1] / 2));
		supportRxns[1] = (loadWt[0] * beamLength) - supportRxns[0] - supportRxns[2];
	}

	for(let i = 0; i < n; i++){
		xValues[i] = (i * delta_x);
		if (xValues[i] < middleSupportPos) {
			shearForce[i] = supportRxns[0] - (loadWt[0] * xValues[i]);
			bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * (xValues[i] ** 2) / 2);
		}
		else{
			shearForce[i] = supportRxns[0] - (loadWt[0] * xValues[i]) + supportRxns[1] - (loadWt[1] * (xValues[i] - spanLength[0]));
			bendMoment[i] = (supportRxns[0] * xValues[i]) - (loadWt[0] * spanLength[0] * (xValues[i] - (spanLength[0] / 2))) + (supportRxns[1] * (xValues[i] - spanLength[0])) - (loadWt[1] * ((xValues[i] - spanLength[0]) ** 2) / 2);
		}
	}
	xValues[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;


	return {xValues : xValues,
			shearForce : shearForce,
			bendMoment : bendMoment};
}

function getportion(x, beamLength, loadPos, middleSupportPos = null){
	if(middleSupportPos === null){
		middleSupportPos = beamLength / 2;
	}
	if(x < loadPos[0]){
		return 1;
	}
	if(x < middleSupportPos){
		return 2;
	}
	if(loadPos[1] === null){
		if(x < beamLength){
			return 3;
		}
	} else{
		if(x < loadPos[1]){
			return 3;
		}
		else{
			return 4;
		}
	}
}