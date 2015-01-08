
io.socket.get('/log_ping?where={"ip":"'+$("#ipVal").attr("valeur")+'"}',function(found){
initialiserGauge(found[found.length-1]);
console.log(found[found.length-1]);
})


function initialiserGauge(val)
{

var opt={

chart:{type:'gauge',plotBackgroundColor:null,plotBackGroundImage:null,plotBorderWidth:0,plotShadow:false,
events:{
load:function(){
var graph=this;
io.socket.on("host",function(ev){
if(ev.data.ip==$("#ipVal").attr("valeur")){
var point=graph.series[0].points[0];
point.update(ev.data.moyenne);


}


});
}



}},

title:{text:"Gauge Temps de reponse"},

pane:{
startAngle:-150,endAngle:150,
background:[{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]

},
///-------------------------->VALUE AXIS
yAxis: {
            min: 0,
            max: 1500,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'ms'
            },
            plotBands: [{
                from: 0,
                to: 200,
                color: '#55BF3B' // green
            }, {
                from: 200,
                to: 500,
                color: '#DDDF0D' // yellow
            }, {
                from: 500,
                to:1500,
                color: '#DF5353' // red
            }]
        },

series: [{
            name: 'Temps de reponse',
            data: [val.moyenne],
            tooltip: {
                valueSuffix: ' ms'
            }

        }]



};



$("#chart").highcharts(opt);

//-------------------------------------------->setting pour le second chart gauge min

var opt2=opt;
opt2.title={text:"GAUGE MIN"};
opt2.series=[{name:'Temps de reponse min',data:[val.min],tooltip:{valueSuffix:'ms'}}];
opt2.chart.events={
load:function(){
var graph=this;
io.socket.on("host",function(ev){
if(ev.data.ip==$("#ipVal").attr("valeur")){
var point=graph.series[0].points[0];
point.update(ev.data.min);


}});
}};
$("#chart2").highcharts(opt2);

//----------------------------------------->setting pour le troisieme chart gauge max


var opt3=opt;
opt3.title={text:"GAUGE MAX"};
opt3.series=[{name:'Temps de reponse max',data:[val.max],tooltip:{valueSuffix:'ms'}}];
opt3.chart.events={
load:function(){
var graph=this;
io.socket.on("host",function(ev){
if(ev.data.ip==$("#ipVal").attr("valeur")){
var point=graph.series[0].points[0];
point.update(ev.data.max);


}});
}};
$("#chart3").highcharts(opt3);


}
