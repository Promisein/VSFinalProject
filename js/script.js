loadData().then(data => {

    // no country selected by default
    this.activeDistrict = null;
    // deafultActiveYear is 2000
    this.activeYear = '2005';
    let that = this;

    // ******* TODO: PART 3 *******
    /**
     * Calls the functions of the views that need to react to a newly selected/highlighted country
     *
     * @param DistrictID the ID object for the newly selected country
     */
    function updateDistrict(DistrictID) {

        that.activeDistrict = DistrictID;

        //TODO - Your code goes here -
            gapPlot.updateHighlightClick(DistrictID);
            ChinaMap.updateHighlightClick(DistrictID);
            infoBox.updateTextDescription(DistrictID, gapPlot.activeYear);
    }

    // ******* TODO: PART 3 *******

    /**
     *  Takes the specified activeYear from the range slider in the GapPlot view.
     *  It takes the value for the activeYear as the parameter. When the range slider is dragged, we have to update the
     *  gap plot and the info box.
     *  @param year the new year we need to set to the other views
     */
    function updateYear(year) {
        gapPlot.updatePlot( this.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
    }
    // Creates the view objects
    const infoBox = new InfoBox(data);
    const ChinaMap = new Map(data, updateDistrict);
    const gapPlot = new GapPlot(data, updateDistrict, updateYear, this.activeYear);


    // Initialize the plots; pick reasonable default values

    // here we load the map data
    d3.json('data/china_district.json').then(mapData => {

        // ******* TODO: PART I *******
        // You need to pass the world topo data to the drawMap() function as a parameter
        ChinaMap.drawMap(mapData);
        
    });

    // here we load the scatter plot
    gapPlot.drawPlot();
    
    // This clears a selection by listening for a click
    document.getElementById("dropdown_x").addEventListener("change", function() {
        //TODO - Your code goes here - 
        //console.log(gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]);
        gapPlot.updatePlot(gapPlot.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
		// call clear highight methods
    });
    document.getElementById("dropdown_y").addEventListener("change", function() {
        //TODO - Your code goes here - 
        gapPlot.updatePlot(gapPlot.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
		// call clear highight methods
    });
    document.getElementById("dropdown_c").addEventListener("change", function() {
        //TODO - Your code goes here - 
        gapPlot.updatePlot(gapPlot.activeYear
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_x").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_y").value]
                            ,gapPlot.dropDownOptions[document.getElementById("dropdown_c").value])
    });
		// call clear highight methods
    document.querySelector("body").addEventListener("mousedown", function() {
        //TODO - Your code goes here - 
        ChinaMap.clearHighlight();
        gapPlot.clearHighlight();
        infoBox.clearHighlight();
		// call clear highight methods
    });
                                                           
});

// ******* DATA LOADING *******
// We took care of that for you

/**
 * A file loading function or CSVs
 * @param file
 * @returns {Promise<T>}
 */
async function loadFile(file) {
    let data = await d3.csv(file).then(d => {
        let mapped = d.map(g => {
            for (let key in g) {
                let numKey = +key;
                if (numKey) {
                    g[key] = +g[key];
                }
            }
            return g;
        });
        return mapped;
    });
    return data;
}

async function loadData() {
    //let pop = await loadFile('data/pop.csv');
    let gdp = await loadFile('data/GDP.csv', encoding='utf-8');
    let revenue = await loadFile('data/local_government_revenue.csv', encoding='utf-8');
    let deposit = await loadFile('data/deposit_per_capita.csv', encoding='utf-8');
    let tele = await loadFile('data/Number-of-Local-Telephone-Subscribers.csv', encoding='utf-8');
    let expenditure = await loadFile('data/Local-Goverment-Expenditure.csv', encoding='utf-8');
    let second = await loadFile('data/Value-added-of-Secondary-Industry.csv', encoding='utf-8');
    let primary = await loadFile('data/Value-added-of-Primary-Industry.csv', encoding='utf-8');
    let nind = await loadFile('data/Number-of-Industrial-Enterprises-above-Designated-Size.csv', encoding='utf-8');
    let outind = await loadFile('data/Output-of-Industrial-Enterprises-above-Designated-Size.csv', encoding='utf-8');
    let bedSocial = await loadFile('data/Number-of-Beds-in-Social-Welfare-Nursing.csv', encoding='utf-8');
    let socal = await loadFile('data/Number-of-Social-Welfare-Nursing-Centers.csv', encoding='utf-8');
    let bedHospital = await loadFile('data/Number-of-Beds-in-Hospitals-and-Sanitation-Agencies.csv', encoding='utf-8');
    //let tfr = await loadFile('data/tfr.csv');
    //let cmu = await loadFile('data/cmu5.csv');
    //let life = await loadFile('data/life_expect.csv');
    //return [pop, gdp, tfr, cmu, life];
    return {
        //'population': pop,
        'gdp': gdp,
        'Savings-Deposits-of-Urban-Households': deposit,
        'Local-Government-Revenue': revenue,
        'Number-of-Local-Telephone-Subscribers': tele,
        'Local-Goverment-Expenditure': expenditure,
        'Value-added-of-Secondary-Industry': second,
        'Value-added-of-Primary-Industry': primary,
        'Number-of-Industrial-Enterprises-above-Designated-Size': nind,
        'Output-of-Industrial-Enterprises-above-Designated-Size': outind,
        'Number-of-Beds-in-Social-Welfare-Nursing': bedSocial,
        'Number-of-Social-Welfare-Nursing-Centers': socal,
        'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies': bedHospital,
        //'child-mortality': cmu,
        //'life-expectancy': life,
        //'fertility-rate': tfr
    };
}
