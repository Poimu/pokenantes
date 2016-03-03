function Model() {
	this._productsList = [];
	this._suppliersList = [];
	this._getProduct;
	this._getSupplier;
	this._pushSupplier;
	this._supplierUnique;
}

Model.prototype._getProduct = function(idarticle) {
	var product;
	this._productsList.forEach(function (prod){
		if (prod.idarticle == idarticle) {product=prod};
	})
    return product;
}
Model.prototype._getQty = function(idarticle) {
	return this._getProduct(idarticle).quantitearticle;
}
Model.prototype._setQty = function(idarticle,stockValue) {
	var newQty = stockValue + (this._getQty(idarticle));
	this._getProduct(idarticle).quantitearticle = newQty;
    console.log(this._getProduct(idarticle).quantitearticle);
}

Model.prototype._getSupplier = function(id) {
    var currentModel = this;
    var product;
    var supplier;
    
    currentModel._productsList.forEach(function(prod) {
	if (prod.idarticle == id) {product=prod};
    })
    currentModel._suppliersList.forEach(function(supp) {
	if (supp.idfournisseur == product.clefournisseur.idfournisseur) {supplier=supp};
    });
    return supplier;
}

Model.prototype._pushSupplier = function(product) {
    var currentModel = this;
    if (currentModel._supplierUnique(currentModel, product)) {
	currentModel._suppliersList.push(product.clefournisseur);
    }
}

Model.prototype._supplierUnique = function(currentModel, product) {
    var unique = true;
    currentModel._suppliersList.forEach(function(supplier) {
	if (supplier.idfournisseur === product.clefournisseur.idfournisseur) {
	    unique = false;
	}
    })
    return unique;
}