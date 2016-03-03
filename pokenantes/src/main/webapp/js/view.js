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
	// le formulaire Article
	var formArticle 	 	  = '<form id ="addProductForm"></form>';
	// les variables des div contenues dans le formulaire Article
	var divIdArticle          = '<div id="divIdArticle" class="addFormDiv"> </div>';
	var divNameArticle        = '<div id="divNameArticle" class="addFormDiv"> </div>';
	var divColorArticle       = '<div id="divColorArticle" class="addFormDiv"> </div>';
	var divSizeArticle        = '<div id="divSizeArticle" class="addFormDiv"> </div>';
	var divOriginArticle      = '<div id="divOriginArticle" class="addFormDiv"> </div>';
	var divQtyArticle         = '<div id="divQtyArticle" class="addFormDiv"> </div>';
	var divStateArticle       = '<div id="divStateArticle" class="addFormDiv"> </div>';
	var divSelectTypeArticle  = '<div id="divSelectTypeArticle" class="addFormDiv"> </div>';
	var divPhotoArticle       = '<div id="divPhotoArticle" class="addFormDiv"> </div>';
	
	// les champs descriptions d'un Article
	var descIdArticle         = '<div class="addFormDescription"> Id Article </div>';
	var descNameArticle       = '<div class="addFormDescription"> Nom Article </div>';
	var descColorArticle      = '<div class="addFormDescription"> Couleur Article </div>';
	var descSizeArticle       = '<div class="addFormDescription"> Taille Article </div>';
	var descOriginArticle     = '<div class="addFormDescription"> Provenance Article </div>';
	var descQtyArticle        = '<div class="addFormDescription"> Quantité Article </div>';
	var descStateArticle      = '<div class="addFormDescription"> Etat Article </div>';
	var descSelectTypeArticle = '<div class="addFormDescription"> Type Article </div>';
	var descPhotoArticle      = '<div class="addFormDescription"> Sélectionner Photo Article </div>';
	
	// les champs input d'un Article
	var idArticle 		  	  = '<input id="idArticle" type="text" placeholder="Id article">';
	var nameArticle 	  	  = '<input id="nameArticle" type="text" placeholder="Nom article">';
	var colorArticle 	  	  = '<input id="colorArticle" type="text" placeholder="Couleur article">';
	var sizeArticle 	  	  = '<input id="sizeArticle" type="text" placeholder="Taille article">';
	var originArticle 	 	  = '<input id="originArticle" type="text" placeholder="Provenance article">';
	var qtyArticle 		  	  = '<input id="qtyArticle" type="number">';
	var comStateArticle 	  = '<input id="comState" type="radio" name="etat" value="commercialisable">Commercialisable';
	var defectiveStateArticle = '<input id="defectiveState" type="radio" name="etat" value="defective">Défectueux';
	var selectTypeArticle 	  = '<select id="selectTypeArticle" class="addFormField"></select>';
	var vetArticle 	  		  = '<option id="vet" value="Vet">Vêtements</option>';
	var bookArticle 	 	  = '<option id="book" value="Livre">Livre</option>';
	var cdArticle 		  	  = '<option id="cd" value="CD">CD</option>';
	var photoArticle          = '<input class="input-file" id="photo" type="file">';
	
	$('body').append(formArticle);
	
	$('#addProductForm').append(divIdArticle);
	$('#addProductForm').append(divNameArticle);
	$('#addProductForm').append(divColorArticle);
	$('#addProductForm').append(divSizeArticle);
	$('#addProductForm').append(divOriginArticle);
	$('#addProductForm').append(divQtyArticle);
	$('#addProductForm').append(divStateArticle);
	$('#addProductForm').append(divSelectTypeArticle);
	$('#addProductForm').append(divPhotoArticle);
	
	$('#divIdArticle').append(descIdArticle);
	$('#divNameArticle').append(descNameArticle);
	$('#divColorArticle').append(descColorArticle);
	$('#divSizeArticle').append(descSizeArticle);
	$('#divOriginArticle').append(descOriginArticle);
	$('#divQtyArticle').append(descQtyArticle);
	$('#divStateArticle').append(descStateArticle);
	$('#divSelectTypeArticle').append(descSelectTypeArticle);
	$('#divPhotoArticle').append(descPhotoArticle);
	
	$('#divIdArticle').append(idArticle);
	$('#divNameArticle').append(nameArticle);
	$('#divColorArticle').append(colorArticle);
	$('#divSizeArticle').append(sizeArticle);
	$('#divOriginArticle').append(originArticle);
	$('#divQtyArticle').append(qtyArticle);
	$('#divStateArticle').append(comStateArticle);
	$('#divStateArticle').append(defectiveStateArticle);
	$('#divSelectTypeArticle').append(selectTypeArticle);
	$('#selectTypeArticle').append(vetArticle);
	$('#selectTypeArticle').append(bookArticle);
	$('#selectTypeArticle').append(cdArticle);
	$('#divPhotoArticle').append(photoArticle);

}