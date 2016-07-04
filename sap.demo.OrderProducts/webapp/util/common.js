jQuery.sap.declare("sap.demo.OrderProducts.util.common");

sap.demo.OrderProducts.util.common = {
	
	createValueHelpRequestForSite : function(oThis) {
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
				{label: "Store ID", template: "data>StoreID"},
				{label: "Store Name", template: "data>StoreName"}
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
		var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			advancedMode :  true,
			filterBarExpanded : false,
			filterGroupItems: [
				new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n1", label: "Store ID", control: new sap.m.Input()}),
				new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n2", label: "Store Name", control: new sap.m.Input()})
			],
			search: function() {
				// sap.m.MessageToast.show("Search pressed '" + arguments[0].mParameters.selectionSet[0].getValue() + "''");
			}
		});			
					
		if (oFilterBar.setBasicSearch) {
			oFilterBar.setBasicSearch(new sap.m.SearchField({
				showSearchButton: sap.ui.Device.system.phone, 
				placeholder: "Search",
				search: function(event) {
					oValueHelpDialog.getFilterBar().search();
				}
			})
			); 
		}
		
		oValueHelpDialog.setFilterBar(oFilterBar);
		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		
		oValueHelpDialog.open();
		oValueHelpDialog.update();
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
		var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			advancedMode :  true,
			filterBarExpanded : false,
			filterGroupItems: [
				new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n1", label: "Store ID", control: new sap.m.Input()}),
				new sap.ui.comp.filterbar.FilterGroupItem({ groupTitle: "foo", groupName: "gn1", name: "n2", label: "Store Name", control: new sap.m.Input()})
			],
			search: function() {
				// sap.m.MessageToast.show("Search pressed '" + arguments[0].mParameters.selectionSet[0].getValue() + "''");
			}
		});			
					
		if (oFilterBar.setBasicSearch) {
			oFilterBar.setBasicSearch(new sap.m.SearchField({
				showSearchButton: sap.ui.Device.system.phone, 
				placeholder: "Search",
				search: function(event) {
					oValueHelpDialog.getFilterBar().search();
				}
			})
			); 
		}
		
		oValueHelpDialog.setFilterBar(oFilterBar);
		oValueHelpDialog.addStyleClass("sapUiSizeCompact");
		
		oValueHelpDialog.open();
		oValueHelpDialog.update();
	},
	setCammaForNumber : function(iTarget) {
		return iTarget.toLocaleString();
	}
};