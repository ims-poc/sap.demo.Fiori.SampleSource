sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/demo/ConfirmChangePrice/Configuration",
	"sap/demo/ConfirmChangePrice/util/common"
], function(Controller, JSONModel, Configuration, common) {
	"use strict";

	return Controller.extend("sap.demo.ConfirmChangePrice.controller.ChangePriceList", {
		
		onInit : function() {
			// Set Router
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Set Shipping Instruction List MockData For List View
            var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/changeRequestForPrice.json"));
			oModel.setSizeLimit(100);
			this.getView().setModel(oModel, "tblData");
			
			var oModelUniCon = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/filterUnifiedCond.json"));
			this.getView().setModel(oModelUniCon, "filterUnifiedCond");
			
			var oModelPro = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/filterProduct.json"));
			this.getView().setModel(oModelPro, "filterProduct");
			
			var oModelInsStDt = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/filterInstructionStartDate.json"));
			this.getView().setModel(oModelInsStDt, "filterInstructionStartDate");
			
			this.getUserSite();
			this.setInitialSort();
			// this.setFilter();
		},
		navigate : function(oEvent) {
			
			var oModel = {};
			oModel.UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;
            oModel.UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
            oModel.InstructionStartDate = oEvent.getSource().getParent().getBindingContext("tblData").getProperty("InstructionStartDate");
			
			if(this.transferData === undefined) {
                this.transferData = new JSONModel();
            }
            
            this.transferData.setData(oModel, false);
            sap.ui.getCore().setModel(this.transferData, "transferData");
			
			this.oRouter.navTo(Configuration.SECOND_NAME);
		},
		onValueHelpRequestForSite : function(oEvent) {
			common.createValueHelpRequestForSite(this);
		},
		getUserSite : function() {
			var oModel;
			var sJsonFile = jQuery.sap.getModulePath("sap.demo.MockData", "/userInfo.json");
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
			var oPage = this.getView().byId("mainListPage");
			oPage.setTitle(
				sap.ui.getCore().getModel("i18n").getResourceBundle().getText("LIST_PAGE_TITLE") +
				" （" + sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName + "）1（10）"
			);
		},
		setInitialSort : function() {
			var oTable = this.getView().byId("confirmChangePriceTblPriceList");
			var oBinding = oTable.getBinding("items");
			var aSorters = [];
			
			aSorters.push(new sap.ui.model.Sorter("InstructionStartDate"));
			aSorters.push(new sap.ui.model.Sorter("ParentInstructionNo"));
			oBinding.sort(aSorters);
		},
		setFilter : function() {
			var aFilter = [];
			this.getFilterForFacetFilter(aFilter);
			this.exeFacetFilter(aFilter);
		},
		getFilterForFacetFilter : function(aFilter) {
			var oFacetFilter = this.getView().byId("confirmChangePriceFctFlt");
			var aList = oFacetFilter.getLists();
			var aSelectedItem;
			var oFilter;

			for(var i = 0; i < aList.length; i++){
				aSelectedItem = aList[i].getSelectedItems();
				for(var j = 0; j < aSelectedItem.length; j++) {
					oFilter = new sap.ui.model.Filter(aList[i].getKey(), "EQ", aSelectedItem[j].getKey());
					if(oFilter !== undefined) {
						aFilter.push(oFilter);
					}
				}
			}
		},
		exeFacetFilter : function(aFilter) {
			var oTable = this.getView().byId("confirmChangePriceTblPriceList");
			oTable.getBinding("items").filter(aFilter);
		},
		onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("confirmChangePriceFctFlt");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			var aFilter = [];
			this.exeFacetFilter(aFilter);
		}
	});

});