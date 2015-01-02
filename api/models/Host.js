/**
* Host.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		id:{type:'INT',primaryKey:true},
		hostname:'STRING',
		ip:'STRING',
		description:'STRING',
		statu:'STRING',
		last_check:'DATETIME',
		active:'BOOLEAN',
		longitude:'FLOAT',
		latitude:'FLOAT',
		moyenne:'FLOAT',
		min:'FLOAT',max:'FLOAT',
		perte_paquet:'FLOAT',
		sources:{collection:'links',via:'id_source'},
		targets:{collection:'links',via:'id_target'}

  },
connection:'telmaMysqlServer',
autoCreatedAt:false,
autoUpdatedAt:false

};

