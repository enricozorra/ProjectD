<?php
	/**
	 * @author Enrico Zorra <enricozorra@gmail.com>
	 * 2015-01-27
	 */

	namespace core\base;
	require_once ("AppException.php");

	class Language {

		private static $instance;
		private $elements = Array();

		/**
		 * [__construct]
		 * @param String $languagePath [path of the file.xml containing the elements]
		 */
		private function __construct () {
		}

		static function instance() {
	        if ( ! isset(self::$instance) ) { self::$instance = new self(); }
	        return self::$instance;
	    }

		/**
		 * [setLanguage load the associative array inside the class]
		 * @param String $languagePath [path of the file.xml containing the elements]
		 */
		public function setLanguage ($languagePath) {
			try {
				$xml = simplexml_load_file($languagePath);
			} catch (AppException $e) {
			 	throw new AppException("Error Loading Language", 3);
			}
			for ($c=0; $c<count($xml->view); $c++) {
				$app = Array();
				foreach ($xml->view[$c] as $key => $value) {
					$app["{$key}"] = (String)$value;
				}
				$attr = $xml->view[$c]->attributes();
				$this->elements["{$attr["id"]}"] = $app;
			}
		}

		/**
		 * [getElementsByView returns the array of a selected view]
		 * @param String $view [name of the view]
		 * @return Array [simple associative array containing the selected view's elements]
		 */
		public function getElementsByView ($view) {
			if (isset($this->elements["{$view}"])) {
				return $this->elements["{$view}"];
			}
			return false;
		}
	}

?>