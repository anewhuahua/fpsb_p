angular.module('starter.controllers', [])


.controller('customersCtrl', function($scope, $ionicSideMenuDelegate,$timeout) {
  
  //$scope.$on('$ionicView.enter', function() {
     // Code you want executed every time view is opened
     //console.log('Opened!')

    // $ionicSideMenuDelegate.toggleRight();
  //})
  //$timeout(function (){
   
  //});
})


.controller('examCtrl', function($scope) {
  $scope.win = {
    result: false
  }
})
.controller('examCustomerCtrl', function($scope) {
  $scope.showResult = function() {
    $scope.win.result = true;
  }
})

.controller('commonCtrl', function($scope, $stateParams, $ionicHistory) {
  $scope.data = {
     warning: {
      status: '',
      words: ''
    },
    popup: '',
    photo: {
      order:''
    }
  };
  $scope.closeWarning = function(win) {
    $scope.data.warning.status='';
    $scope.data.warning.words = '';
  };
  $scope.closePopup = function() {
    $scope.data.popup = '';
  }
})

.controller('commonProductCtrl', function($scope,$ionicHistory, $stateParams, Main) {
  $scope.pid = $stateParams.productID;
  //console.log(pid);

  $scope.goBack = function() {
    //console.log('sdafsag');
    $backView = $ionicHistory.backView();
    $backView.go();
  }

})


.controller('commonProductOptionCtrl', function($scope,$rootScope,$ionicHistory, $stateParams, Main, Factory, Notify) {

  pid = $stateParams.productID;
  console.log(pid);

  $scope.option = Factory.newOption(10000, 60000, 10000);




  $scope.addBooking= function(quantity) {
      // todo quantity
      Main.customer.addBooking(pid, function(data){
        $scope.data.warning.status = 'success';
        $scope.data.warning.words = '您的预约已成功提交!' +
                                     '您的理财师将马上与您联系，请保持电话通畅!';

        Notify.send('AddBooking', 'aaa');
        //$scope.$broadcast("AddBooking", data);
      }, function(error){
        $scope.data.warning.status = 'fail';
        $scope.data.warning.words = error;
        
      }, function(){
      });
    

  }

  $scope.addOrder = function(quantity) {
      // todo quantity
      Main.customer.submitOrder(pid, function(data){
        $scope.data.warning.status = 'success';
        $scope.data.warning.words = '您的订单已成功提交!' +
                                     '您的理财师将马上与您联系进行后续服务，请保持电话通畅!';
        $scope.$broadcast("AddOrder", data);
      }, function(error){
        $scope.data.warning.status = 'fail';
        $scope.data.warning.words = error;
      }, function(){
      });
    
  }
  //console.log($scope.option);

  $scope.goBack = function() {
    //console.log('sdafsag');
    $backView = $ionicHistory.backView();
    $backView.go();
  }

  $rootScope.tyson='tyson';

})

