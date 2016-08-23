sap.ui.define(function() {
    "use strict";
    
    var Configuration = {
		// #### Routing Configuration ####
		CONFIG_VIEWTYPE			: "XML",
		CONFIG_VIEWPATH			: "sap.demo.ConfirmTransfer.view",
        CONFIG_TARGETCONTROLL	: "NavContainer",
        CONFIG_CLEARTARGET		: false,
		
		// First Page Configuration
		FIRST_PATTERN			: "",
        FIRST_NAME				: "list",
        FIRST_VIEW				: "shippingInstructionList",
        FIRST_VIEW_PATH 		: "sap.demo.ConfirmTransfer.view",
        FIRST_TARGETAGGREGATION	: "pages",
		
		// Second Page Configuration
		SECOND_PATTERN				: "shippingInstructionDetail",
        SECOND_NAME					: "detail",
        SECOND_VIEW					: "shippingInstructionDetail",
        SECOND_VIEW_PATH 			: "sap.demo.ConfirmTransfer.view",
        SECOND_TARGETAGGREGATION	: "pages",
		// #### Routing Configuration ####
		
		// Root View
		ROOT_APP_ID			: "app",
		ROOT_APP_VIEWNAME	: "sap.demo.ConfirmTransfer.view.app",
		ROOT_APP_TYPE		: "JS"
    };
	
	return Configuration;
});