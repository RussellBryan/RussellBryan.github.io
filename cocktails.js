(function() {
	var app = angular.module('cocktailApp', []);

	app.controller('FormController', function(){
		this.ingredientData = ingredients;
		this.ingredientType = {0: ingredients["Liquer"], 1: ingredients["Vermouth"]};
		this.ingredient = {0: this.ingredientType[0]['Campari'], 1: this.ingredientType[1]['Carpano']};
		this.spiritAmount = {0: 1};
		this.spiritABV = {0: 40};
		this.ingredientAmount = {0: 1, 1: 1};
		this.dilution = 'stirred';
		this.numSpirits = 1;
		this.numIngredients = 2;
		this.range = function(n){
			return new Array(n)
		};
		this.updateSpirits = function(formCtrl) {
			if (typeof last == 'undefined') {
				var last = 1;
			}
			if (formCtrl.numSpirits > last) {
				for (last; last<formCtrl.numSpirits; last++) {
					formCtrl.spiritAmount[last] = 0;
					formCtrl.spiritABV[last] = 40;
				}
			}
			else {
				for (last; last>formCtrl.numSpirits; last--) {
					delete formCtrl.spiritAmount[last]
					delete formCtrl.spiritABV[last]
				}
			}
		}
		this.updateIngredients = function(formCtrl) {
			if (typeof last == 'undefined') {
				var last = 2;
			}
			if (formCtrl.numIngredients > last) {
				for (last; last<formCtrl.numIngredients; last++) {
					formCtrl.ingredientAmount[last] = 0;
					formCtrl.ingredientType[last] = formCtrl.ingredientData['Vermouth'];
					formCtrl.ingredient[last] = formCtrl.ingredientData['Vermouth']['Carpano'];
				}
			}
			else {
				for (last; last>formCtrl.numIngredients; last--) {
					delete formCtrl.ingredientAmount[last]
					delete formCtrl.ingredientType[last]
					delete formCtrl.ingredient[last]
				}
			}
		}
		this.calculate = function(formCtrl) {
			var total = 0;
			var abv = 0;
			var sugar = 0;
			var acid = 0;
			for (var i = 0; i<formCtrl.numSpirits; i++) {
				total += formCtrl.spiritAmount[i];
				abv += formCtrl.spiritABV[i]*formCtrl.spiritAmount[i];
			}
			for (var i = 0; i<formCtrl.numIngredients; i++) {
				var amount = formCtrl.ingredientAmount[i];
				total += amount;
				abv += formCtrl.ingredient[i]['abv']*amount;
				sugar += formCtrl.ingredient[i]['sugar']*amount;
				acid += formCtrl.ingredient[i]['acid']*amount;
			}
			var dil = 1;
			abv = abv/total;
			if (formCtrl.dilution == 'stirred') { 
				dil = -1.092*((abv/100)*(abv/100)) + 1.224*(abv/100) + 1.15;
			}
			if (formCtrl.dilution == 'shaken') {
				dil = -4.678*((abv/100)*(abv/100)) + 3.266*(abv/100) + 1.134;
			}
			formCtrl.dil = dil;
			formCtrl.abv = abv;
			dilutedTotal = total*dil;
			abv = abv/dil;
			sugar = sugar/dilutedTotal;
			acid = acid/dilutedTotal;
			return {"ABV": abv, "Sugar": sugar, "Acid": acid, 
			"mixVolume": total, "finalVolume": dilutedTotal};
		};
	});
})();

