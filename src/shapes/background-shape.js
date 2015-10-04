;(function(jQuery){
	'use strict';
	
	/**
	* init background gradient
	* @param {Object} self
	* @param {number} centerX
	* @param {number} centerY
	* @param {number} radius
	*/
	var initBackgroundGradient = function(self, centerX, centerY, radius){
		
		var grd;
		
		if(self.settings.isShapeGradient){
			
			switch(self.settings.shapeGradientType){
								
				case 'v':{
					grd = self.context.createLinearGradient(self.canvas.width/2, 0, self.canvas.width/2, self.canvas.height);
					break;
				}
				
				case 'd1':{
					grd = self.context.createLinearGradient(0, 0, self.canvas.width, self.canvas.height);
					break;
				}
				
				case 'd2':{
					grd = self.context.createLinearGradient(0, self.canvas.height, self.canvas.width, 0);
					break;
				}
				
				case 'r':{
					grd = self.context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
					break;
				}
				
				default: { //h
					grd = self.context.createLinearGradient(0, self.canvas.height/2, self.canvas.width, self.canvas.height/2);
					break;
				}
			}
			
			grd.addColorStop(0, self.settings.shapeColor);
			grd.addColorStop(1, self.settings.shapeColor2);
			self.context.fillStyle = grd; 
		}
		else{
			self.context.fillStyle = self.settings.shapeColor; 
		}
	};
	
	/**
	* init path gradient
	* @param {Object} self
	* @param {number} centerX
	* @param {number} centerY
	* @param {number} radius
	*/
	var initPathGradient = function(self, centerX, centerY, radius){
		
		var grd;
		
		if(self.settings.isPathGradient){
			
			switch(self.settings.strokeGradientType){
								
				case 'v':{
					grd = self.context.createLinearGradient(self.canvas.width/2, 0, self.canvas.width/2, self.canvas.height);
					break;
				}
				
				case 'd1':{
					grd = self.context.createLinearGradient(0, 0, self.canvas.width, self.canvas.height);
					break;
				}
				
				case 'd2':{
					grd = self.context.createLinearGradient(0, self.canvas.height, self.canvas.width, 0);
					break;
				}
				
				case 'r':{
					grd = self.context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
					break;
				}
				
				default: { //h
					grd = self.context.createLinearGradient(0, self.canvas.height/2, self.canvas.width, self.canvas.height/2);
					break;
				}
			}
			
			grd.addColorStop(0, self.settings.strokeColor);
			grd.addColorStop(1, self.settings.strokeColor2);
			self.context.strokeStyle = grd; 
		}
		else{
			self.context.strokeStyle = self.settings.strokeColor;
		}
	};
		
	/**
	* init random color effect
	* @param {Object} self
	* @param {number} newAngle in degrees
	*/
	var initRandomColorEffect = function(self, newAngle){
		
		if(Math.round(newAngle) % 10 === 0){
			self.randomColor = jQuery.fn.circleSlider.effects.getRandomColor();
		}
		else{
			if(!self.randomColor){
				self.randomColor = self.settings.shapeColor;
			}
		}
		
		self.context.fillStyle = self.randomColor;		
	};
	
	/**
	* init rotate effect
	* @param {Object} self
	* @param {Object} center
	* @param {number} oldAngle in degrees
	* @param {number} newAngle in degrees
	* @return {Object} center
	*/
	var initRotateEffect = function(self, center, oldAngle, newAngle){
		
		self.context.translate(center.x, center.y);
		self.context.rotate(jQuery.fn.circleSlider.vectors.getRadians(self.selfRotateAngle));
		center = {
			x: 0
			,y: 0
		};
					
		if(oldAngle >= newAngle){
			self.selfRotateAngle++;
		}
		else{
			self.selfRotateAngle--;
		}
		
		return center;
	};
	
	/**
	* background shape
	* @constructor
	* @param {Object} settings
	* @param {Object} canvas
	*/
	jQuery.fn.circleSlider.shapes.backgroundShape = function(settings, canvas){
		
		this.settings = settings;
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.selfRotateAngle = 0;
		this.randomColor = '';
	};
	
	/**
	* draw background shape
	* @param {number} oldAngle
	* @param {number} newAngle
	*/
	jQuery.fn.circleSlider.shapes.backgroundShape.prototype.draw = function(oldAngle, newAngle){
		
		var centerX
			,centerY
			,center
			,radius
			,startingAngle
			,endingAngle
			,isCounterclockwise;
		
		center = {
			x: this.settings.radius + this.settings.padding
			,y: this.settings.radius + this.settings.padding
		};
				
		radius = this.settings.radius - this.settings.strokeWidth/2;
		startingAngle = jQuery.fn.circleSlider.vectors.getRadians(this.settings.start);
		endingAngle = jQuery.fn.circleSlider.vectors.getRadians(this.settings.end);
		isCounterclockwise = false;
		
		this.context.save();
		
		//ellipse?
		if(this.settings.isEllipse){
			this.context.scale(1, this.settings.radius2Scale);
			center.y = this.settings.radius + this.settings.padding*(1 + this.settings.radius2Scale);
		}
		
		if($.inArray('rotate-bg', this.settings.effects) !== -1){
			
			center = initRotateEffect(this, center, oldAngle, newAngle);
		}
				
		//set shadow			
		if(this.settings.isBgShadow){
			
			this.context.shadowColor = this.settings.bgshadowColor;
			this.context.shadowBlur = this.settings.bgshadowBlur;
			this.context.shadowOffsetX = this.settings.bgshadowOffsetX;
			this.context.shadowOffsetY = this.settings.bgshadowOffsetY;
		}
		
		//draw the shape
		this.context.beginPath();
		this.context.arc(center.x, center.y, radius, startingAngle, endingAngle, isCounterclockwise);
				
		if($.inArray('random-bg-color', this.settings.effects) !== -1){
		
			initRandomColorEffect(this, newAngle);
		}
		else{
			//init background gradient
			initBackgroundGradient(this, center.x, center.y, radius);
			
			//background image
			if(this.settings.shapeBGImage && this.settings.shapeBGImage.loaded){ 		
				this.context.fillStyle = this.context.createPattern(this.settings.shapeBGImage, 'repeat');			
			}
		}
				
		this.context.fill();		
		
		if(this.settings.shapeImage){
		
			if(this.settings.shapeImage.loaded){
		
				//add arrow image...
				this.context.drawImage(
					this.settings.shapeImage
					,this.settings.strokeWidth + this.settings.padding
					,this.settings.strokeWidth + this.settings.padding
					,(this.settings.radius - this.settings.strokeWidth)*2
					,(this.settings.radius2 - this.settings.strokeWidth)*2
				);			
			}
		}
				
		//this.context.restore();
		//this.context.save();
		
		if(this.settings.pathImage){
			
			if(this.settings.pathImage.loaded){
									
				//add arrow image...
				this.context.drawImage(
					this.settings.pathImage
					,this.settings.padding
					,this.settings.padding
					,(this.settings.radius)*2
					,(this.settings.radius2)*2
				);			
			}
		}
		else{
			if(this.settings.strokeWidth > 0){
						
				//init path gradient
				initPathGradient(this, center.x, center.y, radius);
				
				//background image			
				if(this.settings.strokeImage && this.settings.strokeImage.loaded){
					this.context.strokeStyle = this.context.createPattern(this.settings.strokeImage, 'repeat');			
				}
										
				//draw the stroke
				this.context.lineWidth = this.settings.strokeWidth; 
				
				this.context.stroke();	
			}
		}
		
		this.context.closePath();
		
		this.context.restore();
	};
	
})(jQuery);