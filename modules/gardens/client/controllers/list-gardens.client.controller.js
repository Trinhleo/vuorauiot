(function () {
	'use strict';

	angular
	.module('gardens')
	.controller('GardensListController', GardensListController);

	GardensListController.$inject = ['GardensService','$filter','$state'];

	function GardensListController(GardensService,$filter,$state) {
		var vm = this;
		vm.gotoView = function(seasonId){
			$state.go('seasons.view', {
				seasonId: seasonId
			})};
		GardensService.query(function (data) {
			vm.gardens = data[0].gardens;
			vm.seasons = data[0].seasons;
			vm.buildPager();
			vm.buildPager2();
		});
		vm.buildPager = function () {
			vm.pagedItems = [];
			vm.itemsPerPage = 5;
			vm.currentPage = 1;
			vm.figureOutItemsToDisplay();
		};
		vm.figureOutItemsToDisplay = function () {
			vm.filteredItems = $filter('filter')(vm.gardens, {
				$: vm.search
			});
			vm.filterLength = vm.filteredItems.length;
			var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
			var end = begin + vm.itemsPerPage;
			vm.pagedItems = vm.filteredItems.slice(begin, end);
		};
		vm.pageChanged = function () {
			vm.figureOutItemsToDisplay();
		};
		vm.buildPager2 = function () {
			vm.pagedItems2 = [];
			vm.itemsPerPage2 = 5;
			vm.currentPage2 = 1;
			vm.figureOutItemsToDisplay2();
		};
		vm.figureOutItemsToDisplay2 = function () {
			vm.filteredItems2 = $filter('filter')(vm.seasons, {
				$: vm.search2
			});
			vm.filterLength2 = vm.filteredItems2.length;
			var begin = ((vm.currentPage2 - 1) * vm.itemsPerPage2);
			var end = begin + vm.itemsPerPage2;
			vm.pagedItems2 = vm.filteredItems2.slice(begin, end);
		};
		vm.pageChanged2 = function () {
			vm.figureOutItemsToDisplay2();
		};
	}
})();
