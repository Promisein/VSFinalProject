/**
 * Data structure for the data associated with an individual Province.
 * the ProvinceData class will be used to keep the data for drawing your map.
 * You will use the region to assign a class to color the map!
 */
class DistrictData {
    /**
     *
     * @param type refers to the geoJSON type- countries are considered features
     * @param properties contains the value mappings for the data
     * @param geometry contains array of coordinates to draw the Province paths
     * @param region the Province region
     * @param city
     * @param province
     */
    constructor(type, id, properties, geometry, city, province) {

        this.type = type;
        this.id = id;
        this.properties = properties;
        this.geometry = geometry;
        //this.region = region;
        this.city = city;
        this.province = province;
    }
}

/** Class representing the map view. */
class Map {

    /**
     * Creates a Map Object
     *
     * @param data the full dataset
     * @param updateDistrict a callback function used to notify other parts of the program when the selected
     * Province was updated (clicked)
     */
    constructor(data, updateDistrict) {
        // ******* TODO: PART I *******
        //this.projection = d3.geoWinkel3().scale(140).translate([365, 225]); //qm
        this.projection = d3.geoMercator()
        .center([107,31]) //用于设定地图的中心位置，[107,31] 指的是经度和纬度。
        .scale(450) //用于设定放大的比例。
        .translate(365,225); //函数用于设定平移。  .translate([width/2,height/2]);
        this.nameArray = data.gdp.map(d => d.district);
        this.gdpData = data.gdp;
        this.updateDistrict = updateDistrict;
    }

    /**
     * Renders the map
     * @param China the topojson data with the shape of all countries and a string for the activeYear
     */
    drawMap(China) {
        //note that projection is global!

        // ******* TODO: PART I *******

        //China is a topojson file. you will have to convert this to geojson (hint: you should have learned this in class!)

        // Draw the background (Province outlines; hint: use #map-chart)
        // Make sure to add a graticule (gridlines) and an outline to the map

        // Hint: assign an id to each Province path to make it easier to select afterwards
        // we suggest you use the variable in the data element's id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)

        // You need to match the Province with the region. This can be done using .map()
        // We have provided a class structure for the data called ProvinceData that you should assign the paramters to in your mapping

        //TODO - Your code goes here - 

            
        d3.select("#map-chart")
            .append("svg")
            .attr("id", "map-svg")
            .attr("fill", "#b6e2ff")  //qm 底图颜色填充
            .attr("width", 730)
            .attr("height",550);
        
        let map_svg = d3.select("#map-svg");
        let width = map_svg.attr("width");
        let height = map_svg.attr("height");
        
        //console.log(geojson.features);
        //console.log(this.populationData);
        //console.log(this.nameArray);
        
        //IN ORDER TO CONVERT LAT / LON (SPHERICAL!) COORDINATES TO FIT IN THE 2D///
        this.projection.translate([width/2, height/2]);
        
        // This converts the projected lat/lon coordinates into an SVG path string
        let China_path = d3.geoPath().projection(this.projection);

        //LOAD DATA INTO GEOJSON////////////////////////////////////////////////////
        //let geojson = topojson.feature(China, China.features.properties);
        let geojson = China;
        //console.log(geojson);
        d3.select("#map-svg").selectAll("path")
            .data(geojson.features)
            .join("path")
            .attr("id", d => {
                return d.properties.name;
            })
            // here we use the familiar d attribute again to define the path
            .attr("d", China_path);
           
        /********************************************/
        let districtData = geojson.features.map(District => {  //qm

            let index = this.nameArray.indexOf(District.properties.name);   //this.nameArry输出正确     
            let city = 'cities';
            let province = 'provinces';
            
            if (index > -1) {
                //  console.log(this.populationData[index].geo, Province.id);                
                city = this.gdpData[index].city;
                province = this.gdpData[index].province;
                return new DistrictData(District.type, District.properties.name, District.properties, District.geometry, city, province); //qm
            } else {
                //console.log('not found');
            }
        });
        
        /*********************************************/
        
        // BIND DATA AND CREATE ONE PATH PER GEOJSON FEATURE////////////////////////////////////
        d3.select("#map-svg").selectAll("path")
            .data(districtData) //qm
            .join("path")
            .attr("class", d => {
                if(d!=undefined)
                    return d.province;
                else
                    return "province";
            });
        
        //DRAW GRIDLINES OR GRAICULE FOR MAP////////////////////////////////////////////////////
        let graticule = d3.geoGraticule();
        d3.select("#map-svg").append('path')
                .datum(graticule).attr('class', "graticule").attr('d', China_path);
        
        d3.select("#map-svg").append("path")
            .datum(graticule.outline)
            .attr("class", "grat-outline")
            .attr("d", China_path);
        
        d3.select(".grat-outline")
            .attr("fill", "none")
            .attr("stroke", "#222")
            .attr("stroke-width", "2px");
        
        //console.log(ProvinceData.length);
        
        //LISTEN FOR MOUSE EVENTS////////////////////////////////////////////////////////////////
        d3.select("#map-svg").selectAll("path")
            .data(districtData) //qm            
            .on("click", d =>{
            try{
                this.updateDistrict(d.properties.name); //qm                
            }catch{
                this.updateDistrict(null);
            }
        })
        console.log(activeDistrict);
    }
    

    /**
     * Highlights the selected conutry and region on mouse click
     * @param activeDistrict the Province ID of the Province to be rendered as selected/highlighted
     */
    updateHighlightClick(activeDistrict) {
        // ******* TODO: PART 3*******
        // Assign selected class to the target Province and corresponding region
        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for countries/regions, you can use
        // d3 selection and .classed to set these classes on here.
        //

        //TODO - Your code goes here -
        this.clearHighlight();
        
        if(activeDistrict==null){
            return;
        }
        let district = activeDistrict; //qm
        let province = d3.select("#map-chart").select("#"+district).attr('class'); //qm 选中区之后，省的属性也在

        d3.select("#map-chart").selectAll("#"+district).classed("selected-district", "true");        
        d3.select("#map-chart").selectAll("."+province).classed("selected-province", "true");
        d3.select("#map-chart").selectAll("path").classed("path_hidden", function(){
            return !d3.select(this).classed("selected-province");
        });
        d3.select("#map-chart").selectAll("#"+province).classed("selected-province", "false");
        d3.select("#map-chart").selectAll("#"+province).classed("selected-district", "true");  

    }

    /**
     * Clears all highlights
     */
    clearHighlight() {
        // ******* TODO: PART 3*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
        // d3 selection and .classed to set these classes off here.

        //TODO - Your code goes here - 
        d3.selectAll("path").classed("selected-district", false);
        d3.selectAll("path").classed("selected-province", false);
        d3.selectAll("path").classed("path_hidden", false);
        //let tmp=d3.selectAll("path");//.attr("fill", "#85C1E9");
        
    }
}