//--------------->script d'initialisatio
var timerTooltip;

//--------------------------------->on DOM loaded
$(function(){
 initialiser();

});

function initialiser(){
 var width = 1400,
            height = 750;

    var color = d3.scale.category20();

    var force = d3.layout.force()
            .charge(-400)
            //.linkDistance(400)
            .size([width, height]);

    var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

    d3.json("/d3/data", function(error, graph) {
        //alert(graph.nodes);
       graph.links.push({source:0,target:1,special:true});
        force
                .nodes(graph.nodes)
                .links(graph.links)
                .linkDistance(function(lien){
                    if(lien.special)
                    return 150;
                    else return 500;
                })
                .charge(function(noeud){
                    if(noeud.id=="1" || noeud.id=="2")
                    return -1000;
                    else
                    return -400;
                })
                .start();

        var link = svg.selectAll(".link")
                .data(graph.links)
                .enter().append("line")
                .attr("class", "link")
                .style("stroke",function(d){
                    return d.special?"transparent":"gray";
                })
                .style("stroke-width",1);

        var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter().append("g")
                .attr("class","node")
                .call(force.drag);

        var img =node.append("image")
		.attr("class","imgnode")
                .attr("xlink:href","http://41.188.60.35:1337/images/router.ico")
                .attr("x",-16)
                .attr("y",-16)
                .attr("width",32)
                .attr("height",32)
                .attr("id",function(d){
                    //return "li"+ d.id;
                     return d.id;})
		.attr("ip",function(d){return d.ip});
   
    
        var text = svg.append("g").selectAll("text")
                .data(graph.nodes)
                .enter().append("text")
                .attr("x",30)
                .attr("y", ".32em")
                .text(function(d) { return d.names; });

/////////////////////////////////////TRANSPARENT////////////////////////////////////////////////////////////////

         node.on("mouseover",function(d){
         var id=d.id;
          text.style("opacity",function(d){return (d.id==id?1.0:0.0)});
          d3.selectAll(".link").style("opacity",0.1);
          d3.selectAll(".node").style("opacity",0.2).style("cursor","pointer");
          d3.select(this).style("opacity",1.0);
          d3.selectAll(".link").style({
           opacity:function(d){
              return ((id==d.id_source||id==d.id_target)?1.0:0.1);
             },
           stroke:function(d){return ((id==d.id_source||id==d.id_target)?"green":(d.special?"transparent":"gray"));}
             
          });
          
         });
         node.on("mouseout",function(){
         d3.selectAll(".link").style({opacity:1.0,stroke:function(d){return (d.special?"transparent":"gray");}});
          d3.selectAll(".node").style("opacity",1.0);
          d3.selectAll("text").style("opacity",1.0);
         });



////////////////////////////////////TRANSPARENT////////////////////////////////////////////////////////////////




/////////////////////////////////////ANIMATION JAVASCRIPT ESSAIE ///////////////////////////////////////////////
        img.on("mouseover",function(dat){
var obj=this;
var d=dat;

//-------------->tooltip à revoir
timerTooltip=setTimeout(function(){
$("#chart").html("");
          d3.select("#chart")
.transition().duration(800)
.style("opacity",1.0);
          d3.select(obj)
		      .transition()
                  .duration(300)
                  .attr({x:-32,y:-32,width:64,height:64});
	var off=$(obj).offset();
	off.left+=20;off.top+=40;
	$("#chart").offset(off);
	//--------------->grapher le node
$.ajax({
type:"GET",
url:'/highstock/'+d.ip,
success:function(data){
	//----------->grapher data :)
var t=[];
for(var n=0;n<data.length;n++)t.push([data[n].x,data[n].y]);
grapherChart("#chart",t);
}
});

},600);
//----------------->fin timer


});

img.on("dblclick",function(d){document.location="/bord/"+d.ip;});




        img.on("mouseout",function(){
          d3.select(this).transition().duration(700).attr({x:-16,y:-16,width:32,height:32});
           d3.select("#chart").transition().duration(900).style("opacity",0.0);

		if(timerTooltip!=0)
{
console.log(timerTooltip);
clearTimeout(timerTooltip);
timerTooltip=0;
}
        });
        
        
/////////////////////////////////////ANIMATION JAVASCRIPT ESSAIE ///////////////////////////////////////////////




        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
            text.attr("transform", transform);
node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            /*node.attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });*/

        });
         lancerSocket();
	lancerTooltip();//<------------------cette fonction se trouve dans tooltip.js
    });
    

}

function lancerSocket()
{
   //---------------------->script pour le socket
//-------------------->Sub
        io.socket.get("/host",function(data,header){
            var indice;
            for(indice=0;indice<data.length;indice++)
            {

                d3.selectAll("image")
                        .attr("xlink:href",function(d,i){
                            return "http://41.188.60.35:1337/images/"+((data[i].statu=="down")?"rouge.ico":(data[i].moyenne>200?"yellow.ico":"router.ico"));
                        });

            }

        });



        io.socket.on("host",function(ev) {
//-------------->appel a chaque mise à jour
            var data = ev.data;//-> le data eto le host vita mise a jour!!!
            d3.selectAll("image")
                    .attr("xlink:href",function(d,i){
                        var icone;
                        if(data.id==d.id)
                        {
                           icone = "http://41.188.60.35:1337/images/"+((data.statu=="down")?"rouge.ico":(data.moyenne>200?"yellow.ico":"router.ico"));
                        }
                        else icone=d3.select(this).attr("xlink:href");
                        return icone;
                    });



        });//---------------------->script pour le socket
//-------------------->Sub

}

function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
    }


function grapherChart(elm,data){
var tab=[];
for(var u=0;u<1000;u++)tab[u]=data[u];


var opt={
rangeSelector:{enabled:false},
scrollbar:{enabled:false},
navigator:{enabled:false},
title:{text:"Moyenne ping"},
xAxis:{ordinal:false},

series:[
{name:"moyenne",data:tab,tooltip:{valueDecimals:2},step:false}
]

}


$(elm).highcharts("StockChart",opt);
}
