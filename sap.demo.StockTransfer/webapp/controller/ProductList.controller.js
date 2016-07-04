sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/json/JSONModel',
	'sap/demo/StockTransfer/util/common'
], function(Controller, jQuery, JSONModel, common) {
	"use strict";

	return Controller.extend("sap.demo.StockTransfer.controller.ProductList", {
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
			common.createValueHelpRequest(this);
		},
		onValueHelpRequestForSupplierSite : function(oEvent) {
			
			var oSource = oEvent.getSource();
            var oColListItem = oSource.getParent();
            var selectedItemPath = oColListItem.getBindingContextPath();
            var selectedItemIndex = selectedItemPath.slice(selectedItemPath.indexOf("/",1) + 1);
			
			sap.ui.getCore()._mockDataModel = this.getView().getModel("listData");
			sap.ui.getCore()._selectedIndex = selectedItemIndex;
			common.createValueHelpRequestForSupplierSite(this);
		},
        navigate : function(oEvent){
            
            var oSource = oEvent.getSource();
            var oColListItem = oSource.getParent().getParent();
            var selectedItemPath = oColListItem.getBindingContextPath();
            var selectedItemIndex = selectedItemPath.slice(selectedItemPath.indexOf("/",1) + 1);
            var oTransferData = this.getView().getModel("listData").getData().ProductCollection[selectedItemIndex];
            oTransferData.UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;
            oTransferData.UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
            
            // var oSource = oEvent.getSource();
            // var oColListItem = oSource.getParent().getParent();
            // var oContext = oColListItem.getBindingContext("listData");
            
            // var oModel = {};
            
            // oModel.ProductName = oContext.getProperty("ProductName");
            // oModel.ProductID = oContext.getProperty("ProductID");
            // oModel.GlobalTradeItemNumber = oContext.getProperty("GlobalTradeItemNumber");
            // oModel.OrderQuantityUnitCode = oContext.getProperty("OrderQuantityUnitCode");
            // oModel.OrderQuantity = oContext.getProperty("OrderQuantity");
            // oModel.MerchandiseCategory = oContext.getProperty("MerchandiseCategory");
            // oModel.OriginalOrderQuantity = oContext.getProperty("OriginalOrderQuantity");
            // oModel.SalesPrice = oContext.getProperty("SalesPrice");
            // oModel.SalesPriceCurrency = oContext.getProperty("SalesPriceCurrency");
            // oModel.AvailableStockQuantity = oContext.getProperty("AvailableStockQuantity");
            // oModel.TotalOrderItemQtyOfAllocOrders = oContext.getProperty("TotalOrderItemQtyOfAllocOrders");
            // oModel.PlannedOrderDeliveryInDays = oContext.getProperty("PlannedOrderDeliveryInDays");
            // oModel.SalesQuantityUnitCode = oContext.getProperty("SalesQuantityUnitCode");
            // oModel.TradeCond = oContext.getProperty("TradeCond");
            // oModel.CommodityCode = oContext.getProperty("CommodityCode");
            
            if(this.transferData === undefined) {
                this.transferData = new JSONModel();
            }
            
            this.transferData.setData(oTransferData, "transferData");
            // this.transferData.setData(oModel, false);
            sap.ui.getCore().setModel(this.transferData);
            
            this.oRouter.navTo("detail");
        },
        onOpenDialog : function() {
			if(!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.demo.StockTransfer.view.BarCodeScanner", this);
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
			// 			oThis.getView().byId("stockTransferSearchFieldProducts").setValue(sTempText);
						
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
			this.getView().byId("stockTransferSearchFieldProducts").setValue(sTempText);
			this._oDialog.close();
		},
		onCancelForBarCodeScanner : function() {
			this._oDialog.close();
		},
        onAddButtonPress : function(oEvent) {
			var oTable = this.getView().byId("stockTransferTableProducts");
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
			var oTable = this.getView().byId("stockTransferTableProducts");
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
            	this.getView().byId("stockTransferHBoxSave").setVisible(true);
            	this.getView().byId("stockTransferButtonSave").setVisible(true);
            	this.getView().byId("stockTransferButtonCancel").setVisible(true);
            	this.getView().byId("stockTransferHBoxConfirm").setVisible(false);
            	this.getView().byId("stockTransferButtonConfirm").setVisible(false);
			} else {
				this.getView().getModel("view").setProperty("/inputEnabled", true);
            	this.getView().getModel("view").refresh();
            	this.getView().byId("stockTransferHBoxSave").setVisible(false);
            	this.getView().byId("stockTransferButtonSave").setVisible(false);
            	this.getView().byId("stockTransferButtonCancel").setVisible(false);
            	this.getView().byId("stockTransferHBoxConfirm").setVisible(true);
            	this.getView().byId("stockTransferButtonConfirm").setVisible(true);
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
			var aValue = this.getView().byId("stockTransferSearchFieldProducts").getValue().split(",");
			var aItems = this.getView().byId("stockTransferTableProducts").getItems();
			
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
			var oFacetFilter = this.getView().byId("stockTransferFacetFilter");
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
			var oTable = this.getView().byId("stockTransferTableProducts");
			oTable.getBinding("items").filter(aFilter);
		},
		onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("stockTransferFacetFilter");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			var aFilter = [];
			this.exeFacetFilter(aFilter);
		}
	});
});