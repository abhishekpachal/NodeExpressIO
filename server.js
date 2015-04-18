var http = require('http');
var url = require('url');
var fs = require('fs');
express = require('express.io');

var app = express().http().io();

app.get('/',function(req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Hello! Try the <a href="/test.html">Test page</a></h1>');
    res.end();
});
		
app.get('/angulartableRT.html',function(req,res){
	var path = url.parse(req.url).pathname;
	fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
		res.write(data, 'utf8');
		res.end();
	});	
});		

app.get('/css/app.css',function(req,res){
	var path = url.parse(req.url).pathname;
	fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(data, 'utf8');
		res.end();
	});	
});

app.get('/css/bootstrap.css',function(req,res){
	var path = url.parse(req.url).pathname;
	fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': 'text/css'});
		res.write(data, 'utf8');
		res.end();
	});
});			

app.get('/lib/angular/angular.js',function(req,res){
	var path = url.parse(req.url).pathname;
		fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(data, 'utf8');
		res.end();
	});	
});

app.get('/js/appstock.js',function(req,res){
var path = url.parse(req.url).pathname;
            fs.readFile(__dirname + path, function(err, data){
if (err){ 
    return send404(res);
}
res.writeHead(200, {'Content-Type': 'text/javascript'});
res.write(data, 'utf8');
res.end();
            });	
});			

app.get('/js/RTcontroller.js',function(req,res){
	var path = url.parse(req.url).pathname;
	fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(data, 'utf8');
		res.end();
	});					
});

app.get('/test.html',function(req,res){
	var path = url.parse(req.url).pathname;
	fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'});
		res.write(data, 'utf8');
		res.end();
	});
});

app.get('/stocks.json',function(req,res){
	var path = url.parse(req.url).pathname;
	fs.readFile(__dirname + path, function(err, data){
		if (err){ 
			return send404(res);
		}
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.write(data, 'utf8');
		res.end();
	});	
});


send404 = function(res){
    res.writeHead(404);
    res.write('404 not found');
    res.end();
};





var msgWrite = 'Text Message';



var serverjson = [
                 {"Product": "REL", "BBP": "10", "BSP": "10.2", "LTP": "10.1" }, 
				 {"Product": "BEL", "BBP": "20", "BSP": "20.4", "LTP": "20"    }, 
				 {"Product": "MTL", "BBP": "50", "BSP": "50.5", "LTP": "50.1"  }, 
				 {"Product": "BSL", "BBP": "100", "BSP": "101", "LTP": "100.2" }
				 ];

// define interactions with client
app.io.route('ready', function(req){
    //send data to client
    setInterval(function(){
        
		for(i=0;i<serverjson.length;i++)
		{
			serverjson[i].BBP = Math.round((parseInt(serverjson[i].BBP) + Math.random())*100)/100;
			serverjson[i].BSP = Math.round((parseInt(serverjson[i].BSP) + Math.random())*100)/100;
			serverjson[i].LTP = Math.round((parseInt(serverjson[i].LTP) + Math.random())*100)/100;
		}
		
		var serverjsonstr = JSON.stringify(serverjson);
		
		req.io.emit('msg', {'msg': serverjsonstr});
		req.io.emit('showMsg', {'msgWrite':msgWrite});
    }, 1000);

});

app.io.route('client_data', function (req) {
	 console.log(req.data.text);
	 msgWrite = req.data.text;
	 app.io.room(req.data.letter).broadcast('showMsg', {
      'msgWrite':msgWrite,
    });
});

app.listen(8001);