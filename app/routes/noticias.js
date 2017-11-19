module.exports = function(application){

		application.get('/noticias',function(req,res){

				var connection = application.config.dbconnection();
				var noticiasModel = new application.app.models.NoticiasDAO(connection);

				noticiasModel.getNoticias(function(error,result){
					if(error){
					   res.send(error);
				    }	

				    	console.log(result);
					res.render("pages/noticias",{noticias:result});	
				});

		});



	application.get("/noticia",function(req,res){

			var connection = application.config.dbconnection();
			var noticiasModel = new application.app.models.NoticiasDAO(connection);

			noticiasModel.getNoticia(connection,function(error,result){
			
			if(error){
				res.send(error+"\n\n Houve um erro ao tentar recuperar o arquivo de notícia");
			}

				res.render("pages/noticia",{noticia:result});	
			});



	});


}