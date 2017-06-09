var app = angular.module("baseApp", [])

.factory("appData", function(){
  
  var database = [{
    name: "George",
    age: "54",
    car: "Mercedes-Benz",
    model: "W140",
    number: "BC4354IE",
    year: "1997",
    vin: "WDB1400321A214611"
  }, {
    name: "Ali",
    age: "34",
    car: "BMW",
    model: "E34",
    number: "AB3656AI",
    year: "1993",
    vin: "WBAHD61080GK62507"
  }, {
    name: "Marta",
    age: "27",
    car: "Mazda",
    model: "RX-8",
    number: "BB1216AC",
    year: "2008",
    vin: "JMZSE173640100875"
  }, {
    name: "Leonid",
    age: "42",
    car: "VAZ",
    model: "2105",
    number: "AI3459II",
    year: "1986",
    vin: "XTA210530S1555425"
  }, {
    name: "Tao",
    age: "39",
    car: "Toyota",
    model: "Prius",
    number: "BX4023BB",
    year: "2010",
    vin: "JMZSE1730S1555425"
  }];

  
  var appState = {
    detalization: false,
    addMenu: false,
    current: null
  };



  var toggleAdd = function() {
            appState.addMenu = !appState.addMenu;
          };

  var toggleDetail = function() {
            appState.detalization = !appState.detalization;
          };

  var openDetail = function(user){
            appState.current = user;
            toggleDetail();
          };


  return {
    data: database,
    appState: appState,
    toggleAdd: toggleAdd,
    toggleDetail: toggleDetail,
    openDetail: openDetail
  }

})


.component("mainApp", {
    restrict: 'E',
    template: `<div class="page-header">
               <h1>Angular homework step 3</h1>
               </div>
  
               <main-menu 
                    ng-if="!vm.appState.detalization && !vm.appState.addMenu"
                    database="vm.database"
                    
                    toggle-detail="vm.toggleDetail()"
                    open-detail="vm.openDetail()"></main-menu>
               
               <add-user-menu 
                    ng-if="vm.appState.addMenu"></add-user-menu>

               <user-detalization 
                    ng-if="vm.appState.detalization" 
                    toggle-detail="vm.toggleDetail()"></user-detalization>`,

    
    controllerAs: "vm",
    
    controller: function(appData){
      
          this.database = appData.data;
      
          this.appState = appData.appState;

    }

})

.component("mainMenu", {
  restrict: 'E',
  template: `
            <nav-panel 
                  order="vm.order"
                  search="vm.search"></nav-panel>
            <user-list 
                database="vm.database"
                order="vm.order"
                search="vm.search"></user-list>`,

  controllerAs: "vm",

  controller: function(){
    this.order = "";
    this.search = "";
  },


  bindings: {
    database: "=",
    
    toggleDetail: "&",
    openDetail: "&"
  }
})

.component("navPanel",{
  restrict: 'E',

  template: `
  
  <div class="panel panel-default">
      <form class="panel-body form-inline text-right">

        <label for="search">Search: </label>
        <input type="text" class="form-control input-sm" id="search" 
        ng-model="vm.search">

        <label for="sort">Sort: </label>
        <select class="form-control input-sm" id="sort" 
        ng-model="vm.order">

          <option value="">As is</option>
          <option value="-">Reverse</option>
          <option value="name">Name</option>
          <option value="car">Car</option>
        </select>

        <button class="btn btn-info btn-sm" 
        ng-click="vm.toggleAdd()">Add new card</button>
      </form>
  </div>
            `,
  controllerAs: "vm",
  
  controller: function(appData){
      this.toggleAdd = function(){
      appData.toggleAdd();}
  },
  
  bindings: {
    order: "=",
    search: "="
  }
})

.component("userList", {
  restrict: 'E',
  template: `
    <table class="table table-striped">
      <tr ng-repeat="item in vm.database | orderBy: vm.order | filter : vm.search">
        
        <td>
          <h4 class="text-primary">{{$index+1}}</h4>
        </td>
        
        <td>
          <user-smart-data 
              user="item"
              open-detail="vm.openDetail(data)"></user-smart-data>
        </td>
      
      </tr>
    </table>
            `,
  controllerAs: "vm",
  
  bindings: {
    database: "=",
    openDetail: "&",
    order: "<",
    search: "<"
  }
})

.component("userSmartData", {

    restrict: 'E',
    transclude: true,
    
    template: `<p>Name: <editable-user-name 
                                  class="text-primary" 
                                  user="vm.user" 
                                  q-edit="vm.qEdit" 
                                  quick-edit="vm.quickEdit()"></editable-user-name></p>          
               <p>Reg. number: <span class="text-primary">{{vm.user.number}}</span></p>
               <p>Car: <span class="text-primary">{{vm.user.car}}</span></p>
               <smart-data-controls 
                  user="vm.user" 
                  q-edit="vm.qEdit" 
                  quick-edit="vm.quickEdit()"></smart-data-controls>`,

    controllerAs: "vm",

    controller: function(appData){
      

      this.qEdit = false;
      this.quickEdit = function() {
          this.qEdit = !this.qEdit;
          };
    },

    bindings: {
      user: "=",
      openDetail: "&"
    }

})

