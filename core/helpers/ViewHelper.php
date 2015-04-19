<?php

	/**
	 * @author  Enrico Ghidoni <enricoghdn@gmail.com>
	 *
	 * Provides utility methods to view classes
	 */
	
	namespace core\helpers;

	use \core\base\Helper as Helper;
	use \core\base\SessionRegistry as SessionRegistry;

	require_once("/membri/xtest/core/base/Helper.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	
	class ViewHelper extends Helper {

		private static $instance;
		protected static $baseUrl = "http://www.xtest.altervista.org/index.php?r=";
		protected static $stylePath = "../../style/";
		protected static $scriptPath = "../../script/";
		protected static $generalCSS = "main.css";
		protected static $generalJS = "main.js";

		private function __construct() {
		}

		static function instance() {
			if( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		public static function getBaseUrl() {
			return self::$baseUrl;
		}

		public static function getStylePath() {
			return self::$stylePath;
		}

		public static function getScriptPath() {
			return self::$scriptPath;
		}

		public static function getGeneralCss() {
			return self::$generalCSS;
		}

		public static function getGeneralJs() {
			return self::$generalJS;
		}

		public static function getGeneralJsPath() {
			return self::getScriptPath() . self::getGeneralJs();
		}

		public static function getGeneralCssPath() {
			return self::getStylePath() . self::getGeneralCss();
		}

		public static function getPageCss($page) {
			return self::$stylePath . $page . ".css";
		}

		public static function setGeneralCss($value) {
			self::$generalCSS = $value;
		}

		public static function setGeneralJs($value) {
			self::$generalJS = $value;
		}

		public static function getMenuItems() {
			$language = SessionRegistry::instance()->getLanguage();
			$language = $language['menu'];
			return $language;
		}

		public static function createCmdLink($cmd) {
			return "index.php?r=" . $cmd;
		}

	}

?>