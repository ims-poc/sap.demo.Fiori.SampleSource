jQuery.sap.declare("sap.demo.ConfirmTransfer.util.Formatter");

sap.demo.ConfirmTransfer.util.Formatter = {
	userSite : "",
	
	getPrintResultText : function(sPrintResult){
		if(sPrintResult === "X") {
			// return "済";
			return true;
		} else {
			// return "未";
			return false;
		}
	},
	createValueHelpRequest : function(oThis) {
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
			// oFilterBar.setBasicSearch(new sap.m.SearchField({
			var oSearchField = new sap.m.SearchField({
				showSearchButton: sap.ui.Device.system.phone, 
				placeholder: "Search",
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
		// 	}));
		// }
		
		// oValueHelpDialog.setFilterBar(oFilterBar);
		oValueHelpDialog.insertContent(oSearchField);
		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		
		oValueHelpDialog.open();
		oValueHelpDialog.update();
	},
		setCammaForNumber : function(iTarget) {
		return iTarget.toLocaleString();
	}
};