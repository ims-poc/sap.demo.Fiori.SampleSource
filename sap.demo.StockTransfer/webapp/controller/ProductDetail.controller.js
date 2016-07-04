sap.ui.define([
    "sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/json/JSONModel'
], function(Controller, jQuery, JSONModel) {
	"use strict";

    return Controller.extend("sap.demo.StockTransfer.controller.ProductDetail", {
        
        onInit : function() {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // this.setBindingForView();
            // var oComboIns = this.getView().byId("StockTransferInspectionCombo");
            // oComboIns.setSelectedKey("IN001");
            var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
            this.getView().setModel(sap.ui.getCore().getModel(), "transferData");
            // this.getView().setModel(oModel, "calendarData");
	    },
        
        handleNavBack : function () {
            this.oRouter.myNavBack("list");
        },
        
        setBindingForView : function() {
		  // Get calendar table and save the item template
		  var oTable = this.byId("StockTransferTableCalendar");
		  this._oTemplate = oTable.getItems()[0].clone();
		
		  // Create new JSON model for displaying data in detail view
		  var oView = this.getView();
		  var oModel = new sap.ui.model.json.JSONModel();
		  oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		  oView.setModel(oModel);
		
		  // Set the binding context of the view in order to stay compatible with previous version (direct oData binding)
		  oView.bindElement("/");
		
		  // Bind item aggregation of calendar table
		  oTable.bindAggregation("items", {
		   path : "/Weeks/results",
		   template : this._oTemplate
		  });
		 }
		//  onValueHelpRequest : function() {
		 	
		//  	var oThis = this;
		 	
		// 	var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
		// 		// basicSearchText: this.theTokenInput.getValue(), 
		// 		title : "供給サイト",
		// 		supportMultiselect : false,
		// 		supportRanges : false,
		// 		supportRangesOnly : false, 
		// 		key : "StoreID",
		// 		descriptionKey : "StoreName",
		// 		ok: function(oControlEvent) {
		// 			var oToken = oControlEvent.getParameter("tokens");
		// 			var oInput = oThis.getView().byId("StockTransferSupplierSiteInput");
		// 			oInput.setValue(oToken[0].getText());
		// 			oValueHelpDialog.close();
		// 		},
		// 		cancel: function(oControlEvent) {
		// 			oValueHelpDialog.close();
		// 		},
		// 		afterClose: function() {
		// 			oValueHelpDialog.destroy();
		// 		}
		// 	});
			
		// 	var oColModel = new sap.ui.model.json.JSONModel();
		// 	oColModel.setData({
		// 		cols: [
		// 			{label: "Store ID", template: "StoreID"},
		// 			{label: "Store Name", template: "StoreName"}
		// 		]
		// 	});
		// 	oValueHelpDialog.getTable().setModel(oColModel, "columns");
			
		// 	var oRowsModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/Store.json"));
		// 	// oRowsModel.setData(oRowsModel.getJSON());
			
		// 	oValueHelpDialog.getTable().setModel(oRowsModel);
			
		// 	if (oValueHelpDialog.getTable().bindRows) {
		// 		oValueHelpDialog.getTable().bindRows("/"); 
		// 	}
			
		// 	if (oValueHelpDialog.getTable().bindItems) { 
		// 		var oTable = oValueHelpDialog.getTable();
				
		// 		oTable.bindAggregation("items", "/", function(sId, oContext) { 
		// 			var aCols = oTable.getModel("columns").getData().cols;
		// 			return new sap.m.ColumnListItem({
		// 				cells: aCols.map(function (column) {
		// 					var colname = column.template;
		// 					return new sap.m.Label({ text: "{" + colname + "}" });
		// 				})
		// 			});
		// 		});
		// 	}
			
		// 	// oValueHelpDialog.setTokens(this.theTokenInput.getTokens());
		
		// 	var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
		// 		advancedMode :  true,
		// 		filterBarExpanded : false,
		// 		filterGroupItems: [
		// 			new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n1", label: "Store ID", control: new sap.m.Input()}),
		// 			new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n2", label: "Store Name", control: new sap.m.Input()})
		// 		],
		// 		search: function() {
		// 			// sap.m.MessageToast.show("Search pressed '" + arguments[0].mParameters.selectionSet[0].getValue() + "''");
		// 		}
		// 	});			
						
		// 	if (oFilterBar.setBasicSearch) {
		// 		oFilterBar.setBasicSearch(new sap.m.SearchField({
		// 			showSearchButton: sap.ui.Device.system.phone, 
		// 			placeholder: "Search",
		// 			search: function(event) {
		// 				oValueHelpDialog.getFilterBar().search();
		// 			} 
		// 		}));  
		// 	}
			
		// 	oValueHelpDialog.setFilterBar(oFilterBar);
			
		// 	// if (this.theTokenInput.$().closest(".sapUiSizeCompact").length > 0) { // check if the Token field runs in Compact mode
		// 		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		// 	// } else {
		// 	// 	oValueHelpDialog.addStyleClass("sapUiSizeCozy");			
		// 	// }
			
		// 	oValueHelpDialog.open();
		// 	oValueHelpDialog.update();
			
		// }
	});
});