sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/demo/StockList/Configuration"
], function(Controller, Configuration) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.StockTransfer", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.demo.StockList.view.StockTransfer
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			// Set TransferData
			this.getView().setModel(sap.ui.getCore().getModel("transferDataForStockTransfer"), "stockTransferData");
			
			// Set Detail View
			sap.ui.getCore().setModel(this.getView(), "stockTransferView");
		}
		, handleNavBack : function(){
			this.oRouter.myNavBack(Configuration.THIRD_NAME);
		}
		, onSave : function(oEvent){
			if(!this.chkInput()) {
				return;
			}
			sap.m.MessageToast.show("Update Successful.");
			this.resetValueState();
		}
		, chkInput : function() {
			var oTable = this.getView().byId("stockListTblStockTransfer");
			var aItems = oTable.getAggregation("items");
			var oMultiInput;
			var oInput;
			var bReturn = true;
			
			for(var i = 0; i < aItems.length; i++) {
				oMultiInput = aItems[i].getAggregation("cells")[3];
				oInput = aItems[i].getAggregation("cells")[4].getAggregation("items")[0];
				if(!oMultiInput.getValue()) {
					oMultiInput.setValueState("Error");
					oMultiInput.setValueStateText("Select SupplierSite!");
					bReturn = false;
				} else {
					oMultiInput.setValueState("Success");
					oMultiInput.setValueStateText("");
				}
				if(!oInput.getValue() || oInput.getValue() * 1 === 0) {
					oInput.setValueState("Error");
					oInput.setValueStateText("Input Order Quantity!");
					bReturn = false;
				} else {
					oInput.setValueState("Success");
					oInput.setValueStateText("");
				}
			}
			return bReturn;
		}
		, resetValueState : function() {
			var oTable = this.getView().byId("stockListTblStockTransfer");
			var aItems = oTable.getAggregation("items");
			var oMultiInput;
			var oInput;
			for(var i = 0; i < aItems.length; i++) {
				oMultiInput = aItems[i].getAggregation("cells")[3];
				oInput = aItems[i].getAggregation("cells")[4].getAggregation("items")[0];
				
				oMultiInput.setValueState("None");
				oMultiInput.setValueStateText("");
				
				oInput.setValueState("None");
				oInput.setValueStateText("");
			}
		}
		, onAddButtonPress : function(oEvent) {
			var oTable = this.getView().byId("stockListTblStockTransfer");
			var oItemObject = oTable.getAggregation("items")[0]; // 1行目のテーブル上のコンポーネントを取得
			var oHbox = oItemObject.getAggregation("cells")[4]; // テーブル上のコンポーネントの4番目を取得
			var oInput = oHbox.getAggregation("items")[0]; // HBox内のsap.m.Inputを取得
			// Get Input Order Quantity
			var iOrderQuantity = oInput.getValue() * 1;
			
			oInput.setValue(iOrderQuantity + 1);
		}
		, onLessButtonPress : function(oEvent) {
			var oTable = this.getView().byId("stockListTblStockTransfer");
			var oItemObject = oTable.getAggregation("items")[0]; // 1行目のテーブル上のコンポーネントを取得
			var oHbox = oItemObject.getAggregation("cells")[4]; // テーブル上のコンポーネントの4番目を取得
			var oInput = oHbox.getAggregation("items")[0]; // HBox内のsap.m.Inputを取得
			// Get Input Order Quantity
			var iOrderQuantity = oInput.getValue() * 1;
			
			if(iOrderQuantity >= 1) {
				oInput.setValue(iOrderQuantity - 1);
			}
		}
		, onValueHelpRequestForSupplierSite : function(oEvent) {
			
			var oThis = this;
			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				title : "供給元サイト",
				supportMultiselect : false,
				supportRanges : false,
				supportRangesOnly : false, 
				key : "StoreID",
				descriptionKey : "StoreName",
				ok: function(oControlEvent) {
					var oToken = oControlEvent.getParameter("tokens");
					var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/store.json");
					var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
					sap.ui.getCore().setModel(oToken[0].getKey(), "StoreID");
					
					oModel.attachRequestCompleted(function(){
						$("#sJsonFilePath").append(oModel.getJSON());
						var sKey = sap.ui.getCore().getModel("StoreID");
						
						var aData = oModel.getData().StoreMaster;
						for(var i =  0; i < aData.length; i++){
							if(aData[i].StoreID === sKey) {
								var oTable = oThis.getView().byId("stockListTblStockTransfer");
								var oItemObject = oTable.getAggregation("items")[0];
								var oMultiInput = oItemObject.getAggregation("cells")[3];
								oMultiInput.setValue(aData[i].StoreName);
								oValueHelpDialog.close();
								return;
							}
						}
					});
				},
				cancel: function(oControlEvent) {
					oValueHelpDialog.close();
				},
				afterClose: function() {
					oValueHelpDialog.destroy();
				}
			});
			
			var oColModel = new sap.ui.model.json.JSONModel();
			oColModel.setData({
				cols: [
					{label: "供給元サイト", template: "data>StoreID"},
					{label: "供給元サイト名", template: "data>StoreName"}
				]
			});
			oValueHelpDialog.getTable().setModel(oColModel, "columns");
			
			var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/store.json"));
			oValueHelpDialog.getTable().setModel(oRowsModel, "data");
			
			if (oValueHelpDialog.getTable().bindRows) {
				oValueHelpDialog.getTable().bindRows("data>/StoreMaster"); 
			}
			
			if (oValueHelpDialog.getTable().bindItems) { 
				var oTable = oValueHelpDialog.getTable();
				
				oTable.bindAggregation("items", "data>/StoreMaster", function(sId, oContext) { 
					var aCols = oTable.getModel("columns").getData().cols;
					return new sap.m.ColumnListItem({
						cells: aCols.map(function (column) {
							var colname = column.template;
							return new sap.m.Label({ text: "{" + colname + "}" });
						})
					});
				});
			}
			// var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			// 	advancedMode :  true,
			// 	filterBarExpanded : false,
			// 	showGoButton : false,
			// 	searchEnabled : false
			// });
			// if (oFilterBar.setBasicSearch) {
			// 	oFilterBar.setBasicSearch(
					var oSearchField = new sap.m.SearchField({
						showSearchButton: sap.ui.Device.system.phone, 
						placeholder: "サイト検索",
						showRefreshButton : true,
						liveChange : function(oEve) {
							// var sQuery = oEvent.getParameter("query");
							var sQuery = oEve.getSource().getValue();
							var oBinding = oValueHelpDialog.getTable().getBinding("rows");
							if (sQuery) {
								var oFilter1 = [
									new sap.ui.model.Filter("StoreID", sap.ui.model.FilterOperator.Contains, sQuery),
									new sap.ui.model.Filter("StoreName", sap.ui.model.FilterOperator.Contains, sQuery)
								];
								var allFilters = new sap.ui.model.Filter(oFilter1, false);
								oBinding.filter(allFilters);
							} else {
								sQuery = oEve.getSource().getValue();
								var oFilter = new sap.ui.model.Filter("StoreID", sap.ui.model.FilterOperator.Contains, sQuery);
								oBinding.filter(oFilter);
							}
						}
					// })
				});
			// }
			
			// oValueHelpDialog.setFilterBar(oFilterBar);
			oValueHelpDialog.insertContent(oSearchField);
			oValueHelpDialog.addStyleClass("sapUiSizeCompact");
			
			oValueHelpDialog.open();
			oValueHelpDialog.update();	
		}
	});
});