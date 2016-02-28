function View(model) {
	this._model = model;
	this._drawLogin();
}

View.prototype._drawLogin = function() {
	/* Initialisation des variables champs */
	var loginDiv = '<div id="login"></div>';
	var nameField = '<input class="loginField" id="loginName" type="text" placeholder="Utilisateur">';
	var passField = '<input class="loginField" id="loginPass" type="password" placeholder="Mot de passe">';
	var submitButton = '<span id="lockIcon" class="ui-icon ui-icon-locked"></span>';
	
	/* Ajout des champs à pokenantes.jsp */
	$('body').append(loginDiv);
	$('#login').append(nameField);
	$('#login').append(passField);
	$('#login').append(submitButton);
	
	/* Ajout d'un effet hover au bouton lockIcon : il affichera un verrou ouvert si l'on passe la souris dessus */
	$('#lockIcon').hover(
			function() {$(this).attr('class','ui-icon ui-icon-unlocked')},
			function() {$(this).attr('class','ui-icon ui-icon-locked')}
			);
	
	/* Ajout d'un event click sur le bouton lockIcon */
	$('#lockIcon').click(function() {
		//Si un champ est incomplet: ajout d'un message d'erreur
		if ($('#loginName').val().length <= 0 || $('#loginPass').val().length <= 0) {
			var fieldIncomplete = '<div id="errorLogin" class="animated fadeOut">Complétez tous les champs.</div>';
			$('#errorLogin').remove();
			$('#login').append(fieldIncomplete);
		}
		//Sinon: appel de la fonction de vérification du nom/mdp dans le controlleur
		else {
			checkLogin();
		}
	});
	
	
}