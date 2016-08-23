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
            
			// var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
			// this.getView().setModel(oModel, "listData");
			
			var oModelTradeCond = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/filterTradeCond.json"));
			this.getView().setModel(oModelTradeCond, "setFilterTradeCond");
			
			var oModelfilterCommodityCode = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/filterCommodityCode.json"));
			this.getView().setModel(oModelfilterCommodityCode, "setFilterCommodityCode");
			
			var oModelSeason = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/filterSeason.json"));
			this.getView().setModel(oModelSeason, "setFilterSeason");
			
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
		onValueHelpForCommodityCode : function(oEvent) {
			var oSetting = {};
			oSetting.title = "品番";
			oSetting.key = "data";
			oSetting.descriptionKey = "text";
			oSetting.labelKeyCol = "品番";
			oSetting.labelTextCol = "品番名";
			oSetting.dataKeyCol = "filterCommodityCode>data";
			oSetting.dataTextCol = "filterCommodityCode>text";
			oSetting.filePath = "/filterCommodityCode.json";
			oSetting.modelKey = "filterCommodityCode";
			oSetting.bindTarget = "filterCommodityCode>/filterCommodityCode";
			oSetting.oInputKey = this.getView().byId("orderProductsInpCommCdFilter");
			oSetting.oInput = this.getView().byId("orderProductsInpCommCdText");
			common.createValueHelpForFilter(oSetting);
		},
		onValueHelpForTradeCondition : function(oEvent) {
			var oSetting = {};
			oSetting.title = "取引条件";
			oSetting.key = "data";
			oSetting.descriptionKey = "text";
			oSetting.labelKeyCol = "取引条件";
			oSetting.labelTextCol = "取引条件";
			oSetting.dataKeyCol = "filterTradeCond>data";
			oSetting.dataTextCol = "filterTradeCond>text";
			oSetting.filePath = "/filterTradeCond.json";
			oSetting.modelKey = "filterTradeCond";
			oSetting.bindTarget = "filterTradeCond>/filterTradeCond";
			oSetting.oInputKey = this.getView().byId("orderProductsInpTradeCondFilter");
			oSetting.oInput = this.getView().byId("orderProductsInpTradeCondText");
			common.createValueHelpForFilter(oSetting);
		},
		onValueHelpForSeason : function(oEvent) {
			var oSetting = {};
			oSetting.title = "シーズン";
			oSetting.key = "data";
			oSetting.descriptionKey = "text";
			oSetting.labelKeyCol = "シーズン";
			oSetting.labelTextCol = "シーズン";
			oSetting.dataKeyCol = "filterSeason>data";
			oSetting.dataTextCol = "filterSeason>text";
			oSetting.filePath = "/filterSeason.json";
			oSetting.modelKey = "filterSeason";
			oSetting.bindTarget = "filterSeason>/filterSeason";
			oSetting.oInputKey = this.getView().byId("orderProductsInpSeasonFilter");
			oSetting.oInput = this.getView().byId("orderProductsInpSeasonText");
			common.createValueHelpForFilter(oSetting);
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
				this._oDialog = sap.ui.xmlfragment("sap.demo.OrderProducts.view.fragment.BarCodeScanner", this);
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
            	this.getView().byId("orderProductsHBoxSave").setVisible(true);
            	this.getView().byId("orderProductsButtonSave").setVisible(true);
            	this.getView().byId("orderProductsButtonCancel").setVisible(true);
            	this.getView().byId("orderProductsHBoxConfirm").setVisible(false);
            	this.getView().byId("orderProductsButtonConfirm").setVisible(false);
            	this.getView().byId("orderProductsBarSearch").setVisible(false);
            	// this.getView().byId("orderProductsTblToolbar").setVisible(false);
            	this.getView().byId("orderProductsBtnSelectStore").setVisible(false);
            	this.getView().byId("stockTransferFilBar").setVisible(false);
            	this.getView().byId("orderProductsButtonUp").setVisible(false);
            	this.getView().byId("orderProductsButtonDown").setVisible(false);
			} else {
            	this.getView().byId("orderProductsHBoxSave").setVisible(false);
            	this.getView().byId("orderProductsButtonSave").setVisible(false);
            	this.getView().byId("orderProductsButtonCancel").setVisible(false);
            	this.getView().byId("orderProductsHBoxConfirm").setVisible(true);
            	this.getView().byId("orderProductsButtonConfirm").setVisible(true);
            	this.getView().byId("orderProductsBarSearch").setVisible(true);
            	// this.getView().byId("orderProductsTblToolbar").setVisible(true);
            	this.getView().byId("orderProductsBtnSelectStore").setVisible(true);
            	this.getView().byId("stockTransferFilBar").setVisible(true);
            	this.getView().byId("orderProductsButtonUp").setVisible(true);
            	this.getView().byId("orderProductsButtonDown").setVisible(true);
			}
		},
		onConfirm : function(oEvent){
			this.switchEnable(true);
			var aItems = this.getView().byId("orderProductsTableProducts").getItems();
			var iQuantity;
			var iSumQuantity = 0;
			var iSumPrice = 0;
			
			for(var i = 0; i < aItems.length; i++) {
				iQuantity = aItems[i].getAggregation("cells")[3].getAggregation("items")[0].getValue() * 1;
				aItems[i].getAggregation("cells")[3].getAggregation("items")[0].setEnabled(false);
				if(iQuantity === 0) {
					// aItems[i].setVisible(false);
				} else {
					// aItems[i].setVisible(true);
					// aItems[i].getAggregation("cells")[3].getAggregation("items")[0].setEnabled(false);
					iSumQuantity = iSumQuantity + iQuantity;
					iSumPrice = iSumPrice + (iQuantity * (aItems[i].getAggregation("cells")[6].getValue() * 1));
				}
			}
			
			this.getView().byId("orderProductsVBoxSummary").setVisible(true);
			this.getView().byId("orderProductsTitleSummaryQuantity").setText(
				sap.ui.getCore().getModel("i18n").getResourceBundle().getText("TITLE_SUMMARY_QUANTITY") +
				iSumQuantity.toLocaleString() + " 個"
			);
			
			this.getView().byId("orderProductsTitleSummaryPrice").setText(
				sap.ui.getCore().getModel("i18n").getResourceBundle().getText("TITLE_SUMMARY_PRICE") +
				iSumPrice.toLocaleString() + " JPY"
			);
        },
        onSave : function(oEvent) {
			this.switchEnable(false);
			this.resetVisibleForRow();
			this.getView().byId("orderProductsVBoxSummary").setVisible(false);
			sap.m.MessageToast.show("Update Successful.");
        },
        onCancel : function(oEvent) {
			this.switchEnable(false);
			this.resetVisibleForRow();
			this.getView().byId("orderProductsVBoxSummary").setVisible(false);
        },
        resetVisibleForRow : function() {
        	var aItems = this.getView().byId("orderProductsTableProducts").getItems();
			for(var i = 0; i < aItems.length; i++) {
				aItems[i].setVisible(true);
				aItems[i].getAggregation("cells")[3].getAggregation("items")[0].setEnabled(true);
			}
        },
        onSearch : function(oEvent) {
			if(!this.getView().getModel("listData")) {
				var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
				oModel.setSizeLimit(100);
				this.getView().setModel(oModel, "listData");
				var oPage = this.getView().byId("mainListPage");
				oPage.setTitle(oPage.getTitle() + "1（10）");
			}
			
			var aFilter = [];
			this.getSearchObject(aFilter);
			this.getFilterObject(aFilter);
			this.exeFacetFilter(aFilter);
			
        },
        getSearchObject : function(aFilter) {
			var aValue = this.getView().byId("orderProductsSearchFieldProducts").getValue().split(",");
			
        	for(var i = 0; i < aValue.length; i++){
				if(aValue[i] !== "") {
					var oFilter = new sap.ui.model.Filter(
						"Product",
						sap.ui.model.FilterOperator.Contains,
						aValue[i]
					);
					aFilter.push(oFilter);
				} else {
					oFilter = undefined;
				}
        	}
        },
        getFilterObject : function(aFilter) {
			var oCommodityCodeInp = this.getView().byId("orderProductsInpCommCdFilter");
			var oTradeCondInp = this.getView().byId("orderProductsInpTradeCondFilter");
			var oSeasonInp = this.getView().byId("orderProductsInpSeasonFilter");
			var oCommodityCode = this.getView().byId("orderProductsInpCommCdText");
			var oTradeCond = this.getView().byId("orderProductsInpTradeCondText");
			var oSeason = this.getView().byId("orderProductsInpSeasonText");
			
			if(oCommodityCodeInp.getValue() !== ""){
				var oFilterC = new sap.ui.model.Filter(
					"CommodityCode",
					"EQ",
					oCommodityCode.getText()
				);
				aFilter.push(oFilterC);
			}
			
			if(oTradeCondInp.getValue() !== ""){
				var oFilterT = new sap.ui.model.Filter(
					"TradeCondition",
					"EQ",
					oTradeCond.getText()
				);
				aFilter.push(oFilterT);
			}
			
			if(oSeasonInp.getValue() !== ""){
				var oFilterS = new sap.ui.model.Filter(
					"Season",
					"EQ",
					oSeason.getText()
				);
				aFilter.push(oFilterS);
			}
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