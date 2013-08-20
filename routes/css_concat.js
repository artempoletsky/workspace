(function(){
	"use strict";
	
	var files=['css/1.css', 'css/2.css'];
	var target='./result.css';
	
	var imagesFolder='img';
	
	
	var fs=require('fs');
	var util=require('util');
	
	
	
	
	var copy=function(inFile, outFile){
		util.debug('copy '+inFile+' '+outFile);
		fs.writeFileSync(outFile, fs.readFileSync(inFile));		
	};
	
	var dirname=function(path){
		return path.replace(/(.*\/)[^\/\\]+$/, '$1');
	}
	
	var extension=function(path){		
		return /[^\.]+$/.exec(path)[0];
	}
	
	var targetDir=dirname(target);
	
	
	fs.mkdirSync(targetDir+imagesFolder);
	
	var concated='', content, imgcount=0;
	for(var i=0;i<files.length; i++){
	content='';
	var currentCssName=files[i];
		try{
			content=fs.readFileSync(currentCssName);	
		}catch(e){
			console.log(e.message);
		}
		var currentDir=dirname(currentCssName);
		content=String(content).replace(/url\(['"]?(.*?)['"]?\)/g, function(match, url){
			var newName=imagesFolder+'/'+imgcount+'.'+extension(url);
			var oldPath=currentDir+url;
			if(fs.existsSync(oldPath)){
			imgcount++;
			copy(oldPath,targetDir+newName)
		return 'url('+newName+')';
			}
			return match;
		});
		concated+=content;
	}
	fs.writeFileSync(target, concated);
}());