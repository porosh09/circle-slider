var compiler = require('./modules/compiler.js');

/**
* emtry point
*/
var init = (function(){
	
	var self = {
	
		//libs
		fs: require('fs')
		,path: require('path')				
		,packageJson: null
		,files: []
		,externs: []
		,targets: []
	};
	
	//init externs
	self.externs = ['closure/externs/jquery-1.7.externs.js'];
		
	//init target paths
	self.targets = [
		'../js/circle-slider.min.js'
	];	
	
	//load package.json
	self.packageJson = JSON.parse(self.fs.readFileSync('package.json', 'utf8')); 
		
	//init files list
	self.files = self.packageJson['source-files'];
	
	//compile with google closure compiler
	compiler.compile(self.targets, self.files, self.externs);
	
})();

