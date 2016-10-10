(function () {
'use strict';

angular.module('MenuApp')
.component('menuCategories', {
  templateUrl: 'src/menuapp/templates/menucategories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
