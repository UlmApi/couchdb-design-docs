function(doc) {
	if(doc.type && doc.type === 'stadtviertel'){
	    emit([doc.stadtteil,doc._id], null);
	}
};