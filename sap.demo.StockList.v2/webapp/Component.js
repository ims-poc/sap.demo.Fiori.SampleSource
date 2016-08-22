sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/m/routing/RouteMatchedHandler",
	"sap/demo/StockList/model/models",
	"sap/demo/StockList/MyRouter",
	"sap/demo/StockList/Configuration"
], function(UIComponent, Device, RouteMatcheHandler, models, MyRouter, Configuration) {
	"use strict";

	return UIComponent.extend("sap.demo.StockList.Component", {

		metadata: {
			manifest: "json",
			routing : {
                config : {
                    viewType		: Configuration.CONFIG_VIEWTYPE,
                    viewPath		: Configuration.CONFIG_VIEWPATH,
                    targetControl	: Configuration.CONFIG_TARGETCONTROLL,
                    clearTarget		: Configuration.CONFIG_CLEARTARGET
                },
                routes : [
                    {
                        pattern 			: Configuration.FIRST_PATTERN,
                        name 				: Configuration.FIRST_NAME,
                        view 				: Configuration.FIRST_VIEW,
                        viewPath 			: Configuration.FIRST_VIEW_PATH,
                        targetAggregation	: Configuration.FIRST_TARGETAGGREGATION
                    },
                    {
                        pattern 			: Configuration.SECOND_PATTERN,
                        name 				: Configuration.SECOND_NAME,
                        view 				: Configuration.SECOND_VIEW,
                        viewPath			: Configuration.SECOND_VIEW_PATH,
                        targetAggregation 	: Configuration.SECOND_TARGETAGGREGATION
                    },
                    {
                        pattern 			: Configuration.THIRD_PATTERN,
                        name 				: Configuration.THIRD_NAME,
                        view 				: Configuration.THIRD_VIEW,
                        viewPath			: Configuration.THIRD_VIEW_PATH,
                        targetAggregation 	: Configuration.THIRD_TARGETAGGREGATION
                    },
                    {
                        pattern 			: Configuration.FOURTH_PATTERN,
                        name 				: Configuration.FOURTH_NAME,
                        view 				: Configuration.FOURTH_VIEW,
                        viewPath			: Configuration.FOURTH_VIEW_PATH,
                        targetAggregation 	: Configuration.FOURTH_TARGETAGGREGATION
                    },
                    {
                        pattern 			: Configuration.FIFTH_PATTERN,
                        name 				: Configuration.FIFTH_NAME,
                        view 				: Configuration.FIFTH_VIEW,
                        viewPath			: Configuration.FIFTH_VIEW_PATH,
                        targetAggregation 	: Configuration.FIFTH_TARGETAGGREGATION
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
		
		createContent : function() {
			
			// create root view
            var oView = sap.ui.view({
                id			: Configuration.ROOT_APP_ID,
                viewName	: Configuration.ROOT_APP_VIEWNAME,
                type		: Configuration.ROOT_APP_TYPE
            });
            return oView;
		}
	});

});