function(doc) {
	if (doc.type) {
		if(doc.type === 'stadtviertel'){
		    emit(['stadtviertel', doc._id], {
		    	'geometry' : doc.geometry,
		    	'label' : "<b>Stadtviertel "+doc.name+"</b><br/>ID: "+doc._id+"<br/>(Stadteil "+doc.stadtteil+")"
		    });
		}
		else if(doc.type === 'stadtteil'){
		    emit(['stadtteil', doc._id], {
		    	'geometry' : doc.geometry,
		    	'label' : "<b>Stadtteil "+doc.name+"</b><br/>ID: "+doc._id
		    });
		}
		else if(doc.type === 'haltestelle'){
			doc.geometry.features.forEach(function(d){
				
			    emit(['haltestelle', doc._id], {
			    	'geometry' : d.geometry,
			    	'label' : "<b>"+doc.bezeichnung+"</b> ("+doc.ort+")"
			    })
			    ;
				
			});
		}		
	}
};