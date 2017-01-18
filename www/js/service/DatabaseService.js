angular.module('db.service', ['ngCordova'])
  .factory('DatabaseService', function ($cordovaSQLite, $q) {

    var db = null;

    var getDB = function () {
      return db;
    };

    var dropTable = function () {
      var deferred = $q.defer();
      $cordovaSQLite.execute(db, "DROP TABLE iongit_user").then(function () {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
      return deferred.promise
    };

    var createTable = function () {
      db = $cordovaSQLite.openDB({name: 'dev.iongit.db', location: 'default'});
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS iongit_user (id integer primary key, userToken text)");
    };

    var removeUserToken = function () {
      var deferred = $q.defer();
      $cordovaSQLite.execute(db, "REMOVE * FROM iongit_user").then(function () {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
      return deferred.promise;
    };

    var saveUserToken = function (token) {
      var deferred = $q.defer();
      removeUserToken().then(function () {
        var query = "INSERT INTO iongit_user (id, soundName) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [0, token]).then(function () {
          deferred.resolve();
        }, function () {
          deferred.resolve();
        });
      }, function () {
        deferred.reject();
      });
      return deferred.promise;
    };

    return {
      getDB: getDB,
      dropTable: dropTable,
      createTable: createTable,
      removeUserToken: removeUserToken,
      saveUserToken: saveUserToken
    };
  });
