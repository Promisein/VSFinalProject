/** Data structure for the data associated with an individual District. */
class PlotData {
    /**
     *
     * @param District District name from the x data object
     * @param xVal value from the data object chosen for x at the active year
     * @param yVal value from the data object chosen for y at the active year
     * @param id District id
     * @param region District region
     * @param city
     * @param province
     * @param circleSize value for r from data object chosen for circleSizeIndicator
     */
    constructor(District, xVal, yVal, id, city, province, circleSize) {
        this.District = District;
        this.xVal = xVal;
        this.yVal = yVal;
        this.id = id;
        //this.region = region;
        this.city = city;
        this.province = province;
        this.circleSize = circleSize;
    }
}

/** Class representing the scatter plot view. */
class GapPlot {

    /**
     * Creates an new GapPlot Object
     *
     * For part 2 of the homework, you only need to worry about the first parameter.
     * You will be updating the plot with the data in updatePlot,
     * but first you need to draw the plot structure that you will be updating.
     *
     * Set the data as a variable that will be accessible to you in updatePlot()
     * Call the drawplot() function after you set it up to draw the plot structure on GapPlot load
     *
     * We have provided the dimensions for you!
     *
     * @param updateDistrict a callback function used to notify other parts of the program when the selected
     * District was updated (clicked)
     * @param updateYear a callback function used to notify other parts of the program when a year was updated
     * @param activeYear the year for which the data should be drawn initially
     */
    constructor(data, updateDistrict, updateYear, activeYear) {

        // ******* TODO: PART 2 *******

        this.margin = { top: 20, right: 20, bottom: 60, left: 80 };
        this.width = 810 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        this.activeYear = activeYear;
        this.data = data;
        

        //YOUR CODE HERE 
        this.updateYear = updateYear;
        this.updateDistrict = updateDistrict;
        this.data_objs = []; //a list of PlotData Objects
        
        this.dropDownOptions = { "gdp":"gdp"   //for name conversion from dropdown to this.data and vice versa
                                , "Savings-Deposits-of-Urban-Households":"Savings-Deposits-of-Urban-Households"
                                , "Local-Government-Revenue":"Local-Government-Revenue"
                                , 'Number-of-Local-Telephone-Subscribers': 'Number-of-Local-Telephone-Subscribers',
                                'Local-Goverment-Expenditure': 'Local-Goverment-Expenditure',
                                'Value-added-of-Secondary-Industry': 'Value-added-of-Secondary-Industry',
                                'Value-added-of-Primary-Industry': 'Value-added-of-Primary-Industry',
                                'Number-of-Industrial-Enterprises-above-Designated-Size': 'Number-of-Industrial-Enterprises-above-Designated-Size',
                                'Output-of-Industrial-Enterprises-above-Designated-Size': 'Output-of-Industrial-Enterprises-above-Designated-Size',
                                'Number-of-Beds-in-Social-Welfare-Nursing': 'Number-of-Beds-in-Social-Welfare-Nursing',
                                'Number-of-Social-Welfare-Nursing-Centers': 'Number-of-Social-Welfare-Nursing-Centers',
                                'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies': 'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies'};
        
        this.revDropDownOptions = {"gdp":"gdp"
                                , "Savings-Deposits-of-Urban-Households":"Savings-Deposits-of-Urban-Households"
                                , "Local-Government-Revenue":"Local-Government-Revenue"
                                , 'Number-of-Local-Telephone-Subscribers': 'Number-of-Local-Telephone-Subscribers',
                                'Local-Goverment-Expenditure': 'Local-Goverment-Expenditure',
                                'Value-added-of-Secondary-Industry': 'Value-added-of-Secondary-Industry',
                                'Value-added-of-Primary-Industry': 'Value-added-of-Primary-Industry',
                                'Number-of-Industrial-Enterprises-above-Designated-Size': 'Number-of-Industrial-Enterprises-above-Designated-Size',
                                'Output-of-Industrial-Enterprises-above-Designated-Size': 'Output-of-Industrial-Enterprises-above-Designated-Size',
                                'Number-of-Beds-in-Social-Welfare-Nursing': 'Number-of-Beds-in-Social-Welfare-Nursing',
                                'Number-of-Social-Welfare-Nursing-Centers': 'Number-of-Social-Welfare-Nursing-Centers',
                                'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies': 'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies'};
        
        // ******* TODO: PART 3 *******
        /**
         For part 4 of the homework, you will be using the other 3 parameters.
         * assign the highlightUpdate function as a variable that will be accessible to you in updatePlot()
         * assign the dragUpdate function as a variable that will be accessible to you in updatePlot()
         */

        //YOUR CODE HERE  


    }

