sap.ui.jsfragment("sap.demo.UserSetting.view.valueHelpDialogForPcGrp", { 
	createContent: function(oController ) {
		var oThis = this;
		var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			title : "利益センタグループ",
			supportMultiselect : false,
			supportRanges : false,
			supportRangesOnly : false, 
			key : "ProfitCenterGrp",
			descriptionKey : "ProfitCenterGrpNm",
			ok: function(oControlEvent) {
				// var oToken = oControlEvent.getParameter("tokens");
				// sap.ui.getCore().setModel(oToken[0].getKey(), "ProfitCenterGrp");
				
				// var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/profitCenterGrp.json");
				// var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
				
				// var oTable = oControlEvent.getSource().getTable();
				// var oBinding = oTable.getBinding("rows");
				// oThis.getView().byId("userSettingTxtManagementArea").setText(oBinding.oList[oTable.getSelectedIndex()].ManagementArea);
				
				// oModel.attachRequestCompleted(function(){
				// 	$("#sJsonFilePath").append(oModel.getJSON());
				// 	var sKey = sap.ui.getCore().getModel("ProfitCenterGrp");
					
				// 	var aData = oModel.getData().Master;
				// 	for(var i =  0; i < aData.length; i++){
				// 		if(aData[i].ProfitCenterGrp === sKey) {
				// 			oThis.getView().byId("userSettingInpProfitCenterGrp").setValue(sKey);
				// 			oThis.getView().byId("userSettingTxtProfitCenterGrpTxt").setText(aData[i].ProfitCenterGrpNm);
				// 			oValueHelpDialog.close();
				// 			return;
				// 		}
				// 	}
				oController.setProfitGrpText(oControlEvent);      
				oValueHelpDialog.close();
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
				{label: "管理領域", template: "data>ManagementArea"},
				{label: "利益センタグループ", template: "data>ProfitCenterGrp"},
				{label: "テキスト", template: "data>ProfitCenterGrpNm"}
			]
		});
		oValueHelpDialog.getTable().setModel(oColModel, "columns");
		
		var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/profitCenterGrp.json"));
		oValueHelpDialog.getTable().setModel(oRowsModel, "data");
		
		if (oValueHelpDialog.getTable().bindRows) {
			oValueHelpDialog.getTable().bindRows("data>/Master"); 
		}
		
		if (oValueHelpDialog.getTable().bindItems) { 
			var oTable = oValueHelpDialog.getTable();
			
			oTable.bindAggregation("items", "data>/Master", function(sId, oContext) { 
				var aCols = oTable.getModel("columns").getData().cols;
				return new sap.m.ColumnListItem({
					cells: aCols.map(function (column) {
						var colname = column.template;
						return new sap.m.Label({ text: "{" + colname + "}" });
					})
				});
			});
		}

		var oSearchField = new sap.m.SearchField({
			showSearchButton: sap.ui.Device.system.phone, 
			placeholder: "利益センタグループ検索",
			showRefreshButton : true,
			liveChange : function(oSearchEvent) {
				// var sQuery = oEvent.getParameter("query");
				var sQuery = oSearchEvent.getSource().getValue();
				var oBinding = oValueHelpDialog.getTable().getBinding("rows");
				if (sQuery) {
					var oFilter1 = [
						new sap.ui.model.Filter("ProfitCenterGrp", sap.ui.model.FilterOperator.Contains, sQuery),
						new sap.ui.model.Filter("ProfitCenterGrpNm", sap.ui.model.FilterOperator.Contains, sQuery)
					];
					var allFilters = new sap.ui.model.Filter(oFilter1, false);
					oBinding.filter(allFilters);
				} else {
					// sQuery = oSearchEvent.getSource().getValue();
					var oFilter = new sap.ui.model.Filter("ProfitCenterGrp", sap.ui.model.FilterOperator.Contains, sQuery);
					oBinding.filter(oFilter);
				}
			}
		});
		
		// oValueHelpDialog.setFilterBar(oFilterBar);
		oValueHelpDialog.insertContent(oSearchField);
		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		
		// oValueHelpDialog.open();
		// oValueHelpDialog.update();
		return oValueHelpDialog;
	} 
});