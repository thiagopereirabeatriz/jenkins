module.exports = function(application){


	
    //Rota /Noticias/Adicionar
	application.get("/noticias/adicionar",function(req,res){

		res.render("pages/formAddNoticia",{validacao:{},noticia:{}});
	});





	// Rota Noticias/Salvar
	application.post('/noticias/salvar',function(req,res){

		var noticia = req.body

		req.assert('titulo','Título é obrigatório').notEmpty();
		req.assert('resumo','Resumo é obrigatório').notEmpty();
		req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10,100);
		req.assert('autor','Autor é obrigatório').notEmpty();
		req.assert('data_noticia','Data é obrigatório').notEmpty().isDate({format:'YYYY-MM-DD'});

		var errors = req.validationErrors();


		if(errors){
			res.render("pages/formAddNoticia",{validacao:errors,noticia:noticia});
			return;
			
		}

		
		var connection = application.config.dbconnection();
		var noticiasModel = new application.app.models.NoticiasDAO(connection);



		noticiasModel.save(noticia,function(error,result){
			res.redirect('/noticias');
		});

		

	});

}