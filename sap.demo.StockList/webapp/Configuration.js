sap.ui.define(function() {
    "use strict";
    
    var Configuration = {
		// #### Routing Configuration ####
		CONFIG_VIEWTYPE			: "XML",
		CONFIG_VIEWPATH			: "sap.demo.StockList.view",
        CONFIG_TARGETCONTROLL	: "NavContainar",
        CONFIG_CLEARTARGET		: false,
		
		// First Page Configuration
		FIRST_PATTERN			: "",
        FIRST_NAME				: "initial",
        FIRST_VIEW				: "initialDetail",
        FIRST_VIEW_PATH 		: "sap.demo.StockList.view",
        FIRST_TARGETAGGREGATION	: "detailPages",
		
		// Second Page Configuration
		SECOND_PATTERN				: "StockDetail.view.xml",
        SECOND_NAME					: "detail",
        SECOND_VIEW					: "StockDetail",
        SECOND_VIEW_PATH 			: "sap.demo.StockList.view",
        SECOND_TARGETAGGREGATION	: "detailPages",
		
		THIRD_PATTERN				: "StockDetailLocation.view.xml",
        THIRD_NAME					: "detailLocation",
        THIRD_VIEW					: "StockDetailLocationList",
        THIRD_VIEW_PATH 			: "sap.demo.StockList.view",
        THIRD_TARGETAGGREGATION		: "detailPages",
		
		// #### Routing Configuration ####
		
		// Root View
		ROOT_APP_ID			: "app",
		ROOT_APP_VIEWNAME	: "sap.demo.StockList.view.app",
		ROOT_APP_TYPE		: "JS"
    };
	
	return Configuration;
});