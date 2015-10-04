;(function(jQuery){
	'use strict';
	
	/**
	* aliases
	*/
	var vectorsAlias = jQuery.fn.circleSlider.vectors;
	
	/**
	* normalize vector - it's length should be 1: |v| = 1
	* @param {Object} v
	*/
	vectorsAlias.normalize = function(v){
		
		var length = vectorsAlias.getVectorLength(v);
		
		if(length === 0){
			return {
				x: 0
				,y: 0
			};
		}
		else{
		
			return {
				x: v.x / length
				,y: v.y / length
			};
		}
	};
		
	/**
	* multiplication by a scalar
	* @param {Object} v - vector
	* @param {Number} s - scalar
	* @return {Object} vector
	*/
	vectorsAlias.mulScalar = function(v, s){
		
		return {
			x: v.x * s
			,y: v.y * s
		};
	};
	
	/**
	* get vector length
	* @param {Object} v - vector
	* @return {number}
	*/
	vectorsAlias.getVectorLength = function(v){		
		return Math.sqrt(v.x * v.x + v.y * v.y);
	};
	
	/**
	* subtraction of 2 vectors (to find out the direction between to objects)
	* @param {Object} v1 - vector #1
	* @param {Object} v2 - vector #2
	*/
	vectorsAlias.sub = function(v1, v2){
		
		return {
			x: v1.x - v2.x
			,y: v1.y - v2.y
		};
	};
	
	/**
	* true if point is inside circle
	* (x - center_x)^2 + (y - center_y)^2 < radius^2.
	* @param {number} pointX
	* @param {number} pointY
	* @param {number} circleCenterX
	* @param {number} circleCenterY
	* @param {number} circleRadius
	* @return {boolean}
	*/
	vectorsAlias.isPointInsideCircle = function(pointX, pointY, circleCenterX, circleCenterY, circleRadius){
		
		var temp1 = (circleCenterX - pointX)*(circleCenterX - pointX);
		var temp2 = (circleCenterY - pointY)*(circleCenterY - pointY);
		var temp3 = circleRadius*circleRadius;
		
		return temp1 + temp2 <= temp3;
	};
	
	/**
	* get radians by degrees
	* @param {number} degrees
	* @return {number}
	*/
	vectorsAlias.getRadians = function(degrees){
		return degrees * Math.PI / 180;
	};
	
	/**
	* get degrees by radians
	* @param {number} radians
	* @return {number}
	*/
	vectorsAlias.getDegrees = function(radians){
		return radians * 180 / Math.PI;
	};
		
	/**
	* get angle by mouse position
	* @param {Object} canvasPos
	* @param {Object} shapeCenter
	* @param {number} mouseX
	* @param {number} mouseY
	* @return {number} angle in degrees
	*/
	vectorsAlias.getAngleByMousePosition = function(canvasPos, shapeCenter, mouseX, mouseY){
		
		var mouseVector
			,vector
			,angle;
		
		mouseVector = {
			x: mouseX - canvasPos.left 
			,y: mouseY - canvasPos.top
		};
		
		//get the vector representing the mouse's position relative to the point...
		vector = vectorsAlias.sub(mouseVector, shapeCenter);
		 
		//use atan2 to get the angle; Atan2 returns radians
		angle = vectorsAlias.getDegrees(Math.atan2(vector.y, vector.x));
		 
		//angle will be in the range (-180,180] -> normalizing to [0,360)
		if (angle < 0){
			angle += 360;
		}
			 
		return angle;
	};
		
	/**
	* convert negative angle to positive
	* @param {number} angle negative
	* @return {number} anglepositive
	*/
	vectorsAlias.toPositiveAngle = function(angle){
		
		if(angle !== 360){
			angle = Math.round(angle) % 360;
		}
		
		while (angle < 0){
			angle += 360;
		}
		
		return angle;
	};
	
	/**
	* true if angle between 2 other angles
	* @param {number} angle in degrees
	* @param {number} start angle in degrees
	* @param {number} end angle in degrees
	* @return {boolean}
	*/
	vectorsAlias.ifAngleInRange = function(angle, start, end){
		
		var angleRad = vectorsAlias.getRadians(angle);
		var startRad = vectorsAlias.getRadians(start);
		var endRad = vectorsAlias.getRadians(end);
		
		if(startRad > endRad){
			return angleRad >= startRad || angleRad <= endRad;
		}
		else{
			return angleRad >= startRad && angleRad <= endRad;
		}
	};
	
})(jQuery);