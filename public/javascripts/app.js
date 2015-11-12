var app = window.angular.module('app', []).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://www.youtube.com/**'
  ]);
});

app.factory('movieFetcher', movieFetcher)
app.factory('userFetcher', userFetcher)
app.controller('mainCtrl', mainCtrl)

function movieFetcher ($http) {
  var API_ROOT = 'movies'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    }
  }
}

function userFetcher ($http) {
  var API_ROOT = 'user'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    }
  }
}

function mainCtrl ($scope, movieFetcher, userFetcher, $http) {
  $scope.movies = [];
  $scope.user = null;

  userFetcher.get().then(function (data) {
    $scope.user = data.username
  })

  movieFetcher.get().then(function (data) {
    $scope.movies = data;
    console.log(data);
  })

  $scope.addComment = function(comment, movie) {
    var newComment = {comment:comment, user:$scope.user, upvotes: 0};
    return $http.put("movies/" + movie._id + '/comment', newComment).success(function(data){
      movie.comments.push(data);
    });
  };

    $scope.vote = function(movie) {
      return $http.put("movies/" + movie._id + '/vote')
        .success(function(data){
          console.log("vote worked");
          movie.votes += 1;
        });
    };
    $scope.downVote = function(movie) {
      return $http.put("movies/" + movie._id + '/downVote')
        .success(function(data){
          console.log("vote worked");
          if (movie.votes > 0) {
            movie.votes -= 1
          }
          else {
            movie.votes = 0
          }
        });
    };
}
