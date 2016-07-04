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
			this.getView().setModel(oModel, "tblData");
			
			this.getUserSite();
			this.setFilter();
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
				" （" + sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName + "）"
			);
		},
		setFilter : function() {
			var aFilter = [];
			var oFilter;
			
			// Make FilterObject for Printed Status
			// oFilter = this.getFilterForPrinted();
			// if(oFilter !== undefined) {
			// 	aFilter.push(oFilter);
			// }
			// Make FilterObject for FacetFilter
			this.getFilterForFacetFilter(aFilter);
			this.exeFacetFilter(aFilter);
		},
		getFilterForPrinted : function() {
			var oFilter;
			var oRadBtn = this.getView().byId("confirmChangePriceRadBtnPrintedHidden");
			
			if(oRadBtn.getSelected()){
				oFilter = new sap.ui.model.Filter("PrintedResult", "EQ", "");
			}
			return oFilter;
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
			// var oFilter = this.getFilterForPrinted();
			var aFilter = [];
			// if(oFilter !== undefined) {
			// 	aFilter.push(oFilter);	
			// }
			this.exeFacetFilter(aFilter);
		},
		onExePrint : function(oEvent) {
			common.exePrint();
		}
	});

});