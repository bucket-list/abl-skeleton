function UnitDetailsController ($scope, $state, $stateParams, config, $log, properties, units, _) {
  var vm = this;
  vm.unit         = {};

  vm.getNumber = function(count){

    var ratings = []; 

    for (var i = 0; i < count; i++) { 
      ratings.push(i) 
    } 

    return ratings;
  }

  //Details
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

  vm.getPin = function() {
    
  }
  // Photos
  vm.images = [];
  vm.defaultImage = '';

  vm.setDefaultImage = function(image) {
      vm.defaultImage = image;
      vm.unit.defaultImage = image;
      $log.debug('Default image set to ', image);
      vm.updateUnit();
  };

  vm.isDefaultImage = function(image) {
    return vm.defaultImage === image;
  };

  vm.deleteImage = function(image) {
    _.pull(vm.images, image);
    vm.updateUnit();
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
            vm.updateUnit();
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

  vm.viewUnit = function(unit) {
        //$log.debug('viewUnit', unit);
        $scope.unitService.get({_id: unit}).then(function(prop) {
          $log.debug('unitService.get({_id: ' + unit + '})', prop);
          vm.unit = prop;
          // vm.languagesSelected = vm.unit.languages;

          vm.amenitiesSelected  = vm.unit.amenities;
          vm.amenitiesAvailable = _.difference(vm.amenities, vm.amenitiesSelected);

          vm.images             = vm.unit.images;
          // vm.defaultImage       = vm.unit.defaultImage;

        });
  };

  vm.updateUnit = function() {
    //$log.debug('viewUnit', unit);
    $scope.unitService.update(vm.unit._id, vm.unit).then(function(prop) {
      $log.debug('unitService.update({_id: ' + prop._id + '})', prop);
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

  vm.viewUnit($stateParams.unitId);
}
