sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/demo/StockList/Configuration"
], function(Controller, JSONModel, Configuration) {
	"use strict";

	return Controller.extend("sap.demo.StockList.controller.OrderProducts", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.demo.StockList.view.OrderProducts
		 */
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			// Set TransferData
			this.getView().setModel(sap.ui.getCore().getModel("transferDataForOrder"), "orderData");
			
			// Set Detail View
			sap.ui.getCore().setModel(this.getView(), "orderView");
		}
		, handleNavBack : function(){
			this.oRouter.myNavBack(Configuration.SECOND_NAME);
		}
		, onSave : function(oEvent){
			
		}
		, onAddButtonPress : function(oEvent) {
			var oTable = this.getView().byId("stockListTblOrderProducts");
			var oItemObject = oTable.getAggregation("items")[0]; // 1行目のテーブル上のコンポーネントを取得
			var oHbox = oItemObject.getAggregation("cells")[3]; // テーブル上のコンポーネントの4番目を取得
			var oInput = oHbox.getAggregation("items")[0]; // HBox内のsap.m.Inputを取得
			// Get Input Order Quantity
			var iOrderQuantity = oInput.getValue() * 1;
			
			oInput.setValue(iOrderQuantity + 1);
		}
		, onLessButtonPress : function(oEvent) {
			var oTable = this.getView().byId("stockListTblOrderProducts");
			var oItemObject = oTable.getAggregation("items")[0]; // 1行目のテーブル上のコンポーネントを取得
			var oHbox = oItemObject.getAggregation("cells")[3]; // テーブル上のコンポーネントの4番目を取得
			var oInput = oHbox.getAggregation("items")[0]; // HBox内のsap.m.Inputを取得
			// Get Input Order Quantity
			var iOrderQuantity = oInput.getValue() * 1;
			
			if(iOrderQuantity >= 1) {
				oInput.setValue(iOrderQuantity - 1);
			}
		}
	});

});