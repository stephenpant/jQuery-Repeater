/*
 * jQuery Repeater v1.0
 *
 * Copyright 2010 Stephen Pant <stephenpant@gmail.com>
 * http://stephenpant.tumblr.com/
 * 
 * Licensed jointly under the GPL and MIT licenses
 */
(function ($) {
	var methods = {
		init :	function(contentInstances, prefix) {
		            this.repeater('clear');
					return this.each(function () {
						if(contentInstances) {
							var repeater = $(this),
							template = repeater.html(),
						
							html = $.map(contentInstances, function (contentDetails, i) {
								var instance = template;

								return substituteKeys(instance, contentDetails, prefix);
							});

							repeater.html(html.join("\n")).data('jQuery-repeater-template', template);
						}
					});
				},
		clear :	function() {
					if(this.data('jQuery-repeater-template') != null) {
						this.html(this.data('jQuery-repeater-template'));
					}
					return this;
				}
	}
	
	function substituteKeys(instance, contentDetails, prefix) {
		if(!prefix) { prefix = "" } else { prefix += "\." }
		$.each(contentDetails, function (key, value) {
			if(value && typeof(value) == "object") {
				instance = substituteKeys(instance, value, prefix + key);
			} else {
				instance = instance.replace(new RegExp("{" + prefix + key + "}", 'g'), value)
								   .replace(new RegExp("%7B" + prefix + key + "%7D", 'g'), value);
			}
		});

		return instance;
	}

	$.fn.repeater = function (method, arg) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.repeater' );
		}
	}
}(jQuery));