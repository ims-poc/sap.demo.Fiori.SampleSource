sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/demo/StockList/util/common'
], function(Controller, JSONModel, common) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.initialDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.demo.StockList.view.initialDetail
		 */
		onInit: function() {
			// var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/userInfo.json"));
			// this.getView().setModel(oModel, "UserInfo");
			this.getUserSite();
        },
        getUserSite : function() {
			var oModel;
			var sJsonFile = jQuery.sap.getModulePath("sap.demo.mock", "/userInfo.json");
			var oThis = this;
			
			if(!sap.ui.getCore().getModel("UserInfo")) {
				oModel = new sap.ui.model.json.JSONModel(sJsonFile);
				sap.ui.getCore().setModel(oModel, "UserInfo");
			} else {
				oModel = sap.ui.getCore().getModel("UserInfo");
			}
	        
	    	oModel.attachRequestCompleted(function() {
				$("#sJsonFile").append(oModel.getJSON());
				oThis.setPageTitleForSite();
			});
		},
		setPageTitleForSite : function() {
			var oPage = this.getView().byId("stockListInitialDetailPage");
			oPage.setTitle(
				sap.ui.getCore().getModel("i18n").getResourceBundle().getText("DETAIL_TITLE") +
				" （" + sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName + "）"
			);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.demo.StockList.view.initialDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.demo.StockList.view.initialDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.demo.StockList.view.initialDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});