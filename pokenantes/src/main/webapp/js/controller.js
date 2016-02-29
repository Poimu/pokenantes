function Controller(model, view) {
	this._model = model;
	this._view = view;
	this._tryLogin();
}

Controller.prototype._tryLogin = function() {
	this._view.on('tryLogin', function() {
		var name = $('#loginName').val();
		var password = $('#loginPass').val();
		
		/* AJAX POST des données contenues dans les champs loginName & loginPass */
		$.post({
			url: "trylogin",  						//URL à laquelle la requête AJAX est envoyée. L'action Login est mappée avec cette URL.
			data: {									//Données envoyées. On envoie une variable utilisateur & une variable motdepasse.	
				utilisateur: name,
				motdepasse: password
			}		
		}).done(function(data) {					//Si la requête reçoit un success.
			
		}).fail(function( jqXHR, textStatus ) {		//Si la requête ne reçoit pas un success.
			console.log("Login Refusé");
		})
	})
}
