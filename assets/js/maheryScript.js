$(function(){
$.ajax({
type:"GET",
url:'log_ping?where={"ip":"10.15.254.12"}',
success:function(d){
var data=[];
var i;
for(i=0;i<d.length;i++){
var temp;
temp=[new Date(d[i].createdAt).getTime()+3*60*60*1000,d[i].moyenne];
data[i]=temp;
}

io.socket.get("/host",function(data){

});

initialiser("#conteneurStock",data);



}

});


});

function initialiser(elem,data)
{

//alert(data.length);

var tab=[];
var u;
for(u=0;u<1000;u++)tab[u]=data[u];


var opt={
//------------------>affichage de la bar de navigation :)----------------//
rangeSelector:{enabled:true},
scrollbar:{enabled:true},
navigator:{enabled:true},
//-------------------------------------------------------------------------

title:{text:"Variation moyenne"},
xAxis:{ordinal:false},
series:[{
name:"ipHost",
step:true,
data:data,
tooltip:{valueDecimals:2}
},

],
chart:{
events:{
load:function(){


var w=this;

//----------------------->ajout des points superieur a 1000
/*var c;
for(c=1000;c<data.length;c++)
w.series[1].addPoint(data[c],false,true);
console.log(w.series[1].xData);
w.redraw();*/





$("#ajouter").on("click",function(){
w.series[0].addPoint({x:new Date().getTime(),y:500},true,true);
});

io.socket.on("host",function(ev){
if(ev.data.ip=="10.15.254.12"){

w.series[0].addPoint({x:new Date(ev.data.last_check).getTime()+3*60*60*1000,y:ev.data.moyenne},true,true);
}

});



}
}
}

};

var grafy=$(elem).highcharts('StockChart',opt);

}