.controller('commonRegisterCtrl', function($scope, $timeout, $state, $ionicHistory, Main) {


  $scope.auth = {
    register: {
      verifyWords : '发送验证码',
      askingVerify: false,
      username: '',
      password: '',
      password2: '',
      verifyCode: '',
      returnCode: ''
    },
    win: 'register_2'
  };

  $scope.$on('$ionicView.enter',function(){
    $scope.auth.win = 'register_2';
  }); 

  $scope.goBack = function() {
    $state.go("main.guest");
  }

  $scope.register_2 = function(username, code) {
    if(username == ''|| code == '') {
      $scope.data.warning.status = 'fail';
      $scope.data.warning.words = '请正确填写手机号和验证码';
    } else if(code == $scope.auth.register.returnCode) {
      $scope.auth.win = 'register_3';
    } else if (code != $scope.auth.register.returnCode) {
      $scope.data.warning.status = 'fail';
      $scope.data.warning.words = '验证码错误';
    } else {

    }
  }
  $scope.register_3 = function(name, pwd, pwd2, code){
   if(pwd == '') {
      $scope.data.warning.status = 'fail';
      $scope.data.warning.words = '请正确输入密码';
    } else if(pwd != pwd2) {
      $scope.data.warning.status = 'fail';
      $scope.data.warning.words = '两次密码输入不一致';
    } else {
      Main.register(name,pwd,code, function(res){
        $scope.data.warning.status = 'sucess';
        $scope.data.warning.words = '恭喜注册成功';
       
        
        setTimeout(function(){
          $state.go("main.guest");
        }, 500);

      }, function(res){
        $scope.data.warning.status = 'fail';
        $scope.data.warning.words = '注册失败';
      }, function(){
      });
    }
  }

  $scope.askVerifyCode = function(phone) {
    $scope.auth.register.askingVerify = true;
    console.log("ask");
    /*
    promise = $timeout(function(cnt){
      $timeout(
      $scope.user.verifyWords = cnt;
      cnt = cnt-1;
    }, 1000);*/

    //timeout
    var loopVerifyWords = function(cnt) 
    {
      promise = $timeout(function () { loopVerifyWords(cnt); }, 1000); 
      //console.log("timeout "+cnt);
      $scope.auth.register.verifyWords = cnt;
      if (cnt == 0) {
        $scope.auth.register.askingVerify = false;
        $scope.auth.register.verifyWords = "发送验证码";
        $timeout.cancel(promise);
      }     
      cnt = cnt-1;
      //$scope.$on('$ionicView.leave',function(){
      //  $scope.auth.register.askingVerify = false;
      //  $timeout.cancel(promise);
      //}); 
    }; 
    loopVerifyWords(30);

    Main.askVerifyCode(phone, function(code){
      $scope.auth.register.returnCode = code;
      //console.log("tyson"+$scope.verifyCode);
    }, function(){
      // todo
      $scope.data.warning.status = 'fail';
      $scope.data.warning.words = '请检查网络状况';
    }, function(){

    });
  }
})


.controller('bookingMenuCtrl', function($scope, $stateParams, $ionicHistory, $state) {

})
.controller('bookingDetailCtrl', function($scope, $stateParams, Main) {
  
  var bid = $stateParams.bookingId;
  $scope.booking = Main.consultant.getBooking(bid);
  //console.log($scope.booking);
})

.controller('orderDetailCtrl', function($scope, $stateParams, $state, $cordovaCamera, Main) {
  //console.log('124455');
  var oid = $stateParams.orderId;
  console.log(oid);

  $scope.data.win = 'detail';


  $scope.selectWin = function(item){
    console.log(item);
    $scope.data.win=item;
  }
  $scope.goBack = function() {
    //console.log('111');
    $state.go('main.my');
  }


  $scope.takePhoto=function(){
    var options = {  
      quality: 50,  
      destinationType: Camera.DestinationType.DATA_URL,  
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,  
      allowEdit: false,  
      encodingType: Camera.EncodingType.JPEG,  
      cameraDirection: 1,
      targetWidth: 800,  
      targetHeight: 1000,  
      popoverOptions: CameraPopoverOptions,  
      saveToPhotoAlbum: false  
    }
    //console.log("tyson");
    $cordovaCamera.getPicture(options).then(function(imageData) {
        //$scope.data.popup = 'photo';
        $scope.data.photo.order = "data:image/jpeg;base64," + imageData; 
        $scope.data.popup = 'photo';
        //image.src = "data:image/jpeg;base64," + imageData;  
      }, function(err) {  
        // error  
      });  
   }
  //$scope.booking = Main.consultant.getBooking(bid);
  //console.log($scope.booking);
})



