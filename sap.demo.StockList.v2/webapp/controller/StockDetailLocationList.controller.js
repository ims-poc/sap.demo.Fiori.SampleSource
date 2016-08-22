sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/demo/StockList/Configuration'
], function(Controller, JSONModel, Configuration) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.StockDetailLocationList", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.demo.StockList.view.StockDetailLocationList
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			// Set MockData For Detail View
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/stockList.json"));
			this.getView().setModel(oModel, "listData");
			
			this.getView().setModel(sap.ui.getCore().getModel("transferDataForLoc"), "detailLocData");
			sap.ui.getCore().setModel(this.getView(), "detailLocView");
		}
		, handleNavBack : function(){
			this.oRouter.myNavBack(Configuration.SECOND_NAME);
		}
		, navToStockTransfer : function(oEvent) {
			var oTransferData = this.getView().getModel("detailLocData").getData();
			
			if(this.transferDataForOrder === undefined) {
                this.transferDataForOrder = new JSONModel();
            }
            this.transferDataForOrder.setData(oTransferData);
			sap.ui.getCore().setModel(this.transferDataForOrder, "transferDataForStockTransfer");
			
			// Get Split Application
			var oSplitApp = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getParent();
			
			if(!oSplitApp.getDetailPage("stockTransfer")){
				var oStockTransfer = sap.ui.view({
					id			: "stockTransfer",
					viewName	: "sap.demo.StockList.view.StockTransfer",
					type		: "XML"
            	});
				oSplitApp.addDetailPage(oStockTransfer);
			}
			
			this.oRouter.navTo(Configuration.FIFTH_NAME);
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.demo.StockList.view.StockDetailLocationList
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.demo.StockList.view.StockDetailLocationList
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.demo.StockList.view.StockDetailLocationList
		 */
		//	onExit: function() {
		//
		//	}
	});

});