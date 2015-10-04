;(function(jQuery){
	'use strict';
	
	/**
	* init gredient
	* @param {Object} self
	* @param {number} centerX
	* @param {number} centerY
	* @param {number} radius
	*/
	var initGradient = function(self, centerX, centerY, radius){
		
		var grd;
		
		if(self.settings.isStrokeColorActiveGradient){
		
			switch(self.settings.strokeColorActiveGradientType){
								
				case 'v':{
					grd = self.context.createLinearGradient(centerX, centerY - radius, centerX, centerY + radius);
					break;
				}
				
				case 'd1':{
					grd = self.context.createLinearGradient(centerX - radius, centerY - radius, centerX + radius*2, centerY + radius*2);
					break;
				}
				
				case 'd2':{
					grd = self.context.createLinearGradient(centerX - radius, centerY + radius*2, centerX + radius*2, centerY - radius);
					break;
				}
				
				case 'r':{
					grd = self.context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
					break;
				}
				
				default: { //h
					grd = self.context.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
					break;
				}
			}
			
			grd.addColorStop(0, self.settings.strokeColorActive);
			grd.addColorStop(1, self.settings.strokeColorActive2);
			self.context.strokeStyle = grd; 
			self.context.lineWidth = self.settings.strokeWidth - 1;
		}
		else{
			self.context.strokeStyle = self.settings.strokeColorActive; 
			self.context.lineWidth = self.settings.strokeWidth;
		}	
	};
	
	/**
	* path shape
	* @constructor
	* @param {Object} settings
	* @param {Object} canvas
	*/
	jQuery.fn.circleSlider.shapes.pathShape = function(settings, canvas){
		
		this.settings = settings;
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
	};
	
	/**
	* draw path shape
	* @param {Number} startingAngle
	* @param {Number} endingAngle
	*/
	jQuery.fn.circleSlider.shapes.pathShape.prototype.draw = function(startingAngle, endingAngle){
		
		var centerX
			,centerY
			,radius
			,isCounterclockwise;
					
		centerX = this.settings.radius + this.settings.padding;
		centerY = this.settings.radius + this.settings.padding;
		radius = this.settings.radius - this.settings.strokeWidth/2;
		isCounterclockwise = false;
		
		this.context.save();
		
		if(this.settings.isEllipse){
			this.context.scale(1, this.settings.radius2Scale);
			centerY = this.settings.radius + this.settings.padding*(1 + this.settings.radius2Scale);
		}
		
		//draw the path
		this.context.beginPath();
		this.context.arc(centerX, centerY, radius, jQuery.fn.circleSlider.vectors.getRadians(startingAngle), jQuery.fn.circleSlider.vectors.getRadians(endingAngle), isCounterclockwise);
				
		//this.context.restore();
		//this.context.save();
				
		if(this.settings.strokeWidth > 0){
						
			//init gradient
			initGradient(this, centerX, centerY, radius);
			
			//background image			
			if(this.settings.strokeImageActive && this.settings.strokeImageActive.loaded){
				this.context.strokeStyle = this.context.createPattern(this.settings.strokeImageActive, 'repeat');			
			}
			
			//draw the stroke
			this.context.stroke();	
		}
		
		this.context.closePath();
		
		this.context.restore();
	};
	
})(jQuery);