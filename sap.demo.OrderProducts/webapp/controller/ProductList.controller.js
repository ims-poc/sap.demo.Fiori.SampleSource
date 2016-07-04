sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/json/JSONModel',
	'sap/demo/OrderProducts/util/common'
], function(Controller, jQuery, JSONModel, common) {
	"use strict";

	return Controller.extend("sap.demo.OrderProducts.controller.ProductList", {
        onInit : function() {
            gThat = this;
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
			this.getView().setModel(oModel, "listData");
			
			var oModelView = new JSONModel({
				inputEnabled : true
			});
			this.getView().setModel(oModelView, "view");
			// Set User Site For Page Title
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
			var oPage = this.getView().byId("mainListPage");
			oPage.setTitle(
				sap.ui.getCore().getModel("i18n").getResourceBundle().getText("LIST_PAGE_TITLE") +
				" （" + sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName + "）"
			);
		},
		onValueHelpRequest : function() {
			common.createValueHelpRequestForSite(this);
		},
        navigate : function(oEvent){
            // var oSource = oEvent.getSource();
            // var oColListItem = oSource.getParent().getParent();
            // var oContext = oColListItem.getBindingContext("listData");
            
            var oSource = oEvent.getSource();
            var oColListItem = oSource.getParent().getParent();
            var selectedItemPath = oColListItem.getBindingContextPath();
            var selectedItemIndex = selectedItemPath.slice(selectedItemPath.indexOf("/",1) + 1);
            var oTransferData = this.getView().getModel("listData").getData().ProductCollection[selectedItemIndex];
            oTransferData.UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;
            oTransferData.UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
            
            // var oModel = {};
            // oModel.ProductName = oContext.getProperty("ProductName");
            // oModel.Product = oContext.getProperty("Product");
            // oModel.ProductColor = oContext.getProperty("ProductColor");
            // oModel.ProductSize = oContext.getProperty("ProductSize");
            // oModel.ProductOrder = oContext.getProperty("ProductOrder");
            // oModel.ProductOrderUnit = oContext.getProperty("ProductOrderUnit");
            // oModel.ProductStock = oContext.getProperty("ProductStock");
            // oModel.ProductStockUnit = oContext.getProperty("ProductStockUnit");
            // oModel.ProductScheduledStock = oContext.getProperty("ProductScheduledStock");
            // oModel.ProductScheduledStockUnit = oContext.getProperty("ProductScheduledStockUnit");
            // oModel.ProductPrice = oContext.getProperty("ProductPrice");
            // oModel.Currency = oContext.getProperty("Currency");
            // oModel.TradeCondition = oContext.getProperty("TradeCondition");
            // oModel.CommodityCode = oContext.getProperty("CommodityCode");
            
            if(this.transferData === undefined) {
                this.transferData = new JSONModel();
            }
            this.transferData.setData(oTransferData);
            sap.ui.getCore().setModel(this.transferData, "transferData");
            
            sap.ui.getCore()._listView = this.getView();
            this.oRouter.navTo("detail");
        },
        onOpenDialog : function() {
			
			if(!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.demo.OrderProducts.view.BarCodeScanner", this);
			}
			this._oDialog.open();
			
			// var oThis = this;
			// var oDialog = new sap.m.Dialog({
			// 	title: "Scan Barcode",
			// 	type: "Message",
			// 	content: [
			// 		// new sap.m.Text({ text: 'Are you sure you want to reject your shopping cart?' }),
			// 		new sap.m.TextArea({
			// 			id : "barcodeDialogTextArea",
			// 			width : "100%",
			// 			placeholder : "Scan Barcode"
			// 		})
			// 	],
			// 	beginButton: new sap.m.Button({
			// 		text: "OK",
			// 		press: function () {
			// 			var sText = sap.ui.getCore().byId("barcodeDialogTextArea").getValue();
			// 			var aText = sText.split("\n");
			// 			var sTempText = "";
			// 			for(var i = 0; i < aText.length; i++){
			// 				if(aText[i] !== ""){
			// 					if(sTempText === "") {
			// 						sTempText = aText[i];
			// 					} else {
			// 						sTempText = sTempText + "," + aText[i];
			// 					}
			// 				}
			// 			}
			// 			oThis.getView().byId("orderProductsSearchFieldProducts").setValue(sTempText);
			// 			oDialog.close();
			// 		}
			// 	}),
			// 	endButton: new sap.m.Button({
			// 		text: 'Cancel',
			// 		press: function () {
			// 			oDialog.close();
			// 		}
			// 	}),
			// 	afterClose: function() {
			// 		oDialog.destroy();
			// 	}
			// });
			// sap.ui.getCore().byId("barcodeDialogTextArea").focus();
			// oDialog.open();
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
			this.getView().byId("orderProductsSearchFieldProducts").setValue(sTempText);
			this._oDialog.close();
		},
		onCancelForBarCodeScanner : function() {
			this._oDialog.close();
		},
		onAddButtonPress : function(oEvent) {
			var oTable = this.getView().byId("orderProductsTableProducts");
			var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem) {
				var sSelectedItem = oSelectedItem.getBindingContextPath();
				var sSelectedItemIndex = sSelectedItem.slice(sSelectedItem.indexOf("/",1) + 1);
				var dCurrentQuantity = this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder * 1;
				this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder = dCurrentQuantity + 1;
				this.getView().getModel("listData").refresh();
			}
		},
		onLessButtonPress : function(oEvent) {
			var oTable = this.getView().byId("orderProductsTableProducts");
			var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem) {
				var sSelectedItem = oSelectedItem.getBindingContextPath();
				var sSelectedItemIndex = sSelectedItem.slice(sSelectedItem.indexOf("/",1) + 1);
				var dCurrentQuantity = this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder * 1;
				if(dCurrentQuantity > 0) {
					this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder = dCurrentQuantity - 1;
					this.getView().getModel("listData").refresh();
				}
			}
		},
		switchEnable : function(bToSave) {
			if(bToSave) {
				this.getView().getModel("view").setProperty("/inputEnabled", false);
            	this.getView().getModel("view").refresh();
            	this.getView().byId("orderProductsHBoxSave").setVisible(true);
            	this.getView().byId("orderProductsButtonSave").setVisible(true);
            	this.getView().byId("orderProductsButtonCancel").setVisible(true);
            	this.getView().byId("orderProductsHBoxConfirm").setVisible(false);
            	this.getView().byId("orderProductsButtonConfirm").setVisible(false);
			} else {
				this.getView().getModel("view").setProperty("/inputEnabled", true);
            	this.getView().getModel("view").refresh();
            	this.getView().byId("orderProductsHBoxSave").setVisible(false);
            	this.getView().byId("orderProductsButtonSave").setVisible(false);
            	this.getView().byId("orderProductsButtonCancel").setVisible(false);
            	this.getView().byId("orderProductsHBoxConfirm").setVisible(true);
            	this.getView().byId("orderProductsButtonConfirm").setVisible(true);
			}
		},
		onConfirm : function(oEvent){
			this.switchEnable(true);
        },
        onSave : function(oEvent) {
			this.switchEnable(false);
			sap.m.MessageToast.show("Update Successful.");
        },
        onCancel : function(oEvent) {
			this.switchEnable(false);
        },
        onLiveSearch : function(oEvent) {
			var aValue = this.getView().byId("orderProductsSearchFieldProducts").getValue().split(",");
			var aItems = this.getView().byId("orderProductsTableProducts").getItems();
			
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
			var oFacetFilter = this.getView().byId("orderProductsFacetFilter");
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
			var oTable = this.getView().byId("orderProductsTableProducts");
			oTable.getBinding("items").filter(aFilter);
		},
		onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("orderProductsFacetFilter");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			var aFilter = [];
			this.exeFacetFilter(aFilter);
		}
	});
});