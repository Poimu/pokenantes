function Controller(model, view) {
	this._model = model;
	this._view = view;
}

function checkLogin() {
	/* Initialisation des variables */
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
		console.log(data.msg);					//Pour l'exemple, on log les deux messages issues de l'action
		console.log(data.msg2);
	}).fail(function( jqXHR, textStatus ) {		//Si la requête ne reçoit pas un success.
		console.log("Login Refusé");
	})
}