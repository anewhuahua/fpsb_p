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
.controller('mainShenghuaCtrl',function($scope) {
  
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

.controller('commonCtrl', function($scope, $stateParams, $ionicHistory, Notify) {
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
    //$scope.data.warning.words = '';
    if ($scope.data.warning.words.indexOf('您的预约已成功提交')>=0) {
      Notify.notify('booking');
    } else if ($scope.data.warning.words.indexOf('您的订单已成功提交')>=0) {
      Notify.notify('order');
    } else {

    }
    
  };
  $scope.closePopup = function() {
    $scope.data.popup = '';
  }
})

.controller('commonProductCtrl', function($scope,$ionicHistory, $stateParams, $state, Main) {
  $scope.pid = $stateParams.productID;
  //console.log(pid);
  //console.log('dsafsa');
  // console.log($stateParams.fromParams);

  $scope.goBack = function() {
    //console.log('sdafsag');
    //console.log($backView);
    $backView = $ionicHistory.backView();
    console.log($backView);
    $backView.go();
  }


})

.controller('commonProduct1Ctrl', function($scope,$ionicHistory, $stateParams, $state, Main) {
  $scope.pid = $stateParams.productID;
  console.log('tysontysontysontyson');
  //console.log('dsafsa');
  // console.log($stateParams.fromParams);

  $scope.goBack = function() {
    //console.log('sdafsag');
    //console.log($backView);
    $backView = $ionicHistory.backView();
    console.log($backView);
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

        //Notify.notify('booking');
        //$scope.$broadcast("AddBooking", data);
      }, function(error){
        $scope.data.warning.status = 'fail';
        $scope.data.warning.words = error;
        
      }, function(){
      });
      //Notify.notify('booking');

  }

  $scope.addOrder = function(quantity) {
      // todo quantity
      Main.customer.submitOrder(pid, quantity, function(data){
        $scope.data.warning.status = 'success';
        $scope.data.warning.words = '您的订单已成功提交!' +
                                     '您的理财师将马上与您联系进行后续服务，请保持电话通畅!';
        //$scope.$broadcast("AddOrder", data);
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

 // $rootScope.tyson='tyson';

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



.controller('bookingDetailCtrl', function($scope, $stateParams, $state, Main) {
  
  var bid = $stateParams.bookingId;
  console.log(bid);
  $scope.booking = Main.consultant.getBooking(bid);
  console.log($scope.booking);

  $scope.goBack = function() {
    $state.go('main.my');
  }
  $scope.goProduct1 = function(pid){
    //console.log(pid+'tyson');
    $state.go('common.product1', {productID: pid});
  }
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

  $scope.goProduct = function(pid){
    //console.log(pid+'tyson');
    $state.go('common.product', {productID: pid});
  }
  $scope.goProducts = function(cid){
    //console.log(pid+'tyson');
    $state.go('main.products', {categoryID: cid});
  }

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






.controller('mainConsultantCtrl', function($scope, $state, $timeout, $cordovaCamera, $ionicSideMenuDelegate, MultipleViewsManager, Main) {

//** common function
  var refreshData = function() {
    Main.consultant.queryBookings({}, function(data){
      //console.log(data);
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
    information: {},
    orders: {}
  };
//**



//** initialize
  //$scope.consultant.pendings.bookings = Main.consultant.getBookings();
  $scope.consultant.information.profile = {
    touxiang: "teImg/ghnr1lef.png" 
  };
  $scope.consultant.pendings.win = 'bookings';
  $scope.consultant.information.win = 'profile';
  $scope.consultant.bookings.data = Main.consultant.getBookings();

  //$scope.consultant.orders.data = Main.customer.getOrders();

   refreshData();

//**
//** 下拉刷新
  $scope.doRefresh = function() {
    refreshData();
    //console.log(Main.consultant.getBookings());
    //console.log('tyson');
    console.log($scope.consultant.bookings.data);

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
  $scope.goBooking = function(bid){
    $state.go('common.booking_detail', {bookingId: bid});
  }


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
    Main.customer.queryOrders({state:'initiated'}, function(data){
    }, function(status){}, function(){});
    Main.customer.queryOrders({state:'paid'}, function(data){
    }, function(status){}, function(){});
    Main.customer.queryOrders({state:'running'}, function(data){
    }, function(status){}, function(){});
    Main.customer.queryOrders({state:'completed'}, function(data){
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
  $scope.customer.orders.img = {
    //all: 'teImg/gnr2rabm11a.png',
    initiated: 'teImg/gnr2rabm1.png',
    paid: 'teImg/gnr2rabm2.png',
    running: 'teImg/gnr2rabm3.png',
    completed: 'teImg/gnr2rabm4.png',
  };
  $scope.customer.orders.title = {
    //all: 'teImg/gnr2rabm11a.png',
    initiated: '未付款',
    paid: '已付款',
    running: '待审核',
    completed: '完成投资',
  };

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

  $rootScope.$on('ChangeWindow', function(event, args){
        // args is the search results
        // from the searchService
      //console.log(args);
      $scope.customer.win = args.win;
      //console.log('tyson');
  });

  $scope.goProduct1 = function(pid){
    //console.log(pid+'tyson');
    $state.go('common.product1', {productID: pid});
  }

  //console.log($rootScope.tyson);


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











