function googlePlaces($log){
    return {
        restrict: 'A',
        scope: {
            model: '=googlePlaces'
        },
        compile: function(tElement, tAttrs, transclude){
            tElement.attr('autocomplete', 'off');
            tElement.attr('placeholder', '');
            return {
                post: function($scope, element, attrs, ctrl){
                    var autocomplete = new google.maps.places.Autocomplete(element[0], {});
                    google.maps.event.addListener(autocomplete, 'place_changed', function() {
                        var place = autocomplete.getPlace();
                        $log.debug('GOOGLE AUTOCOMPLETE ', place);
                        var coordinates = [place.geometry.location.lng(), place.geometry.location.lat()];
                        $log.debug('GOOGLE AUTOCOMPLETE COORDINATES ', coordinates);
                        $log.debug($scope);
                        $scope.model = {};
                        $scope.model.coordinates = coordinates;
                        angular.forEach(place.address_components, function(value, key){
                            if (value.types[0] === 'street_number') {
                                $scope.model.streetNumber = value.long_name;
                            }
                            if (value.types[0] === 'route') {
                                $scope.model.route = value.long_name;
                            }
                            if (value.types[0] === 'locality') {
                                $scope.model.city = value.short_name;
                            }
                            if (value.types[0] === 'administrative_area_level_1') {
                                $scope.model.state = value.long_name;
                                $scope.model.stateCode = value.short_name;
                            }
                            if (value.types[0] === 'country') {
                                $scope.model.country = value.long_name;
                                $scope.model.countryCode = value.short_name;
                            }
                            if (value.types[0] === 'postal_code') {
                                $scope.model.zipCode = value.long_name;
                            }
                        });
                        $scope.$apply();
                    });
                }
            };
        }
    };
}
//.service('stripeGooglePlaces', function(){
//  return {
//    toStripe: function(location){
//      var ref$;
//      return {
//        postal_code: (ref$ = location.zipCode) != null ? ref$ : "",
//        country: location.countryCode,
//        city: location.city,
//        line1: location.streetNumber + " " + location.route,
//        state: location.stateCode
//      };
//    },
//    toGoogle: function(location){
//      return {
//        zipCode: location.postal_code,
//        countryCode: location.country,
//        city: location.city,
//        streetAddress: location.line1,
//        stateCode: location.state
//      };
//    }
//  };
//});
