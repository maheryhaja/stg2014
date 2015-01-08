$(function(){
$.get('/log_ping?where={"ip":"'+$("#ipVal").attr("valeur")+'"}',function(data){
var tab=[];
for(var i=0;i<data.length;i++) tab[i]=[new Date(data[i].createdAt).getTime()+offsetTime,data[i].moyenne];
//console.log(tab);
$('#stock').highcharts('StockChart',{
 rangeSelector : {
                selected : 1
            },

            title : {
                text : 'variation temps de reponse'
            },
            
            
            xAxis:{ordinal:false},
            series : [{
                name : 'AAPL',
                data : tab,
               
                tooltip: {
                    valueDecimals: 2
                }
            }],
            
            chart:{
            events:{
            load:function(){
            var graph=this;
            io.socket.on('host',function(ev){
            if(ev.data.ip==$("#ipVal").attr("valeur"))
            graph.series[0].addPoint([new Date(ev.data.last_check).getTime()+offsetTime,ev.data.moyenne],true,false);
            });
            
              }
             }
            }

});
});
});
