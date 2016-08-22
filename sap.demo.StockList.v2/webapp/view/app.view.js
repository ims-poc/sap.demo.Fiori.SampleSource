sap.ui.jsview("sap.demo.StockList.view.app", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf sap.demo.StockList.view.app
	 */
	getControllerName: function() {
		return "sap.demo.StockList.controller.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf sap.demo.StockList.view.app
	 */
	createContent: function(oController) {
		var oThis = this;
		var oSplitApp;
		
		var oList = sap.ui.view({
	        id			: "listPage",
	        viewName	: "sap.demo.StockList.view.StockList",
	        type		: "XML"
	    });
	    
	    var oInitDetail = sap.ui.view({
	        id			: "detailInitPage",
	        viewName	: "sap.demo.StockList.view.initialDetail",
	        type		: "XML"
	    });
		
		sap.ui.define(["sap/demo/StockList/Configuration"], function(Configuration){
			oThis.setDisplayBlock(true);
			oSplitApp = new sap.m.SplitApp(Configuration.CONFIG_TARGETCONTROLL);	
		});
		
		oSplitApp.addDetailPage(oInitDetail);
		oSplitApp.addMasterPage(oList);
		
		oSplitApp.setInitialDetail(oInitDetail);
		oSplitApp.setInitialMaster(oList);
		oSplitApp.setMode("ShowHideMode");
		
		return oSplitApp;
	}

});