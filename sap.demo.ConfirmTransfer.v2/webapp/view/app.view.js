sap.ui.jsview("sap.demo.ConfirmTransfer.view.app", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf sap.demo.ConfirmTransfer.view.app
	 */
	getControllerName: function() {
		return "sap.demo.ConfirmTransfer.controller.app";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf sap.demo.ConfirmTransfer.view.app
	 */
	createContent: function(oController) {
		var oThis = this;
		var oApp;
		sap.ui.define(["sap/demo/ConfirmTransfer/Configuration"], function(Configuration){
			oThis.setDisplayBlock(true);	
			oApp = new sap.m.App(Configuration.CONFIG_TARGETCONTROLL);	
		});
		return oApp;
	}

});