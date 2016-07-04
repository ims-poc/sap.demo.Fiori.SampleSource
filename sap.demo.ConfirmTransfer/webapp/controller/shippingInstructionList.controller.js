sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/demo/ConfirmTransfer/Configuration",
	'sap/ui/model/json/JSONModel',
	'sap/demo/ConfirmTransfer/util/Formatter'
], function(Controller, Configuration, JSONModel, Formatter) {
	"use strict";
	jQuery.sap.require("sap.demo.ConfirmTransfer.util.Formatter");
	
	return Controller.extend("sap.demo.ConfirmTransfer.controller.shippingInstructionList", {
		
		onInit : function() {
			// Set Router
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Set Shipping Instruction List MockData For List View
            var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/shippingInstruction.json"));
			this.getView().setModel(oModel, "mockData");
			sap.ui.getCore().setModel(oModel, "mockData");
			
			// Set i18n Property Model For Core
			var oModel_i18n = new sap.ui.model.resource.ResourceModel({bundleUrl:"./i18n/i18n.properties"});
			sap.ui.getCore().setModel(oModel_i18n, "i18n");

			this.setFilter();
			this.setInitialSort();
			this.getUserSite();
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
			var oPage = this.getView().byId("mainPageList");
			oPage.setTitle(
				sap.ui.getCore().getModel("i18n").getResourceBundle().getText("LIST_PAGE_TITLE") +
				" （" + sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName + "）"
			);
		},
		onValueHelpRequest : function(oEvent) {
			Formatter.createValueHelpRequest(this);
		},
        navigate : function(oEvent){
            var oSource = oEvent.getSource();
            var oColListItem = oSource.getParent();
            var selectedItemPath = oColListItem.getBindingContextPath();
            var selectedItemIndex = selectedItemPath.slice(selectedItemPath.indexOf("/",1) + 1);
            var oTransferData = sap.ui.getCore().getModel("mockData").getData().ShippingInstruction[selectedItemIndex];
            
            var oModel = {};
            
            oModel.ShipToSite = oTransferData.ShipToSite;
            oModel.ShipToSiteNm = oTransferData.ShipToSiteNm;
            oModel.UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;
            oModel.UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
            oModel.SumOfQuantity = 2725;
            
            if(this.transferData === undefined) {
                this.transferData = new JSONModel();
            }
            
            this.transferData.setData(oModel, false);
            sap.ui.getCore().setModel(this.transferData, "TransferData");
            
            this.oRouter.navTo(Configuration.SECOND_NAME);
        },
        handleNavBack : function () {
			this.oRouter.myNavBack(Configuration.FIRST_NAME);
		},
		onLiveSearch : function(oEvent) {
			
		},
		setInitialSort : function() {
			var oTable = this.getView().byId("shippingInstructionList");
			
			var oBinding = oTable.getBinding("items");
			var aSorters = [];
			
			aSorters.push(new sap.ui.model.Sorter("ShipDate"));
			aSorters.push(new sap.ui.model.Sorter("ShipToSite"));
			aSorters.push(new sap.ui.model.Sorter("ShippinngInstructionNo"));
			oBinding.sort(aSorters);
		},
		onPressSortDialog : function(oEvent) {
			if(!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.demo.ConfirmTransfer.view.sortForTableSelectDialog", this);
			}
			this._oDialog.open();
		},
		onSort : function(oEvetn) {
			var oTable = this.getView().byId("shippingInstructionList");
			
			var oBinding = oTable.getBinding("items");
			var aSorters = [];
			var oCmbBxSortField;
			var bChkBxDescending;
			
			for(var i = 1; i <= 3; i++){
				oCmbBxSortField = sap.ui.getCore().byId("cmbBoxSortField_0" + i);
				bChkBxDescending = sap.ui.getCore().byId("chkBoxDescending_0" + i).getSelected();
				if(oCmbBxSortField.getSelectedKey() !== "") {
					aSorters.push(new sap.ui.model.Sorter(oCmbBxSortField.getSelectedKey(), bChkBxDescending));
				}
			}
			oBinding.sort(aSorters);
			this.onClose();
		},
		onClose : function(oEvent) {
			this._oDialog.close();
		},
		onClear : function(oEvent) {
			var oTable = this.getView().byId("shippingInstructionList");
			var oBinding = oTable.getBinding("items");
			var aSorters = [];
			// 指示Noでソート
			aSorters.push(new sap.ui.model.Sorter("ShippinngInstructionNo", false));
			oBinding.sort(aSorters);
			// ラジオボタン、チェックボックスリセット
			for(var i = 1; i <= 3; i++){
				sap.ui.getCore().byId("cmbBoxSortField_0" + i).setSelectedKey("");
				sap.ui.getCore().byId("chkBoxDescending_0" + i).setSelected(false);
			}
			this.onClose();
		},
		
		setFilter : function() {
			var aFilter = [];
			var oFilter;
			
			// Make FilterObject for Printed Status
			oFilter = this.getFilterForPrinted();
			if(oFilter !== undefined) {
				aFilter.push(oFilter);
			}
			// Make FilterObject for FacetFilter
			this.getFilterForFacetFilter(aFilter);
			this.exeFacetFilter(aFilter);
		},
		getFilterForPrinted : function() {
			var oFilter;
			var oRadBtn = this.getView().byId("radBtnPrintedHidden");
			
			if(oRadBtn.getSelected()){
				oFilter = new sap.ui.model.Filter("PrintedResult", "EQ", "");
			}
			return oFilter;
		},
		getFilterForFacetFilter : function(aFilter) {
			var oFacetFilter = this.getView().byId("shippingInstructionFacetFilter");
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
			var oTable = this.getView().byId("shippingInstructionList");
			oTable.getBinding("items").filter(aFilter);
		},
		onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("shippingInstructionFacetFilter");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			var oFilter = this.getFilterForPrinted();
			var aFilter = [];
			if(oFilter !== undefined) {
				aFilter.push(oFilter);	
			}
			this.exeFacetFilter(aFilter);
		}
	});
});