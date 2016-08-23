sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("sap.demo.UserSetting.controller.UserSetting", {
		
		onInit : function() {
			// var user = sap.ui2.shell.getUser();
			// user.load({}, function(){
			//   var fullName = user.getFullName();
			// },
			// function(){
			//   alert('user fetching failed');
			// });
			
			var oTxtManagementArea = this.getView().byId("userSettingTxtManagementArea");
		
			var oInpProfitGrp = this.getView().byId("userSettingInpProfitCenterGrp");
			var oTxtProfitGrp = this.getView().byId("userSettingTxtProfitCenterGrpTxt");
			
			var oInpDefaultSite = this.getView().byId("userSettingInpDefaultSite");
			var oTxtDefaultSite = this.getView().byId("userSettingTxtDefaultSiteTxt");
			
			// ToDo サーバ間の差異を吸収する必要あり
	//		var sURL = "proxy/http/dgqva0100001.hcdev-awspri1.imhds.net:8000/sap/opu/odata/sap/ZUI0010_SRV/"
			var sURL = "proxy/http/dgqva0300001.hcdev-awspri1.imhds.net:8000/sap/opu/odata/sap/ZUI0010_SRV/";
			
			var oODataModel = new sap.ui.model.odata.ODataModel(
				sURL
			);
			
			oODataModel.read(
				"/ZUI_DEFAULT_SITESet(KOKRS='',PCGRP='',WERKS='')",
				null,
				null, 
				false,  
				function(oData, oResponse){  
					 oTxtManagementArea.setText(oData.KOKRS);
					 oInpProfitGrp.setValue(oData.PCGRP);
					 oTxtProfitGrp.setText(oData.DESCRIPT);
					 oInpDefaultSite.setValue(oData.WERKS);
					 oTxtDefaultSite.setText(oData.NAME1);
				},
				function(oData){
					// NG Case
					 alert("NG");
				}
			);
			
		}
		, onValueHelpRequestForProfitCenterGrp : function(oEvent) {
			var oValueHelpDialog = sap.ui.jsfragment("sap.demo.UserSetting.view.valueHelpDialogForPcGrp", this);
			// var oThis = this;
			// var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
			// 	title : "利益センタグループ",
			// 	supportMultiselect : false,
			// 	supportRanges : false,
			// 	supportRangesOnly : false, 
			// 	key : "ProfitCenterGrp",
			// 	descriptionKey : "ProfitCenterGrpNm",
			// 	ok: function(oControlEvent) {
			// 		var oToken = oControlEvent.getParameter("tokens");
			// 		sap.ui.getCore().setModel(oToken[0].getKey(), "ProfitCenterGrp");
					
					// var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/profitCenterGrp.json");
					// var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
					
			// 		var oTable = oControlEvent.getSource().getTable();
			// 		var oBinding = oTable.getBinding("rows");
			// 		oThis.getView().byId("userSettingTxtManagementArea").setText(oBinding.oList[oTable.getSelectedIndex()].ManagementArea);
					
			// 		oModel.attachRequestCompleted(function(){
			// 			$("#sJsonFilePath").append(oModel.getJSON());
			// 			var sKey = sap.ui.getCore().getModel("ProfitCenterGrp");
						
			// 			var aData = oModel.getData().Master;
			// 			for(var i =  0; i < aData.length; i++){
			// 				if(aData[i].ProfitCenterGrp === sKey) {
			// 					oThis.getView().byId("userSettingInpProfitCenterGrp").setValue(sKey);
			// 					oThis.getView().byId("userSettingTxtProfitCenterGrpTxt").setText(aData[i].ProfitCenterGrpNm);
			// 					oValueHelpDialog.close();
			// 					return;
			// 				}
			// 			}
			// 		});
			// 	},
			// 	cancel: function(oControlEvent) {
			// 		oValueHelpDialog.close();
			// 	},
			// 	afterClose: function() {
			// 		oValueHelpDialog.destroy();
			// 	}
			// });
			
			// var oColModel = new sap.ui.model.json.JSONModel();
			// oColModel.setData({
			// 	cols: [
			// 		{label: "管理領域", template: "data>ManagementArea"},
			// 		{label: "利益センタグループ", template: "data>ProfitCenterGrp"},
			// 		{label: "テキスト", template: "data>ProfitCenterGrpNm"}
			// 	]
			// });
			// oValueHelpDialog.getTable().setModel(oColModel, "columns");
			
			// var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/profitCenterGrp.json"));
			// oValueHelpDialog.getTable().setModel(oRowsModel, "data");
			
			// if (oValueHelpDialog.getTable().bindRows) {
			// 	oValueHelpDialog.getTable().bindRows("data>/Master"); 
			// }
			
			// if (oValueHelpDialog.getTable().bindItems) { 
			// 	var oTable = oValueHelpDialog.getTable();
				
			// 	oTable.bindAggregation("items", "data>/Master", function(sId, oContext) { 
			// 		var aCols = oTable.getModel("columns").getData().cols;
			// 		return new sap.m.ColumnListItem({
			// 			cells: aCols.map(function (column) {
			// 				var colname = column.template;
			// 				return new sap.m.Label({ text: "{" + colname + "}" });
			// 			})
			// 		});
			// 	});
			// }
			// // var oFilterBar = new sap.ui.comp.filterbar.FilterBar({
			// // 	advancedMode :  true,
			// // 	filterBarExpanded : false,
			// // 	showGoButton : false,
			// // 	searchEnabled : false
			// // });
			// // if (oFilterBar.setBasicSearch) {
			// // 	oFilterBar.setBasicSearch(new sap.m.SearchField({
			// 		var oSearchField = new sap.m.SearchField({
			// 			showSearchButton: sap.ui.Device.system.phone, 
			// 			placeholder: "利益センタグループ検索",
			// 			showRefreshButton : true,
			// 			liveChange : function(oSearchEvent) {
			// 				// var sQuery = oEvent.getParameter("query");
			// 				var sQuery = oSearchEvent.getSource().getValue();
			// 				var oBinding = oValueHelpDialog.getTable().getBinding("rows");
			// 				if (sQuery) {
			// 					var oFilter1 = [
			// 						new sap.ui.model.Filter("ProfitCenterGrp", sap.ui.model.FilterOperator.Contains, sQuery),
			// 						new sap.ui.model.Filter("ProfitCenterGrpNm", sap.ui.model.FilterOperator.Contains, sQuery)
			// 					];
			// 					var allFilters = new sap.ui.model.Filter(oFilter1, false);
			// 					oBinding.filter(allFilters);
			// 				} else {
			// 					// sQuery = oSearchEvent.getSource().getValue();
			// 					var oFilter = new sap.ui.model.Filter("ProfitCenterGrp", sap.ui.model.FilterOperator.Contains, sQuery);
			// 					oBinding.filter(oFilter);
			// 				}
			// 			}
			// 		// })
			// 		// ); 
			// 	});
			// // }
			
			// // oValueHelpDialog.setFilterBar(oFilterBar);
			// oValueHelpDialog.insertContent(oSearchField);
			// oValueHelpDialog.addStyleClass("sapUiSizeCompact");
			
			oValueHelpDialog.open();
			oValueHelpDialog.update();
		}
		, onValueHelpRequestForDefaultSite : function(oEvent) {
			var oThis = this;
			var oValueHelpDialog = new sap.ui.comp.valuehelpdialog.ValueHelpDialog({
				title : "デフォルト表示サイト",
				supportMultiselect : false,
				supportRanges : false,
				supportRangesOnly : false,
				key : "StoreID",
				descriptionKey : "StoreName",
				ok: function(oControlEvent) {
					var oToken = oControlEvent.getParameter("tokens");
					var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/defaultSite.json");
					var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
					sap.ui.getCore().setModel(oToken[0].getKey(), "StoreID");
					
					oModel.attachRequestCompleted(function(){
						$("#sJsonFilePath").append(oModel.getJSON());
						var sKey = sap.ui.getCore().getModel("StoreID");
						
						var aData = oModel.getData().Master;
						for(var i =  0; i < aData.length; i++){
							if(aData[i].StoreID === sKey) {
								oThis.getView().byId("userSettingInpDefaultSite").setValue(sKey);
								oThis.getView().byId("userSettingTxtDefaultSiteTxt").setText(aData[i].StoreName);
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
					{label: "テキスト", template: "data>StoreName"}
				]
			});
			oValueHelpDialog.getTable().setModel(oColModel, "columns");
			
			var oRowsModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("sap.demo.MockData", "/defaultSite.json"));
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
						liveChange : function(oEvent) {
							// var sQuery = oEvent.getParameter("query");
							var sQuery = oEvent.getSource().getValue();
							var oBinding = oValueHelpDialog.getTable().getBinding("rows");
							var aFilters;
							if (sQuery) {
								var oFilter = [
									new sap.ui.model.Filter("StoreID", sap.ui.model.FilterOperator.Contains, sQuery),
									new sap.ui.model.Filter("StoreName", sap.ui.model.FilterOperator.Contains, sQuery)
								];
								aFilters = new sap.ui.model.Filter(oFilter, false);
								
							} else {
								sQuery = oEvent.getSource().getValue();
								aFilters = new sap.ui.model.Filter("StoreID", sap.ui.model.FilterOperator.Contains, sQuery);
							}
							oBinding.filter(aFilters);
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
		, getProfitCenterText : function(oEvent) {
			this.getView().byId("userSettingInpProfitCenterGrp").setValue(this.getView().byId("userSettingInpProfitCenterGrp").getValue().toUpperCase());
			var sInput = this.getView().byId("userSettingInpProfitCenterGrp").getValue();
			var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/profitCenterGrp.json");
			var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
			
			var oThis = this;
			oModel.attachRequestCompleted(function(){
				$("#sJsonFilePath").append(oModel.getJSON());
				
				var aData = oModel.getData().Master;
				for(var i =  0; i < aData.length; i++){
					if(aData[i].ProfitCenterGrp === sInput) {
						oThis.getView().byId("userSettingTxtProfitCenterGrpTxt").setText(aData[i].ProfitCenterGrpNm);
						return;
					}
				}
				oThis.getView().byId("userSettingTxtProfitCenterGrpTxt").setText("");
			});
		}
		, getDefaultSiteText : function(oEvent) {
			this.getView().byId("userSettingInpDefaultSite").setValue(this.getView().byId("userSettingInpDefaultSite").getValue().toUpperCase());
			var sInput = this.getView().byId("userSettingInpDefaultSite").getValue();
			var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/defaultSite.json");
			var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
			
			var oThis = this;
			oModel.attachRequestCompleted(function(){
				$("#sJsonFilePath").append(oModel.getJSON());
				
				var aData = oModel.getData().Master;
				for(var i =  0; i < aData.length; i++){
					if(aData[i].StoreID === sInput) {
						oThis.getView().byId("userSettingTxtDefaultSiteTxt").setText(aData[i].StoreName);
						return;
					}
				}
				oThis.getView().byId("userSettingTxtDefaultSiteTxt").setText("");
			});
		}
		, setProfitGrpText : function(oControlEvent) {
			var oToken = oControlEvent.getParameter("tokens");
			sap.ui.getCore().setModel(oToken[0].getKey(), "ProfitCenterGrp");
			
			var sJsonFilePath = jQuery.sap.getModulePath("sap.demo.MockData", "/profitCenterGrp.json");
			var oModel = new sap.ui.model.json.JSONModel(sJsonFilePath);
			
			var oTable = oControlEvent.getSource().getTable();
			var oBinding = oTable.getBinding("rows");
			this.getView().byId("userSettingTxtManagementArea").setText(oBinding.oList[oTable.getSelectedIndex()].ManagementArea);
			var oView = this.getView();
			oModel.attachRequestCompleted(function(){
				$("#sJsonFilePath").append(oModel.getJSON());
				var sKey = sap.ui.getCore().getModel("ProfitCenterGrp");
				
				var aData = oModel.getData().Master;
				for(var i =  0; i < aData.length; i++){
					if(aData[i].ProfitCenterGrp === sKey) {
						oView.byId("userSettingInpProfitCenterGrp").setValue(sKey);
						oView.byId("userSettingTxtProfitCenterGrpTxt").setText(aData[i].ProfitCenterGrpNm);
						return;
					}
				}
			});
		}
	});
});