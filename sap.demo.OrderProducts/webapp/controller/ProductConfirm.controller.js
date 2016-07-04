sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"jquery.sap.global",
	"sap/ui/model/json/JSONModel"
], function(Controller, jQuery, JSONModel) {
	"use strict";

	return Controller.extend("sap.demo.OrderProducts.controller.ProductConfirm", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.demo.OrderProducts.view.ProductConfirm
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.getView().setModel(sap.ui.getCore().getModel("transferData"), "transferData");
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
			this.getView().setModel(oModel, "listData");
			this.setFilterForZero();
		},
		handleNavBack : function() {
			this.oRouter.myNavBack("list");
		},
		setFilterForZero : function(){
			var oFilter;
			var aFilter;
			var aList = this.getView().byId("orderProductsTableProducts").getBinding("items").oList;
			
			for(var i = 0; i < aList.length; i++){
				if(aList[i].ProductOrder * 1 > 0) {
					oFilter = new sap.ui.model.Filter("Product", "EQ", aList[i].Product);
					aFilter.push(oFilter);
				}
			}
		
			this.getView().byId("orderProductsTableProducts").getBinding("items").filter(aFilter);
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.demo.OrderProducts.view.ProductConfirm
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.demo.OrderProducts.view.ProductConfirm
		 */
		// onAfterRendering: function() {
			
		// }

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.demo.OrderProducts.view.ProductConfirm
		 */
		//	onExit: function() {
		//
		//	}

	});

});