.controller('mainCtrl', function($scope, $state, $window, $cordovaNetwork, $rootScope, $ionicHistory, $timeout, Main) {

   document.addEventListener("deviceready", function () {
        $scope.network = $cordovaNetwork.getNetwork();
        $scope.isOnline = $cordovaNetwork.isOnline();
        $scope.$apply();

        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
          /*
          window.plugins.jPushPlugin.init();
          window.plugins.jPushPlugin.setDebugMode(true); 
          console.log('11');
          window.plugins.jPushPlugin.getRegistrationID(function(data){
          try {
              console.log("JPushPlugin:registrationID is "+data)               
            } catch(exception) {
              console.log(exception);
            }
          });
          window.plugins.jPushPlugin.receiveMessageIniOSCallback = function(data) {
            console.log('tyson' + data);
          }

          broadCast  refresh
          */
            console.log("got online");
            $scope.isOnline = true;
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("got offline");
            $scope.isOnline = false;
            $scope.network = $cordovaNetwork.getNetwork();
            $scope.$apply();
        })
  }, false);

  $scope.data = {
    person: {},
    popup: '',
    warning: {
      status: '',
      words: ''
    },
    categories: [],
    toolbox:'index',
    looking_product: ''

  };

  Main.login({}, function(){ 
    }, function(){
    }, function(profile){
      $scope.data.person = profile;
      console.log($scope.data.person.role);
    });
  
 
  $scope.logout = function() {
    
    Main.logout(function(profile){ 
      $scope.data.person = profile;
      $window.location.reload();
      $state.go('main.index');
    });
  }

  $scope.closePopup = function(win) {
    if ($scope.data.popup == win) {
      $scope.data.popup = '';
    }
    if (win == 'login') {
      $ionicHistory.goBack();
    }
  }

  $scope.closeWarning = function(win) {
    $scope.data.warning.status='';
    $scope.data.warning.words = '';
  }



  $scope.logout = function() {
    
    Main.logout(function(profile){ 
      $scope.data.person = profile;
      $window.location.reload();
      $state.go('main.index');
    });
  }
 

})


.controller('mainIndexCtrl', function($scope, $cordovaCamera, Main) {

  //Rest.getProducts({type:'privatefunds'});
  //Rest.login('customer','password');
  $scope.data.categories = Main.getCategories();
})



.controller('mainGuestCtrl', function($scope, $window, $state, $ionicPopup, Main) {

 //$scope.verifyCode = "";
  $scope.auth = {
    
    login: {
      username:'',
      password:''
    }
  };


  $scope.login = function(username, password){
    // initialize
    Main.login({'username': username,'password': password}, function(){ 
        //登入成功
        $scope.data.warning.status='success';
        $scope.data.warning.words = '登入成功';
        
        
        $state.go('main.index');
        setTimeout(function(){
          $window.location.reload();
          $state.go('main.index');
        }, 500);
      

      }, function(){
        $scope.data.warning.status = 'fail';
        $scope.data.warning.words = '请检查用户名和密码';

   
  
        //登入失败
      }, function(profile){
        $scope.auth.login.username = '';
        $scope.auth.login.password = '';
        $scope.data.person = profile;

      });
  }


})




.controller('mainProductsCtrl', function($scope,$ionicPopover,$stateParams,$state, $ionicSideMenuDelegate, Main) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  $ionicPopover.fromTemplateUrl('filter-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverFilter = popover;
  });

  $ionicPopover.fromTemplateUrl('sort-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popoverSort = popover;
  });

  $scope.popFilter = function($event) {
    $scope.popoverFilter.show($event);
  };
  $scope.popSort = function($event) {
    $scope.popoverSort.show($event);
  };
  $scope.closePopFilter = function() {
    $scope.popoverFilter.hide();
  };
  $scope.closePopSort = function() {
    $scope.popoverSort.hide();
  };

  //Cleanup the popover when we're done with it!
  //$scope.$on('$destroy', function() {
  //  $scope.popover.remove();
  //});
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });



  $scope.data = {
    products:[],
    category:{},
    more:true
  };
  $scope.data.categories = Main.getCategories();
  $scope.selectedCategory = $stateParams.categoryID;

  var cid = $stateParams.categoryID;

  Main.getProducts({'cid':cid},
  function(cata){
    if (cata) {
      $scope.data.products=cata.products;
      $scope.data.category=cata;
    }
   
  }, function(){
 
  }, function(){

  });

  $scope.loadMore = function(){
    setTimeout(function(){
       Main.getProducts({'cid':cid, 'page':$scope.data.category.page+1}
      , function(cata){
        if(!cata) {
          $scope.data.more=false;
          return;
        }
        $scope.data.products=cata.products;
        $scope.data.category=cata;
      },function(status){
        console.log(status);
        if(status==0) {
          console.log('无网络连接');
          //$scope.data.more=false;
        }
      },function(){
        console.log("infinite scroll stop");
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
     }, 1000);
   
  }

  $scope.doRefresh = function() {
    setTimeout(function(){
      console.log('refresh');
     
      Main.getProducts({
        'cid':cid, 'page':1
        },function(cata){
          if(cata) {
            $scope.data.products=cata.products;
            $scope.data.category=cata;
          }
        },function(){

        },function(){
          console.log("refresh stop");
          $scope.$broadcast('scroll.refreshComplete');
           $scope.data.more=true;
        });
    }, 1000);
  }
  //Rest.getProducts({type:'privatefunds'});


})


