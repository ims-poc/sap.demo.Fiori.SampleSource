sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/demo/StockTransfer/model/models",
	"sap/demo/StockTransfer/MyRouter",
	"sap/m/routing/RouteMatchedHandler"
], function(UIComponent, Device, models, MyRouter, RouteMatcheHandler) {
	"use strict";

	return UIComponent.extend("sap.demo.StockTransfer.Component", {

		metadata: {
			manifest: "json",
			routing : {
                config : {
                    viewType : "XML",
                    viewPath : "sap.demo.StockTransfer.view",
                    targetControl : "NavContainer",
                    clearTarget : false
                },
                routes : [
                    {
                        pattern 			: "",				// which appears in URL, while you navigate
                        name 				: "list",			// Name that is used in navTo method
                        view 				: "ProductList",		// this is the target view that you are navigating to
                        //viewPath 			: "sap.demo.StockTransfer.view",	// path of the target view
                        targetAggregation	: "pages"			// this defines whether the target view is a [pages/content/masterpages/detailpages]
                    },
                    {
                        pattern 			: "InProductDetail",
                        name 				: "detail",
                        view 				: "ProductDetail",
                        //viewPath 			: "sap.demo.StockTransfer.view",
                        targetAggregation 	: "pages"
                    }
                ]
            }
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
			
			// monkey patch the router
            var oRouter = this.getRouter();
            oRouter.myNavBack = MyRouter.myNavBack;
		
            // initialize the router
            this.routeHandler = new sap.m.routing.RouteMatchedHandler(oRouter);
            oRouter.initialize();
		},
        destroy : function () {
            if (this.routeHandler) {
                this.routeHandler.destroy();
            }
            // call overridden destroy
            UIComponent.prototype.destroy.apply(this, arguments);
	    },
        createContent : function () {
            // create root view
            var oView = sap.ui.view({
                id			: "app",
                viewName	: "sap.demo.StockTransfer.view.app",
                type		: "JS"
            });
            // set List View for GetTable
            // this._listView = sap.ui.xmlview({ viewName : "sap.demo.StockTransfer.view.ProductList" });
            return oView;
        }
	});
});