angular.module('db.service', ['ngCordova'])
  .factory('DatabaseService', function ($cordovaSQLite, $q) {

    var db = null;

    var getDB = function () {
      return db;
    };

    var createDB = function () {
      var deferred = $q.defer();
      console.log('create db');
      db = $cordovaSQLite.openDB({name: 'dev.iongit.db', location: 'default'});
      deferred.resolve();
      return deferred.promise;
    };

    var createTable = function () {
      var deferred = $q.defer();
      console.log('create table');
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS iongit_user (id integer primary key, userToken text)").then(function (success) {
        deferred.resolve(success);
      }, function (error) {
        deferred.reject(error)
      });
      return deferred.promise;
    };


    var dropTable = function () {
      var deferred = $q.defer();
      $cordovaSQLite.execute(db, "DROP TABLE iongit_user").then(function () {
        deferred.resolve();
      }, function () {
        deferred.reject();
      });
      return deferred.promise
    };

    var getUserToken = function () {
      console.log('get user token');
      var query = "SELECT * FROM iongit_user WHERE id=?";
      $cordovaSQLite.execute(db, query, [0]).then(function (res) {
        return res;
      }, function () {
        return {};
      });
    };

    var removeUserToken = function () {
      console.log('remove user token');
      var deferred = $q.defer();
      $cordovaSQLite.execute(db, "DELETE FROM iongit_user").then(function () {
        deferred.resolve();
      }, function () {
        deferred.reject();
      });
      return deferred.promise;
    };

    var saveUserToken = function (token) {
      var deferred = $q.defer();
      removeUserToken().then(function () {
        var query = "INSERT INTO iongit_user (id, userToken) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [0, token]).then(function (res) {
          console.log("INSERTED");
          deferred.resolve(res);
        }, function (error) {
          deferred.reject(error);
        });
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };

    return {
      getDB: getDB,
      createDB: createDB,
      createTable: createTable,
      dropTable: dropTable,
      getUserToken: getUserToken,
      removeUserToken: removeUserToken,
      saveUserToken: saveUserToken
    };
  });
