sap.ui.define([
    "sap/ui/core/mvc/Controller",
	'jquery.sap.global',
	'sap/ui/model/json/JSONModel',
	'sap/demo/OrderProducts/util/common'
], function(Controller, jQuery, JSONModel, common) {
	"use strict";

    return Controller.extend("sap.demo.OrderProducts.controller.ProductDetail", {

        onInit : function() {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            // this.setBindingForView();
            // var oComboIns = this.getView().byId("orderProductsInspectionCombo");
            // oComboIns.setSelectedKey("IN001");
            this.getView().byId("orderProductsTxtInspectionLocation").setText("IN001");
			this.getView().byId("orderProductsMultiInputInspectionLocation").setValue("検品場所01");
            
            var oComboEOS = this.getView().byId("orderProductsEOSCombo");
            oComboEOS.setSelectedKey("ES001");
            
            // var oModel = new JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/products.json"));
            this.getView().setModel(sap.ui.getCore().getModel("transferData"), "transferData");
	    },
        handleNavBack : function () {
            this.oRouter.myNavBack("list");
        },
		onPressValueHelp : function(){
			common.createValueHelpRequestForInspection(this);
		},
		setInspectionLocation : function(sInspectionKey, sInspectionText) {
			this.getView().byId("orderProductsTxtInspectionLocation").setText(sInspectionKey);
			this.getView().byId("orderProductsMultiInputInspectionLocation").setValue(sInspectionText);
		},
		onSave : function(oEvent){
			sap.m.MessageToast.show("Update Successful.");
			this.oRouter.myNavBack("list");
        },
        onAddButtonPress : function(oEvent) {
			var oInputForQuantity = this.getView().byId("orderProductsInputOrderQuantity");
			oInputForQuantity.setValue(oInputForQuantity.getValue() * 1 + 1);
            this.setToNewValueForListView(oInputForQuantity.getValue());
		},
		onLessButtonPress : function(oEvent) {
			var oInputForQuantity = this.getView().byId("orderProductsInputOrderQuantity");
			if(oInputForQuantity.getValue() * 1 > 0) {
				oInputForQuantity.setValue(oInputForQuantity.getValue() * 1 - 1);	
			}
			this.setToNewValueForListView(oInputForQuantity.getValue());
		},
		setToNewValueForListView : function(iValue) {
			// Set to new quantity for List View
            var oView = sap.ui.getCore()._listView;
            var oTable = oView.byId("orderProductsTableProducts");
            var oSelectedItem = oTable.getSelectedItem();
			if(oSelectedItem) {
				var sSelectedItem = oSelectedItem.getBindingContextPath();
				var sSelectedItemIndex = sSelectedItem.slice(sSelectedItem.indexOf("/",1) + 1);
				oView.getModel("listData").getData().ProductCollection[sSelectedItemIndex].ProductOrder = iValue;
				oView.getModel("listData").refresh();
			}
		}
	});
});