//------------>grapher sur un elm
//------------->ip: adresse à grapher



function grapher(elm,ip)
{
//------------------>demande de la liste de log
$.ajax({
type:'GET',
url:'log_ping?where={"ip":"'+ip+'"}',
success:function(d){
alert(d.length);

			}
});
}
