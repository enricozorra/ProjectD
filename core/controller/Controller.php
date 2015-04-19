<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 *
	 * Controller class
	 */
	
	namespace core\controller;
	require_once("/membri/xtest/core/helpers/ApplicationHelper.php");
	require_once("/membri/xtest/core/controller/Request.php");
	require_once("/membri/xtest/core/command/CommandResolver.php");

	class Controller {
		private $applicationHelper;

		private function __construct() {

		}

		static function run() {
			$instance = new Controller();
			$instance->init();
			$instance->handleRequest();
		}

		function init() {
			$applicationHelper = \core\helpers\ApplicationHelper::instance();
			$applicationHelper->init();
		}

		function handleRequest() {
			$request = new \core\controller\Request();
			$cmd_r = new \core\command\CommandResolver();
			$cmd = $cmd_r->getCommand( $request );
			$cmd->execute( $request );
		}
}

?>