.component("editableUserName", {
  
    restrict: 'E',
    template: `<span 
                      ng-if="!vm.qEdit"
                      ng-dblclick="vm.quickEdit()">
              {{vm.user.name}}
              </span>
              <input type="text"
                      ng-if="vm.qEdit"
                      ng-model="vm.user.name"
                      ng-keydown="$event.keyCode === 13 && vm.quickEdit()">`,

    controllerAs: "vm",

    controller: function(appData){
      
    },

    bindings: {
      user: "=",
      qEdit: "=",
      quickEdit: "&"
    }
})

.component("smartDataControls", {

    restrict: 'E',
    template: `
          <button class="btn btn-default" 
          ng-click="vm.openDetail(vm.user)">Open</button>
          
          <button class="btn btn-default"
          ng-click="vm.quickEdit()">
          {{ (!vm.qEdit) ? "Quick edit" : "Finish edit"}}
          </button>`,

    controllerAs: "vm",


    controller: function(appData){
      this.openDetail = function(user){
        appData.openDetail(user);
      }
      
    },

    bindings: {
      user: "=",
      qEdit: "=",
      quickEdit: "&",
    }
})

.component("addUserMenu", {
  restrict: 'E',
  template: `
  <form>

    <div class="panel panel-primary">

      <div class="panel-heading">
        <h3 class="panel-title">Add new driver card:</h3>
      </div>

      <div class="panel-body">
      
        <label for="driver-name">Driver name: </label>
        <input type="text" class="form-control" id="driver-name" ng-model="vm.newData.name">
        <label for="driver-age">Driver age: </label>
        <input type="text" class="form-control" id="driver-age" ng-model="vm.newData.age">
        <label for="car-brand">Car brand: </label>
        <input type="text" class="form-control" id="car-brand" ng-model="vm.newData.car">
        <label for="car-model">Car model: </label>
        <input type="text" class="form-control" id="car-model" ng-model="vm.newData.model">
        <label for="car-number">Registration number: </label>
        <input type="text" class="form-control" id="car-number" ng-model="vm.newData.number">
        <label for="car-year">Year of manufacture: </label>
        <input type="text" class="form-control" id="car-year" ng-model="vm.newData.year">
        <label for="car-vin">VIN: </label>
        <input type="text" class="form-control" id="car-vin" ng-model="vm.newData.vin">
        <br>

        <div class="text-center">
          <button class="btn btn-success" ng-click="vm.addToDB(); vm.toggleAdd()">Save</button>
          <button class="btn btn-danger" ng-click="vm.toggleAdd()">Close</button>
        </div>
      </div>

    </div>

  </form>
  `,

  controllerAs: "vm",
  
  controller: function(appData){
    this.appState = appData.appState;

    this.database = appData.data;
    
    this.toggleAdd = function(){
      appData.toggleAdd();}

    this.addToDB = function() {
            var tmp = Object.assign({}, this.newData);
            this.database.push(tmp);
            this.newData = null;
          }

  }
})

.component("userDetalization", {
  restrict: 'E',
  template: `<div class="panel panel-info">

    <div class="panel-heading">
      <h2 class="panel-title">Detalization:</h2>
    </div>

    <div class="panel-body">
      <table class="table table-striped">
        <tr>
          <td>Name: </td>
          <td>{{vm.appState.current.name}}</td>
        </tr>

        <tr>
          <td>Age: </td>
          <td>{{vm.appState.current.age}}</td>
        </tr>

        <tr>
          <td>Car: </td>
          <td>{{vm.appState.current.car}}</td>
        </tr>

        <tr>
          <td>Model: </td>
          <td>{{vm.appState.current.model}}</td>
        </tr>

        <tr>
          <td>Registration number: </td>
          <td>{{vm.appState.current.number}}</td>
        </tr>

        <tr>
          <td>Year of manufacture: </td>
          <td>{{vm.appState.current.year}}</td>
        </tr>

        <tr>
          <td>VIN: </td>
          <td>{{vm.appState.current.vin}}</td>
        </tr>
      </table>

      <div class="text-center">
        <button class="btn btn-danger" ng-click="vm.toggleDetail()">Close</button>
      </div>

    </div>

  </div>`,

  controllerAs: "vm",
  
  controller: function(appData){
    this.toggleDetail = function(){
      appData.toggleDetail();
    };
    this.appState = appData.appState;

  },
  

});