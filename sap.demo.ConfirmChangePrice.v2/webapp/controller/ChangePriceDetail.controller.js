sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/demo/ConfirmChangePrice/Configuration",
	"sap/demo/ConfirmChangePrice/util/common"
], function(Controller, JSONModel, Configuration, common) {
	"use strict";

	return Controller.extend("sap.demo.ConfirmChangePrice.controller.ChangePriceDetail", {
		onInit : function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			// Set Shipping Instruction List MockData For List View
            var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/changeRequestForPrice.json"));
			this.getView().setModel(oModel, "tblData");
			this.getView().setModel(sap.ui.getCore().getModel("transferData"), "transferData");
			
		},
		handleNavBack : function (oEvent) {
			this.oRouter.myNavBack(Configuration.FIRST_NAME);
		},
		onExePrint : function(oEvent) {
			common.exePrint();
		}
		
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.demo.ConfirmChangePrice.view.ChangePriceDetail
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.demo.ConfirmChangePrice.view.ChangePriceDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.demo.ConfirmChangePrice.view.ChangePriceDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.demo.ConfirmChangePrice.view.ChangePriceDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});