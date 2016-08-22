sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/demo/StockList/Configuration",
	"sap/demo/StockList/util/common"
], function(Controller, JSONModel, Configuration, common) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.StockList", {
		
		onInit : function() {
			gThat = this;
            
            // Set Router For List View 
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // Set MockData For List View
			// var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/stockList.json"));
			// this.getView().setModel(oModel, "listData");
			
			var oModelStyle = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/filterStyle.json"));
			this.getView().setModel(oModelStyle, "filterStyle");
			
			// Set up user site
			this.setUserSite();
		}
		, setUserSite : function() {
			var oModel;
			var sJsonFile = jQuery.sap.getModulePath("sap.demo.MockData", "/userInfo.json");
			
			if(!sap.ui.getCore().getModel("UserInfo")) {
				oModel = new sap.ui.model.json.JSONModel(sJsonFile);
				sap.ui.getCore().setModel(oModel, "UserInfo");
			} else {
				oModel = sap.ui.getCore().getModel("UserInfo");
			}
			oModel.attachRequestCompleted(function() {
				$("#sJsonFile").append(oModel.getJSON());
			});
		}
		, onSelect : function(oEvent) {
			
			if (this._prevSelect) {
				this._prevSelect.$().css('background-color', '');
			}
			var item = oEvent.getParameter('listItem');
			item.$().css('background-color', '#add8e6');
			this._prevSelect = item;
			
			var oContext = oEvent.getSource().getSelectedItem().getBindingContext("listData");
			
			var oTransferData = {
				"OrderProduct":[{
					"Product" : oContext.getProperty("Product"),
					"ProductName" : oContext.getProperty("ProductName"),
					"ProductForSupplier" : oContext.getProperty("ProductSupplier"),
					"ProductColor" : oContext.getProperty("ProductColor"),
					"ProductSize" : oContext.getProperty("ProductSize"),
					"ProductOrder" : oContext.getProperty("ProductOrder"),
					"ProductOrderUnit" : oContext.getProperty("ProductOrderUnit"),
					"ProductOrderUnitCd" : oContext.getProperty("ProductOrderUnitCd"),
					"ProductStock" : oContext.getProperty("ProductStock"),
					"ProductStockUnit" : oContext.getProperty("ProductStockUnit"),
					"ProductStockUnitCd" : oContext.getProperty("ProductStockUnitCd"),
					"ProductAllocated" : oContext.getProperty("ProductAllocated"),
					"ProductAllocatedUnit" : oContext.getProperty("ProductAllocatedUnit"),
					"ProductAllocatedUnitCd" : oContext.getProperty("ProductAllocatedUnitCd"),
					"ProductPrice" : oContext.getProperty("ProductPrice"),
					"Currency" : oContext.getProperty("Currency"),
					"ProductColorSupplier" : oContext.getProperty("ProductColorSupplier"),
					"ProductSizeSupplier" : oContext.getProperty("ProductSizeSupplier")
				}],
				"UserSite" : sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite,
				"UserSiteName" : sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName
			};
			
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
		}
		, onValueHelpRequest : function() {
			common.createValueHelpRequest(this);
		}
		, onValueHelpForStyle : function(oEvent) {
			var oSetting = {};
			oSetting.title = "スタイル";
			oSetting.key = "data";
			oSetting.descriptionKey = "text";
			oSetting.labelKeyCol = "スタイル";
			oSetting.labelTextCol = "スタイル名";
			oSetting.dataKeyCol = "filterStyle>data";
			oSetting.dataTextCol = "filterStyle>text";
			oSetting.filePath = "/filterStyle.json";
			oSetting.modelKey = "filterStyle";
			oSetting.bindTarget = "filterStyle>/filterStyle";
			oSetting.oInputKey = this.getView().byId("stockListInpStyleFilter");
			oSetting.oInput = this.getView().byId("stockListInpStyleText");
			common.createValueHelpForFilter(oSetting);
		}
		, onSearch : function(oEvent) {
			if(!this.getView().getModel("listData")) {
				var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/stockList.json"));
				oModel.setSizeLimit(100);
				this.getView().setModel(oModel, "listData");
				
				var oPage = this.getView().byId("mainPageList");
				oPage.setTitle(oPage.getTitle() + "　1（10）");
			}
			var aFilter = [];
			this.getSearchObject(aFilter);
			this.getFilterObject(aFilter);
			this.exeFacetFilter(aFilter);
		}
		, getSearchObject : function(aFilter) {
			var aValue = this.getView().byId("stockListSearchFieldProduct").getValue().split(",");
			
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
        }
		, exeFacetFilter : function(aFilter) {
			var oTable = this.getView().byId("stockListListStock");
			oTable.getBinding("items").filter(aFilter);
		}
		, getFilterObject : function(aFilter) {
			var oStyleInp = this.getView().byId("stockListInpStyleFilter");
			var oStyle = this.getView().byId("stockListInpStyleText");

			if(oStyleInp.getValue() !== ""){
				var oFilter = new sap.ui.model.Filter(
					"ProductStyle",
					"EQ",
					oStyle.getText()
				);
				aFilter.push(oFilter);
			}
		}
		, onLiveSearch : function(oEvent) {
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
        }
        , applySearchPatternToTableItem : function(oTableItem, sSearchPattern) {
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
        }
        , setFilter : function() {
			var aFilter = [];
			// Make FilterObject for FacetFilter
			this.getFilterForFacetFilter(aFilter);
			this.exeFacetFilter(aFilter);
			this.onLiveSearch({});
		}
		, getFilterForFacetFilter : function(aFilter) {
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
		}
		, onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("stockListFacetFilterStyle");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			var aFilter = [];
			this.exeFacetFilter(aFilter);
		}
		, onOpenDialog : function() {
			if(!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.demo.StockList.view.fragment.stockList.BarCodeScanner", this);
			}
			this._oDialog.open();
		}
		, onConfirmForBarCodeScanner : function() {
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
		}
		, onCancelForBarCodeScanner : function() {
			this._oDialog.close();
		}
	});
});