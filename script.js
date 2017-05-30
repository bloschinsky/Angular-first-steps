var app = angular.module("baseApp", []);

app.controller("myCtrl", function() {

  this.database = [{
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

  this.qEdit = false;
  this.detalization = false;
  this.addMenu = false;

  this.quickEdit = function(item) {
    this.qEdit = !this.qEdit;
    this.current = item;
  };

  this.openDetail = function(item) {
    this.current = item;
    this.toggleDetail();
  };

  this.toggleDetail = function() {
    this.detalization = !this.detalization;
  }

  this.toggleAdd = function() {
    this.addMenu = !this.addMenu;
  }

  this.addToDB = function() {
    var tmp = Object.assign({}, this.newData);
    this.database.push(tmp);
    this.newData = null;
  }



});