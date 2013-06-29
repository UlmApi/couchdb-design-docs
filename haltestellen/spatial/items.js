function(doc){
	if(doc.geometry && doc.geometry.geometry){
		emit(doc.geometry.geometry, null);
	}
};