    /**
     * Sets up the plot, axes, and slider,
     */

    drawPlot() {
        // ******* TODO: PART 2 *******
        /**
         You will be setting up the plot for the scatterplot.
         Here you will create axes for the x and y data that you will be selecting and calling in updatePlot
         (hint): class them.

         Main things you should set up here:
         1). Create the x and y axes
         2). Create the activeYear background text
         
         The dropdown menus have been created for you!

         */
          // TODO: Select and update the scatterplot points

        d3.select('#scatter-plot')
            .append('div').attr('id', 'chart-view');

        d3.select('#scatter-plot')
            .append('div').attr('id', 'activeYear-bar');

        d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);

        d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom);

        let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true);
                
        //YOUR CODE HERE 
        let default_x = "gdp";
        let default_y = "Local-Government-Revenue";
        let default_c = "Savings-Deposits-of-Urban-Households";
        let dropdown_opts=["gdp", "Local-Government-Revenue","Savings-Deposits-of-Urban-Households",
                            'Number-of-Local-Telephone-Subscribers',
                            'Local-Goverment-Expenditure',
                            'Value-added-of-Secondary-Industry',
                            'Value-added-of-Primary-Industry',
                            'Number-of-Industrial-Enterprises-above-Designated-Size',
                            'Output-of-Industrial-Enterprises-above-Designated-Size',
                            'Number-of-Beds-in-Social-Welfare-Nursing',
                            'Number-of-Social-Welfare-Nursing-Centers',
                            'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies'];
        
        /* This is the setup for the dropdown menu- no need to change this */

        let dropdownWrap = d3.select('#chart-view').append('div').classed('dropdown-wrapper', true);
        
        //DROPDOWN OPTIONS FOR CIRCLE/////////////////////////////////////////////////////
        
        let cWrap = dropdownWrap.append('div').classed('dropdown-panel-C', true);

        cWrap.append('text')
            .classed('c-label', true)
            .text('   Circle Size');
        
        cWrap.append('select')
            .classed('dropdown-content', true)
            .attr("id", "dropdown_c");
        
        d3.select("#dropdown_c")
            .selectAll("option")
            .data(dropdown_opts)
            .enter()
            .append("option")
            .attr("id",d => { return d})
            .attr("value", d => { return d})
            .html(d=>{ return d})
            .property("selected", d => {return d===default_c});
            
        //d3.select("#dropdown_c").attr("transform","translate(500, 0)");
        
        //DROPDOWN OPTIONS FOR X AXIS/////////////////////////////////////////////////////
        
        let xWrap = dropdownWrap.append('div').classed('dropdown-panel-X', true);

        xWrap.append('text')
            .classed('x-label', true)
            .text('X Axis Data');

        xWrap.append('select')
            .classed('dropdown-content', true)
            .attr("id", "dropdown_x");
        
        d3.select("#dropdown_x")
        .selectAll("option")
        .data(dropdown_opts)
        .enter()
        .append("option")
        .attr("id",d => { return d})
        .attr("value", d => { return d})
        .html(d=>{ return d})
        .property("selected", d => {return d===default_x});
        
        //DROPDOWN OPTIONS FOR  Y AXIS/////////////////////////////////////////////////////
        let yWrap = dropdownWrap.append('div').classed('dropdown-panel-Y', true);

        yWrap.append('text')
            .classed('y-label', true)
            .text('Y Axis Data');

        yWrap.append('select')
            .classed('dropdown-content', true)
            .attr("id", "dropdown_y");
        
        d3.select("#dropdown_y")
        .selectAll("option")
        .data(dropdown_opts)
        .enter()
        .append("option")
        .attr("id",d => { return d})
        .attr("value", d => { return d})
        .html(d=>{ return d})
        .attr("selected", default_y)
        .property("selected", d => {return d===default_y});
        
        ///////////////////////////////////////////////////////////////////////////////////
        
        d3.select('#chart-view')
            .append('div')
            .classed('circle-legend', true)
            .append('svg')
            .append('g');
        
        this.drawYearBar();

    }

    /**
     * Renders the plot for the parameters specified
     *
     * @param activeYear the year for which to render
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    updatePlot(activeYear, xIndicator, yIndicator, circleSizeIndicator) {
        //console.log(activeYear);
        //console.log(xIndicator);
        //console.log(yIndicator);
        //console.log(circleSizeIndicator);
        // 传入的参数都不是NaN renxi 0113
        // ******* TODO: PART 2 *******

        /*
        You will be updating the scatterplot from the data. hint: use the #chart-view div

        *** Structuring your PlotData objects ***
        You need to start by mapping the data specified by the parameters to the PlotData Object
        Your PlotData object is specified at the top of the file
        You will need get the data specified by the x, y and circle size parameters from the data passed
        to the GapPlot constructor

        *** Setting the scales for your x, y, and circle data ***
        For x and y data, you should get the overall max of the whole data set for that data category,
        not just for the activeYear.

        ***draw circles***
        draw the circles with a scaled area from the circle data, with cx from your x data and cy from y data
        You need to size the circles from your circleSize data, we have provided a function for you to do this
        called circleSizer. Use this when you assign the 'r' attribute.

        ***Tooltip for the bubbles***
        You need to assign a tooltip to appear on mouse-over of a District bubble to show the name of the District.
        We have provided the mouse-over for you, but you have to set it up
        Hint: you will need to call the tooltipRender function for this.

        *** call the drawLegend() and drawDropDown()
        These will draw the legend and the drop down menus in your data
        Pay attention to the parameters needed in each of the functions
        
        */

        /**
         *  Function to determine the circle radius by circle size
         *  This is the function to size your circles, you don't need to do anything to this
         *  but you will call it and pass the circle data as the parameter.
         * 
         * @param d the data value to encode
         * @returns {number} the radius
         */
        
        //SET MIN AND MAX FOR CIRCLESIZER ////////////////////////////////////////////////
        
        //console.log("triggered");
        //console.log(this.data);
        console.log(activeDistrict);        
        let that=this;
        
        let minSize = d3.min([0, this.data[circleSizeIndicator].map(d =>{
            //console.log(d[activeYear]);
            return d[activeYear];
        })]);
        //console.log(minSize);
        
        let maxSize = d3.max(this.data[circleSizeIndicator].map(d =>{
            //console.log(d[activeYear]);
            return d[activeYear];
        }));
        //console.log(maxSize);
        
        let circleSizer = function(d) {
            let cScale = d3.scaleSqrt().range([3, 20]).domain([minSize, maxSize]);
            return d.circleSize ? cScale(d.circleSize) : 3;
        };
        this.drawLegend(minSize, maxSize);
       
        //YOUR CODE HERE  //////////////////////////////////////////////////////////////// 
        
        this.activeYear = activeYear;
        let scatter_svg = d3.select(".plot-svg");
        let width = scatter_svg.attr("width");
        let height = scatter_svg.attr("height");
        
        this.clearHighlight();
        scatter_svg.selectAll("text").remove();
        scatter_svg.selectAll("circle").remove();
        d3.select("#scatter-x-axis").remove();
        d3.select("#scatter-y-axis").remove();
        
        //CREATE X AXIS ///////////////////////////////////////////////////////////////////
        //console.log(xIndicator);
        //console.log(this.data);
        //console.log(this.data[xIndicator]);
        let xmax = d3.max(this.data[xIndicator].map( d=> {
        let list_all = [];
        for( let key in d){
            if (key > 1996 && key < 2014)
            {   
                //console.log(key);
                list_all.push(d[key]); 
            }  
        }
            return (d3.max(list_all));
        }));
        console.log(xmax);
        let x_scale_scatter = d3.scaleLinear()
                                .domain([0, xmax])
                                .range([0, width-200]);
        
        let x_axis = d3.axisTop()
                        .scale(x_scale_scatter);
        
        scatter_svg.append("g")
            .attr("id", "scatter-x-axis")
            .attr("transform", () => {
                return "translate("+ 50+","+(height-30)+")"; 
        })
            .call(x_axis);
        
        //CREATE Y AXIS ///////////////////////////////////////////////////////////////////
        //console.log(this.data[yIndicator]);
        let ymax = d3.max(this.data[yIndicator].map( d=> {
            let list_all = [];
            for( let key in d){
                if (key > 1996 && key < 2014)
                { 
                    list_all.push(d[key]);   
                }
            }
            return (d3.max(list_all));
        }));
        console.log(ymax);
        let y_scale_scatter = d3.scaleLinear()
                        .domain([0, ymax])
                        .range([(height-100), 0]);
        
        let y_axis = d3.axisLeft()
                        .scale(y_scale_scatter);
        
        scatter_svg.append("g")
            .attr("id", "scatter-y-axis")
            .attr("transform", () => {
                return "translate("+ 80+","+85+")"; 
        })
            .call(y_axis);
        
        //LABELS FOR AXIS and BACKGROUND//////////////////////////////////////////////////////
        
        scatter_svg = d3.select(".plot-svg");        
        scatter_svg.append("text")
            .attr("class", "x-label")
            .attr("text-anchor", "end")
            .attr("x", width/2)
            .attr("y", height - 5)
            .text(this.revDropDownOptions[xIndicator]); // renxi
        
        scatter_svg.append("text")
            .attr("class", "y-label")
            .attr("text-anchor", "end")
            .attr("dy", ".75em")
            .attr("y", 0)
            .attr("x", -height/2+25)
            .attr("transform", "rotate(-90)")
            .text(this.revDropDownOptions[yIndicator]);// renxi
        
        scatter_svg.append("text")
            .attr("class", "activeYear-background")
            .attr("y", height/4)
            .attr("x", width/5)
            .text(this.activeYear);
        
        //FILL DATA INTO PLOTDATA OBJECT LIST /////////////////////////////////////////////
        
        this.data_objs = [];
        let data_points= this.getCircleDataPoints(this.data, xIndicator, yIndicator, circleSizeIndicator);
        //console.log(data_points);
        for(let ind in data_points){
            if(this.data["gdp"][ind]===undefined){
                    continue;
               }
            let id = this.data["gdp"][ind]["district"]; // renxi
            let District = this.data["gdp"][ind]["district"];// renxi
            let xInd = this.getInnerJoin(this.data, xIndicator, this.activeYear, id);
            let yInd = this.getInnerJoin(this.data, yIndicator, this.activeYear, id);
            //let reg = this.data["gdp"][ind].region;
            let dcity = this.data["gdp"][ind].city;
            let dprovince = this.data["gdp"][ind].province;
            let cSize = this.getInnerJoin(this.data, circleSizeIndicator, this.activeYear, id);
            
            let data_temp = new PlotData(District, xInd, yInd, id, dcity, dprovince, cSize);
            this.data_objs.push(data_temp);
        }
        
        //console.log(this.data_objs);
        
        //CREATE CIRCLES FOR SCATTER PLOT/////////////////////////////////////////////////
        let circles = scatter_svg.selectAll("circle");
        
        //update
        circles.data(this.data_objs)
            .attr("cx", function(d){
                  return 10;
                  })
            .attr("cy", function(d){
                  return 10;
                  });
        //enter
        circles.data(this.data_objs)
            .enter().append("circle")
            .attr("class", d => {                     //class
                return d.city;    //d.region
            })
            .attr("class", d => {                     //class
                return d.province;
            })
            .attr("id", d=> {
                return d.id;                          //id
            })
            .attr("cx", function(d){                  //cx
                  return x_scale_scatter(d.xVal);
                  })
            .attr("cy", function(d){                  //cy
                  return y_scale_scatter(d.yVal);
                  })
            .attr("r", d => circleSizer(d))           //r
            .attr("transform", () => {
                return "translate("+ 75+","+65+")"; 
        });
        
        //exit
        scatter_svg.selectAll('circle').exit().remove();
        
        //LISTENING FOR MOUSE EVENTS/////////////////////////////////////////////////
        circles = scatter_svg.selectAll("circle");
        
        //tootltip on mouse hover
        circles.data(this.data_objs)
            .on("mouseover", d => {
            d3.select(".tooltip")
                .html(this.tooltipRender(d))
                .style("opacity", 1);
        })
            .on("mouseout", d => {
            d3.select(".tooltip")
                .style("opacity", 0);
        });
        //highlight on mouse click
        circles.data(this.data_objs)
            .on("click", d => {
                that.updateDistrict(d.id); //qm
        });
        if(activeDistrict==null)
        return;
        let District = activeDistrict;

        let province = d3.select(".plot-svg").select("#"+District).attr('class');
        d3.select(".plot-svg").selectAll("#"+District).classed("selected-district", "true"); //qm
        d3.select(".plot-svg").selectAll("."+province).classed("selected-province", "true"); //qm
        d3.select(".plot-svg").selectAll("circle").classed("circle_hidden", function(){
            return !d3.select(this).classed("selected-province"); //qm
        });
        d3.select(".plot-svg").selectAll("#"+District).classed("selected-province", "false");
        d3.select(".plot-svg").selectAll("#"+District).classed("selected-district", "true");  
        d3.select("#map-chart").selectAll("#"+District).classed("selected-district", "true");        
        d3.select("#map-chart").selectAll("."+province).classed("selected-province", "true");
        d3.select("#map-chart").selectAll("path").classed("path_hidden", function(){
            return !d3.select(this).classed("selected-province");
        });
        d3.select("#map-chart").selectAll("#"+province).classed("selected-province", "false");
        d3.select("#map-chart").selectAll("#"+province).classed("selected-district", "true");  
        //let myColor = d3.scaleOrdinal().domain([3]).range(d3.schemeSet3);
        //scatter_svg.selectAll("circle").style("fill", d => myColor(circleSizer(d)));

    }

    /**
     * Setting up the drop-downs
     * @param xIndicator identifies the values to use for the x axis
     * @param yIndicator identifies the values to use for the y axis
     * @param circleSizeIndicator identifies the values to use for the circle size
     */
    //NOTE: I did not realise this was given so I have my own implementation for the dropdowns in drawPlots()
    drawDropDown(xIndicator, yIndicator, circleSizeIndicator) {

        let that = this;
        let dropDownWrapper = d3.select('.dropdown-wrapper');
        let dropData = [];

        for (let key in this.data) {
        //    console.log(key);
            dropData.push({
                indicator: key,
                indicator_name: this.data[key][0].indicator_name
            });
        }

        /* CIRCLE DROPDOWN */
        let dropC = dropDownWrapper.select('#dropdown_c').select('.dropdown-content').select('select');

        let optionsC = dropC.selectAll('option')
            .data(dropData);

        optionsC.exit().remove();

        let optionsCEnter = optionsC.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsCEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsC = optionsCEnter.merge(optionsC);

        let selectedC = optionsC.filter(d => d.indicator === circleSizeIndicator)
            .attr('selected', true);

        dropC.on('change', function(d, i) {
            let cValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let yValue = dropY.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

        /* X DROPDOWN */
        let dropX = dropDownWrapper.select('#dropdown_x').select('.dropdown-content').select('select');

        let optionsX = dropX.selectAll('option')
            .data(dropData);

        optionsX.exit().remove();

        let optionsXEnter = optionsX.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsXEnter.append('text')
            .text((d, i) => d.indicator_name);

        optionsX = optionsXEnter.merge(optionsX);

        let selectedX = optionsX.filter(d => d.indicator === xIndicator)
            .attr('selected', true);

        dropX.on('change', function(d, i) {
            let xValue = this.options[this.selectedIndex].value;
            let yValue = dropY.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

        /* Y DROPDOWN */
        let dropY = dropDownWrapper.select('#dropdown_y').select('.dropdown-content').select('select');

        let optionsY = dropY.selectAll('option')
            .data(dropData);

        optionsY.exit().remove();

        let optionsYEnter = optionsY.enter()
            .append('option')
            .attr('value', (d, i) => d.indicator);

        optionsY = optionsYEnter.merge(optionsY);

        optionsYEnter.append('text')
            .text((d, i) => d.indicator_name);

        let selectedY = optionsY.filter(d => d.indicator === yIndicator)
            .attr('selected', true);

        dropY.on('change', function(d, i) {
            let yValue = this.options[this.selectedIndex].value;
            let xValue = dropX.node().value;
            let cValue = dropC.node().value;
            that.updatePlot(that.activeYear, xValue, yValue, cValue);
        });

    }

    /**
     * Draws the year bar and hooks up the events of a year change
     */
    drawYearBar() {

        // ******* TODO: PART 2 *******
        //The drop-down boxes are set up for you, but you have to set the slider to updatePlot() on activeYear change

        // Create the x scale for the activeYear;
        // hint: the domain should be max and min of the years (1800 - 2020); it's OK to set it as numbers
        // the plot needs to update on move of the slider

        /* ******* TODO: PART 3 *******
        You will need to call the updateYear() function passed from script.js in your activeYear slider
        */
        let that = this;

        //Slider to change the activeYear of the data
        let yearScale = d3.scaleLinear().domain([1997, 2013]).range([30, 730]);  //将1997-2013之间的domain 映射到30-730的range

        let yearSlider = d3.select('#activeYear-bar')
            .append('div').classed('slider-wrap', true)
            .append('input').classed('slider', true)
            .attr('type', 'range')
            .attr('min', 1997)
            .attr('max', 2013)
            .attr('value', this.activeYear);

        let sliderLabel = d3.select('.slider-wrap')
            .append('div').classed('slider-label', true)
            .append('svg');

        let sliderText = sliderLabel.append('text').text(this.activeYear);


        
        
        that.updateYear(this.activeYear);
        
        //UPDATE SLIDER ON INPUT/////////////////////////////////////////////////
        
        
        yearSlider.on('input', function() {
            d3.select(".slider").attr("value", this.value);
            that.activeYear=this.value;

            that.updateYear(parseInt(this.activeYear));
        });
    }

    /**
     * Draws the legend for the circle sizes
     *
     * @param min minimum value for the sizeData
     * @param max maximum value for the sizeData
     */
    drawLegend(min, max) {
        // ******* TODO: PART 2*******
        //This has been done for you but you need to call it in updatePlot()!
        //Draws the circle legend to show size based on health data
        let scale = d3.scaleSqrt().range([3, 20]).domain([min, max]);

        let circleData = [min, max];

        let svg = d3.select('.circle-legend').select('svg').select('g');

        let circleGroup = svg.selectAll('g').data(circleData);
        circleGroup.exit().remove();

        let circleEnter = circleGroup.enter().append('g');
        circleEnter.append('circle').classed('neutral', true);
        circleEnter.append('text').classed('circle-size-text', true);

        circleGroup = circleEnter.merge(circleGroup);

        circleGroup.attr('transform', (d, i) => 'translate(' + ((i * (5 * scale(d))) + 20) + ', 25)');

        circleGroup.select('circle').attr('r', (d) => scale(d));
        circleGroup.select('circle').attr('cx', '0');
        circleGroup.select('circle').attr('cy', '0');
        let numText = circleGroup.select('text').text(d => new Intl.NumberFormat().format(d));

        numText.attr('transform', (d) => 'translate(' + ((scale(d)) + 10) + ', 0)');
    }

    /**
     * Reacts to a highlight/click event for a District; draws that District darker
     * and fades countries on other continents out
     * @param activeDistrict
     */
    updateHighlightClick(activeDistrict) {
        /* ******* TODO: PART 3*******
        //You need to assign selected class to the target District and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        // You will not be calling this directly in the gapPlot class,
        // you will need to call it from the updateHighlight function in script.js
        */
        //YOUR CODE HERE
        this.clearHighlight();
        
        if(activeDistrict==null)
            return;
        
        let District = activeDistrict;
        console.log(District);
        let province = d3.select(".plot-svg").select("#"+District).attr('class');
        d3.select(".plot-svg").selectAll("#"+District).classed("selected-district", "true"); //qm
        d3.select(".plot-svg").selectAll("."+province).classed("selected-province", "true"); //qm
        d3.select(".plot-svg").selectAll("circle").classed("circle_hidden", function(){
            return !d3.select(this).classed("selected-province"); //qm
        });
        d3.select(".plot-svg").selectAll("#"+District).classed("selected-province", "false");
        d3.select(".plot-svg").selectAll("#"+District).classed("selected-district", "true");  
    }
    

    
    /**
     * Clears any highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //YOUR CODE HERE  
        d3.selectAll("circle").classed("selected-province", false);
        d3.selectAll("circle").classed("selected-district", false);
        d3.selectAll("circle").classed("circle_hidden", false);
    }

    /**
     * Returns html that can be used to render the tooltip.
     * @param data 
     * @returns {string}
     */
    tooltipRender(data) {
        let text = "<h2>" + data['District'] + "</h2>";
        return text;
    }
    
    //THE FOLLOWING METHODS HAVE BEEN ADDED BY ROHIT/////////////////////////////////////////////////////////
    getCircleDataPoints(data, x_attr, y_attr, c_attr){
        let data_points_x = this.data[x_attr].map( (d,i) =>{
            return i;
        });
        
        let data_points_y = this.data[y_attr].map( (d,i) =>{
            return i;
        });
        let data_points = (data_points_x.length < data_points_y.length)?data_points_y:data_points_x;
        
        let data_points_c = this.data[c_attr].map( (d,i) =>{
            return i;
        });
        
        data_points = (data_points.length < data_points_c.length)?data_points_c:data_points;
        return data_points;
    }
    
    getInnerJoin(data, index, year, id){
        for(let entry in data[index]){
            if (data[index][entry]["district"]===id) //renxi
                return data[index][entry][year];
        }
    }
}