.controller('ConsultantMenuCtrl', function($scope, $state, MultipleViewsManager){
  $scope.data = {
    selectedItem : "index"
  }
  $scope.selectItem = function(item) {
      MultipleViewsManager.updateView('main-consultant-toolbox', {msg: item});
      $scope.data.selectedItem = item;
  }
  $scope.showItem = function(item){
    var arr = $scope.data.selectedItem.split("-");
    return (arr[0] == item)
  }
  MultipleViewsManager.updatedLeft(function(params) {
    console.log(params);
    $scope.data.selectedItem = params.msg;
  });

})

.controller('mainConsultantCtrl', function($scope, $state, $timeout, $cordovaCamera, $ionicSideMenuDelegate, MultipleViewsManager, Main) {
  

//** common function
  var refreshData = function() {
    Main.consultant.queryBookings({}, function(data){
    }, function(status){}, function(){});
  }
//**

//** controller data
  $scope.consultant = {
    win: 'index',
    suffix: '',
    bookings: {},
    customers: {},
    pendings: {},
    information: {}
  };
//**

//** initialize
  $scope.consultant.pendings.bookings = Main.consultant.getBookings();
  $scope.consultant.information.profile = {
    touxiang: "teImg/ghnr1lef.png" 
  };
  $scope.consultant.pendings.win = 'bookings'
  $scope.consultant.information.win = 'profile'
  refreshData();

//**
//** 下拉刷新
  $scope.doRefresh = function() {
    refreshData();
    $scope.$broadcast('scroll.refreshComplete');
  };
//**
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.selectItem = function(item) {
      $scope.consultant.win = item;
  }
  $scope.selectPendings = function(item) {
    $scope.consultant.pendings.win = item;
  }
  $scope.selectInformation = function(item) {
    $scope.consultant.information.win = item;
  }


  MultipleViewsManager.updated(function(params) {
    var arr = params.msg.split("-");

    $scope.consultant.win = arr[0];
    $scope.consultant.suffix = '';
    for(var i=1;i<arr.length;i++) {
      $scope.consultant.suffix = $scope.consultant.suffix + '-' + arr[i];
    }
  });
  $scope.selectPage = function(item) {            
    MultipleViewsManager.updateViewLeft('main-consultant-toolbox', {msg: item});
    
    var arr = item.split("-");
    $scope.consultant.win = arr[0];
    $scope.consultant.suffix = '';
    for(var i=1;i<arr.length;i++) {
      $scope.consultant.suffix = $scope.consultant.suffix + '-' + arr[i];
    }
  }
  $scope.expand = function(item) {      
    //if(item)      
    MultipleViewsManager.updateViewLeft('main-consultant-toolbox', {msg: item});
    var arr = item.split("-");
    $scope.consultant.win = arr[0];
    $scope.consultant.suffix = '';
    for(var i=1;i<arr.length;i++) {
      $scope.consultant.suffix = $scope.consultant.suffix + '-' + arr[i];
    }
  };
  $scope.collapse = function(item) {
    var arr = item.split("-");
    $scope.consultant.win = arr[0];
    $scope.consultant.suffix= ''; 
    MultipleViewsManager.updateViewLeft('main-consultant-toolbox', {msg: arr[0]});
  };
  $scope.isExpand = function(item){
    return item == ($scope.consultant.win+$scope.consultant.suffix);
  };
  $scope.isCollapse = function(item){
    return !(item == ($scope.consultant.win+$scope.consultant.suffix));
  };


/*
  MultipleViewsManager.updated(function(params) {
    var arr = params.msg.split("-");
    $scope.consultant.win = arr[0];
    $scope.consultant.suffix = arr[1];
  });

  $scope.selectPage = function(item) {            
    MultipleViewsManager.updateViewLeft('main-consultant-toolbox', {msg: item});
    var arr = item.split("-");
    $scope.consultant.win = arr[0];
  };
  $scope.expand = function(item) {      
    //if(item)      
    MultipleViewsManager.updateViewLeft('main-consultant-toolbox', {msg: item});
    var arr = item.split("-");
    $scope.consultant.win = arr[0];
    $scope.consultant.suffix = arr[1]; 
  };
  $scope.collapse = function(item) {
    var arr = item.split("-");
    $scope.consultant.win = arr[0];
    $scope.consultant.suffix= 'none'; 
    MultipleViewsManager.updateViewLeft('main-consultant-toolbox', {msg: arr[0]});
  };
  $scope.isExpand = function(item){
    return item == ($scope.consultant.win+'-'+$scope.consultant.suffix);
  };
  $scope.isCollapse = function(item){
    return !(item == ($scope.consultant.win+'-'+$scope.consultant.suffix));
  };
  */
  $scope.takePhoto=function(){
    var options = {  
      quality: 50,  
      destinationType: Camera.DestinationType.DATA_URL,  
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,  
      allowEdit: false,  
      encodingType: Camera.EncodingType.JPEG,  
      cameraDirection: 1,
      targetWidth: 100,  
      targetHeight: 100,  
      popoverOptions: CameraPopoverOptions,  
      saveToPhotoAlbum: false  
    }
    //console.log("tyson");
    $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.consultant.information.profile.touxiang = "data:image/jpeg;base64," + imageData; 
        //image.src = "data:image/jpeg;base64," + imageData;  
      }, function(err) {  
        // error  
      });  
   }


})




