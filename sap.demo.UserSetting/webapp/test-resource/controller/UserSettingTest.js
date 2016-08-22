sap.ui.define([
], function() {
	"use strict";
	
	QUnit.module("UserSetting", {
		beforeEach : function() {
			// Pre-processing
		},
		afterEach : function() {
			// Post-processing
		}
	});
	
	QUnit.test("Should Test Description 1", function() {
		// Arrange : システムのために必要な依存関係やオプションを設定する。
		// System under test : テスト対象となるモジュールを作成する。
		var oController = new sap.demo.UserSetting.controller.UserSetting.controller({
			id : "testTarget"
		});
		
		// Act : テスト対象となる処理を実行する。
		oController.onValueHelpRequestForProfitCenterGrp({});
		
		// Assert : テスト結果を判定する。
		// Cleanup : テスト後に、作成したモジュール・モデル・データなどを削除する。
	});
});