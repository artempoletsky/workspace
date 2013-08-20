(function(){
	"use strict";
	
	var fs=require('fs');
	var files=['css/1.css', 'css/2.css'];
	var target='result.css';
	
	var concated='', content, imgcount=0;
	for(var i=0;i<files.length; i++){
	content='';
		try{
			content=fs.readFileSync(files[i]);	
		}catch(e){
			console.log(e.message);
		}
		
		concated+=content;
	}
	fs.writeFileSync(target, concated);
}());