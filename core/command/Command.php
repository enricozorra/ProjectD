<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 */
	
	namespace core\command;

	use \core\controller\Request as Request;
	use \core\helpers\CommandHelper as CommandHelper;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\helpers\ApplicationHelper as ApplicationHelper;
	use \core\helpers\ViewHelper as ViewHelper;

	require_once("/membri/xtest/core/controller/Request.php");
	require_once("/membri/xtest/core/helpers/CommandHelper.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("/membri/xtest/core/helpers/ApplicationHelper.php");
	require_once("/membri/xtest/core/helpers/ViewHelper.php");

	abstract class Command {

		function execute( Request $request ) {
			if (ApplicationHelper::userLogged()) {
                    $this->doUserLogged($request);
			} else {
				$this->doUserNotLogged($request);
			}
		}

		protected function doUserLogged(Request $request) {
			$this->redirect("Home");
		}

		protected function doUserNotLogged(Request $request) {
			$this->redirect("Login");
		}

		public function render($view, $params, Request $request) {
			$request->setProperty("view", str_replace(".php", "", $view));
			foreach ($params as $key => $val) {
				$request->setProperty($key, $val);
			}
			//One last thing before actually displaying the view, refresh the SESSION ID if time is expired
			ApplicationHelper::checkSessionId();
			require_once("/membri/xtest/core/view/mainView.php");
		}

		public function redirect($command) {
			$command = ucfirst($command);
			$location = "index.php?r=" . $command;
			header("Location: $location");
			exit();
		}
	}

?>