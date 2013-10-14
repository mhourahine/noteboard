if (window.app === undefined) { window.app = {}; }
var app = window.app;

app.routes = {
	boxes: {
		create: '/boxes.json',
		update: '/boxes/:id.json',
		destroy: '/boxes/:id.json',
		show: '/boxes/:id.json',
		all: '/boxes.json'
	}
};

app.init = function() {
	$.getJSON(app.routes.boxes.all, function(data) {
		console.log(data);
		data.forEach(function(box_data) {
			$.box(box_data).appendTo('#canvas');
		});
	});
};

app.resizeCanvas = function() {
	var height = $(window).height() - $('#canvas').position().top - 5;
	$('#canvas').css('height',height+'px');
};

app.boxCreate = function() {
	var data = { box: { title:'New Note' }};
	$.post(app.routes.boxes.create, data, function(response) {
		$.box(response).appendTo('#canvas');
	});
};

app.boxUpdate = function(box) {
	var boxdata = $(box).getBoxData();
	$.ajax({
		type: "PUT",
		url: app.routes.boxes.update.replace(':id',boxdata.id),
		data: {box:boxdata},
		success: function(response) {
			console.log(response);
		}
	});
};

app.boxDelete = function(box_id) {
	$.ajax({
		type: 'DELETE',
		url: app.routes.boxes.destroy.replace(':id',box_id),
		success: function(response) {
			console.log(response);
		}
	});
};


$(function() {
	$('#new_link').click(function() {
		app.boxCreate();
	});

	$(window).resize(function() {
		app.resizeCanvas();
	});

	$(document).on('box:updated',function(event,box) {
		app.boxUpdate(box);
	});

	$(document).on('box:deleted',function(event,box_id) {
		app.boxDelete(box_id);
	});

	app.resizeCanvas();
	app.init();
});