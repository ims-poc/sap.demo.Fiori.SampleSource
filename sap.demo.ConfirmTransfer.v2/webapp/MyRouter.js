sap.ui.define(function() {
    "use strict";
    
    var MyRouter = {  
        /*  to monkey patch the router with the mobile nav back handling */
        myNavBack : function (sRouteId, oData) {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sUrl = this.getURL(sRouteId, oData);
            var sDirection = oHistory.getDirection(sUrl);
            
            if ("Backwards" === sDirection) {
                window.history.go(-1);
            } else {
                var bReplace = true; // otherwise we go backwards with a forward history
                this.navTo(sRouteId, oData, bReplace);
            }
        }
    };
    return MyRouter;
});

