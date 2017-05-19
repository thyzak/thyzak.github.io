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

	var carSelection = [
		vehicle: {choice: 'Not Selected', price: 0},
		color: {choice: 'Not Selected', price: 0},
		package: {choice: 'Not Selected', price: 0}
	];

	//click event for nav tabs to display tab html
	$('.nav nav-tabs nav-justified navigation').children('li').on('click', function(e) {
		e.preventDefault();
		$('#options-display').empty();
		switch  ($(this).data('tab')) {
    		case 'vehicle':
        		var source = $('#vehicle-options-template');
        		var template = Handlebars.compile(source);
        		var options = for (i=0; i<vehicleOptions.length; i++) {
        			feature: vehicleOptions[i].choice
        			price: vehicleOptions[i].price
        		}
        		var html = template(options);
        		$('#options-display').html(html);
        		break; 
    		case 'color':
       			var source = $('#color-options-template');
        		var template = Handlebars.compile(source);
        		var options = for (i=0; i<colorOptions.length; i++) {
        			feature: colorOptions[i].choice
        			price: colorOptions[i].price
        		}
        		var html = template(options);
        		$('#options-display').html(html);
        		break; 
        	case 'package':
       			var source = $('#package-options-template');
        		var template = Handlebars.compile(source);
        		var options = for (i=0; i<packageOptions.length; i++) {
        			feature: packageOptions[i].choice
        			price: packageOptions[i].price
        		}
        		var html = template(options);
        		$('#options-display').html(html);
        		break;
        	case 'summary':
       			var source = $('#summary-options-template');
        		var template = Handlebars.compile(source);
        		var html = template(carSelection);
        		$('#options-display').html(html);
        		break; 
        	default:
        		var source = $('#vehicle-options-template');
        		var template = Handlebars.compile(source);
		}
	})
});