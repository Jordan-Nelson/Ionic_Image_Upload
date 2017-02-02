// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('MyCtrl', function($scope) {

  /* configure AWS */
  var albumBucketName = 'sample.img.upload';
  AWS.config.update({
    region: 'us-west-2',
    accessKeyId: "AKIAJMAGOJ35QGXPNGAA", 
    secretAccessKey: "Y0FNcEPxLhrH1FxFYUvsPRZT3CTkNVmNWR1hISzQ"
  });

  var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {Bucket: albumBucketName}
  });

  $scope.listFiles = function() {
    var params = {
      Bucket: albumBucketName
    };
    s3.listObjects(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        $scope.files = data;
      }    

    });
  }
  $scope.files = {};
  $scope.listFiles()

  $scope.upload = function() {
    var file = document.getElementById('file').files[0];
    var key = Math.floor(Math.random() * (999999999 - 100000000)) + 100000000;
    var params = {Bucket: albumBucketName, Key: key.toString(), Body: file};
    s3.upload(params, function(err, data) {
      console.log(err, data);
    });
    $scope.listFiles()
  }

})
