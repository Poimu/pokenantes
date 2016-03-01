function View(model) {
	this._model = model;
	this._drawLogin();
}

View.prototype = new EventEmitter();

View.prototype._drawLogin = function() {
	/* Initialisation des variables champs */
	var loginDiv 	 = '<div id="login"></div>';
	var nameField 	 = '<input class="loginField" id="loginName" type="text" placeholder="Utilisateur">';
	var passField 	 = '<input class="loginField" id="loginPass" type="password" placeholder="Mot de passe">';
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
	$('#lockIcon').click(this._checkLogin.bind(this));
}

View.prototype._checkLogin = function () {
	//Si un champ est incomplet: ajout d'un message d'erreur
	if ($('#loginName').val().length <= 0 || $('#loginPass').val().length <= 0) {
		var fieldIncomplete = '<div id="errorLogin" class="animated fadeOut">Complétez tous les champs.</div>';
		$('#errorLogin').remove();
		$('#login').append(fieldIncomplete);
	}
	//Sinon: appel de la fonction de vérification du nom/mdp dans le controlleur
	else {
		this.emit('tryLogin');
	}
}

View.prototype._drawBoard = function() {
	var board 	    = '<div id="board"></div>';
	var boardHeader     = '<div id="boardHeader"></div>';
	var boardProducts   = '<div id="boardProducts"></div>';
	//Les variables du header.
	var headerId 	    = '<div id="headerId" class="headerField">Identifiant</div>';
	var headerName      = '<div id="headerName" class="headerField">Nom</div>';
	var headerStock     = '<div id="headerStock" class="headerField">Stock</div>';
	var headerCondition = '<div id="headerCondition" class="headerField">État</div>';
	var headerOrigin    = '<div id="headerOrigin" class="headerField">Provenance</div>';
	var headerColor     = '<div id="headerColor"  class="headerField">Couleur dominante</div>';
	var headerSize      = '<div id="headerSize" class="headerField">Taille</div>';
	var headerKind      = '<div id="headerKind" class="headerField">Type</div>';
	var headerPic       = '<div id="headerPic" class="headerField">Photo</div>';
	//Les variables pour chaque produit.
	var productLine     = '<div class="productLine"></div>';
	var productId	    = '<div class="productId"></div>';
	var productName     = '<div class="productName"></div>';
	var productStock    = '<div class="productStock"></div>';
	var productCondition= '<div class="productCondition"></div>';
	var productOrigin   = '<div class="productOrigin"></div>';
	var productColor    = '<div class="productColor"></div>';
	var productSize     = '<div class="productSize"></div>';
	var productKind     = '<div class="productKind"></div>';
	var productPic      = '<div class="productPic"></div>';
	
	$('body').append(board);
	$('#board').append(boardHeader);
	$('#boardHeader').append(headerId);
	$('#boardHeader').append(headerName);
	$('#boardHeader').append(headerStock);
	$('#boardHeader').append(headerCondition);
	$('#boardHeader').append(headerOrigin);
	$('#boardHeader').append(headerColor);
	$('#boardHeader').append(headerSize);
	$('#boardHeader').append(headerKind);
	$('#boardHeader').append(headerPic);
	
	$('#board').append(boardProducts)
	for (var i = 0; i < productsList.length; i++) {
	    $('#boardProducts').append(productLine);
	}
	
}

View.prototype._loginSuccess = function(){
	var context = this;
	$('body').empty();
	var deconnectButton = '<button id="relogin" type="button" name="deconnexion">Déconnexion</button>';
	$('body').append(deconnectButton);
	$('#relogin').click(function(){
		$('#relogin').remove();
		$('#login').remove();
		context._drawLogin();
	});
}

View.prototype._drawAddForm = function(){
	var formuArticle = '<form id ="formu"></form>';
	var idArticle = '<input id="idArticle" type="text" placeholder="Id article">';
	var nameArticle = '<input id="nameArticle" type="text" placeholder="Nom article">';
	var colorArticle = '<input id="colorArticle" type="text" placeholder="Couleur article">';
	var sizeArticle = '<input id="sizeArticle" type="text" placeholder="Taille article">';
	var originArticle = '<input id="originArticle" type="text" placeholder="Provenance article">';
	var qtyArticle = '<input id="qtyArticle" type="number">';
	var comStateArticle = '<input id="comState" type="radio" name="etat" value="commercialisable">Commercialisable';
	var defectiveStateArticle = '<input id="defectiveState" type="radio" name="etat" value="defective">Défectueux';
	var selectTypeArticle = '<select id="selectTypeArticle">';
	var tshirtArticle = '<option id="tshirt" value="Tshirt">Tshirt</option>';
	var bookArticle = '<option id="book" value="Livre">Livre</option>';
	var cdArticle = '<option id="cd" value="CD">CD</option>';
	var returnLine = '<br>';
	
	$('body').append(formuArticle);
	$('#formu').append(idArticle);
	$('#formu').append(returnLine);
	$('#formu').append(nameArticle);
	$('#formu').append(returnLine);
	$('#formu').append(colorArticle);
	$('#formu').append(returnLine);
	$('#formu').append(sizeArticle);
	$('#formu').append(returnLine);
	$('#formu').append(originArticle);
	$('#formu').append(returnLine);
	$('#formu').append(qtyArticle);
	$('#formu').append(returnLine);
	$('#formu').append(comStateArticle);
	$('#formu').append(defectiveStateArticle);
	$('#formu').append(returnLine);
	$('#formu').append(selectTypeArticle);
	$('#selectTypeArticle').append(tshirtArticle);
	$('#selectTypeArticle').append(bookArticle);
	$('#selectTypeArticle').append(cdArticle);
	
}