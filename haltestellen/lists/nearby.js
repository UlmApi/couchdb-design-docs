function(doc, req) {   

start({
        "headers": {
          "Content-Type": "application/json; charset=utf-8"          
         }
      });

		var stops = {};

   		var names = {};

        while (row = getRow()) {
        
        	var lat1 = req.query.lat;
        	var lon1 = req.query.lon;
				
        	var lat2 = row.value.lat;
        	var lon2 = row.value.lon;
        	
        	var stopId = row.key.substr(0,4);
        	
        	  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1) * (Math.PI/180);  // deg2rad below
  var dLon = (lon2-lon1) * (Math.PI/180); 
  var a =     Math.sin(dLat/2) * Math.sin(dLat/2) +    Math.cos((lat1) * (Math.PI/180)) * Math.cos((lat2) * (Math.PI/180)) *     Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1000; // Distance in m
				
				if(stopId in stops){
					if(stops[stopId] > d){
						stops[stopId] = d;
					}
				}
				else{
					stops[stopId] = d;
				}
				
				names[stopId] = row.value.bezeichnung;
        }   
        
        var stopsArray = [];
		for (var stopId in stops){
			stopsArray.push([stopId, stops[stopId],names[stopId]])
		}
		stopsArray.sort(function(a, b) {return a[1] - b[1]})        
        
        send("{ \"rows\":[");
        for(var i = 0;i<10 && i<stopsArray.length;i++){
        	if(i>0){
        		send(",");
        	}
	        send("[\""+stopsArray[i][0]+"\","+stopsArray[i][1]+",\""+stopsArray[i][2]+"\"]");
        }
        
        send("]}\n");
       
	
}		
