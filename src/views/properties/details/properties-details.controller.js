function PropertiesDetailsController ($scope, $state, $stateParams, config, properties, $log, _) {
  var vm = this;
  vm.property         = {};

  //Details
  vm.languageSelected = 'English';
  vm.languages        = ['Français', 'English', 'Spanish'];
  vm.languageKeys     = ['fr', 'en', 'es'];
  vm.languageKey      = vm.languageKeys[vm.languages.indexOf(vm.languageSelected)];

  vm.changeLanguage = function(language) {
    vm.languageSelected = language;
    vm.languageKey = vm.languageKeys[vm.languages.indexOf(vm.languageSelected)];
    $scope.safeApply();
    $log.debug('Language changed to ' + language);
  };

  vm.getLanguage = function() {
    return vm.languageKeys[vm.languages.indexOf(vm.languageSelected)];
  };

  //Amenities
  vm.amenitiesSelected  = [];
  vm.amenitiesAvailable = [];
  vm.amenities          = angular.copy(properties.amenities);

  vm.selectAmenity = function(amenity) {
    vm.amenitiesSelected.push(amenity);     // Add to selected amenities list
    _.pull(vm.amenitiesAvailable, amenity); // Remove from available amenities list
  };

  vm.unselectAmenity = function(amenity) {
    vm.amenitiesAvailable.push(amenity);     // Add to selected amenities list
    _.pull(vm.amenitiesSelected, amenity); // Remove from available amenities list
  };

  //Map
  vm.location = {};

  // Photos
  vm.images = [];
  vm.defaultImage = '';

  vm.setDefaultImage = function(image) {
      vm.defaultImage = image;
      vm.property.defaultImage = image;
      $log.debug('Default image set to ', image);
      vm.updateProperty();
  };

  vm.isDefaultImage = function(image) {
    return vm.defaultImage === image;
  };

  vm.deleteImage = function(image) {
    _.pull(vm.images, image);
    vm.updateProperty();
  };

  //Dropzone file upload config
  $scope.dzOptions = {
        url : '/uploads',
        paramName : 'uri',
        maxFilesize : '100000',
        acceptedFiles : 'image/jpeg, images/jpg, image/png',
        addRemoveLinks : true
    };

  //Handle events for dropzone
  //Visit http://www.dropzonejs.com/#events for more events
  $scope.dzCallbacks = {
      'addedfile' : function(file){
          $log.debug(file.name);
          $scope.newFile = file;
      },
      'success' : function(file, xhr){
          $log.debug('Upload success: ', xhr);
          if(vm.images.indexOf(xhr.id) < 0) { //Not duplicate
            vm.images.push(xhr.id);
            vm.updateProperty();
          }
      },
      'uploadprogress' : function(file, progress, bytesSent){
          $log.debug(progress);
      },
      'error' : function(file, errorMessage) {
          $log.debug('File upload error: ', errorMessage);
      },
      'thumbnail' : function(file, dataUrl) {
          $log.debug('Upload thumbnail: ', dataUrl);
      }
  };

  $scope.dzMethods = {};
  $scope.removeNewFile = function(){
      $scope.dzMethods.removeFile($scope.newFile); //We got $scope.newFile from 'addedfile' event callback
  };

  vm.viewProperty = function(property) {
        //$log.debug('viewProperty', property);
        $scope.propertyService.get({_id: property}).then(function(prop) {
          $log.debug('propertyService.get({_id: ' + property + '})', prop);
          vm.property = prop;
          vm.languagesSelected = vm.property.languages;

          vm.amenitiesSelected  = vm.property.amenities;
          vm.amenitiesAvailable = _.difference(vm.amenities, vm.amenitiesSelected);

          vm.images             = vm.property.images;
          vm.defaultImage       = vm.property.defaultImage;

          vm.loocation          = vm.property.location;
        });
  };

  vm.updateProperty = function() {
    //$log.debug('viewProperty', property);
    $scope.propertyService.update(vm.property._id, vm.property).then(function(prop) {
      $log.debug('propertyService.update({_id: ' + prop._id + '})', prop);
    });
    $scope.safeApply();
  };

  $scope.toggle = function (item, list) {
    var idx = list.indexOf(item);
    if (idx > -1) {
      list.splice(idx, 1);
    }
    else {
      list.push(item);
    }
  };

  $scope.exists = function (item, list) {
    return list.indexOf(item) > -1;
  };

  vm.viewProperty($stateParams.propertyId);

  $scope.$watch(function(scope) {return vm.property}, function(value) {console.log('$WATCH ', value)}, true);
}
