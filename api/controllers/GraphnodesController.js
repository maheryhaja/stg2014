/**
 * GraphnodesController
 *
 * @description :: Server-side logic for managing graphnodes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `GraphnodesController.highstock()`
   */
  highstock: function (req, res) {
    
var id=req.query.id;
console.log(id);
//----------------->passer les donnee dans une vue :)
return res.view("graph/highstock",{id:id});
  },


  /**
   * `GraphnodesController.highcharts()`
   */
  highcharts: function (req, res) {
    return res.json({
      todo: 'highcharts() is not implemented yet!'
    });
  }
};

