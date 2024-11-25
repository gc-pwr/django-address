$(function () {
	$('input.address').each(function () {
		var self = $(this);
		var cmps = $('#' + self.attr('name') + '_components');
		var fmtd = $('input[name="' + self.attr('name') + '_formatted"]');
		var googlemap = false
		if (self.hasClass("googlemap")){
			googlemap = $("#map_canvas")
		}
		var geocoder = new google.maps.Geocoder();
		self.geocomplete({
			details: cmps,
			detailsAttribute: 'data-geo',
			map: googlemap,
			blur: false,
			markerOptions: {
				draggable: true
			},
			geocodeAfterResult: true,
			restoreValueAfterBlur: false
		}).change(function () {
			if (self.val() != fmtd.val()) {
				var cmp_names = [
					'country',
					'country_code',
					'locality',
					'postal_code',
					'postal_town',
					'route',
					'street_number',
					'state',
					'state_code',
					'formatted',
					'latitude',
					'longitude',
				];

				for (var ii = 0; ii < cmp_names.length; ++ii) {
					$('input[name="' + self.attr('name') + '_' + cmp_names[ii] + '"]').val('');
				}
			}
		})
		.bind("geocode:dragged", function (event, latLng) {
			geocoder.geocode({'latLng': latLng}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						self.val(results[0].formatted_address)
						//self.trigger("blur")
						self.trigger("geocode")
					}
				}
			});
			//self.trigger("geocode");
		});
	});
});