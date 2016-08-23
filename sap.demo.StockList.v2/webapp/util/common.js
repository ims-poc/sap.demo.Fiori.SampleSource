jQuery.sap.declare("sap.demo.StockList.util.common");

sap.demo.StockList.util.common = {
	
	createValueHelpRequest : function() {
		var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			title : "サイト",
			supportMultiselect : false,
			supportRanges : false,
			supportRangesOnly : false, 
			key : "StoreID",
			descriptionKey : "StoreName",
			ok: function(oControlEvent) {
				var oToken = oControlEvent.getParameter("tokens");
				
				// Set Key to CoreModel of UserInfo
				sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite = oToken[0].getKey();
				
				var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/store.json");
				var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
				sap.ui.getCore().setModel(oToken[0].getKey(), "StoreID");
				
				oModel.attachRequestCompleted(function(){
					$("#sJsonFilePath").append(oModel.getJSON());
					var sKey = sap.ui.getCore().getModel("StoreID");
					var aData = oModel.getData().StoreMaster;
					
					for(var i =  0; i < aData.length; i++){
						if(aData[i].StoreID === sKey) {
							// Set Name to CoreModel of UserInfo
							sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName = aData[i].StoreName;
							// Set Selected Site For Detail Model
							var oView;
							if(sap.ui.getCore().getModel("detailView")) {
								oView = sap.ui.getCore().getModel("detailView");
								oView.getModel("detailData").getData().UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;                   
								oView.getModel("detailData").getData().UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
								oView.getModel("detailData").refresh();
							}
							if(sap.ui.getCore().getModel("detailLocView")) {
								oView = sap.ui.getCore().getModel("detailLocView");
								oView.getModel("detailLocData").getData().UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;                   
								oView.getModel("detailLocData").getData().UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
								oView.getModel("detailLocData").refresh();
							}
							if(sap.ui.getCore().getModel("orderView")) {
								oView = sap.ui.getCore().getModel("orderView");
								oView.getModel("orderData").getData().UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;                   
								oView.getModel("orderData").getData().UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
								oView.getModel("orderData").refresh();
							}
							if(sap.ui.getCore().getModel("stockTransferView")) {
								oView = sap.ui.getCore().getModel("stockTransferView");
								oView.getModel("stockTransferData").getData().UserSite = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite;                   
								oView.getModel("stockTransferData").getData().UserSiteName = sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName;
								oView.getModel("stockTransferData").refresh();
							}
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
				{label: "サイト", template: "data>StoreID"},
				{label: "サイト名", template: "data>StoreName"}
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
			// oFilterBar.setBasicSearch(
				var oSearchField = new sap.m.SearchField({
					showSearchButton: sap.ui.Device.system.phone, 
					placeholder: "サイト検索",
					showRefreshButton : true,
					liveChange : function(oEvent) {
						// var sQuery = oEvent.getParameter("query");
						var sQuery = oEvent.getSource().getValue();
						var oBinding = oValueHelpDialog.getTable().getBinding("rows");
						if (sQuery) {
							var oFilter1 = [
								new sap.ui.model.Filter("StoreID", sap.ui.model.FilterOperator.Contains, sQuery),
								new sap.ui.model.Filter("StoreName", sap.ui.model.FilterOperator.Contains, sQuery)
							];
							var allFilters = new sap.ui.model.Filter(oFilter1, false);
							oBinding.filter(allFilters);
						} else {
							sQuery = oEvent.getSource().getValue();
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
	},
	setCammaForNumber : function(iTarget) {
		return (iTarget * 1).toLocaleString();
	},
	createValueHelpForFilter : function(oSetting) {
		var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			title : oSetting.title,
			supportMultiselect : false,
			supportRanges : false,
			supportRangesOnly : false, 
			key : oSetting.key,
			descriptionKey : oSetting.descriptionKey,
			ok: function(oControlEvent) {
				var oToken = oControlEvent.getParameter("tokens");
				for(var i = 0; i < oToken.length; i++) {
					// oSetting.oInput.setText(oSetting.oInput.getText() + "," + oToken[i].getText());
					oSetting.oInput.setText(oToken[i].getKey());
					oSetting.oInputKey.setValue(oToken[i].getText());
				}
				oValueHelpDialog.close();
				return;
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
				{label: oSetting.labelKeyCol, template: oSetting.dataKeyCol},
				{label: oSetting.labelTextCol, template: oSetting.dataTextCol}
			]
		});
		oValueHelpDialog.getTable().setModel(oColModel, "columns");
		
		var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", oSetting.filePath));
		oValueHelpDialog.getTable().setModel(oRowsModel, oSetting.modelKey);
		
		if (oValueHelpDialog.getTable().bindRows) {
			oValueHelpDialog.getTable().bindRows(oSetting.bindTarget); 
		}
		
		if (oValueHelpDialog.getTable().bindItems) { 
			var oTable = oValueHelpDialog.getTable();
			
			oTable.bindAggregation("items", oSetting.bindTarget, function(sId, oContext) { 
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
					placeholder: oSetting.title,
					showRefreshButton : true,
					liveChange : function(oEvent) {
						// var sQuery = oEvent.getParameter("query");
						var sQuery = oEvent.getSource().getValue();
						var oBinding = oValueHelpDialog.getTable().getBinding("rows");
						if (sQuery) {
							var oFilter1 = [
								new sap.ui.model.Filter(oSetting.key, sap.ui.model.FilterOperator.Contains, sQuery),
								new sap.ui.model.Filter(oSetting.descriptionKey, sap.ui.model.FilterOperator.Contains, sQuery)
							];
							var allFilters = new sap.ui.model.Filter(oFilter1, false);
							oBinding.filter(allFilters);
						} else {
							sQuery = oEvent.getSource().getValue();
							var oFilter = new sap.ui.model.Filter(oSetting.key, sap.ui.model.FilterOperator.Contains, sQuery);
							oBinding.filter(oFilter);
						}
					},
					search: function(oEvent) {
						var sQuery = oEvent.getParameter("query");
						var oBinding = oValueHelpDialog.getTable().getBinding("rows");
						if (sQuery) {
							var oFilter1 = [
								new sap.ui.model.Filter(oSetting.key, sap.ui.model.FilterOperator.Contains, sQuery), 
								new sap.ui.model.Filter(oSetting.descriptionKey, sap.ui.model.FilterOperator.Contains, sQuery)
							];
							var allFilters = new sap.ui.model.Filter(oFilter1, false);
							oBinding.filter(allFilters);
						} else {
							sQuery = oEvent.getSource().getValue();
							var oFilter = new sap.ui.model.Filter(oSetting.key, sap.ui.model.FilterOperator.Contains, sQuery);
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
};