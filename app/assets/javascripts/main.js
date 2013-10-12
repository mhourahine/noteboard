window.app = {};

window.app.Box = function(options) {
	var me = this;
	var defaults = {
		title: '',
		content: '',
		top: 0,
		left: 0,
		height: 100,
		width: 100
	};
	me.options = $.extend(defaults, options);

	me.init = function() {
		me.element = $('<div class="box" id="box'+me.options.id+'"></div>');
		var content = '';
		content += '<div class="title">'+me.options.title+'</div>';
		content += '<div class="content">'+me.options.content+'</div>';
		me.element.html(content);

		me.element.css('top',me.options.top);
		me.element.css('left',me.options.left);
		me.element.css('height',me.options.height);
		me.element.css('width',me.options.width);

		me.element.draggable({ handle: '.title'});
		me.element.resizable();
		me.element.appendTo('#canvas');
		return true;
	};
	me.init();
	return me;
}

$(function() {
	var box1 = new window.app.Box({ title: 'New Box 1', content:'New content',id:1});
	var box2 = new window.app.Box({ title: 'New Box 2', content:'New content',id:2});
	var box3 = new window.app.Box({ title: 'New Box 3', content:'New content',id:3});
});