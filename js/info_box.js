/** Data structure for the data associated with an individual District. */
class InfoBoxData {
    /**
     *
     * @param District name of the active District
     * @param region region of the active District
     * @param indicator_name the label name from the data category
     * @param value the number value from the active year
     * @param city
     * @param province
     */
    constructor(District, city, province, indicator_name, value) {
        this.indicator_name = indicator_name;
        this.District = District;
        //this.region = region;
        this.city = city;
        this.province = province;
        //this.population = null;
        this.gdp = null;        
        this.deposit = null;  //城乡居民储蓄
        this.revenue = null;  //政府财政收入
        this.tele = null;
        this.expenditure = null;
        this.second = null;
        this.primary = null;
        this.nind = null;
        this.outind = null;
        this.bedSocial = null;
        this.socal = null;
        this.bedHospital = null;
        //this.fertility = null;
        //this.life_exp = null;
        //this.child_mort = null;       
    }
}

/** Class representing the highlighting and selection interactivity. */
class InfoBox {
    /**
     * Creates a InfoBox Object
     * @param data the full data array
     */
    constructor(data) {
        this.data=data;
    }

    /**
     * Renders the District description
     * @param activeDistrict the IDs for the active District
     * @param activeYear the year to render the data for
     */
    updateTextDescription(activeDistrict, activeYear) {
        // ******* TODO: PART 4 *******
        // Update the text elements in the infoBox to reflect:
        // Selected District, region, population and stats associated with the District.
        /*
         * You will need to get an array of the values for each category in your data object
         * hint: you can do this by using Object.values(this.data)
         * you will then need to filter just the activeDistrict data from each array
         * you will then pass the data as paramters to make an InfoBoxData object for each category
         *
         */
        
        //TODO - Your code goes here - 
        
        //SETTNG UP DATA TO DISPLAY IN INFO BOX////////////////////////////////////////////////////// 
        
        this.clearHighlight();
        let ind = 0;
        
        if(activeDistrict==null)
            return;
        
        for(let entry in this.data["gdp"]){
            if(this.data["gdp"][entry]["district"] === activeDistrict){  //gdp的名称属性=选中区县
                //console.log(this.data["gdp"][entry]["district"]);
                    ind = entry;
                    break;
            }
        }
        
        let info_obj = new InfoBoxData();
        
        info_obj.indicator_name = activeDistrict;
        //info_obj.region = this.data["gdp"][ind].region.toUpperCase();
        info_obj.city = this.data["gdp"][ind].city; //qm
        info_obj.province = this.data["gdp"][ind].province;
        info_obj.District = this.data["gdp"][ind].district;
        info_obj.gdp = this.data["gdp"][ind][activeYear];
        info_obj.deposit = this.getInnerJoin(this.data, "Savings-Deposits-of-Urban-Households", activeYear, activeDistrict);
        info_obj.revenue = this.getInnerJoin(this.data, "Local-Government-Revenue", activeYear, activeDistrict);
        info_obj.tele = this.getInnerJoin(this.data, 'Number-of-Local-Telephone-Subscribers', activeYear, activeDistrict);
        info_obj.expenditure = this.getInnerJoin(this.data, 'Local-Goverment-Expenditure', activeYear, activeDistrict);
        info_obj.second = this.getInnerJoin(this.data, 'Value-added-of-Secondary-Industry', activeYear, activeDistrict);
        info_obj.primary = this.getInnerJoin(this.data, 'Value-added-of-Primary-Industry', activeYear, activeDistrict);
        info_obj.nind = this.getInnerJoin(this.data, 'Number-of-Industrial-Enterprises-above-Designated-Size', activeYear, activeDistrict);
        info_obj.outind = this.getInnerJoin(this.data, 'Output-of-Industrial-Enterprises-above-Designated-Size', activeYear, activeDistrict);
        info_obj.bedSocial = this.getInnerJoin(this.data, 'Number-of-Beds-in-Social-Welfare-Nursing', activeYear, activeDistrict);
        info_obj.socal = this.getInnerJoin(this.data, 'Number-of-Social-Welfare-Nursing-Centers', activeYear, activeDistrict);
        info_obj.bedHospital = this.getInnerJoin(this.data, 'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies', activeYear, activeDistrict);
        //info_obj.gdp = this.getInnerJoin(this.data, "gdp", activeYear, activeDistrict);
        //info_obj.fertility = this.getInnerJoin(this.data, "fertility-rate", activeYear, activeDistrict);
        //info_obj.life_exp = this.getInnerJoin(this.data, "life-expectancy", activeYear, activeDistrict);
        //info_obj.child_mort = this.getInnerJoin(this.data, "child-mortality", activeYear, activeDistrict)
                
        
        //ADDING HTML ELEMENTS FOR INFO BOX////////////////////////////////////////////////////// 
        
        let labels = ["District","City", "Province", "GDP", "Savings-Deposits-of-Urban-Households", "Local-Government-Revenue",
        'Number-of-Local-Telephone-Subscribers',
                            'Local-Goverment-Expenditure',
                            'Value-added-of-Secondary-Industry',
                            'Value-added-of-Primary-Industry',
                            'Number-of-Industrial-Enterprises-above-Designated-Size',
                            'Output-of-Industrial-Enterprises-above-Designated-Size',
                            'Number-of-Beds-in-Social-Welfare-Nursing',
                            'Number-of-Social-Welfare-Nursing-Centers',
                            'Number-of-Beds-in-Hospitals-and-Sanitation-Agencies'];
        let values = [info_obj.District, info_obj.city, info_obj.province, info_obj.gdp, info_obj.deposit, info_obj.revenue,
        info_obj.tele,
        info_obj.expenditure,
        info_obj.second,
        info_obj.primary,
        info_obj.nind,
        info_obj.outind,
        info_obj.bedSocial,
        info_obj.socal,
        info_obj.bedHospital];

        d3.select("#District-detail")
            .selectAll("text")
            .data(labels)
            .enter()
            .append("p")
            .attr("class", "info-box")
            .append("text")
            .attr("id", d=> {
                return d.replace(/\s/g, '_')+"_info";
        })
            .text( d => {
                return d; 
        })
            .style("font-weight", "bold")
            .style("opacity", 1);
        
        for(let entry in labels){
           
            // if(entry < 2){
            //     let label_name = labels[entry].replace(/\s/g, '_')+"_info";
                
            //     //tmp = values[entry]+'-'+tmp;        
            //     //d3.select("#"+label_name).html("<h1>"+values[entry]+"<\h1>"); 
            //     continue;
            // }

            //tmp=tmp + values[entry];
            //d3.select("#"+label_name).html("<h1>"+values[0]+values[1]+values[2]+"<\h1>");
            //d3.select("#"+label_name).html("<h1>"+district_city_province+"<\h1>"); 

            let label_name = labels[entry].replace(/\s/g, '_')+"_info";  // label_name = 'GDP_info'
            let text_info = d3.select("#"+label_name).text();  //gdp,saving,revenue
            d3.select("#"+label_name).text( d => {
                return text_info + " : " + values[entry] 
            });
        }

    }
    /**
     * Removes or makes invisible the info box
     */
    clearHighlight() {
        d3.select("#District-detail").selectAll("text").remove();
        d3.select(".info-box").style("opacity", 0);
        //TODO - Your code goes here -
        
    }
    
    //THE FOLLOWING METHODS HAVE BEEN ADDED BY ROHIT/////////////////////////////////////////////////////////
    getInnerJoin(data, index, year, id){
        for(let entry in data[index]){
            if (data[index][entry]["district"]===id) //qm
                return data[index][entry][year];
        }
    }

}