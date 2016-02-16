// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ionicMultipleViews', 'starter.controllers', 
                           'rest.service', 'storage.service', 'factory.service', 
                           'notify.service', 'main.service'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleLightContent();
    }

    ionic.Platform.fullScreen();

    window.plugins.jPushPlugin.init();
    window.plugins.jPushPlugin.setDebugMode(true); 
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
    
    
    //window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);


  });
})
.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
/*
  $stateProvider
  .state('product', {
    url: '/product',
    views: {生化
      'product-detail': {
         templateUrl: 'templates/product.html',
         controller: 'productDetailCtrl'
      }
    }
  });*/

  $stateProvider
  
  // main
  .state('main', {
    url: '/main',
    abstract: true,
    templateUrl: 'templates/main.html',
    controller: 'mainCtrl'
  })


  .state('main.index', {
    url: '/index',
    views: {
        'main-index': {
        templateUrl: 'templates/main/index.html',
        controller: 'mainIndexCtrl'
      }
    }
  })

  .state('main.products', {
    url: '/products/categories/:categoryID',
    views: {
      'main-products': {
         templateUrl: 'templates/main/products.html',
         controller: 'mainProductsCtrl'
      },
    }
  })

  .state('main.shenghua',{
    url:'/shenghua',
    views:{
      'main-shenghua':{
        templateUrl:'templates/exam/shenghua.html',
        controller:'mainsShenghuaCtrl'
      }
    }
  })


  .state('main.guest', {
    url: '/guest',
    views: {
        'main-guest': {
        templateUrl: 'templates/main/guest.html',
        controller: 'mainGuestCtrl'
      }
    }
  })

  .state('main.my', {
    url: '/my',
    views: {
  

      'main-my-toolbox': {
         templateUrl: 'templates/main/my_toolbox.html',
         controller: 'mainCustomerCtrl'
      }
    }
  })

  .state('main.toolbox', {
    url: '/toolbox',
    views: {


      'main-consultant-toolbox': {
         templateUrl: 'templates/main/consultant_toolbox.html',
         controller: 'mainConsultantCtrl'
      }
    }
  })



  // booking
  .state('common', {
    url: '/common',
    abstract: true,
    templateUrl: 'templates/common.html',
    controller: 'commonCtrl'
  })

  .state('common.register', {
    url: '/register',
    views: {
      'common-register': {
         templateUrl: 'templates/common/register.html',
         controller: 'commonRegisterCtrl'
      }
    }
  })

  .state('common.option', {
    url: '/product/option/booking/:productID',
    views: {
      'product-option': {
         templateUrl: 'templates/common/product_option.html',
         controller: 'commonProductOptionCtrl'
      }
    }
  })
  .state('common.option1', {
    url: '/product/option/order/:productID',
    views: {
      'product-option1': {
         templateUrl: 'templates/common/product_option1.html',
         controller: 'commonProductOptionCtrl'
      }
    }
  })

  .state('common.product', {
    url: '/product/detail/:productID',
    views: {
      'common-product': {
         templateUrl: 'templates/common/product.html',
         controller: 'commonProductCtrl'
      }
    }
  })

  .state('common.product1', {
    url: '/product1/detail/:productID',
    views: {
      'common-product1': {
         templateUrl: 'templates/common/product1.html',
         controller: 'commonProduct1Ctrl'
      }
    }
  })


  .state('common.order_detail', {
    url: '/order/detail/:orderId',
    views: {
      'order-detail': {
         templateUrl: 'templates/common/order_detail.html',
         controller: 'orderDetailCtrl'
      }
    }
  })
  .state('common.booking_detail', {
    url: '/booking/detail/:bookingId',
    views: {
      'booking-detail': {
         templateUrl: 'templates/common/booking_detail.html',
         controller: 'bookingDetailCtrl'
      }
    }
  })


    // exam
  .state('exam', {
    url: '/exam',
    abstract: true,
    templateUrl: 'templates/exam.html',
    controller: 'examCtrl'
  })

  .state('exam.customer', {
    url: '/customer',
    views: {
      'exam-menu': {
         templateUrl: 'templates/exam/exam_menu.html'
      },
      'exam-customer': {
         templateUrl: 'templates/exam/exam_customer.html',
         controller: 'examCustomerCtrl'
      }
    }
  });



  $urlRouterProvider.otherwise('/main/index');



});

