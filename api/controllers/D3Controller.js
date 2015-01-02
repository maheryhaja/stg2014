 
 /**
  * D3Controller
  *
  * @description :: Server-side logic for managing d3s
  * @help        :: See http://links.sailsjs.org/docs/controllers
  */
 var _=require("underscore");
 module.exports = {
 	
 
 
   /**
    * `D3Controller.data()`
    */
   data: function (req, res) {
console.log("connection de "+req.ip);     
 var vect=[];
      var tab=[];
      var ref=[];
    
           
            Host.find({}).exec(function(error,listeNodes){
       var x;
       
       
       
       
       for(x=0;x<listeNodes.length;x++)
        {tab.push({
         id:""+listeNodes[x].id,
         names:""+listeNodes[x].hostname,
	ip:""+listeNodes[x].ip
        // fixed:(listeNodes[x].id==1 || listeNodes[x].id==2) 
        });
        ref.push(listeNodes[x].id);
        }
        
         Links.find({}).exec(function(error,listeLinks){
            var i;
            for(i=0;i<listeLinks.length;i++)  
           vect.push({
             source:_.indexOf(ref,listeLinks[i].id_source),
             target:_.indexOf(ref,listeLinks[i].id_target),
             id_source:listeLinks[i].id_source,
		id_target:listeLinks[i].id_target,
             value : 1
           });
        
        
        
        res.json({
     nodes :tab,
     links : vect
     });
     }); 
     
     
     }); 
   }
 };
 
