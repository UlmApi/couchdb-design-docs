function map(doc) {
    if (doc.type && doc.type == 'haltestelle') {
    	doc.geometry.features.forEach(function(f){
    		emit(f.properties.olifid, {"lat":f.geometry.coordinates[1],"lon":f.geometry.coordinates[0],"bezeichnung":doc.bezeichnung});
    	});        
    }
}
