
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
		switch(getportion(values_x[i], beamLength, loadPos)) {
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
			case 4:
				shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1] - loadWt[1];
				bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * (values_x[i] - loadPos[0])) + (supportRxns[1] * (values_x[i] - middleSupportPos)) - (loadWt[1] * (values_x[i] - loadPos[1]));
				break;
		}
	}
	values_x[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;

	return {values_x : values_x,
			shearForce : shearForce,
			bendMoment : bendMoment};

}

function calcSFBMConcMidUneq(beamLength, loads, middleSupportPos){
	var n = 5000; //Number of discretisations of x axis
	var delta_x = beamLength / n; // Value to increment x
	var values_x = new Array(n+1);
	var shearForce = new Array(n+1);
	var bendMoment = new Array(n+1);
	var supportRxns = new Array(3);
	var spanLength = [middleSupportPos, (beamLength - middleSupportPos)];
	
	var loadPos = loads.positions;
	var loadWt = loads.weights;

	var midSupportMoment = -3 * ((loadWt[0] * (spanLength[0] * spanLength[0]) + loadWt[1] * (spanLength[1] * spanLength[1])) / (spanLength[0] + spanLength[1])) / 16;
	supportRxns[0] = ((midSupportMoment / spanLength[0]) + (loadWt[0] / 2));
	supportRxns[2] = ((midSupportMoment / spanLength[1]) + (loadWt[1] / 2));
	supportRxns[1] = loadWt[0] + loadWt[1] - supportRxns[0] - supportRxns[2];

	for(let i = 0; i < n; i++){
		values_x[i] = (i * delta_x);
		switch(getportion(values_x[i], beamLength, loadPos, middleSupportPos)){
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
			case 4:
				shearForce[i] = supportRxns[0] - loadWt[0] + supportRxns[1] - loadWt[1];
				bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * (values_x[i] - loadPos[0])) + (supportRxns[1] * (values_x[i] - middleSupportPos)) - (loadWt[1] * (values_x[i] - loadPos[1]));
				break;
		}
	}
	values_x[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;

	return {values_x : values_x,
			shearForce : shearForce,
			bendMoment : bendMoment};

}

function calcSFBMUDLMid(beamLength, loads) {
	
	var n = 5000; //Number of discretisations of x axis
	var delta_x = beamLength / n; // Value to increment x
	var values_x = new Array(n+1);
	var shearForce = new Array(n+1);
	var bendMoment = new Array(n+1);
	var supportRxns = new Array(3);

	var spanLength = beamLength / 2;
	
	var loadWt = loads.weights;

	var middleSupportPos = beamLength / 2;

	if(loadWt[1] === null){
		supportRxns[0] =  7 * loadWt[0] * spanLength / 16;
		supportRxns[1] = 10 * loadWt[0] * spanLength / 16;
		supportRxns[2] = -1 * loadWt[0] * spanLength / 16;
		middleSupportPos = beamLength / 2;
	}

	for(let i = 0; i < n; i++){
		values_x[i] = (i * delta_x);
		if (values_x[i] < middleSupportPos) {
			shearForce[i] = supportRxns[0] - (loadWt[0] * values_x);
			bendMoment[i] = supportRxns[0] * values_x[i] - (loadWt[0] * values_x[i] * values_x[i]);
		}
		else{
			shearForce[i] = supportRxns[0] - (loadWt[0] * values_x) + supportRxns[1] + (loadWt[1] * (values_x[i] - spanLength));
			bendMoment[i] = (supportRxns[0] * values_x[i]) - (loadWt[0] * values_x[i] * values_x[i]) + (supportRxns[1] * (values_x[i] - spanLength)) + (loadWt[1] * (values_x[i] - spanLength) * (values_x[i] - spanLength));
		}
	}
	values_x[n] = beamLength;
	shearForce[n] = 0;
	bendMoment[n] = 0;

	return {values_x : values_x,
			shearForce : shearForce,
			bendMoment : bendMoment};    
}

function getportion(x, beamLength, loadPos, middleSupportPos = undefined){
	if(middleSupportPos === undefined){
		middleSupportPos = beamLength / 2;
	}
	if(x < loadPos[0]){
		return 1;
	}
	if(x < middleSupportPos){
		return 2;
	}
	if(loadPos[1] !== undefined){
		if(x < loadPos[1]){
			return 3;
		}
		if(x < beamLength){
			return 4;
		}
	} else{
		if(x < beamLength){
			return 3;
		}
	}
}