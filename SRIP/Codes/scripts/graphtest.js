function showgraph(vals) {
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

function makegraph(graphType){
    var loadparams = new Object();
    var beamLength = 100;
    switch (graphType){
        case "SFBMOneSpan":
            loadparams.positions = [(beamLength / 4), null];
            loadparams.weights = [5000, null];
            var vals = calcSFBMConcMid(beamLength, loadparams);
            break;
        case "SFBMBothSpan":
            loadparams.positions = [(beamLength / 4), (3 * beamLength / 4)];
            loadparams.weights = [5000, 5000];
            var vals = calcSFBMConcMid(beamLength, loadparams);
            break;
        case "SFBMUneqSpan":
            let middleSupportPos = 60;
            loadparams.positions = [(middleSupportPos / 2), ((beamLength + middleSupportPos) / 2)]; // Assuming middle support at 60
            loadparams.weights = [5000, 6000];
            var vals = calcSFBMConcMidUneq(beamLength, loadparams, middleSupportPos);
            break;
    }
    showgraph(vals);
}

function testgraph(){
    var loadparams = new Object();
    loadparams.positions = [25,null];
    loadparams.weights = [5000,null];
    var beamLength = 100;
    var vals = calcSFBMConcMid(beamLength, loadparams);
    showgraph(vals);
}

function selectSFBMOneSpan(){
    clearGraphs();
    makeActive('SFBMOneSpanDiv');
    document.getElementById("makeGraphButton").setAttribute("onClick", "makegraph('SFBMOneSpan')");
}

function selectSFBMBothSpan(){
    clearGraphs();
    makeActive('SFBMBothSpanDiv');
    document.getElementById("makeGraphButton").setAttribute("onClick", "makegraph('SFBMBothSpan')");
}

function selectSFBMUneqSpan(){
    clearGraphs();
    makeActive('SFBMUneqSpanDiv');
    document.getElementById("makeGraphButton").setAttribute("onClick", "makegraph('SFBMUneqSpan')");
}

function clearGraphs(){
    Plotly.purge("concSFD");
    Plotly.purge("concBMD");
}

function makeActive(divID){
    document.getElementById("SFBMOneSpanDiv").classList.remove("active");
    document.getElementById("SFBMBothSpanDiv").classList.remove("active");
    document.getElementById("SFBMUneqSpanDiv").classList.remove("active");
    document.getElementById(divID).classList.add("active");
}