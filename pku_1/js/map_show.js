var map_chart;
var province_chart;

/*waq*/
var region;
/*waq*/

var tag = 0;
var year = 2013;

get_gdps = function(key) {
    for (var i in gdps) {
        if (gdps[i]['hc-key'] == key) {
            return gdps[i]['value'].slice(1);
        }
    }
};

Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {
    proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    var points = map_chart.getSelectedPoints();

    if (points.length) {
        if (points.length === 1) {
            $('#province-name').html(points[0].name);
        } else {
           // $('#province-name').html("地区对比");
        }

        if (!province_chart) {
            province_chart = $('#province-chart').highcharts({
                title: {
                    text: null
                },

                credits: {
                    enabled: false
                },

                xAxis: {
                    title: null
                },
                yAxis: {
                    title: null
                },
                tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: '<small id="year">{point.key}</small><table>',
                    pointFormat: '<tr><td style="color: {series.color}" class="displayprovince">{series.name}</td>' +
                    '<td style="text-align: right"><b>: {point.y}&nbsp;&nbsp;&nbsp;</b></td></tr>',
                    footerFormat: '</table>',
                    valueDecimals: 2
                },
                plotOptions: {
                    series: {
                        animation: {
                            duration: 500
                        },
                        marker: {
                            enabled: false
                        },
                        threshold: 0,
                        pointStart: 1979,
                        events: {            
                            click: function(event) {  
                                $("#result").html("<b>Result : index = "+event.point.x+" , series = "+this.name + ', x = '+event.point.category+' ,y = '+event.point.y+"</b>");
                            },
                            mouseOver: function(event){
                                region = this.name;
                            }
                        }
                    }
                }
            }).highcharts();
        }

        $.each(points, function(i) {
            var data = [];
            var key = this['hc-key'];
            switch (tag) {
                case 0:
                    data = get_gdps(key);
                    break;
                case 1:
                    data = get_gdp_rates(key);
                    break;
                case 2:
                    data = get_relative_gdps(key);
                    break;
                default:
                    break;
            }

            // Update
            if (province_chart.series[i]) {
                /*$.each(countries[this.code3].data, function (pointI, value) {
                 countryChart.series[i].points[pointI].update(value, false);
                 }); */
                province_chart.series[i].update({
                    name: this.name,
                    data: data,
                    type: 'line'
                }, false);
            } else {
                province_chart.addSeries({
                    name: this.name,
                    data: data,
                    type: 'line'
                }, false);
            }
        });
        while (province_chart.series.length > points.length) {
            province_chart.series[province_chart.series.length - 1].remove(false);
        }
        province_chart.redraw();
    } else {
        $('#province-name').html('');
        if (province_chart) {
            province_chart = province_chart.destroy();
        }
    } 
});

province_chart_empty = function () {
    $('#province-name').html('');
    if (province_chart) {
        province_chart = province_chart.destroy();
    }
};

map_show = function(tag, year) {
    get_gdp = function(y) {
        var gdp_data = [];
        var index = y - 1978;
        for (var i in gdps) {
            var gdp = {
                'hc-key': gdps[i]['hc-key'],
                'value': [gdps[i]['value'][index]]
            };
            gdp_data.push(gdp);
        }
        return gdp_data;
    };

    get_max_gdp = function() {
        var max_gdp = 0;
        var values, max_value;
        for (var i in gdps) {
            values = gdps[i]['value'];
            max_value = values[values.length-1];
            if (max_value > max_gdp) {
                max_gdp = max_value;
            }
        }
        return max_gdp;
    };

    var data = [];
    var max_data = 0;
    var name = "";
    switch (tag) {
        case 0:
            data = get_gdp(year);
            max_data = get_max_gdp();
            name = "人均GDP";
            break;
        default:
            break;
    }

    map_chart = $('#data-map').highcharts('Map', {
        title: {
            text: '',
        },

        credits: {
            enabled: true,
            text: '数据来源: 国家统计局 1979-2013',
        },

        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true
        },

        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'bottom'
        },

        colorAxis: {
            min: 0,
            max: max_data,
            stops: [
                [0, '#EFEFFF'],
                [0.5, Highcharts.getOptions().colors[0]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).brighten(-0.5).get()]
            ]
        },

        series: [{
            data: data,
            mapData: Highcharts.maps['countries/cn/custom/cn-all-sar-taiwan'],
            joinBy: 'hc-key',
            name: name,
            allowPointSelect: true,
            states: {
                select: {
                    color: Highcharts.getOptions().colors[8]
                },
                hover: {
                    color: Highcharts.getOptions().colors[6]
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    }).highcharts();
};


$("#province-chart").mousemove(function(e){
    year = $("#year").html();
    region_analyze_text = "";
    displayprovinces = $(".displayprovince");
    for (i = 0; i <displayprovinces.length; i++) {
        region =  $(".displayprovince:eq("+i+")").html();
        region_analyze = regionanalyze[region];
        region_analyze_index = region_analyze[year];
        if(region_analyze[region_analyze_index]){
            region_analyze_text = region_analyze_text + "<div class='regionhead'>" + region+ ":</div>" + region_analyze[region_analyze_index];
        }
        else{
            region_analyze_text = region_analyze_text + "";
        }
    };
    country_year_index = countryanalyze[year];
    $("#countryanalyze").html("<div class='anhead'><h4>国家</h4></div>"+country_analyze_text);
    $("#regionanalyze").html("<div class='anhead'><h4>地区</h4></div>"+region_analyze_text);
});

$("body").mousemove(function(e){
    provincce_chart_content = $("#province-chart").html();
    if(provincce_chart_content == ""){
        $("#countryanalyze").html("");
        $("#regionanalyze").html("");
    }
});