$(document).ready(function(){

		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/3a83164a47874169be4cabc2e8b8c449/33481/256/{z}/{x}/{y}.png', cloudmadeAttribution = 'UlmApi.de / Shape Files: Stadt Ulm (cc-by-sa), Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade', cloudmade = new L.TileLayer(
			cloudmadeUrl, {
				maxZoom : 18,
				attribution : cloudmadeAttribution
			});

		var map = new L.Map('map', {
			center : new L.LatLng(48.399976,9.995399),
			zoom : 12,
			layers : [ cloudmade ],
			zoomControl : false
		});
		
		
		var knownLayers = {
//			"stadtteil" : {
//				"style" : { 
//					weight: 2,
//					color : "#000099",
//					stroke : "#0000FF"
//				},
//				"name" : "Stadtteile"
//			},	
//			"stadtviertel" : {
//				"style" : { 
//					weight: 2,
//					color : "#990000",
//					stroke : "#FF0000"				
//				},
//				"name" : "Stadtviertel"
//			},
			"haltestelle" : {
				"style" : {
				},
				"name" : "Haltestellen"
			}				
		};
		
	    for(var layer in knownLayers) {
	    	var controls = $('#layers');
	        if(knownLayers.hasOwnProperty(layer)){
        		knownLayers[layer].geo = new L.GeoJSON();
        		
        		var input = document.createElement('input');
        		var label = document.createElement('label');
        		$(input).attr({
        			'type' : "checkbox",
        			'id' : layer,
        			'name' : layer
        		});        		
        		$(label).attr({
        			'for' : layer
        		}).html(knownLayers[layer]['name']);
        		controls.append(input).append(label).append(document.createElement('br'));
	        }	     
	    }

		
		
		var geoDataDb = $.couch.db('geodaten');
		geoDataDb.view('map/items', {
			
			success: function(data){
				if(data && data.rows && data.rows.length){
					for(var i = 0;i<data.rows.length;i++){
						if(knownLayers.hasOwnProperty(data.rows[i].key[0])){
							knownLayers[data.rows[i].key[0]].geo.on('featureparse', function(e) {
								e.layer.bindPopup(data.rows[i].value.label);
//								e.layer.setStyle(knownLayers[data.rows[i].key[0]].style);
							}); 
//							console.log(JSON.stringify(data.rows[i]));
//							console.log(JSON.stringify(data.rows[i].value.geometry));
							try{
								knownLayers[data.rows[i].key[0]].geo.addGeoJSON(data.rows[i].value.geometry);
							}
							catch (e) {
								console.log(e);
							}
//							console.log(JSON.stringify(data.rows[i]));
//							console.log(data.rows[i].key[0]+" "+knownLayers.hasOwnProperty(data.rows[i].key[0]));
						}
					}
				    for(var layer in knownLayers) {

				        if(knownLayers.hasOwnProperty(layer) && knownLayers[layer].geo){
				        	map.addLayer(knownLayers[layer].geo);
							$('#'+layer).attr('checked', true);
							
							(function(currentLayer){
								$('#'+currentLayer).click(function() {
									 if($('#'+currentLayer).attr('checked') === "checked"){
										 map.addLayer(knownLayers[currentLayer].geo);
									 }
									 else{
										 map.removeLayer(knownLayers[currentLayer].geo);
									 }
								});	
							})(layer);
										        	
				        }
				    }	
				}
			
			}
		});	
});