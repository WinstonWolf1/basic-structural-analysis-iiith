function showgraph(type, vals) {
    let values_x = vals['values_x'];
    let shearForce = vals['shearForce'];
    let bendMoment = vals['bendMoment'];

    let SFdivID = type + "SFD";
    let BMdivID = type + "BMD";

    let plotOptions = {
        displayModeBar: false
    };

    Plotly.newPlot(SFdivID,[{
        x : values_x,
        y : shearForce
    }],{title:"Shear Force Diagram"},plotOptions);

    Plotly.newPlot(BMdivID,[{
        x : values_x,
        y : bendMoment
    }],{title:"Bending Moment Diagram"},plotOptions);

    return;
}

function generateDiagrams(graphType){
    clearGraphs();

    let concLoadParams = new Object();
    let UDLoadParams = new Object();
    let beamLength = 100;
    switch (graphType){
        case "SFBMOneSpan":

            concLoadParams.positions = [(beamLength / 4), null];
            concLoadParams.weights = [5000, null];

            UDLoadParams.weights = [2, null];

            var concVals = calcSFBMConcMid(beamLength, concLoadParams);
            var UDVals = calcSFBMUDLMid(beamLength, UDLoadParams);

            break;

        case "SFBMBothSpan":
            concLoadParams.positions = [(beamLength / 4), (3 * beamLength / 4)];
            concLoadParams.weights = [5000, 5000];

            UDLoadParams.weights = [2000, 2000];

            var concVals = calcSFBMConcMid(beamLength, concLoadParams);
            var UDVals = calcSFBMUDLMid(beamLength, UDLoadParams);

            break;

        case "SFBMUneqSpan":
            let middleSupportPos = 60;

            concLoadParams.positions = [(middleSupportPos / 2), ((beamLength + middleSupportPos) / 2)];
            concLoadParams.weights = [5000, 6000];

            UDLoadParams.weights = [2000, null];

            var concVals = calcSFBMConcMidUneq(beamLength, concLoadParams, middleSupportPos);
            var UDVals = calcSFBMUDLMidUneq(beamLength, UDLoadParams, middleSupportPos);
            break;
    }
    showgraph("conc", concVals);
    showgraph("UD", UDVals);
    // document.getElementById("generateDiagramButton").disabled = true;
    document.getElementById("generateDiagramButton").style.display = "none";
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
    document.getElementById("generateDiagramButton").setAttribute("onClick", "generateDiagrams('SFBMOneSpan')");
    let cfd = document.getElementById("concForceDiagram")
    cfd.setAttribute("data", "res/ConcOneSpan.svg");
    let ufd = document.getElementById("UDForceDiagram")
    ufd.setAttribute("data", "res/UDOneSpan.svg");

    cfd.data = cfd.data;
    ufd.data = ufd.data;
}

function selectSFBMBothSpan(){
    clearGraphs();
    makeActive('SFBMBothSpanDiv');
    document.getElementById("generateDiagramButton").setAttribute("onClick", "generateDiagrams('SFBMBothSpan')");
    let cfd = document.getElementById("concForceDiagram")
    cfd.setAttribute("data", "res/ConcBothSpan.svg");
    let ufd = document.getElementById("UDForceDiagram")
    ufd.setAttribute("data", "res/UDBothSpan.svg");

    cfd.data = cfd.data;
    ufd.data = ufd.data;
}

function selectSFBMUneqSpan(){
    clearGraphs();
    makeActive('SFBMUneqSpanDiv');
    document.getElementById("generateDiagramButton").setAttribute("onClick", "generateDiagrams('SFBMUneqSpan')");
    let cfd = document.getElementById("concForceDiagram");
    let ufd = document.getElementById("UDForceDiagram")
    cfd.setAttribute("data", "res/ConcUneqSpan.svg");
    ufd.setAttribute("data", "res/UDUneqSpan.svg");

    cfd.data = cfd.data;
    ufd.data = ufd.data;

}

function clearGraphs(){
    Plotly.purge("concSFD");
    Plotly.purge("concBMD");
    Plotly.purge("UDSFD");
    Plotly.purge("UDBMD");
}

function makeActive(divID){
    document.getElementById("SFBMOneSpanDiv").classList.remove("active");
    document.getElementById("SFBMBothSpanDiv").classList.remove("active");
    document.getElementById("SFBMUneqSpanDiv").classList.remove("active");
    document.getElementById(divID).classList.add("active");
    document.getElementById("generateDiagramButton").style.display = "block";
    // document.getElementById("generateDiagramButton").disabled = false;
}

