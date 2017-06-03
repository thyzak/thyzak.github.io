var config = {
    apiKey: "AIzaSyCgQRI7p-be9OR452XNZj3rYhJgQ2m94qM",
    authDomain: "build-a-kia.firebaseapp.com",
    databaseURL: "https://build-a-kia.firebaseio.com",
    projectId: "build-a-kia",
    storageBucket: "build-a-kia.appspot.com",
    messagingSenderId: "567121021492"
};

firebase.initializeApp(config);

var database = firebase.database();

$( document ).ready(function() {

    //add active class to clicked li, remove from others
	$('li').on('click', function(e) {
		e.preventDefault();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
	});

	var vehicleOptions = [
		{choice: 'cadenza', price: 35000},
		{choice: 'forte', price: 20000},
		{choice: 'optima', price: 29050},
		{choice: 'sedona', price: 38650},
		{choice: 'soul', price: 42200}
	];

	var colorOptions = [
		{choice: 'black', price: 50},
		{choice: 'white', price: 100},
		{choice: 'silver', price: 250}
	];

	var packageOptions = [
		{choice: 'Rear Camera', price: 150},
		{choice: 'LED Positioning Light', price: 150},
		{choice: 'Rear Camera and LED Positioning Light', price: 200}
	];

	var carSelection = {
		vehicle: {choice: 'Not Selected', price: 0},
		color: {choice: 'Not Selected', price: 0},
		package: {choice: 'Not Selected', price: 0}
	};

	//click event for nav tabs to display tab html
	$('.navigation').children('li').on('click', function(e) {
		e.preventDefault();
		$('#options-display').empty();
		switch  ($(this).data('tab')) {
    		case 'vehicle':
        		var source = $('#vehicle-options-template').html();
        		var template = Handlebars.compile(source);
        		var options = [];

                for (i=0; i<vehicleOptions.length; i++) {
                    var option = {
                        feature: vehicleOptions[i].choice,
                        price: vehicleOptions[i].price
                    };
                    options.push(option);
                }

        		var html = template(options);
        		$('#options-display').html(html);
        		break; 

    		case 'color':
       			var source = $('#color-options-template').html();
        		var template = Handlebars.compile(source);
        		var options = [];

                for (i=0; i<colorOptions.length; i++) {
                	var option = {
	                    feature: colorOptions[i].choice,
	                    price: colorOptions[i].price
                	};
                	options.push(option);
                }

        		var html = template(options);
        		$('#options-display').html(html);
        		break; 

        	case 'package':
       			var source = $('#package-options-template').html();
        		var template = Handlebars.compile(source);
        		var options = [];

                for (i=0; i<packageOptions.length; i++) {
                	var option = {
	                    feature: packageOptions[i].choice,
	                    price: packageOptions[i].price
                	};
                	options.push(option);
                }

        		var html = template(options);
        		$('#options-display').html(html);
        		break;

        	case 'summary':
       			var source = $('#summary-options-template').html();
        		var template = Handlebars.compile(source);
        		var html = template(carSelection);
        		$('#options-display').html(html);
        		break; 
        	
		}
	});

	//function to update carSelection object w/ user selections
	function carSelect(feature) {

		//set feature data based on user selection
		feature.removeData('panel');
		
		feature.data('panel', {"panel": feature.data('panel'), "option": feature.data('option'), "price": feature.data('price')});

		console.log(feature.data('panel'));
		var panel = feature.data('panel');

		//update carSelection w/ feature data
		if (panel.panel === 'vehicle') {
			carSelection.vehicle.choice = panel.option;
			carSelection.vehicle.price = panel.price;
		} else if (panel.panel === 'color') {
			carSelection.color.choice = panel.option;
			carSelection.color.price = panel.price;
		} else if (panel.panel === 'package') {
			carSelection.package.choice = panel.option;
			carSelection.package.price = panel.price;
		}

		//display vehicle based on user selections
		if (carSelection.color.choice !== 'Not Selected') {
			$('.vehicle-display').attr('src', 'assets/' + carSelection.vehicle.choice + '-' + carSelection.color.choice + '.jpg')
		} else {
			$('.vehicle-display').attr('src', 'assets/' + carSelection.vehicle.choice + '-black.jpg')
		}

		//update total cost based on user selections
		var totalCost = carSelection.vehicle.price + carSelection.color.price + carSelection.package.price;

		//add comma to cost display
		function numberWithCommas(x) {
		    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
		totalCost = numberWithCommas(totalCost);

		//update cost display w/ total cost
		$('.cost-display').text('$' + totalCost)

		//update firebase w/ user selections
		var choicesReference = database.ref('choices');

		choicesReference.push({
			dbVehicle: carSelection.vehicle.choice,
			dbColor: carSelection.color.choice,
			dbPackage: carSelection.package.choice,
			dbCost: totalCost
		}) 

	}



	$('#options-display').on('click','div', function(e) {
		e.preventDefault();
		carSelect($(this));

	});

    $('.active').click();
});