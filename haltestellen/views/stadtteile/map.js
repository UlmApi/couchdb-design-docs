function(doc) {
	if(doc.type && doc.type === 'stadtteil'){
	    emit(doc._id, null);
	}
};