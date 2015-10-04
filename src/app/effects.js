;(function(jQuery){
	'use strict';
	
	/**
	* get random color
	* @return {string} color
	*/
	jQuery.fn.circleSlider.effects.getRandomColor = function(){
		
		var letters = '0123456789ABCDEF'.split('')
			,color = '#';
			
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		
		return color;		
	};
	
})(jQuery);