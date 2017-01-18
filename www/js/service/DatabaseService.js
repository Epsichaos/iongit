angular.module('db.service', ['ngCordova'])
  .factory('DatabaseService', function ($cordovaSQLite, $q) {

    var db = null;

    var getDB = function () {
      return db;
    };

    var createTable = function ($cordovaSQLite) {
      console.log('create table');
      db = $cordovaSQLite.openDB({name: 'dev.iongit.db', location: 'default'});
      $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS iongit_user (id integer primary key, userToken text)");
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

    var getUserToken = function() {
      console.log('get user token');
      $cordovaSQLite.execute(db, "GET * FROM iongit_user WHERE id=0").then(function (res) {
        return {
          id: res.id,
          userToken: res.userToken
        };
      }, function () {
        return {};
      });
    };

    var removeUserToken = function () {
      console.log('remove user token');
      var deferred = $q.defer();
      $cordovaSQLite.execute(db, "REMOVE * FROM iongit_user").then(function () {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
      return deferred.promise;
    };

    var saveUserToken = function (token) {
      console.log('save user token');
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
      getUserToken: getUserToken,
      removeUserToken: removeUserToken,
      saveUserToken: saveUserToken
    };
  });
