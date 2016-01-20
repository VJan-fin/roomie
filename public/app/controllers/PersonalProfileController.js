/**
 * Created by Viktor on 19.01.2016.
 */

roomie.controller('PersonalProfileController',
    ['$scope', '$http', '$rootScope', '$filter', 'ProfileService',

        function($scope, $http, $rootScope, $filter, ProfileService)
        {
            $scope.profile = {};

            $scope.sexes = [
                {value: 'Male', text: 'Male'},
                {value: 'Female', text: 'Female'}
            ];

            /**
             * Necessary to properly show the editable select drop-down
             */
            $scope.showGender = function(profile) {
                var selected = [];
                if(profile.gender) {
                    selected = $filter('filter')($scope.sexes, {value: profile.gender});
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            $scope.init = function() {
                $scope.getMyProfile();
            };

            $scope.getMyProfile = function() {

                if(!$rootScope.currentUser)
                    return;

                $scope.loading = true;

                ProfileService.getMyPersonalProfile().success(function (data) {
                    $scope.loading = false;
                    $scope.profile = data;
                    console.log(data);
                }).error(function (data) {
                    console.log(data);
                    $scope.loading = false;
                })
            };

            $scope.init();

        }

    ]);