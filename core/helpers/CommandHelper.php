<?php

	namespace core\helpers;

	use \core\base\Helper as Helper;
	use \core\base\SessionRegistry as SessionRegistry;

	require_once("/membri/xtest/core/base/Helper.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");

	class CommandHelper extends Helper {

		private static $instance;

        private function __construct(){
        }

        static function instance() {
        	if ( ! self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
        }

	}

?>