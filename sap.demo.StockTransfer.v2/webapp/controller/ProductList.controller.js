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
            // set explored app's demo model on this sample
			// var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
			// this.getView().setModel(oModel, "listData");
			
			var oModelTradeCond = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/filterTradeCond.json"));
			this.getView().setModel(oModelTradeCond, "setFilterTradeCond");
			
			var oModelfilterCommodityCode = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/filterCommodityCode.json"));
			this.getView().setModel(oModelfilterCommodityCode, "setFilterCommodityCode");
			
			var oModelSeason = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/filterSeason.json"));
			this.getView().setModel(oModelSeason, "setFilterSeason");
			
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
			oSetting.oInputKey = this.getView().byId("stockTransferInpCommCdFilter");
			oSetting.oInput = this.getView().byId("stockTransferInpCommCdText");
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
			oSetting.oInputKey = this.getView().byId("stockTransferInpTradeCondFilter");
			oSetting.oInput = this.getView().byId("stockTransferInpTradeCondText");
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
			oSetting.oInputKey = this.getView().byId("stockTransferInpSeasonFilter");
			oSetting.oInput = this.getView().byId("stockTransferInpSeasonText");
			common.createValueHelpForFilter(oSetting);
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
            
        },
        onOpenDialog : function() {
			if(!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("sap.demo.StockTransfer.view.fragment.BarCodeScanner", this);
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
				// var sSelectedItem = oSelectedItem.getBindingContextPath();
				// var sSelectedItemIndex = sSelectedItem.slice(sSelectedItem.indexOf("/",1) + 1);
				// var dCurrentQuantity = this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder * 1;
				// this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder = dCurrentQuantity + 1;
				// this.getView().getModel("listData").refresh();
				var oInput = oSelectedItem.getAggregation("cells")[4].getAggregation("items")[0];
				var dCurrentQuantity = oInput.getValue() * 1;
				oInput.setValue(dCurrentQuantity + 1);
			}
		},
		onLessButtonPress : function(oEvent) {
			var oTable = this.getView().byId("stockTransferTableProducts");
			var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem) {
				// var sSelectedItem = oSelectedItem.getBindingContextPath();
				// var sSelectedItemIndex = sSelectedItem.slice(sSelectedItem.indexOf("/",1) + 1);
				// var dCurrentQuantity = this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder * 1;
				var oInput = oSelectedItem.getAggregation("cells")[4].getAggregation("items")[0];
				var dCurrentQuantity = oInput.getValue() * 1;
				if(dCurrentQuantity > 0) {
					// this.getView().getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder = dCurrentQuantity - 1;
					// this.getView().getModel("listData").refresh();
					oInput.setValue(dCurrentQuantity - 1);
				}
			}
		},
		switchEnable : function(bToSave) {
			if(bToSave) {
            	this.getView().byId("stockTransferHBoxSave").setVisible(true);
            	this.getView().byId("stockTransferButtonSave").setVisible(true);
            	this.getView().byId("stockTransferButtonCancel").setVisible(true);
            	this.getView().byId("stockTransferHBoxConfirm").setVisible(false);
            	this.getView().byId("stockTransferButtonConfirm").setVisible(false);
            	this.getView().byId("stockTransferBarSearch").setVisible(false);
            	// this.getView().byId("stockTransferToolBarTblHeader").setVisible(false);
            	this.getView().byId("stockTransferBtnSelectStore").setVisible(false);
            	this.getView().byId("stockTransferFilBar").setVisible(false);
            	this.getView().byId("stockTransferButtonUp").setVisible(false);
            	this.getView().byId("stockTransferButtonDown").setVisible(false);
			} else {
            	this.getView().byId("stockTransferHBoxSave").setVisible(false);
            	this.getView().byId("stockTransferButtonSave").setVisible(false);
            	this.getView().byId("stockTransferButtonCancel").setVisible(false);
            	this.getView().byId("stockTransferHBoxConfirm").setVisible(true);
            	this.getView().byId("stockTransferButtonConfirm").setVisible(true);
            	this.getView().byId("stockTransferBarSearch").setVisible(true);
            	// this.getView().byId("stockTransferToolBarTblHeader").setVisible(true);
            	this.getView().byId("stockTransferBtnSelectStore").setVisible(true);
            	this.getView().byId("stockTransferFilBar").setVisible(true);
            	this.getView().byId("stockTransferButtonUp").setVisible(true);
            	this.getView().byId("stockTransferButtonDown").setVisible(true);
			}
		},
		onConfirm : function(oEvent){
			this.switchEnable(true);
			this.chkInputData();
        },
        chkInputData : function() {
        	var aItems = this.getView().byId("stockTransferTableProducts").getItems();
			var iQuantity;
			var sSupplierSite;
			var bReturn = true;
			
			for(var i = 0; i < aItems.length; i++) {
				sSupplierSite = aItems[i].getAggregation("cells")[3].getValue();
				iQuantity = aItems[i].getAggregation("cells")[4].getAggregation("items")[0].getValue() * 1;
				
				aItems[i].getAggregation("cells")[3].setEnabled(false);
				aItems[i].getAggregation("cells")[4].getAggregation("items")[0].setEnabled(false);
				
				if(iQuantity === 0 && sSupplierSite === "") {
					aItems[i].getAggregation("cells")[3].setValueState("None");
					aItems[i].getAggregation("cells")[4].getAggregation("items")[0].setValueState("None");
				// } else if(iQuantity === 0) {
				// 	aItems[i].getAggregation("cells")[4].getAggregation("items")[0].setValueState("Error");
				// 	bReturn = false;
				} else if(sSupplierSite === "") {
					aItems[i].getAggregation("cells")[3].setValueState("Error");
					bReturn = false;
				} else {
					aItems[i].getAggregation("cells")[3].setValueState("Success");
					aItems[i].getAggregation("cells")[4].getAggregation("items")[0].setValueState("Success");
				}
			}
			
			return bReturn;
        },
        onSave : function(oEvent) {
			this.switchEnable(false);
			this.resetTableRow();
			sap.m.MessageToast.show("Update Successful.");
        },
        resetTableRow : function(){
        	var aItems = this.getView().byId("stockTransferTableProducts").getItems();
        	for(var i = 0; i < aItems.length; i++) {
				aItems[i].setVisible(true);
				if(!aItems[i].getAggregation("cells")[3].getValue()) {
					aItems[i].getAggregation("cells")[3].setEnabled(true);
				}
				aItems[i].getAggregation("cells")[4].getAggregation("items")[0].setEnabled(true);
				aItems[i].getAggregation("cells")[3].setValueState("None");
				aItems[i].getAggregation("cells")[4].getAggregation("items")[0].setValueState("None");
			}
        },
        onCancel : function(oEvent) {
			this.switchEnable(false);
			this.resetTableRow();
        },
   //     getText : function(oEvent) {
			// var oSource = oEvent.getSource();
			// if(oSource.getValue() === "") {
			// 	oSource.getParent().getAggregation("items")[2].setText("");
			// }
   //     },
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
			var aValue = this.getView().byId("stockTransferSearchFieldProducts").getValue().split(",");
			
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
        exeFacetFilter : function(aFilter) {
			var oTable = this.getView().byId("stockTransferTableProducts");
			oTable.getBinding("items").filter(aFilter);
		},
		getFilterObject : function(aFilter) {
			// var oFilterBar = this.getView().byId("stockTransferFilBar");
			// var aFilterBarItems = oFilterBar.getAllFilterItems(true);
			// for(var i = 0; i < aFilterBarItems.length; i++) {
			// 	var aValue = oFilterBar.determineControlByFilterItem(aFilterBarItems[i]).getAggregation("items")[0].getValue().split(",");
			// 	for(var j = 0; j < aValue.length; j++)
			// 	if(aValue[j] !== "") {
			// 		var oFilter = new sap.ui.model.Filter(
			// 			aFilterBarItems[i].getName(),
			// 			"EQ",
			// 			aValue[j]
			// 		);
			// 		aFilter.push(oFilter);
			// 	} else {
			// 		oFilter = undefined;
			// 	}
			// }
			var oCommodityCodeInp = this.getView().byId("stockTransferInpCommCdFilter");
			var oTradeCondInp = this.getView().byId("stockTransferInpTradeCondFilter");
			var oSeasonInp = this.getView().byId("stockTransferInpSeasonFilter");
			var oCommodityCode = this.getView().byId("stockTransferInpCommCdText");
			var oTradeCond = this.getView().byId("stockTransferInpTradeCondText");
			var oSeason = this.getView().byId("stockTransferInpSeasonText");
			
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