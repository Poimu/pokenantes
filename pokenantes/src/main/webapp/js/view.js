function View(model) {
	this._model = model;
	this._drawLogin();
}

View.prototype._drawLogin = function() {
	$('body').append('La vue fonctionne');
}