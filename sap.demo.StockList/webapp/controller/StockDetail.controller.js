sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/demo/StockList/Configuration',
	'sap/demo/StockList/util/common'
], function(Controller, JSONModel, Configuration, common) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.StockDetail", {

		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			// Set MockData For Detail View
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/stockList.json"));
			this.getView().setModel(oModel, "listData");
			oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/userInfo.json"));
			this.getView().setModel(oModel, "UserInfo");
			this.getView().setModel(sap.ui.getCore().getModel("transferData"), "detailData");
			
		}
		, setPageTitleForSite : function() {
			this.getView().getModel("detailData").getData().UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;                   
			this.getView().getModel("detailData").getData().UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
			this.getView().getModel("detailData").refresh();
		}
		, onValueHelpRequest : function() {
			common.createValueHelpRequest(this);
		}
		, onSelect : function(oEvent) {
			// Get BindingContext from ColumnListItem
			var oContext = oEvent.getSource().getBindingContext("listData");
			var oTransferData = {};
			
			// Product And User Site Information
			oTransferData = sap.ui.getCore().getModel("transferData").getData();
			
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
		, onFacetFilterListClose : function(oEvent) {
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
	});

});