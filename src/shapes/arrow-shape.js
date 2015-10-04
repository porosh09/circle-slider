;(function(jQuery){
	'use strict';
	
	/**
	* arrow shape
	* @constructor
	* @param {Object} settings
	* @param {Object} canvas
	*/
	jQuery.fn.circleSlider.shapes.arrowShape = function(settings, canvas){
		
		this.settings = settings;
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
	};
	
	/**
	* draw path shape
	* @param {Number} angle in degrees
	*/
	jQuery.fn.circleSlider.shapes.arrowShape.prototype.draw = function(angle, handleCenter){
		
		var center
			,radius;
		
		center = {
			x: this.settings.radius + this.settings.padding
			,y: this.settings.radius2 + this.settings.padding
		};
		
		radius = this.settings.radius - this.settings.strokeWidth / 2;
		
		this.context.save();	

		if(this.settings.arrowImage){
		
			if(this.settings.arrowImage.loaded){
				
				this.context.translate(center.x, center.y);
				this.context.rotate(jQuery.fn.circleSlider.vectors.getRadians(angle));
		
				//add arrow image...
				this.context.drawImage(this.settings.arrowImage, 0, -this.settings.arrowWidth / 2, radius - this.settings.handleRadius, this.settings.arrowWidth);			
			}
		}
		else{
			this.context.beginPath();
			
			this.context.moveTo(center.x, center.y);
			this.context.lineTo(handleCenter.x, handleCenter.y);
			
			this.context.lineWidth = this.settings.arrowWidth;
			this.context.strokeStyle = this.settings.arrowColor;
					
			if(this.settings.arrowBGImage && this.settings.arrowBGImage.loaded){
				this.context.strokeStyle = this.context.createPattern(this.settings.arrowBGImage, 'repeat');			
			}
			
			this.context.stroke();
			
			this.context.closePath();
		}
				
		this.context.restore();
	};
	
})(jQuery);