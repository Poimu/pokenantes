function View(model) {
	this._model = model;
	this._drawLogin();
}

View.prototype._drawLogin = function() {
	var loginDiv = '<div id="login"></div>';
	var nameField = '<input class="loginField" id="loginName" type="text" placeholder="Utilisateur">';
	var passField = '<input class="loginField" id="loginPass" type="password" placeholder="Mot de passe">';
	var submitButton = '<span id="lockIcon" class="ui-icon ui-icon-locked"></span>';
	$('body').append(loginDiv);
	$('#login').append(nameField);
	$('#login').append(passField);
	$('#login').append(submitButton);
}