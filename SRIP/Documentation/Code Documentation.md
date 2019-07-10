# Experiment Code Documentation

## **Introduction**

This document captures the experiment implementation details.

## **Code Details**

### **File Name** : calcSFBM.js

**File Description** : The file which contins the code for the calculation of the shear force and bending moment diagram

* **Function :** calcSFBMConcMid

    **Function Description :** Calculates the Shear Force and Bending Moment at each point of the beam for concentrated load applied to centre(s) of span(s) of beam containing two equal spans and then returns an object containing arrays corresponding to the values of x and the shear force and bending moment at distance x from the left end.

* **Function :** calcSFBMConcMidUneq

    **Function Description :** Calculates the Shear Force and Bending Moment at each point of the beam for concentrated load applied to centre of a span of beam with two unequal spans and then returns an object containing arrays corresponding to the values of x and the shear force and bending moment at distance x from the left end.

* **Function :** calcSFBMUDLMid

    **Function Description :** Calculates the Shear Force and Bending Moment at each point of the beam for uniform distributed load applied to span(s) of beam containing two equal spans and then returns an object containing arrays corresponding to the values of x and the shear force and bending moment at distance x from the left end.

* **Function :** calcSFBMUDLMid

    **Function Description :** Calculates the Shear Force and Bending Moment at each point of the beam for uniform distributed load applied to spans of beam containing two unequal spans and then returns an object containing arrays corresponding to the values of x and the shear force and bending moment at distance x from the left end.

* **Function :** getportion

    **Function Description :** Returns the portion of the beam to which the point at distance x from left end belongs.

<br>

### **File Name :** expOverview.js

**File description :** File which contains the code to control the expOverview page

* **Function :** showgraph

    **Function Description :** Plots the Shear Force and Bending Moment diagrams in a Plotly plot in the specified divs on the page. The object from the calcSFBM file calculation functions are used which contain the arrays of the shear force and bending moment at the values of x.

* **Function :** makeDemoGraphs

    **Function Description :** This is the main driver function. When the 'Generate Diagrams' button is clicked, this function calls the functions to calculate the SFD and BMD based on the selected parameters in the left pane. It also disabled the Generate Diagrams button after the diagrams have been generated.

* **Function :** selectSFBMOneSpan

    **Function Description :** Sets the parameters for the Generate Diagrams button to the ones for a beam with equal spans and loads only on one span.

* **Function :** selectSFBMBothSpan

    **Function Description :** Sets the parameters for the Generate Diagrams button to the ones for a beam with equal spans and loads on both spans.

* **Function :** selectSFBMUneqSpan

    **Function Description :** Sets the parameters for the Generate Diagrams button to the ones for a beam with unequal spans and loads on both spans.

* **Function :** clearGraphs

    **Function Description :** Clears the Plotly graphs on the page.

* **Function :** makeActive

    **Function Description :** Makes the clicked div look selected in the list group in the left pane and deselects the others. Also enables the Generate Diagrams button enabled again.


## **Other details:**

**Formulas used in the Experiment**

* 3 moment equation

* Formula for calculation of Shear Force

* Formula for calculation of Bending Moment