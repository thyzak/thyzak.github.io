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
	]
});