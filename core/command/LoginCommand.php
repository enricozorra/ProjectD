<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com
	 */

	namespace core\command;

	use \core\controller\Request as Request;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\models\UserModel as UserModel;
	use \core\base\AppException as AppException;
	use \core\command\Command as Command;
	use \core\helpers\CommandHelper as CommandHelper;
	use \core\helpers\ApplicationHelper as ApplicationHelper;

	require_once("/membri/xtest/core/controller/Request.php");
	require_once("/membri/xtest/core/models/UserModel.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("/membri/xtest/core/base/AppException.php");
	require_once("/membri/xtest/core/command/Command.php");
	require_once("/membri/xtest/core/helpers/CommandHelper.php");
	require_once("/membri/xtest/core/helpers/ApplicationHelper.php");

	class LoginCommand extends Command {

		protected function doUserLogged(Request $request) {
			if ($request->getProperty("logout")) {
				ApplicationHelper::logout();
				$this->doUserNotLogged($request);
			} else {
				parent::doUserLogged($request);
			}
		}

		protected function doUserNotLogged(Request $request) {
			$render = true;

			if (!is_null($request->getProperty("login-submit"))) {
				$username = $request->getProperty("username");
				$password = $request->getProperty("password");
				try {
					$user = new UserModel($username, $password);
					ApplicationHelper::login($username);
					$render = false;
					$this->redirect("Home");
				} catch (AppException $error) {
					$errorFunction = $error->getMessage();
				}
			}

			if ($render) {
				ApplicationHelper::setViewLanguage(array('login','menu'));
				ApplicationHelper::setViewLanguage(array('login','menu'));
				$this->render("login.php", array(), $request);
			}
		}

	}

?>