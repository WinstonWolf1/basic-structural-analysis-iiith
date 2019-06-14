function makegraph(vals) {
    var values_x = vals['values_x'];
    var shearForce = vals['shearForce'];
    var bendMoment = vals['bendMoment'];
    Plotly.plot('concSFD',[{
        x : values_x,
        y : shearForce
    }]);

    Plotly.plot('concBMD',[{
        x : values_x,
        y : bendMoment
    }]);

    return;
}

function testgraph(){
    var loadparams = new Object();
    loadparams.positions = [25,null];
    loadparams.weights = [5000,null];
    var beamLength = 100;
    var vals = calcSFBMConcMid(beamLength, loadparams);
    makegraph(vals);
}