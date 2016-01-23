/**
 * Created by Viktor on 20.01.2016.
 */

roomie.controller('RoommateProfileController',
    ['$scope', '$http', '$rootScope', '$filter', 'ProfileService',

        function($scope, $http, $rootScope, $filter, ProfileService)
        {
            $scope.profile = {};
            $scope.maxValue = 5;

            $scope.datePicker = {
                isOpen: false,
                minDate: new Date()
            };

            $scope.openPopUp = function() {
                $scope.datePicker.isOpen = true;
            };

            //$scope.disabled = function(date, mode) {
            //    return ( mode === 'day' && ( date.getDay() < new Date() ) );
            //};

            //$scope.toggleMin = function() {
            //    $scope.minDate = $scope.minDate ? null : new Date();
            //};
            //$scope.toggleMin();

            $scope.goals = [
                {value: 'Just a roommate', text: 'Just a roommate'},
                {value: 'Roommate with an apartment', text: 'Roommate with an apartment'},
                {value: 'Just a room', text: 'Just a room'},
                {value: 'Anything', text: 'Anything'}
            ];

            /**
             * Necessary to properly show the editable select drop-down
             */
            $scope.showGoal = function(profile) {
                var selected = [];
                if(profile.looking_for) {
                    selected = $filter('filter')($scope.goals, {value: profile.looking_for});
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

                ProfileService.getMyRoommateProfile().success(function (data) {
                    $scope.loading = false;
                    $scope.profile = data;
                    $scope.profile.move_in_from = new Date($scope.profile.move_in_from);
                    console.log(data);
                }).error(function (data) {
                    console.log(data);
                    $scope.loading = false;
                })
            };

            /**
             * Getting the profiles of the logged in user
             * as soon as the page is loaded
             */
            $scope.init();

        }

    ]);