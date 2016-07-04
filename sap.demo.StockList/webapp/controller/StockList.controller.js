sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/demo/StockList/Configuration',
	'sap/demo/StockList/util/common'
], function(Controller, JSONModel, Configuration, common) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.StockList", {
		
		onInit : function() {
			gThat = this;
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Set MockData For List View
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/stockList.json"));
			this.getView().setModel(oModel, "listData");
			
			oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/userInfo.json"));
			sap.ui.getCore().setModel(oModel, "UserInfo");
			this.getUserSite();
		},
		
		onSelect : function(oEvent) {
			
			var oContext = oEvent.getSource().getSelectedItem().getBindingContext("listData");
			var oTransferData = {};
			oTransferData.ProductName = oContext.getProperty("ProductName");
			oTransferData.Product = oContext.getProperty("Product");
			oTransferData.ProductStock = oContext.getProperty("ProductStock");
			oTransferData.ProductStockUnit = oContext.getProperty("ProductStockUnit");
			oTransferData.ProductColor = oContext.getProperty("ProductColor");
			oTransferData.ProductSize = oContext.getProperty("ProductSize");
			oTransferData.ProductPrice = oContext.getProperty("ProductPrice");
			oTransferData.Currency = oContext.getProperty("Currency");
			oTransferData.ProductSupplier = oContext.getProperty("ProductSupplier");
			oTransferData.ProductColorSupplier = oContext.getProperty("ProductColorSupplier");
			oTransferData.ProductSizeSupplier = oContext.getProperty("ProductSizeSupplier");
			
			// User Information
			oTransferData.UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;
            oTransferData.UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
			
			if(oContext.getProperty("Product").slice(0,2) === "43") {
				oTransferData.DataType = "/ProductStockListPerSite";
			} else {
				oTransferData.DataType = "/ProductStockListPerSite_02";
			}
			
			if(this.transferData === undefined) {
                this.transferData = new JSONModel();
            }
            this.transferData.setData(oTransferData);
			sap.ui.getCore().setModel(this.transferData, "transferData");
			
			// Get Split Application
			var oSplitApp = oEvent.getSource().getParent().getParent().getParent().getParent().getParent();
			
			if(!oSplitApp.getDetailPage("detailPage")){
				// Create Detail View
				var oDetail = sap.ui.view({
					id			: "detailPage",
					viewName	: "sap.demo.StockList.view.StockDetail",
					type		: "XML"
				});
				oSplitApp.addDetailPage(oDetail);
			}
			
			this.oRouter.navTo(Configuration.SECOND_NAME);
		},
		onValueHelpRequest : function() {
			common.createValueHelpRequest(this);
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
			// var oPage = this.getView().byId("stockListInitialDetailPage");
			var oDetailView = this.getView().getParent().getParent().getDetailPage("detailPage");
			oDetailView.getController().setPageTitleForSite();
			// var oPage = oDetailView.byId("stockListInitialDetailPage");
			// oPage.setTitle(
			// 	sap.ui.getCore().getModel("i18n").getResourceBundle().getText("DETAIL_TITLE") +
			// 	" （" + sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName + "）"
			// );
		},
		onLiveSearch : function(oEvent) {
			var aValue = this.getView().byId("stockListSearchFieldProduct").getValue().split(",");
			var aItems = this.getView().byId("stockListListStock").getItems();
			
			for (var i = 0; i < aValue.length; i++) {
				for(var j = 0; j < aItems.length; j++) {
					if(!aItems[j].getVisible() || i === 0) {
						var bVisibility = this.applySearchPatternToTableItem(aItems[j], aValue[i].toLowerCase());
						aItems[j].setVisible(bVisibility);
					}
				}
			}
        },
		applySearchPatternToTableItem : function(oTableItem, sSearchPattern) {
			if (sSearchPattern === "") {
				return true;
			}
			
			var oContext = oTableItem.getBindingContext("listData");
			// Check if product name or ID contains search string
			if ((oContext.getProperty("ProductName").toLowerCase().indexOf(sSearchPattern) > -1) || 
			    (oContext.getProperty("Product").toLowerCase().indexOf(sSearchPattern) > -1)) {
				return true;
			} else {
				return false;
			}
        },
        setFilter : function() {
			var aFilter = [];
			// Make FilterObject for FacetFilter
			this.getFilterForFacetFilter(aFilter);
			this.exeFacetFilter(aFilter);
		},
		getFilterForFacetFilter : function(aFilter) {
			var oFacetFilter = this.getView().byId("stockListFacetFilterStyle");
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
			var oTable = this.getView().byId("stockListListStock");
			oTable.getBinding("items").filter(aFilter);
		},
		onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("stockListFacetFilterStyle");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			var aFilter = [];
			this.exeFacetFilter(aFilter);
		},
		onOpenDialog : function() {
			
			if(!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.demo.StockList.view.BarCodeScanner", this);
			}
			this._oDialog.open();
		},
		onConfirmForBarCodeScanner : function() {
			var sText = sap.ui.getCore().byId("barcodeNumber").getValue();
			var aText = sText.split("\n");
			var sTempText = "";
			for(var i = 0; i < aText.length; i++){
				if(aText[i] !== ""){
					if(sTempText === "") {
						sTempText = aText[i];
					} else {
						sTempText = sTempText + "," + aText[i];
					}
				}
			}
			this.getView().byId("stockListSearchFieldProduct").setValue(sTempText);
			this._oDialog.close();
		},
		onCancelForBarCodeScanner : function() {
			this._oDialog.close();
		},
	});

});