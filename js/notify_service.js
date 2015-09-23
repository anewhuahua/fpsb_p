angular.module('notify.service',[])
.factory('Notify', function($rootScope, $state) {
  return {
    send: function(msg, data) {
      //$state.go('main.my');
      if(msg=='AddBooking') {
      	$rootScope.$broadcast(msg, data);
      	//$state.go('main.my');
      	//$rootScope.
      	//console.log(msg);
      }

    }
  }
});