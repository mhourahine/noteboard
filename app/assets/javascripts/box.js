if (window.app === undefined) { window.app = {}; }

$.boxes = [];
$.fn.getBoxData = function() {
		var data = {};
		data.id = this.attr('id').substring(3,this.attr('id').length);
		//data.title = this.children('.title-bar').children('.title').html();
		data.content = this.children('.content-container').children('.content').html();
		data.top = this.position().top;
		data.left = this.position().left;
		data.height = this.height();
		data.width = this.width();
		return data;
	};

$.fn.box = function(options) {
	var defaults = {
		title: '',
		content: '',
		top: 0,
		left: 0,
		height: 100,
		width: 100
	};
	var boxOptions = $.extend({}, defaults, options);

	$(this).attr('class', 'box well well-small');
	$(this).attr('id','box'+boxOptions.id);
		
	var content = '';
	content += '<div class="title-bar">';
	//content += '<span class="title" contentEditable>'+boxOptions.title+'</span>';
	content += '<span class="remove"><i class="icon-remove"></i></span>';
	content += '</div>';
	content += '<div class="content-container">';
	content += '<div class="content" contentEditable>'+boxOptions.content+'</div>';
	content += '</div>';
	$(this).html(content);

	$(this).css('position','absolute');
	$(this).css('top',boxOptions.top+'px');
	$(this).css('left',boxOptions.left+'px');
	$(this).css('height',boxOptions.height+'px');
	$(this).css('width',boxOptions.width+'px');

	$(this).draggable({ 
		handle: '.title-bar',
		containment: 'parent',
		zIndex: 100,
		stop: function(e, ui) {
			$(this).trigger('box:updated',this);
		}
	});
	$(this).resizable({
		stop: function(e, ui) {
			$(this).trigger('box:updated',this);
		}
	});

	$(this).find('.remove').click(function() {
		if (! confirm("Are you sure?")) return false;

		var box = $(this).parents('.box');
		box.trigger('box:deleted',box.getBoxData().id);
		box.remove();
	});

	$.boxes.push($(this));
	return $(this);
};
