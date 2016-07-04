jQuery.sap.declare("sap.demo.StockTransfer.controller.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");
sap.ui.define(function() {
	"use strict";

	var Formatter = {

		weightState :  function (fValue) {
			try {
				fValue = parseFloat(fValue);
				if (fValue < 0) {
					return "None";
				} else if (fValue < 1000) {
					return "Success";
				} else if (fValue < 2000) {
					return "Warning";
				} else {
					return "Error";
				}
			} catch (err) {
				return "None";
			}
		},
		formatCalendarWeek: function(f, l) {
			var c = "";
			if (f && l) {
				var d = sap.ui.core.format.DateFormat.getDateInstance({
					pattern: "dd"
				});
				var F = d.format(f);
				var L = d.format(l);
				c = sap.demo.StockTransfer.lib.reuse.util.TextUtil.getText("DETAIL_DATE_OF_DAY", [F]) + "\n\u2013\n" + sap.demo.StockTransfer.lib.reuse.util.TextUtil
					.getText("DETAIL_DATE_OF_DAY", [L]);
			}
			return c;
		}
	};

	return Formatter;

}, /* bExport= */ true);