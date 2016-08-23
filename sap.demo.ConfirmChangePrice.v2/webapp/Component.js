sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"sap/demo/ConfirmChangePrice/model/models",
	"sap/demo/ConfirmChangePrice/MyRouter",
	"sap/demo/ConfirmChangePrice/Configuration"
], function(UIComponent, Device, JSONModel, models, MyRouter, Configuration, commonFunction) {
	"use strict";

	return UIComponent.extend("sap.demo.ConfirmChangePrice.Component", {

		metadata: {
			manifest: "json",
			routing : {
				config : {
					viewType		: Configuration.CONFIG_VIEWTYPE,
					viewPath		: Configuration.CONFIG_VIEWPATH,
					targetControl	: Configuration.CONFIG_TARGETCONTROLL,
					clearTarget		: Configuration.CONFIG_CLEARTARGET
				},
				routes : 
				[
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
			// the router
			var oRouter = this.getRouter();
			oRouter.myNavBack = MyRouter.myNavBack;
			
			// Set i18n Property Model For Core
			var oModel_i18n = new sap.ui.model.resource.ResourceModel({bundleUrl:"./i18n/i18n.properties"});
			sap.ui.getCore().setModel(oModel_i18n, "i18n");
			
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
				id			: Configuration.ROOT_APP_ID,
				viewName	: Configuration.ROOT_APP_VIEWNAME,
				type		: Configuration.ROOT_APP_TYPE
			});
			return oView;
		}
	});
});