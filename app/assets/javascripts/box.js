if (window.app === undefined) { window.app = {}; }

window.app.boxes = [];
window.app.Box = function(options) {
	console.log(options);
	var defaults = {
		title: '',
		content: '',
		top: 0,
		left: 0,
		height: 100,
		width: 100
	};
	this.options = $.extend({}, defaults, options);
	
	this.init = function() {
		this.element = $('<div class="box" id="box'+this.options.id+'"></div>');
		var content = '';
		content += '<div class="title">'+this.options.title+'</div>';
		content += '<div class="content">'+this.options.content+'</div>';
		this.element.html(content);

		this.element.css('top',this.options.top);
		this.element.css('left',this.options.left);
		this.element.css('height',this.options.height);
		this.element.css('width',this.options.width);

		this.element.draggable({ 
			handle: '.title',
			stop: function(e, ui) {
				console.log(this);
			}
		});
		this.element.resizable({
			stop: function(e, ui) {
				console.log(this);
			}
		});
		return true;
	};

	this.addTo = function(element) {
		this.init();
	 	$(element).append(this.element);
	};
	
}