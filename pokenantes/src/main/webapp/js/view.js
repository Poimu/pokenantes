function View(model) {
	this._model = model;
	this._drawLogin();
	this._checkLogin;
	this._drawBoard;
	this._loginSuccess;
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
    	var context	    = this;
    
	var board 	    = '<div id="board"></div>';
	var boardHeader     = '<div id="boardHeader"></div>';
	var boardProducts   = '<div id="boardProducts"></div>';
	var addProductButton= '<div id="addProductButton">Ajouter un produit</div>'
	//Les variables du header.
	var headerId 	    = '<div id="headerId" class="headerField">Identifiant</div>';
	var headerName      = '<div id="headerName" class="headerField">Nom</div>';
	var headerStock     = '<div id="headerStock" class="headerField">Stock</div>';
	var headerCondition = '<div id="headerCondition" class="headerField">État</div>';
	var headerOrigin    = '<div id="headerOrigin" class="headerField">Provenance</div>';
	var headerColor     = '<div id="headerColor"  class="headerField">Couleur</div>';
	var headerSize      = '<div id="headerSize" class="headerField">Taille</div>';
	var headerKind      = '<div id="headerKind" class="headerField">Type</div>';
	var headerPic       = '<div id="headerPic" class="headerField">Photo</div>';
	var headerDelete    = '<div class="deleteButtonHeader"></div>'
	//Les variables pour chaque produit.
	var productLine     = '<div class="productLine"></div>';
	var productCode	    = '<div class="productCode blockField"></div>';
	var productName     = '<div class="productName blockField"></div>';
	var productStock    = '<div class="productStock blockField"></div>';
	var stockValue	    = '<div class="stockValue"></div>';
	var stockInput	    = '<input type="text" class="stockInput" placeholder="Quantité">';
	var stockButtons    = '<div class="stockButtons"></div>'
	var stockAdd  	    = '<div class="stockAdd ui-icon ui-icon-plus"></div>';
	var stockRemove	    = '<div class="stockRemove ui-icon ui-icon-minus"></div>';
	var productCondition= '<div class="productCondition blockField"></div>';
	var productOrigin   = '<div class="productOrigin blockField"></div>';
	var productColor    = '<div class="productColor blockField"></div>';
	var productSize     = '<div class="productSize blockField"></div>';
	var productKind     = '<div class="productKind blockField"></div>';
	var productPic      = '<div class="productPic blockField"></div>';
	var productDelete   = '<div class="deleteProduct ui-icon ui-icon-trash">deleteProduct</div>'
	//Les variables pour chaque fournisseur.
	var supplierLine    = '<div class="supplierLine" style="display: none;"></div>';
	var supplierName    = '<div class="supplierName supplierField"><b>Nom du fournisseur :&nbsp</b></div>';
	var supplierType    = '<div class="supplierType supplierField"><b>Type de fournisseur :&nbsp</b></div>';
	var supplierPhone   = '<div class="supplierPhone supplierField"><b>Téléphone du fournisseur :&nbsp</b></div>';
	var supplierAddress = '<div class="supplierAddress supplierField"><b>Adresse du fournisseur :&nbsp</b></div>';
	
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
	$('#boardHeader').append(headerDelete);
	$('#board').append(boardProducts)
	
	/* Ajout des détails de chaque produit */
	for (var i = 0; i < context._model._productsList.length; i++) {
	    var productBlock       = '<div data-id="' + i + '" class="productBlock"></div>';
	    var currentBlock       = '[data-id="' + i + '"]';
	    var currentProductDiv  = '.productLine:last';
	    var currentSupplierDiv = '.supplierLine:last';
	    var product            = context._model._productsList[i];
	    	    
	    $('#boardProducts').append(productBlock);
	    $(currentBlock).append(productLine);
	    $(currentProductDiv).append(productCode);
	    $('.productCode:last').append(product.codearticle);
	    $(currentProductDiv).append(productName);
	    $('.productName:last').append(product.nomarticle);
	    
	    $(currentProductDiv).append(productStock);
	    $('.productStock:last').append(stockValue);
	    $('.stockValue:last').append(product.quantitearticle);
	    if (product.quantitearticle <= 0) $('.stockValue:last').addClass('error');
	    $('.productStock:last').append(stockInput);
	    $('.productStock:last').append(stockButtons);
	    $('.stockButtons:last').append(stockAdd);
	    $('.stockButtons:last').append(stockRemove);
	    
	    $(currentProductDiv).append(productCondition);
	    $('.productCondition:last').append(product.etatarticle);
	    $(currentProductDiv).append(productOrigin);
	    $('.productOrigin:last').append(product.provenancearticle);
	    $(currentProductDiv).append(productColor);
	    $('.productColor:last').append(product.couleurarticle);
	    $(currentProductDiv).append(productSize);
	    $('.productSize:last').append(product.taillearticle);
	    $(currentProductDiv).append(productKind);
	    $('.productKind:last').append(product.typearticle);
	    $(currentProductDiv).append(productPic);
	    $('.productPic:last').append(product.photoarticle);
	    $(currentProductDiv).append(productDelete);
	    
	    
	    /* Gestion des clicks sur le tableau de bord */
	    $(currentBlock).click(function(event) {
		var supplier  = context._model._productsList[$(this).data('id')].clefournisseur;
		var productId = context._model._productsList[$(this).data('id')].idarticle;
		
		if ($(event.target).is('.deleteProduct')) { 
		    context.emit('deleteProduct', {idarticle: productId});
		    $(this).remove();
		    return
		}
		
		if ($(event.target).is('.stockInput') || $(event.target).is('.stockAdd') || $(event.target).is('.stockRemove')) {
		    console.log("Ajout stock");
		    return
		}
		
		if ($(this).find('.supplierLine').length) {
		    $('.supplierLine').remove();
		}
		else {
		    $('.supplierLine').remove();
		    $(this).append(supplierLine);
		    $(currentSupplierDiv).append(supplierName);
		    $('.supplierName:last').append(supplier.nomfournisseur);
		    $(currentSupplierDiv).append(supplierType);
		    $('.supplierType:last').append(supplier.typefournisseur);
		    $(currentSupplierDiv).append(supplierPhone);
		    $('.supplierPhone:last').append(supplier.numtelfournisseur);
		    $(currentSupplierDiv).append(supplierAddress);
		    $('.supplierAddress:last').append(supplier.nomadressefournisseur);
		    $(currentSupplierDiv).show('slow');
		}
	    });

	    
	}
	context._drawAddForm(context);
	$('#board').append(addProductButton);
	
}

View.prototype._loginSuccess = function(){
	var context = this;
	$('body').empty();
	var deconnectButton = '<button id="relogin" type="button" name="deconnexion">Déconnection</button>';
	$('body').append(deconnectButton);
	$('#relogin').click(function(){
		$('#relogin').remove();
		$('#login').remove();
		context._drawLogin();
	});
	context._drawBoard();
}

View.prototype._drawAddForm = function(context) {
    
}