.controller('mainCustomerCtrl', function($scope, $rootScope, $state, $ionicSideMenuDelegate, $timeout, $cordovaCamera, MultipleViewsManager, Main) {
  //** common function
  var refreshData = function() {
    Main.customer.queryBookings({}, function(data){
    }, function(status){}, function(){});
    Main.customer.queryOrders({}, function(data){
    }, function(status){}, function(){});
  }
  //**
  //** controller data
  $scope.customer = {
    win: 'index',
    suffix: '',
    //orders: 'orders',
    bookings: {

    },
    orders: {
      win: 'all'
    },
    information: {
      win: 'profile'
    },
    other: {}
  };
  //**
  //** initialize
  $scope.customer.bookings.data = Main.customer.getBookings();
  $scope.customer.orders.data = Main.customer.getOrders();
  $scope.customer.information.profile = {
    touxiang: "teImg/ghnr1lef.png" 
  };
  $scope.customer.other.promotion = {
    stuff: "teImg/ddztjh.png"
  };
  refreshData();
  //**

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.selectItem = function(item) {
      $scope.customer.win = item;
  }
  $scope.doRefresh = function() {
    refreshData();
    $scope.$broadcast('scroll.refreshComplete');
  }
  $scope.selectInformation = function(item) {
    $scope.customer.information.win = item
  }
  $scope.selectOrders = function(item) {
    $scope.customer.orders.win = item
  }

  $rootScope.$on('AddBooking', function(event, args){
        // args is the search results
        // from the searchService
      console.log(args);
      console.log('tyson');
  });

  console.log($rootScope.tyson);


  $scope.$on("AddOrder", function(event,msg) {
  // nothing to do now
  });


  $scope.takePhoto=function(param){
    var options = {  
      quality: 50,  
      destinationType: Camera.DestinationType.DATA_URL,  
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,  
      allowEdit: false,  
      encodingType: Camera.EncodingType.JPEG,  
      cameraDirection: 1,
      targetWidth: 100,  
      targetHeight: 100,  
      popoverOptions: CameraPopoverOptions,  
      saveToPhotoAlbum: false  
    }
    //console.log("tyson");
    $cordovaCamera.getPicture(options).then(function(imageData) {
        if(param == 'information') {
          $scope.customer.information.profile.touxiang = "data:image/jpeg;base64," + imageData; 
        } else if (param == 'promotion') {
          $scope.customer.other.promotion.stuff = "data:image/jpeg;base64," + imageData; 
        }
        //image.src = "data:image/jpeg;base64," + imageData;  
      }, function(err) {  
        // error  
      });  
   }

});











