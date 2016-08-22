jQuery.sap.declare("sap.demo.OrderProducts.util.common");

sap.demo.OrderProducts.util.common = {
	
	createValueHelpRequestForSite : function(oThis) {
		// sap.ui.xmlfragment("sap.demo.OrderProducts.view.selectSiteHelp", oThis).open();
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
				
				var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.mock", "/store.json");
				var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
				sap.ui.getCore().setModel(oToken[0].getKey(), "StoreID");
				
				oModel.attachRequestCompleted(function(){
					$("#sJsonFilePath").append(oModel.getJSON());
					var sKey = sap.ui.getCore().getModel("StoreID");
					
					var aData = oModel.getData().StoreMaster;
					for(var i =  0; i < aData.length; i++){
						if(aData[i].StoreID === sKey) {
							sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSiteName = aData[i].StoreName;
							oThis.setPageTitleForSite();
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
		
		var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/store.json"));
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
		// 	// persistencyKey : false,
		// 	// advancedMode :  false,
		// 	// expandAdvanceArea : false,
		// 	showFilterConfiguration : false,
		// 	filterBarExpanded : false,
		// 	showGoButton : false
		// });			
		
		// if (oFilterBar.setBasicSearch()) {
			// oFilterBar.setBasicSearch(new sap.m.SearchField({
		var oBasicSearch = new sap.m.SearchField({
			showSearchButton: sap.ui.Device.system.phone,
			width : "100%",
			placeholder: "サイト検索",
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
			},
			showRefreshButton : true,
			search: function(oEvent) {
				var sQuery = oEvent.getParameter("query");
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
		});
			// }));
		// }
		
		// oValueHelpDialog.setFilterBar(oFilterBar);
		oValueHelpDialog.insertContent(oBasicSearch);
		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		
		oValueHelpDialog.open();
		oValueHelpDialog.update();
	},
	onSearchForSearchFiled : function(oEvent) {
		
	},
	createValueHelpRequestForInspection : function(oThis) {
		var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			title : "検品場所",
			supportMultiselect : false,
			supportRanges : false,
			supportRangesOnly : false, 
			key : "InspectionNo",
			descriptionKey : "InspectionText",
			ok: function(oControlEvent) {
				var oToken = oControlEvent.getParameter("tokens");
				oThis.getView().byId("orderProductsSupplierSiteInput");
				
				// Set Key to CoreModel of UserInfo
				sap.ui.getCore().getModel("UserInfo").getData().UserInformation[0].UserSite = oToken[0].getKey();
				
				var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.mock", "/inspection.json");
				var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
				sap.ui.getCore().setModel(oToken[0].getKey(), "InspectionNo");
				
				oModel.attachRequestCompleted(function(){
					$("#sJsonFilePath").append(oModel.getJSON());
					var sKey = sap.ui.getCore().getModel("InspectionNo");
					var aData = oModel.getData().InspectionLocationMaster;
					for(var i =  0; i < aData.length; i++){
						if(aData[i].InspectionNo === sKey) {
							oThis.setInspectionLocation(sKey, aData[i].InspectionText);
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
				{label: "検品場所ID", template: "data>InspectionNo"},
				{label: "検品場所", template: "data>InspectionText"}
			]
		});
		oValueHelpDialog.getTable().setModel(oColModel, "columns");
		
		var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.mock", "/inspection.json"));
		oValueHelpDialog.getTable().setModel(oRowsModel, "data");
		
		if (oValueHelpDialog.getTable().bindRows) {
			oValueHelpDialog.getTable().bindRows("data>/InspectionLocationMaster"); 
		}
		
		if (oValueHelpDialog.getTable().bindItems) { 
			var oTable = oValueHelpDialog.getTable();
			
			oTable.bindAggregation("items", "data>/InspectionLocationMaster", function(sId, oContext) { 
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
		// 	oFilterBar.setBasicSearch(new sap.m.SearchField({
			var oBasicSearch = new sap.m.SearchField({
				showSearchButton: sap.ui.Device.system.phone, 
				placeholder: "検品場所",
				liveChange : function(oEvent) {
					// var sQuery = oEvent.getParameter("query");
					var sQuery = oEvent.getSource().getValue();
					var oBinding = oValueHelpDialog.getTable().getBinding("rows");
					if (sQuery) {
						var oFilter1 = [
							new sap.ui.model.Filter("InspectionNo", sap.ui.model.FilterOperator.Contains, sQuery),
							new sap.ui.model.Filter("InspectionText", sap.ui.model.FilterOperator.Contains, sQuery)
						];
						var allFilters = new sap.ui.model.Filter(oFilter1, false);
						oBinding.filter(allFilters);
					} else {
						sQuery = oEvent.getSource().getValue();
						var oFilter = new sap.ui.model.Filter("InspectionNo", sap.ui.model.FilterOperator.Contains, sQuery);
						oBinding.filter(oFilter);
					}
				},
				showRefreshButton : true,
				search: function(oEvent) {
					var sQuery = oEvent.getParameter("query");
					var oBinding = oValueHelpDialog.getTable().getBinding("rows");
					if (sQuery) {
						var oFilter1 = [
							new sap.ui.model.Filter("InspectionNo", sap.ui.model.FilterOperator.Contains, sQuery), 
							new sap.ui.model.Filter("InspectionText", sap.ui.model.FilterOperator.Contains, sQuery)
						];
						var allFilters = new sap.ui.model.Filter(oFilter1, false);
						oBinding.filter(allFilters);
					} else {
						sQuery = oEvent.getSource().getValue();
						var oFilter = new sap.ui.model.Filter("InspectionNo", sap.ui.model.FilterOperator.Contains, sQuery);
						oBinding.filter(oFilter);
					}
				}
			});
		// 	}));
		// }
		
		// oValueHelpDialog.setFilterBar(oFilterBar);
		oValueHelpDialog.insertContent(oBasicSearch);
		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		
		oValueHelpDialog.open();
		oValueHelpDialog.update();
	},
	setCammaForNumber : function(iTarget) {
		return iTarget.toLocaleString();
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
		
		var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.mock", oSetting.filePath));
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