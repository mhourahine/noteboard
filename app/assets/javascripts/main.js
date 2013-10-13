if (window.app === undefined) { window.app = {}; }

window.app.routes = {
	boxes: {
		create: '/boxes.json',
		update: '/boxes.json',
		destroy: '/boxes.json',
		show: '/boxes.json',
		all: '/boxes.json'
	}
};

window.app.init = function() {
	$.getJSON(window.app.routes.boxes.all, function(data) {
		console.log(data);
		data.forEach(function(box_data) {
			var box = new window.app.Box(box_data);
			window.app.boxes.push(box);
			box.addTo('#canvas');
		});
	});
}

$(function() {
	$('#new_link').click(function() {
		var data = { box: { title:'New Box' }};
		$.post(window.app.routes.boxes.create, data, function(response) {
			console.log(response);
			var box = new window.app.Box(response);
			window.app.boxes.push(box);
			box.addTo('#canvas');
		});
	});

	window.app.init();
});