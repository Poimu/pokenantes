function Controller(model, view) {
	this._model = model;
	this._view = view;
	//this._tryLogin();
	this._deleteProduct();
	this._TESTreturnBoard();
	this._addQuantity();
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

Controller.prototype._TESTreturnBoard =  function() {
	var context = this;
	$.post({
		url: "trylogin",  					//URL à laquelle la requête AJAX est envoyée. L'action Login est mappée avec cette URL.		
	}).done(function(data) {					//Si la requête reçoit un success : un remplit la liste des produits dans notre modèle.
		data.productsList.forEach(function(product) {
			context._model._productsList.push(product);
			context._model._pushSupplier(product);
		});
		context._view._drawBoard();
	}).fail(function( jqXHR, textStatus ) {				//Si la requête ne reçoit pas un success.
		console.log("Login Refusé : " + textStatus);
	})
}

Controller.prototype._addQuantity = function() {
	var context = this;
	context._view.on('editQty', function(data) {	
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
