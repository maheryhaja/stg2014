/**
* Links.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	id:'INT',
	value:'INT',
	classe:'STRING',
	description:'STRING',
	id_source:{
			model:'host'
			},
	id_target:{model:'host'}

  },
connection:'telmaMysqlServer',
autoCreatedAt:false,
autoUpdatedAt:false

};

