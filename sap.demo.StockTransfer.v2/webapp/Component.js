sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/demo/StockTransfer/model/models",
	"sap/m/routing/RouteMatchedHandler"
], function(UIComponent, Device, models, RouteMatcheHandler) {
	"use strict";

	return UIComponent.extend("sap.demo.StockTransfer.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			// Set i18n Property Model For Core
			var oModel_i18n = new sap.ui.model.resource.ResourceModel({bundleUrl:"./i18n/i18n.properties"});
			sap.ui.getCore().setModel(oModel_i18n, "i18n");
		},
        createContent : function () {
            // create root view
            var oView = sap.ui.view({
                id			: "ProductList",
                viewName	: "sap.demo.StockTransfer.view.ProductList",
                type		: "XML"
            });
            // set List View for GetTable
            return oView;
        }
	});
});