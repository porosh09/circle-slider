;(function(jQuery){
	'use strict';
	
	/**
	* init gradient
	* @param {Object} self
	* @param {Object} center
	* @param {number} radius
	* @param {number} handleIndex
	*/
	var initGradient = function(self, center, radius, handleIndex){
		
		var grd
			,gradientTypeField;
		
		if(self.settings.isHandleGradient){
			
			if(handleIndex === 1){
				gradientTypeField = self.settings.handleGradientType;
			}
			else{
				gradientTypeField = self.settings.handleGradientType2;
			}
			
			switch(gradientTypeField){
								
				case 'v':{
					grd = self.context.createLinearGradient(center.x, center.y - radius, center.x, center.y + radius);
					break;
				}
				
				case 'd1':{
					grd = self.context.createLinearGradient(center.x - radius, center.y - radius, center.x + radius*2, center.y + radius*2);
					break;
				}
				
				case 'd2':{
					grd = self.context.createLinearGradient(center.x - radius, center.y + radius*2, center.x + radius*2, center.y - radius);
					break;
				}
				
				case 'r':{
					grd = self.context.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius);
					break;
				}
				
				default: { //h
					grd = self.context.createLinearGradient(center.x - radius, center.y, center.x + radius, center.y);
					break;
				}
			}
			
			if(handleIndex === 1){
				grd.addColorStop(0, self.settings.handleColor);
				grd.addColorStop(1, self.settings.handleColor2);
			}
			else{
				grd.addColorStop(0, self.settings.handle2Color);
				grd.addColorStop(1, self.settings.handle2Color2);
			}
			
			self.context.fillStyle = grd; 
		}
		else{
			if(handleIndex === 1){
				self.context.fillStyle = self.settings.handleColor;
			}
			else{
				self.context.fillStyle = self.settings.handle2Color;
			}			
		}
	};
	
	/**
	* get handle center by angle (in degrees)
	* @param {Object} self
	* @return {Object}
	*/
	var getCenter = function(self, angle){
		
		return {
			x: self.shapeCenter.x + (self.settings.radius - self.settings.strokeWidth / 2) * Math.cos(jQuery.fn.circleSlider.vectors.getRadians(angle))
			,y: self.shapeCenter.y + (self.settings.radius2 - self.settings.strokeWidth / 2 *self.settings.radius2Scale) * Math.sin(jQuery.fn.circleSlider.vectors.getRadians(angle))
		};
	};
	
	/**
	* init rotate effect
	* @param {Object} self
	* @param {Object} center
	* @param {number} oldAngle in degrees
	* @param {number} angle - new angle in degrees
	* @return {Object} center
	*/
	var initRotateEffect = function(self, center, oldAngle, angle){
		
		self.context.translate(center.x, center.y);
		self.context.rotate(jQuery.fn.circleSlider.vectors.getRadians(self.selfRotateAngle));
		center = {
			x: 0
			,y: 0
		};
		
		if(oldAngle >= angle){
			self.selfRotateAngle++;
		}
		else{
			self.selfRotateAngle--;
		}
		
		return center;
	};
	
	/**
	* init random color effect
	* @param {Object} self
	* @param {number} angle - new angle in degrees
	*/
	var initRandomColorEffect = function(self, angle){
		
		if(Math.round(angle) % 10 === 0){
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
	* handle shape
	* @param {Object} settings
	* @param {Object} canvas
	* @param {Object} canvasPos
	*/
	jQuery.fn.circleSlider.shapes.handleShape = function(settings, canvas, canvasPos){
		
		this.settings = settings;
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.canvasPos = canvasPos;
		this.selfRotateAngle = 0;
		this.randomColor = '';
		
		this.shapeCenter = {
			x: this.settings.radius + this.settings.padding
			,y: this.settings.radius2 + this.settings.padding
		};
	};
	
	/**
	* get handle center by angle (in degrees)
	* @param {Number} angle in degrees
	* @return {Object}
	*/
	jQuery.fn.circleSlider.shapes.handleShape.prototype.getCenter = function(angle){		
		return getCenter(this, angle);
	};
	
	/**
	* draw path shape
	* @param {number} angle in degrees
	* @param {number} handleIndex (1 - first handle, 2 - second handle)
	* @param {number} oldAngle in degrees
	*/
	jQuery.fn.circleSlider.shapes.handleShape.prototype.draw = function(angle, handleIndex, oldAngle){
		
		var radius
			,startingAngle
			,endingAngle
			,isCounterclockwise
			,center;
			
		radius = this.settings.handleRadius;
		startingAngle = 0;
		endingAngle = 2 * Math.PI;
		isCounterclockwise = false;
		
		center = getCenter(this, angle);
		
		if(!handleIndex){
			handleIndex = 1;
		}
				
		this.context.save();
		
		//init rotate handle effect
		if($.inArray('rotate-handle', this.settings.effects) !== -1){		
			center = initRotateEffect(this, center, oldAngle, angle);
		}	
		
		//set shadow			
		if(this.settings.isHandleShadow){
			
			this.context.shadowColor = this.settings.handleShadowColor;
			this.context.shadowBlur = this.settings.handleShadowBlur;
			this.context.shadowOffsetX = this.settings.handleShadowOffsetX;
			this.context.shadowOffsetY = this.settings.handleShadowOffsetY;
		}

		//draw the circle
		this.context.beginPath();
		this.context.arc(center.x, center.y, radius, startingAngle, endingAngle, isCounterclockwise);
				
		if($.inArray('random-handle-color', this.settings.effects) !== -1){		
			initRandomColorEffect(this, angle);
		}
		else{
			
			//init gradient
			initGradient(this, center, radius, handleIndex);
			
			//background image	
			if(handleIndex === 1){			
						
				if(this.settings.handleImage && this.settings.handleImage.loaded){
					this.context.fillStyle = this.context.createPattern(this.settings.handleImage, 'repeat');			
				}
			}
			else{
				
				//background image			
				if(this.settings.handle2Image && this.settings.handle2Image.loaded){
					this.context.fillStyle = this.context.createPattern(this.settings.handle2Image, 'repeat');			
				}
			}	
		}
				 		
		this.context.fill();		
		this.context.closePath();		
		this.context.restore();
	};
	
	/**
	* true if mouse is inside handle
	* @param {Number} mouseX
	* @param {Number} mouseY
	* @param {Number} angle
	* @return {boolean}
	*/
	jQuery.fn.circleSlider.shapes.handleShape.prototype.isMouseInside = function(mouseX, mouseY, angle){
		
		var handleCenter
			,self = this;
				
		handleCenter = {
			x: this.shapeCenter.x + (this.settings.radius - this.settings.strokeWidth/2) * Math.cos(jQuery.fn.circleSlider.vectors.getRadians(angle))
			,y: this.shapeCenter.y + (this.settings.radius2 - this.settings.strokeWidth/2) * Math.sin(jQuery.fn.circleSlider.vectors.getRadians(angle))
		};
		
		return jQuery.fn.circleSlider.vectors.isPointInsideCircle(
			mouseX - self.canvasPos.left
			, mouseY - self.canvasPos.top
			, handleCenter.x
			, handleCenter.y
			, self.settings.handleRadius
		);
	};
	
})(jQuery);