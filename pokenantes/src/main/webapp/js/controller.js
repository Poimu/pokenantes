function Controller(model, view) {
	this._model = model;
	this._view = view;
	//this._tryLogin();
	this._deleteProduct();
	this._updateQuantity();
	this._sendProductForm();
	this._TESTreturnBoard();

}

Controller.prototype._tryLogin = function() {
	var context = this;
	context._view.on('tryLogin', function() {
		var name = $('#loginName').val();
		var password = $('#loginPass').val();
		
		/* AJAX POST des données contenues dans les champs loginName & loginPass */
		$.post({
			url: "trylogin",  					//URL à laquelle la requête AJAX est envoyée. L'action Login est mappée avec cette URL.
			data: {							//Données envoyées. On envoie une variable utilisateur & une variable motdepasse.	
				utilisateur: name,
				motdepasse: password
			}		
		}).done(function(data) {					//Si la requête reçoit un success.
			data.productsList.forEach(function(product) {
				context._model._productsList.push(product);
				context._model._pushSupplier(product);
			});
		}).fail(function( jqXHR, textStatus ) {				//Si la requête ne reçoit pas un success.
			console.log("Login Refusé : " + textStatus);
		})
	})
}

Controller.prototype._deleteProduct = function() {
    var context = this;
    context._view.on('deleteProduct', function(deleteData) {
	$.post({
	    url: "deleteProduct",
	    data: {
		idarticle: deleteData.idarticle
	    }
	}).done(function(data) {
	    console.log("Removed product id : " + data.idarticle);
	}).fail(function(jqXHR, textStatus) {
	    console.log("product not deleted");
	})
    })
}

Controller.prototype._updateQuantity = function() {
	var context = this;
	context._view.on('updateQuantity', function(data) {	
		$.post({
			url: "editQty",  					//URL à laquelle la requête AJAX est envoyée. L'action Login est mappée avec cette URL.
			data: {							//Données envoyées.
				updatedQty: data.newQty,
				idarticle: data.idarticle
			}		
		}).done(function(data) {					//Si la requête reçoit un success.
			console.log("Product edited ");
		}).fail(function( jqXHR, textStatus ) {				//Si la requête ne reçoit pas un success.
			console.log("Product not edited");
		})
	})
}

Controller.prototype._sendProductForm = function() {
    var context = this;
    context._view.on('sendProductForm', function() {
	var form = $('#addProductForm');
	var formdata = new FormData(form[0]);
	var data = (formdata !== null) ? formdata : form.serialize();
	$.post({
	    url: 'addProduct',
	    contentType: false,
	    processData: false,
	    data: data,
	}).done(function(data) {
	    console.log("Bien envoyé");
	    context._model._addProduct(data.article);
	    context._model._pushSupplier(data.article);
	    console.log(data.fournisseur);
	}).fail(function() {
	    console.log("Pas envoyé");
	})
    });
}

Controller.prototype._TESTreturnBoard =  function() {
	var context = this;
	$.post({
		url: "trylogin",  					//URL à laquelle la requête AJAX est envoyée. L'action Login est mappée avec cette URL.		
	}).done(function(data) {					//Si la requête reçoit un success : un remplit la liste des produits dans notre modèle.
		context._view._drawBoard();
		data.productsList.forEach(function(product) {
			context._model._pushSupplier(product);
			context._model._addProduct(product);
		});
		
	}).fail(function( jqXHR, textStatus ) {				//Si la requête ne reçoit pas un success.
		console.log("Login Refusé : " + textStatus);
	})
}
