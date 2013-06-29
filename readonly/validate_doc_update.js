function(new_doc, old_doc, userCtx){
	if(userCtx.roles.indexOf('admin') == -1 && userCtx.name != "ulmapi"){
	     throw({forbidden: "Not Authorized"});   
	} 
}  
