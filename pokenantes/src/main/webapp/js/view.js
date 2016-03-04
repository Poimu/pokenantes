function View(model) {
	this._model = model;
	this._drawLogin();
	this._checkLogin;
	this._drawBoard;
	this._loginSuccess;
	this._updateQty();
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
	    var productBlock       = '<div data-id="' + context._model._productsList[i].idarticle + '" class="productBlock"></div>';
	    var currentBlock       = '[data-id="' + context._model._productsList[i].idarticle + '"]';
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
		var supplier  = context._model._getSupplier($(this).data('id'));
		var productId = $(this).data('id');
		
		if ($(event.target).is('.deleteProduct')) { 
		    context.emit('deleteProduct', {idarticle: productId});
		    $(this).remove();
		    return
		}
		
		if ($(event.target).is('.stockRemove')){
			removeQty = ($(this).find($('.stockInput')).val()*(-1)) ;
			context._model._setQty(productId,removeQty);
			context.emit('updateQuantity', {idarticle: productId});
			return
		}
			
		if ($(event.target).is('.stockAdd')){
			removeQty = ($(this).find($('.stockInput')).val()*1) ;
			context._model._setQty(productId,removeQty);
			context.emit('updateQuantity', {idarticle: productId});
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
		    $(currentSupplierDiv).show('fast');
		}
	    });
	}
	context._drawAddSupplier(context);
	$('#board').append(addProductButton);
	$('#addProductButton').click(function() {
	    if ($('#addProductButton').html() == 'Envoyer le formulaire') {
		context.emit('sendProductForm');
	    }
	    else {
		$('#addProductForm').show('fast');
		$('#addProductButton').html('Envoyer le formulaire');
	    }	    
	})
	
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

View.prototype._drawAddSupplier = function(context) {
    var suppliers 	   = context._model._suppliersList; 
    var addProductForm     = '<form id="addProductForm" method="post" style="display: none;" enctype="multipart/form-data"></form>';
    var addProductLine     = '<div class="addProductLine"><div class="addProductTypo"></div></div>';
    var addSupplier        = '<div id="addSupplier"></div>'    
    var selectSupplier     = '<select id="selectSupplier" name="idfournisseur"></select>';
    var addSupplierName    = '<input id="addSupplierName" name="nomfournisseur" type="text" placeholder="Nom fournisseur"></input>';
    var addSupplierType    = '<div id="addSupplierType"></div>';
    var supplierTypePro    = '<div class="addSupplierRadio"><input name="typefournisseur" type="radio" value="Professionnel"><div class="supplierRadioTypo">Professionnel</div></div>';
    var supplierTypeCas    = '<div class="addSupplierRadio"><input name="typefournisseur" type="radio" value="Particulier"><div class="supplierRadioTypo">Particulier</div></div>';
    var addSupplierAddress = '<input id="addSupplierAddress" name="nomadressefournisseur" type="text" placeholder="Adresse fournisseur"></input>';
    var addSupplierPhone   = '<input id="addSupplierPhone" name="numtelfournisseur" type="text" placeholder="Téléphone fournisseur"></input>';
    
    $('#boardProducts').append(addProductForm);
    $('#addProductForm').append(addProductLine);
    $('.addProductTypo:last').append('Sélectionnez un fournisseur');
    $('.addProductLine:last').append(selectSupplier);
    $('#selectSupplier').append('<option class="supplier-option" value="" disabled selected>Renseignez un fournisseur</option>')
    suppliers.forEach(function(supplier) {
	var option = '<option value="' + supplier.idfournisseur + '">' + supplier.nomfournisseur + '</option>';
	$('#selectSupplier').append(option);
    });
    $('#selectSupplier').append('<option value="0"> Nouveau fournisseur </option>');
    $('#selectSupplier').change(function() {
	if ($(this).val() == "0") {
	    $('#addSupplier').remove();
	    $('#addProduct').remove();
	    $('#addProductForm').append(addSupplier);
	    
	    $('#addSupplier').append(addProductLine);
	    $('.addProductTypo:last').append('Nom du fournisseur');
	    $('.addProductLine:last').append(addSupplierName);
	    
	    $('#addSupplier').append(addProductLine);
	    $('.addProductTypo:last').append('Type de fournisseur');
	    $('.addProductLine:last').append(addSupplierType);
	    $('#addSupplierType').append(supplierTypePro);
	    $('#addSupplierType').append(supplierTypeCas);
	    
	    $('#addSupplier').append(addProductLine);
	    $('.addProductTypo:last').append('Adresse du fournisseur');
	    $('.addProductLine:last').append(addSupplierAddress);
	    
	    $('#addSupplier').append(addProductLine);
	    $('.addProductTypo:last').append('Téléphone du fournisseur');
	    $('.addProductLine:last').append(addSupplierPhone);
	    
	    context._drawAddProduct(context, addProductLine);
	}
	else {
	    $('#addSupplier').remove();
	    $('#addProduct').remove();
	    context._drawAddProduct(context, addProductLine);
	}
    })
}

