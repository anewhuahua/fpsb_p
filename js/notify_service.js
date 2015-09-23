angular.module('notify.service',[])
.factory('Notify', function($rootScope, $state) {
  return {
    send: function(msg, data) {
      //$state.go('main.my');
      $rootScope.$broadcast(msg, data);
      console.log(msg);

    }
  }
});