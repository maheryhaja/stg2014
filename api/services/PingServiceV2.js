//--------------------------->chargement des differents modules-------------->
var exec=require("child_process").exec;
var _=require("underscore");

//-------------->Main
module.exports={
run:function(){
setInterval(appel,60000);
}

};

//-----------------−>interroger un ip

function interroger(ip){
//---------------->execution de la commande shell ping

var commande=exec("ping "+ip+" -c 50 -q -i 0.3|tail -n 2",function(error,stdout,stderr){
var stat={};
if(error)console.log(error);
else
{
console.log(stdout);
var elm=stdout.split("\n");

///---------------->capture de la premiere ligne

/([0-9]*) packets transmitted, ([0-9]*) received, ([0-9\.]*)% packet loss,/.exec(elm[0]);
stat.perte_paquet=parseFloat(RegExp.$3);
stat.statu=(stat.perte_paquet>80)?"down":"up";


///----------------->capture de la seconde ligne
//-----------−−>cas ''

if(elm[1]==''){
stat.min=0;stat.max=0;stat.moyenne=0;stat.last_check=new Date();

}
else
{
/rtt min\/avg\/max\/mdev = ([0-9\.]*)\/([0-9\.]*)\/([0-9\.]*)\/([0-9\.]*)/.exec(elm[1]);
stat.min=parseFloat(RegExp.$1);stat.moyenne=parseFloat(RegExp.$2);stat.max=parseFloat(RegExp.$3);
stat.last_check=new Date();
}
console.log(stat);
//---------------------->envoi dans la base de donnee
//------------update de host
Host.find({ip:ip}).exec(function(err,found){
_.each(found,function(h){
h.last_check=stat.last_check;
h.moyenne=stat.moyenne;
h.statu=stat.statu;
h.perte_paquet=stat.perte_paquet;
h.min=stat.min;
h.max=stat.max;
h.save(function(err,s){
if(!err)Host.publishUpdate(s.id,s);
});
});


Log_ping.create({ip:ip,moyenne:stat.moyenne,
perte_paquet:stat.perte_paquet,
min:stat.min,
max:stat.max
}).exec(function(){
});


//------------------>creation de log_ping attention: se trouve dans le callback du precedent


});




}
});
}



//------------------>appel depuis base
function appel(){
Host.find({}).exec(function(err,found){
_.each(found,function(h){
//console.log("**********************************************************************");
if (verifierIp(h.ip)) interroger(h.ip);
});

});

}

//--------------------->verification des addresses ip!
function verifierIp(ip){
if(/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/.exec(ip))
return appartient(RegExp.$1) && appartient(RegExp.$2) && appartient(RegExp.$3) && appartient(RegExp.$4)
return false;

}

function appartient(texte){
var n=parseInt(texte);
return n<256 && n>=0;
}


