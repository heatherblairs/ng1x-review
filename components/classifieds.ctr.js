(function(){
  "use strict";
  angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog){

      var vm = this;

      vm.categories;
      vm.classified;
      vm.classifieds;
      vm.closeSidebar = closeSidebar;
      vm.deleteClassified = deleteClassified;
      vm.editing;
      vm.editClassified = editClassified;
      vm.openSidebar = openSidebar;
      vm.saveClassified = saveClassified;
      vm.saveEdit = saveEdit;

      classifiedsFactory.getClassifieds().then(function(classifieds) {
        vm.classifieds = classifieds.data;
        vm.categories = getCategories(vm.classifieds);
      })

      var contact = {
        name: "Heather",
        phone: "",
        email: "hello@hello.com"
      }

      function openSidebar() {
        $mdSidenav('left').open();
      }
      function closeSidebar() {
        $mdSidenav('left').close();
      }
      function saveClassified(classified) {
        if(classified) {
          classified.contact = contact;
          vm.classifieds.push(classified);
          vm.classified = {};
          closeSidebar();
          showToast("classified saved");
        }
      }
      function editClassified(classified) {
        vm.editing = true;
        openSidebar();
        vm.classified = classified;
      }
      function saveEdit() {
        vm.editing = false;
        vm.classified = {};
        closeSidebar();
        showToast("edit saved");
      }
      function deleteClassified(event, classified) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete ' + classified.title + '?')
          .ok('Yes')
          .cancel('No')
          .targetEvent(event);
        $mdDialog.show(confirm).then(function() {
          var index = vm.classifieds.indexOf(classified);
          vm.classifieds.splice(index, 1)
        }, function() {

        })
      }

      function showToast(message) {
        $mdToast.show(
          $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
        )
      }
      function getCategories(classifieds) {
        var categories = [];
        angular.forEach(classifieds, function(item){
          angular.forEach(item.categories, function(category){
            categories.push(category);
          });
        });
        return _.uniq(categories);
      }
    });
})();