View.prototype._drawAddProduct = function(context, addProductLine) {
    var productTypesList    = ['Vêtement', 'High-Tech', 'Culturel', 'Figurine', 'Carte', 'Autre'];
    var addProduct     	    = '<div id="addProduct"></div>';
    var addProductName 	    = '<input id="addProductName" name="nomarticle" type="text" placeholder="Nom produit"></input>';
    var addProductCode 	    = '<input id="addProductCode" name="codearticle" type="text" placeholder="Code produit"></input>';
    var addProductStock	    = '<input id="addProductStock" name="quantitearticle" type="text" placeholder="Stock initial"></input>';
    var addProductCondition = '<div id="addProductCondition"></div>';
    var conditionRadioBroken= '<div class="productConditionRadio"><input name="etatarticle" type="radio" value="Commercialisable"><div class="supplierRadioTypo">Commercialisable</div></div>';
    var conditionRadioFine  = '<div class="productConditionRadio"><input name="etatarticle" type="radio" value="Défectueux"><div class="supplierRadioTypo">Défectueux</div></div>';
    var addProductOrigin    = '<input id="addProductOrigin" name="provenancearticle" type="text" placeholder="Provenance">';
    var addProductColor     = '<input id="addProductColor" name="couleurarticle" type="text" placeholder="Couleur produit">';
    var addProductSize      = '<input id="addProductSize" name="taillearticle" type="text" placeholder="Taille produit">';
    var selectProductType   = '<select id="selectProductType" name="typearticle"></supplier>';
    var addProductPic       = '<input id="addProductPic" name="photoarticle" type="file" placeholder="Photographie produit">';
    
    $('#addProductForm').append(addProduct);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Nom article');
    $('.addProductLine:last').append(addProductName);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Code article');
    $('.addProductLine:last').append(addProductCode);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Stock initial');
    $('.addProductLine:last').append(addProductStock);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Etat du produit');
    $('.addProductLine:last').append(addProductCondition);
    $('#addProductCondition').append(conditionRadioBroken);
    $('#addProductCondition').append(conditionRadioFine);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Provenance du produit');
    $('.addProductLine:last').append(addProductOrigin);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Couleur produit');
    $('.addProductLine:last').append(addProductColor);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Taille produit');
    $('.addProductLine:last').append(addProductSize);
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Type article');
    $('.addProductLine:last').append(selectProductType);
    productTypesList.forEach(function(type) {
	var option = '<option value="' + type + '">' + type + '</option>';
	$('#selectProductType').append(option);
    });
    
    $('#addProduct').append(addProductLine);
    $('.addProductTypo:last').append('Photo article');
    $('.addProductLine:last').append(addProductPic);

}

View.prototype._updateQty = function(){
	var context = this;
	context._model.on('updatedQty',function(data){
		$('[data-id="' + data.idarticle + '"]').find($('.stockValue')).html(data.qtearticle);
		id = data.idarticle;
		qty = data.qtearticle;
		context.emit('editQty', {
			newQty: data.qtearticle,
			idarticle: data.idarticle
		});
	})
};


