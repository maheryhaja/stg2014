////----------------------TODO

//partager le temps|migrer le dernier jour de chaque laps de temps|

//important:!executer le script de mise à à interval e temps regulier


//-------------------->service se chargeant de regrouper les donnee
var moment=require("moment");
var _=require("underscore");

module.exports={
run:function(){//------------> lancement du servicei
//--------->jr et dt en mn
var listeTransition=[
{jr:3,dt:5},{jr:15,dt:5},{jr:90,dt:60},{jr:365,dt:1440}
];

Host.find({}).exec(function(err,found){
//---------->pour chaque hote
_.each(found,function(h){
	_.each(listeTransition,function(l){fetcher(h.ip,leJourAvant(l.jr),l.dt) });
});

});



}
};


function fetcher(host,jour,delai)
//----------->transformer les donnes du jour selon le laps de temps 
{
//----------−>nombre d'iteration de la boucle
var n=(24*60/delai); 
var i;
var deb=jour;
var fin=new Date();
fin.setTime(deb.getTime()+delai*60*1000);
for(i=0;i<n;i++)
{
Log_ping.find({
createdAt:{
'>':deb,'<':fin
},ip:host
}).exec(function(err,found){
if(!found)console.log("Aucune valeur trouV dans cette intervalle");
else
{
var tMoyenne=[],tMin=[],tMax=[],tPerte=[];

_.each(found,function(h){
tMoyenne.push(found.moyenne);
tMin.push(found.min);
tMax.push(found.max);
tPerte.push(found.perte_paquet);
//--------------−>destruction des anciens donnees
Log_ping.destroy(h).exec(function(){});

});

//--------------->ecriture des donnee fetcher

Log_ping.create({
ip:host,
moyenne:calculMoyenne(tMoyenne),
min:_.min(tMin),
max:_.max(tMax),
perte_paquet:calculMoyenne(tPerte)
}).exec(function(){});

//------------------->rendu de la statistique

}


});
deb=fin;
fin.setTime(deb.getTime()+delai*60*1000);

}


//-----------------−>fin de fetch
}

//--------------->retourne la moyenne dans un tableau
function calculMoyenne(tab)
{
var s=0,i;
for(i=0;i<tab.length;i++)s+=tab[i];
return s/tab.length;
}

//----------->retourne la date d'il ya n jours

function leJourAvant(n){
var d=new Date();
//-------------−>date a 00:00:00
var d2=new Date(d.getFullYear(), d.getMonth(), d.getDay());
d2.setTime(d2.getTime()-n*24*60*60*1000);
return d2;
}
