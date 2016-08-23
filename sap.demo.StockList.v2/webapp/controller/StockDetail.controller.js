sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/demo/StockList/Configuration",
	"sap/demo/StockList/util/common"
], function(Controller, JSONModel, Configuration, common) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.StockDetail", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Set MockData
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/stockList.json"));
			this.getView().setModel(oModel, "listData");
			
			// Set TransferData
			this.getView().setModel(sap.ui.getCore().getModel("transferData"), "detailData");
			
			var oModelSite = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/filterSite.json"));
			this.getView().setModel(oModelSite, "filterSite");
			
			// Set Detail View
			sap.ui.getCore().setModel(this.getView(), "detailView");
		}
		, onSelect : function(oEvent) {
			// Get BindingContext from ColumnListItem
			var oContext = oEvent.getSource().getBindingContext("listData");
			var oTransferData = {};
			oTransferData = sap.ui.getCore().getModel("transferData").getData();
			
			oTransferData.OrderProduct[0].SupplierSite = oContext.getProperty("Site");
			oTransferData.OrderProduct[0].SupplierSiteName = oContext.getProperty("SiteName");
			oTransferData.OrderProduct[0].StockQuantity = oContext.getProperty("StockQuantity");
			oTransferData.OrderProduct[0].ProductStockUnit = oContext.getProperty("ProductStockUnit");
			oTransferData.OrderProduct[0].ProductStockUnitCd = oContext.getProperty("ProductStockUnitCd");
			
			// Site Information
			oTransferData.Site = oContext.getProperty("Site");
			oTransferData.SiteName = oContext.getProperty("SiteName");
			
			if(this.transferData === undefined) {
                this.transferData = new JSONModel();
            }
            this.transferData.setData(oTransferData);
			sap.ui.getCore().setModel(this.transferData, "transferDataForLoc");
			
			// Get Split Application
			var oSplitApp = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent();
			
			if(!oSplitApp.getDetailPage("detailLocListPage")){
				var oDetailLoc = sap.ui.view({
					id			: "detailLocListPage",
					viewName	: "sap.demo.StockList.view.StockDetailLocationList",
					type		: "XML"
            	});
				oSplitApp.addDetailPage(oDetailLoc);
			}
			
			this.oRouter.navTo(Configuration.THIRD_NAME);
		}
		, exeFacetFilter : function(aFilter) {
			var oTable = this.getView().byId("stockListTblStockPerSite");
			oTable.getBinding("items").filter(aFilter);
		}
		, setFilter : function(oEvent) {
			var aFilter = [];
			var oFacetFilter = this.getView().byId("stockListFacetFilterSite");
			var aList = oFacetFilter.getLists();
			var aSelectedItem;
			var oFilter;
			
			for(var i = 0; i < aList.length; i++){
				aSelectedItem = aList[i].getSelectedItems();
				for(var j = 0; j < aSelectedItem.length; j++) {
					oFilter = new sap.ui.model.Filter(aList[i].getKey(), "EQ", aSelectedItem[j].getKey());
					if(oFilter !== undefined){
						aFilter.push(oFilter);
					}
				}
			}
			this.exeFacetFilter(aFilter);
		},
		onFacetFilterReset : function(oEvent) {
			var oFacetFilter = this.getView().byId("stockListFacetFilterSite");
			var aFacetFilterLists = oFacetFilter.getLists();
			for(var i = 0; i < aFacetFilterLists.length; i++) {
				aFacetFilterLists[i].setSelectedKeys();
			}
			this.exeFacetFilter();
		}
		, navToOrderProducts : function(oEvent) {
			var oTransferData = this.getView().getModel("detailData").getData();
			
			if(this.transferDataForOrder === undefined) {
                this.transferDataForOrder = new JSONModel();
            }
            this.transferDataForOrder.setData(oTransferData);
			sap.ui.getCore().setModel(this.transferDataForOrder, "transferDataForOrder");
			
			// Get Split Application
			var oSplitApp = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getParent();
			
			if(!oSplitApp.getDetailPage("orderProducts")){
				var oOrderProducts = sap.ui.view({
					id			: "orderProducts",
					viewName	: "sap.demo.StockList.view.OrderProducts",
					type		: "XML"
            	});
				oSplitApp.addDetailPage(oOrderProducts);
			}
			
			this.oRouter.navTo(Configuration.FOURTH_NAME);
		}
	});
});