<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 *
	 * Default command, invoked if CommandResolver cannot find the requested command
	 */
	
	namespace core\command;

	use \core\command\Command as Command;
	use \core\helpers\CommandHelper as CommandHelper;

	require_once("/membri/xtest/core/controller/Request.php");
	require_once("Command.php");
	require_once("/membri/xtest/core/helpers/CommandHelper.php");

	class DefaultCommand extends Command {

		function doUserLogged($request) {
		}

	}

?>