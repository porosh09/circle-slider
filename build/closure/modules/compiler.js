/**
* globals
*/
var fs = require('fs')
	,PACKAGE_JSON_PATH = './package.json';
	
/**
* get version from package.json, increment it and return new version
* @return {string}
*/
var getVersion = function(packageJsonPath){

	var version = null
		,versionSections = []
		,packageJson
		,last
		,json;
	
	//read package.json
	packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')); 

	//get version from package.json
	version = packageJson['version'];
	
	if(version){
	
		//get version sections
		versionSections = version.split('.');
		
		if(versionSections.length === 3){
			
			//get last section
			last = Number(versionSections[2]);
			
			if(!isNaN(last)){
			
				//increment
				last++;
				
				//create new version
				version = versionSections[0] + '.' + versionSections[1] + '.' + last;
				
				//update version
				packageJson['version'] = version;
				
				//get json as string
				json = JSON.stringify(packageJson, null, '\t');
				
				//save package.json
				fs['writeFileSync'](packageJsonPath, json, 'utf8');
			}
		}
	}
	
	return version;
};

/**
* update version in the given file
* @param {string} newVersion
* @param {string} filePath
* @param {string} replaceMacro
*/
var updateVersion = function(newVersion, filePath, replaceMacro){
	
	var regex = new RegExp(replaceMacro, 'g')
		,fileContent;
	
	//read file
	fileContent = fs.readFileSync(filePath, 'utf8'); 
	
	//update version
	fileContent = fileContent.replace(regex, newVersion);
	
	//save file
	fs['writeFileSync'](filePath, fileContent, 'utf8');
};

/**
* compile with google closure compiler
* @param {Array.<string>} targets
* @param {Array.<string>} files
* @param {string} externs 
*/
var compile = function(targets, files, externs){

	var ClosureCompiler = require('closurecompiler')
		,version
		,target;
	
	//compile with google closure compiler
	ClosureCompiler.compile(
		files
		,{
			// Options in the API exclude the "--" prefix
			compilation_level: "SIMPLE_OPTIMIZATIONS" //WHITESPACE_ONLY, SIMPLE_OPTIMIZATIONS, ADVANCED_OPTIMIZATIONS
			
			,warning_level: "VERBOSE" //QUIET | DEFAULT |  VERBOSE

			// Capitalization does not matter 
			//,Formatting: "PRETTY_PRINT"

			// If you specify a directory here, all files inside are used
			,externs: externs
			
			,process_jquery_primitives: true

			// ^ As you've seen, multiple options with the same name are
			//   specified using an array.
			//...
		}
		,function(error, result) {
		
			//display error/warnings
			console.log(error);
			
			if (result) {
				//write result to file			
				//console.log(result);
				
				//get version from package.json, increment it and return new version
				version = getVersion(PACKAGE_JSON_PATH);
				
				for(var i=0; i<targets.length; i++){
					
					//get target
					target = targets[i];
					
					//write file		
					fs['writeFileSync'](target, result, 'utf8');					

					if(version != null){
							
						//update version in the target file
						updateVersion(version, target, '##VERSION##');						
					}
				}
			} 
		}
	);
};

/**
* EXPORTS: compile with google closure compiler
* @param {Array.<string>} targets
* @param {Array.<string>} files
* @param {string} externs 
*/
exports.compile = function(targets, files, externs){
	compile(targets, files, externs);
};
