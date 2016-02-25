// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import {remote} from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';

import fs from 'fs';

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

(function() {
    'use strict';

    angular.module('Home', [])
    .controller('HomeController', ['$scope', '$timeout', function($scope, $timeout){

        $scope.files = [];

        $scope.open = function() {
            var dialog = remote.dialog;
            dialog.showOpenDialog({
                properties: [
                    'openDirectory',
                    'multiSelections'
                ],
            }, function(data, err){
                if (data) {
                    var folder = data[0];
                    fs.readdir(folder, function(err, files){
                        if (!err) {
                            $timeout(function(){
                                $scope.files = files;
                            });
                        }
                    });
                }
            });
        };
    }]);

})();