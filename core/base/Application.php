<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 */
	
	namespace core\base;
	include_once("core/helpers/ApplicationHelper.php");

	class Application {
		
		private static $instance;
		protected $isValid;
		
		function __construct() {
			$this->setValid;
		}

		static function instance() {
			if (!isset(self::$instance)) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		public function setValid() {
			$this->valid = true;
		}

		public function setUnvalid() {
			$this->valid = false;
		}

	}

?>