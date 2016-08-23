sap.ui.define(function() {
    "use strict";
    
    var Configuration = {
		// #### Routing Configuration ####
		CONFIG_VIEWTYPE			: "XML",
		CONFIG_VIEWPATH			: "sap.demo.StockList.view",
        CONFIG_TARGETCONTROLL	: "NavContainar",
        CONFIG_CLEARTARGET		: false,
		
		// List Page For Stock List Per Product on Right Side in Split Page
		FIRST_PATTERN			: "",
        FIRST_NAME				: "initial",
        FIRST_VIEW				: "initialDetail",
        FIRST_VIEW_PATH 		: "sap.demo.StockList.view",
        FIRST_TARGETAGGREGATION	: "detailPages",
		
		// List Page For Stock List Per Site on Left Side in Split Page
		SECOND_PATTERN				: "StockDetail.view.xml",
        SECOND_NAME					: "detail",
        SECOND_VIEW					: "StockDetail",
        SECOND_VIEW_PATH 			: "sap.demo.StockList.view",
        SECOND_TARGETAGGREGATION	: "detailPages",
		
		// List Page For Stock List Per Location on Left Side in Split Page
		THIRD_PATTERN				: "StockDetailLocation.view.xml",
        THIRD_NAME					: "detailLocation",
        THIRD_VIEW					: "StockDetailLocationList",
        THIRD_VIEW_PATH 			: "sap.demo.StockList.view",
        THIRD_TARGETAGGREGATION		: "detailPages",
        
        // Order Products
        FOURTH_PATTERN				: "OrderProducts.view.xml",
        FOURTH_NAME					: "orderProducts",
        FOURTH_VIEW					: "OrderProducts",
        FOURTH_VIEW_PATH 			: "sap.demo.StockList.view",
        FOURTH_TARGETAGGREGATION	: "detailPages",
		
		// Transfer Stock Between Stores
		FIFTH_PATTERN				: "StockTransfer.view.xml",
        FIFTH_NAME					: "stockTransfer",
        FIFTH_VIEW					: "StockTransfer",
        FIFTH_VIEW_PATH 			: "sap.demo.StockList.view",
        FIFTH_TARGETAGGREGATION		: "detailPages",
		
		// #### Routing Configuration ####
		
		// Root View
		ROOT_APP_ID			: "app",
		ROOT_APP_VIEWNAME	: "sap.demo.StockList.view.app",
		ROOT_APP_TYPE		: "JS"
    };
	
	return Configuration;
});