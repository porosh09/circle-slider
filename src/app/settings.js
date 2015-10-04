;(function(jQuery){
	'use strict';
		
	/**
	* init bg properties
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var initBgProperties = function(userOptions, $root, settings){
				
		//background colors
		settings.shapeColor = $root.attr('data-bgcolor') || '#fff';	
		settings.shapeColor2 = $root.attr('data-bgcolor2') || '#fff';
		settings.isShapeGradient = $root.attr('data-bgcolor2') !== undefined;
		settings.shapeGradientType = $root.attr('data-bggradient') || 'h';	
				
		if($root.attr('data-bg-image')){
		
			settings.shapeBGImage = new Image();			
			settings.shapeBGImage.onload = function(){
				settings.shapeBGImage.loaded = true;
				$root.trigger('image-loaded', [settings]);
			};
			settings.shapeBGImage.src = $root.attr('data-bg-image');
		}

		if($root.attr('data-image')){
			
			settings.shapeImage = new Image();			
			settings.shapeImage.onload = function(){
				settings.shapeImage.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.shapeImage.src = $root.attr('data-image');
		}			
	};
	
	/**
	* init path properties
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var initPathProperties = function(userOptions, $root, settings){
		
		//path properties
		settings.strokeColor = $root.attr('data-path-bgcolor') || '#000';
		settings.strokeColor2 = $root.attr('data-path-bgcolor2') || '#000';
		settings.isPathGradient = $root.attr('data-path-bgcolor2') !== undefined;
		settings.strokeWidth = Number($root.attr('data-path-width')) || 0;
		settings.strokeGradientType = $root.attr('data-path-gradient') || 'h';	
		
		if(settings.strokeWidth < 0){
			settings.strokeWidth = 0;
		}
		
		settings.strokeColorActive = $root.attr('data-path-bgcolor-active') || '#888';
		settings.strokeColorActive2 = $root.attr('data-path-bgcolor-active2') || '#888';
		settings.isStrokeColorActiveGradient = $root.attr('data-path-bgcolor-active2') !== undefined;
		settings.strokeColorActiveGradientType = $root.attr('data-path-bgcolor-active-gradient') || 'h';

		if($root.attr('data-path-bg-image')){
		
			settings.strokeImage = new Image();			
			settings.strokeImage.onload = function(){
				settings.strokeImage.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.strokeImage.src = $root.attr('data-path-bg-image');
		}	
		
		if($root.attr('data-path-bg-image-active')){
		
			settings.strokeImageActive = new Image();			
			settings.strokeImageActive.onload = function(){
				settings.strokeImageActive.loaded = true;
				$root.trigger('image-loaded', [settings]);
			};
			settings.strokeImageActive.src = $root.attr('data-path-bg-image-active');
		}
		
		if($root.attr('data-path-image')){		
			
			settings.pathImage = new Image();
			
			settings.pathImage.onload = function(){
				settings.pathImage.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.pathImage.src = $root.attr('data-path-image');
		}	
	};
	
	/**
	* init handle properties
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var initHandleProperties = function(userOptions, $root, settings){
		
		//handler properties
		settings.handleColor = $root.attr('data-handle-color') || '#ff0000';
		settings.handleColor2 = $root.attr('data-handle-color2') || '#ff0000';
		settings.handle2Color = $root.attr('data-handle2-color') || '#ff0000';
		settings.handle2Color2 = $root.attr('data-handle2-color2') || '#ff0000';
		settings.isHandleGradient = $root.attr('data-handle-color2') !== undefined;	
		settings.isHandle2Gradient = $root.attr('data-handle2-color2') !== undefined;	
		settings.handleGradientType = $root.attr('data-handle-gradient') || 'h';
		settings.handleGradientType2 = $root.attr('data-handle2-gradient') || 'h';
		
		//angle settings
		settings.angle = jQuery.fn.circleSlider.vectors.toPositiveAngle(Number($root.attr('data-angle')) || 0);
		settings.angle2 = jQuery.fn.circleSlider.vectors.toPositiveAngle(Number($root.attr('data-angle2')) || 0);
		settings.angle2Defined = $root.attr('data-angle2') !== undefined;
		
		settings.isRange = $root.attr('data-range') === 'true';
		
		settings.start = jQuery.fn.circleSlider.vectors.toPositiveAngle(Number($root.attr('data-start')) || 0);
		settings.end = jQuery.fn.circleSlider.vectors.toPositiveAngle(Number($root.attr('data-end')) || 360);
		
		if($root.attr('data-handle-bg-image')){
			
			settings.handleImage = new Image();			
			settings.handleImage.onload = function(){
				settings.handleImage.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.handleImage.src = $root.attr('data-handle-bg-image');
		}	
		
		if($root.attr('data-handle2-bg-image')){
		
			settings.handle2Image = new Image();			
			settings.handle2Image.onload = function(){
				settings.handle2Image.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.handle2Image.src = $root.attr('data-handle2-bg-image');
		}	
	};
	
	/**
	* init shadow properties
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var initShadowProperties = function(userOptions, $root, settings){
		
		//shadows
		settings.isBgShadow = $root.attr('data-bgshadow') === 'true';
		settings.isHandleShadow = $root.attr('data-handle-shadow') === 'true';
		
		if(settings.isBgShadow){
		
			settings.bgshadowColor = $root.attr('data-bgshadow-color') || '#000';	
			settings.bgshadowBlur = Number($root.attr('data-bgshadow-blur')) || 10;	
			settings.bgshadowOffsetX = Number($root.attr('data-bgshadow-x')) || 0;	
			settings.bgshadowOffsetY = Number($root.attr('data-bgshadow-y')) || 0;
		}
		
		if(settings.isHandleShadow){
			settings.handleShadowColor = $root.attr('data-handle-shadow-color') || '#000';	
			settings.handleShadowBlur = Number($root.attr('data-handle-shadow-blur')) || 10;	
			settings.handleShadowOffsetX = Number($root.attr('data-handle-shadow-x')) || 0;	
			settings.handleShadowOffsetY = Number($root.attr('data-handle-shadow-y')) || 0;
		}
	};
	
	/**
	* get radiuses
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var getRadiuses = function(userOptions, $root, settings){
		
		settings.radius = Number($root.attr('data-radius')) || 100;
		settings.radius2 = settings.radius;
		settings.isEllipse = false;
		settings.radius2Scale = 1;
		
		if($root.attr('data-radius2') !== undefined){
			
			settings.isEllipse = true;
			settings.radius2 = Number($root.attr('data-radius2')) || 0;
		}		
	};
	
	/**
	* get effects
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var getEffects = function(userOptions, $root, settings){
		
		var effects = $root.attr('data-effects')
			,list
			,effect;
		
		settings.effects = [];
		
		if(effects){
		
			effects = effects.split(' ');
			
			for(var i=0; i<effects.length; i++){
				
				effect = $.trim(effects[i]);
				
				if(effect){
					settings.effects.push(effect);
				}
			}
		}
	};
	
	/**
	* init arrow properties
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @param {Object} settings
	*/
	var initArrowProperties = function(userOptions, $root, settings){
		
		settings.hasArrow = $root.attr('data-arrow') === 'true';
		settings.arrowWidth = Number($root.attr('data-arrow-width')) || 5;
		settings.arrowColor = $root.attr('data-arrow-color') || '#000';
		
		if($root.attr('data-arrow-bg-image')){
			
			settings.arrowBGImage = new Image();			
			settings.arrowBGImage.onload = function(){
				settings.arrowBGImage.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.arrowBGImage.src = $root.attr('data-arrow-bg-image');
		}	
		
		if($root.attr('data-arrow-image')){
			
			settings.arrowImage = new Image();			
			settings.arrowImage.onload = function(){
				settings.arrowImage.loaded = true;
				$root.trigger('image-loaded', [settings]);				
			};
			settings.arrowImage.src = $root.attr('data-arrow-image');
		}	
	};
	
	/**
	* get circle slider settings	
	* @param {Object} userOptions
	* @param {jQueryObject} $root
	* @return {Object} settings
	*/
	jQuery.fn.circleSlider.settings.get = function(userOptions, $root){
		
		var settings = {};
		
		//common properties		
		settings.padding = Number($root.attr('data-padding')) || 0;
		settings.mousewheelStep = Number($root.attr('data-mousewheel-step')) || 2;
		settings.callback = function(){};
		
		//get radiuses
		getRadiuses(userOptions, $root, settings);
		
		//init bg properties
		initBgProperties(userOptions, $root, settings);
		
		//init path properties
		initPathProperties(userOptions, $root, settings);
		
		//init handle properties
		initHandleProperties(userOptions, $root, settings);		
		
		//init shadow properties
		initShadowProperties(userOptions, $root, settings);	

		//get effects
		getEffects(userOptions, $root, settings);

		//init arrow properties
		initArrowProperties(userOptions, $root, settings);		
		
		//init handle radius
		settings.handleRadius = Number($root.attr('data-handle-radius')) || (settings.strokeWidth / 2);
		
		if(settings.isEllipse){			
			settings.radius2Scale = settings.radius2 / settings.radius;
		}	
		
		return jQuery.extend(true, settings, userOptions);
	};
	
})(jQuery);		