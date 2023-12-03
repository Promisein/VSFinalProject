map_show(tag, year); 

$('#gdp_bar').bind('click', function() {
    $('#navbar li').removeClass('active');
    $(this).addClass('active');
    tag = 0;
    map_show(tag, year);
    province_chart_empty();
});

$('#year-slider').slider({
    tooltip: 'always',
    reversed : true,
    formatter: function(value) {
        return value;
    }
});
$('#year-slider').on('slide', function(event) {
    year = event.value;
    $('#selected-year').text(year);
    map_show(tag, year);
});