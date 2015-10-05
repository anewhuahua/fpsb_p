angular.module('notify.service',['main.service'])
.factory('Notify', function($rootScope, $state, $timeout, Main) {
  return {
    send: function(msg, data) {
      //$state.go('main.my');
      if(msg == 'AddBooking') {
      	$rootScope.$broadcast(msg, data);
      	//$state.go('main.my');
      	//$rootScope.
      	//console.log(msg);
      }
    },

    notify: function(msg) {
      if (msg == 'booking') {
        if (Main.getRole() == 'Customer') {
          $state.go('main.my');
          $timeout(function() { 
            $rootScope.$broadcast('ChangeWindow', {win:'bookings'});
          }, 500); 
        } else if (Main.getRole() == 'Consultant') {
          
        }
      }
      else {

      }
      
    }
  }
});