/**
 * IstockController
 *
 * @description :: Server-side logic for managing istocks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `IstockController.journee()`
   */
  journee: function (req, res) {
  var url_ip=req.params.ip;
  var hier=new Date();
  hier.setTime((hier.getTime())-(24*60*60*1000));
  console.log(hier);
  Log_ping.find({ip:url_ip,createdAt:{'>':hier}}).exec(function(error,resultat){
  var tab=[];
   for(var i=0;i<resultat.length;i++)
   {
     tab[i]={x:new Date(resultat[i].createdAt).getTime()+3*60*60*1000,y:resultat[i].moyenne};
   }
   res.json(tab);
   });
  },

bord:function(req,res){
console.log("************triger de bord**************");
return res.view('bord',{ip:req.params.ip});
}
	

};

