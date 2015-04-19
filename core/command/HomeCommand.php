<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 */
	
	namespace core\command;

	use \core\base\AppException;
    use \core\controller\Request as Request;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\command\Command as Command;
	use \core\helpers\CommandHelper as CommandHelper;
    use \core\models\UserModel;
    use \core\helpers\ApplicationHelper as ApplicationHelper;

    require_once("/membri/xtest/core/controller/Request.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("Command.php");
	require_once("/membri/xtest/core/helpers/CommandHelper.php");
	require_once("/membri/xtest/core/helpers/ApplicationHelper.php");

	class HomeCommand extends Command {

		protected function doUserLogged(Request $request) {
			ApplicationHelper::setViewLanguage(array('home','menu'));
			$this->render("home.php", array(), $request);
		}

	}

?>