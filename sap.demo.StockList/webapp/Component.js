sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/m/routing/RouteMatchedHandler",
	"sap/demo/StockList/model/models",
	"sap/demo/StockList/MyRouter",
	"sap/demo/StockList/Configuration"
], function(UIComponent, Device, RouteMatcheHandler, models, MyRouter, Configuration) {
	"use strict";
	var bIsMocked = "true";

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
			
			// var oList = sap.ui.view({
   //             id			: "listPage",
   //             viewName	: "sap.demo.StockList.view.StockList",
   //             type		: "XML"
   //         });
            
   //         var oInitDetail = sap.ui.view({
   //             id			: "detailInitPage",
   //             viewName	: "sap.demo.StockList.view.initialDetail",
   //             type		: "XML"
   //         });
			
			// var oDetail = sap.ui.view({
   //             id			: "detailPage",
   //             viewName	: "sap.demo.StockList.view.StockDetail",
   //             type		: "XML"
   //         });
			
			// var oDetailLoc = sap.ui.view({
   //             id			: "detailLocListPage",
   //             viewName	: "sap.demo.StockList.view.StockDetailLocationList",
   //             type		: "XML"
   //         });
			
			// var oSplitApp = new sap.m.SplitApp({
			// 	id : "splitApp"	
			// });
			
			// oSplitApp.addDetailPage(oInitDetail);
			// // oSplitApp.addDetailPage(oDetail);
			// // oSplitApp.addDetailPage(oDetailLoc);
			// oSplitApp.addMasterPage(oList);
			
			// oSplitApp.setInitialDetail(oInitDetail);
			// oSplitApp.setInitialMaster(oList);
			// oSplitApp.setMode("ShowHideMode");
			
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