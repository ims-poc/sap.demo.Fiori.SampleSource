sap.ui.define(function() {
    "use strict";
    
    var Configuration = {
		// #### Routing Configuration ####
		CONFIG_VIEWTYPE			: "XML",
		CONFIG_VIEWPATH			: "sap.demo.ConfirmChangePrice.view",
        CONFIG_TARGETCONTROLL	: "NavContainer",
        CONFIG_CLEARTARGET		: false,
		
		// First Page Configuration
		FIRST_PATTERN			: "",
        FIRST_NAME				: "list",
        FIRST_VIEW				: "ChangePriceList",
        FIRST_VIEW_PATH 		: "sap.demo.ConfirmChangePrice.view",
        FIRST_TARGETAGGREGATION	: "pages",
		
		// Second Page Configuration
		SECOND_PATTERN				: "DetailPage",
        SECOND_NAME					: "detail",
        SECOND_VIEW					: "ChangePriceDetail",
        SECOND_VIEW_PATH 			: "sap.demo.ConfirmChangePrice.view",
        SECOND_TARGETAGGREGATION	: "pages",
		// #### Routing Configuration ####
		
		// Root View
		ROOT_APP_ID			: "app",
		ROOT_APP_VIEWNAME	: "sap.demo.ConfirmChangePrice.view.app",
		ROOT_APP_TYPE		: "JS"
    };
	
	return Configuration;
});