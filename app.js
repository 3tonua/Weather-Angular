var app = angular.module('weather', ['ui.bootstrap']);

app.controller('WeatherController', function ($scope, API) {

    $scope.searchCity = function () {
        API.searchCity($scope.searchSetting).then(function (searchs) {
            $scope.search = searchs;
            console.log(searchs);
        });
        API.getForecastWeather($scope.searchSetting).then(function (forecasts) {
            $scope.forecasts = forecasts;
            console.log(forecasts);
        });
    };

    $scope.searchSetting = {
        query: null
    };

    $scope.current = [];
    $scope.forecasts = [];
    $scope.searchs = [];

});

app.service('API', function ($http, $q) {
    return{
        getForecastWeather: function (params) {
            var key = 'ad5d39cc015543028f6203619161811';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/forecast.json',
                params: {
                    part: "snippet",
                    key: key,
                    q: params.query,
                    days: 5
                }
            }).then(function (data) {
                console.log(data.data.forecast);
                console.log(params.query);
                d.resolve(data)
            });
            return d.promise
        },
        searchCity: function (params) {
            var key = 'ad5d39cc015543028f6203619161811';
            var d = $q.defer();
            $http({
                method: 'GET',
                url: 'http://api.apixu.com/v1/search.json',
                params: {
                    key : key,
                    q: params.query
                }
            }).then(function (data) {
                var search = data.data[0];
                d.resolve(search);
                console.log(search);
                console.log(params.query)
            });
            return d.promise;
        }
    }
});

