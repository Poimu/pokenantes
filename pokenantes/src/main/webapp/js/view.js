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
	var context = this;
	var suppliers = context._model._suppliersList;
	var articleTypesList = ['Vêtements toutes tailles','Déguisements manga','Jeux vidéos','Livres','DVDs','CDs','Figurines','Cartes de collection'];
	
	// le formulaire Article
	var formArticle 	 	  = '<form id ="addProductForm"></form>';
	// les variables des div contenues dans le formulaire Article
	var divSupplierArticle    = '<div id="divSupplierArticle" class="addFormDiv"> </div>';
	var divCodeArticle        = '<div id="divCodeArticle" class="addFormDiv"> </div>';
	var divNameArticle        = '<div id="divNameArticle" class="addFormDiv"> </div>';
	var divColorArticle       = '<div id="divColorArticle" class="addFormDiv"> </div>';
	var divSizeArticle        = '<div id="divSizeArticle" class="addFormDiv"> </div>';
	var divOriginArticle      = '<div id="divOriginArticle" class="addFormDiv"> </div>';
	var divQtyArticle         = '<div id="divQtyArticle" class="addFormDiv"> </div>';
	var divStateArticle       = '<div id="divStateArticle" class="addFormDiv"> </div>';
	var divSelectTypeArticle  = '<div id="divSelectTypeArticle" class="addFormDiv"> </div>';
	var divPhotoArticle       = '<div id="divPhotoArticle" class="addFormDiv"> </div>';
	var divCreateNewSupplier  = '<div id="divCreateNewSupplier"></div>';

	
	// les champs descriptions d'un Article
	var descSupplierArticle   = '<div id="descSupplierArticle" class="addFormDescription"> Sélectionnez un fournisseur </div>';
	var descCodeArticle       = '<div class="addFormDescription"> Code Article </div>';
	var descNameArticle       = '<div class="addFormDescription"> Nom Article </div>';
	var descColorArticle      = '<div class="addFormDescription"> Couleur Article </div>';
	var descSizeArticle       = '<div class="addFormDescription"> Taille Article </div>';
	var descOriginArticle     = '<div class="addFormDescription"> Provenance Article </div>';
	var descQtyArticle        = '<div class="addFormDescription"> Quantité Article </div>';
	var descStateArticle      = '<div class="addFormDescription"> Etat Article </div>';
	var descSelectTypeArticle = '<div class="addFormDescription"> Type Article </div>';
	var descPhotoArticle      = '<div class="addFormDescription"> Sélectionnez une photo Article </div>';
	
	// les champs input d'un Article
	
	var codeArticle 		  = '<input id="codeArticle" type="text" placeholder="Code article">';
	var nameArticle 	  	  = '<input id="nameArticle" type="text" placeholder="Nom article">';
	var colorArticle 	  	  = '<input id="colorArticle" type="text" placeholder="Couleur article">';
	var sizeArticle 	  	  = '<input id="sizeArticle" type="text" placeholder="Taille article">';
	var originArticle 	 	  = '<input id="originArticle" type="text" placeholder="Provenance article">';
	var qtyArticle 		  	  = '<input id="qtyArticle" type="number">';
	var comStateArticle 	  = '<input id="comState" type="radio" name="etat" value="commercialisable">Commercialisable';
	var defectiveStateArticle = '<input id="defectiveState" type="radio" name="etat" value="defective">Défectueux';
	var selectTypeArticle 	  = '<select id="selectTypeArticle" class="addFormField"></select>';

	var photoArticle          = '<input class="input-file" id="photo" type="file">';
	var selectSupplierArticle = '<select id="selectSupplierArticle" class="addFormField"></select>';
	var NewSupplierArticle    = '<option value="newSupplier"> Nouveau fournisseur </option>';

	$('body').append(formArticle);
	
	$('#addProductForm').append(divSupplierArticle);
	$('#addProductForm').append(divCodeArticle);
	$('#addProductForm').append(divNameArticle);
	$('#addProductForm').append(divColorArticle);
	$('#addProductForm').append(divSizeArticle);
	$('#addProductForm').append(divOriginArticle);
	$('#addProductForm').append(divQtyArticle);
	$('#addProductForm').append(divStateArticle);
	$('#addProductForm').append(divSelectTypeArticle);
	$('#addProductForm').append(divPhotoArticle);
	
	$('#divSupplierArticle').append(descSupplierArticle);
	$('#divCodeArticle').append(descCodeArticle);
	$('#divNameArticle').append(descNameArticle);
	$('#divColorArticle').append(descColorArticle);
	$('#divSizeArticle').append(descSizeArticle);
	$('#divOriginArticle').append(descOriginArticle);
	$('#divQtyArticle').append(descQtyArticle);
	$('#divStateArticle').append(descStateArticle);
	$('#divSelectTypeArticle').append(descSelectTypeArticle);
	$('#divPhotoArticle').append(descPhotoArticle);
	
	$('#divCodeArticle').append(codeArticle);
	$('#divNameArticle').append(nameArticle);
	$('#divColorArticle').append(colorArticle);
	$('#divSizeArticle').append(sizeArticle);
	$('#divOriginArticle').append(originArticle);
	$('#divQtyArticle').append(qtyArticle);
	$('#divStateArticle').append(comStateArticle);
	$('#divStateArticle').append(defectiveStateArticle);
	$('#divSelectTypeArticle').append(selectTypeArticle);
	$('#divPhotoArticle').append(photoArticle);
	$('#descSupplierArticle').append(selectSupplierArticle);

	//ajout de la div de création fournisseur à la div fournisseur
	$('#divSupplierArticle').append(divCreateNewSupplier);
	
	suppliers.forEach(function(supplier) {
		var supplierArticle = '<option value="' + supplier.idfournisseur + '">' + supplier.nomfournisseur + '</option>';
		$('#selectSupplierArticle').append(supplierArticle);
	});
	
	articleTypesList.forEach(function(articleType){
		var articleType = '<option value="' + articleType + '">' + articleType + '</option>'; 
		$('#selectTypeArticle').append(articleType);
	});
	
	$('#selectSupplierArticle').append(NewSupplierArticle);
	
	//affichage d'un formulaire pour créer un nouveau fournisseur
	$('#selectSupplierArticle').change(function(supplier){
		var descNameSupplier      = '<div class="addSupplierDescription"> Nom du Fournisseur </div>';
		var descAddressSupplier   = '<div class="addSupplierDescription"> Adresse du Fournisseur </div>';
		var descPhoneSupplier     = '<div class="addSupplierDescription"> N° de téléphone du Fournisseur </div>';
		var descTypeSupplier      = '<div class="addSupplierDescription"> Type du Fournisseur </div>';
		var nameSupplier          = '<input id="nameSupplier" type="text" placeholder="Nom fournisseur">';
		var addressSupplier       = '<input id="addressSupplier" type="text" placeholder="Adresse fournisseur">';
		var phoneSupplier         = '<input id="phoneSupplier" type="text" placeholder="N° de téléphone fournisseur">';
		var enterpriseSupplier    = '<input id="enterpriseSupplier" type="radio" name="supplier" value="enterprise">Entreprise';
		var particularSupplier    = '<input id="particularSupplier" type="radio" name="supplier" value="particular">Particulier';
		var divNameSupplier       = '<div id="divNameSupplier" class="addFormDiv"></div>';
		var divAddressSupplier    = '<div id="divAddressSupplier" class="addFormDiv"></div>';
		var divPhoneSupplier      = '<div id="divPhoneSupplier" class="addFormDiv"></div>';
		var divTypeSupplier       = '<div id="divTypeSupplier" class="addFormDiv"></div>';
		
		if($(this).val() == "newSupplier"){
			$('#divCreateNewSupplier').append(divNameSupplier);
			$('#divCreateNewSupplier').append(divAddressSupplier);
			$('#divCreateNewSupplier').append(divPhoneSupplier);
			$('#divCreateNewSupplier').append(divTypeSupplier);
			$('#divNameSupplier').append(descNameSupplier);
			$('#divAddressSupplier').append(descAddressSupplier);
			$('#divPhoneSupplier').append(descPhoneSupplier);
			$('#divTypeSupplier').append(descTypeSupplier);
			$('#divNameSupplier').append(nameSupplier);
			$('#divAddressSupplier').append(addressSupplier);
			$('#divPhoneSupplier').append(phoneSupplier);
			$('#divTypeSupplier').append(enterpriseSupplier);
			$('#divTypeSupplier').append(particularSupplier);
		}
		else{
			//on vide la div new supplier à chaque nouveau select différent de "Nouveau fournisseur"
			$('#divCreateNewSupplier').empty();
		}
		
		

	});

}