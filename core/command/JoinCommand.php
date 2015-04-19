<?php

	namespace core\command;

	use \core\controller\Request as Request;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\command\Command as Command;
	use \core\helpers\CommandHelper as CommandHelper;
	use \core\models\UserModel as UserModel;
	use \core\helpers\ApplicationHelper as ApplicationHelper;
	use \core\base\AppException as AppException;

	require_once("/membri/xtest/core/controller/Request.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("Command.php");
	require_once("/membri/xtest/core/helpers/CommandHelper.php");
	require_once("/membri/xtest/core/models/UserModel.php");
	require_once("/membri/xtest/core/helpers/ApplicationHelper.php");
	require_once("/membri/xtest/core/base/AppException.php");

	class JoinCommand extends Command {

		public function doUserNotLogged(Request $request) {
			$render = true;
			if(!is_null($request->getProperty('join-submit'))) {
				//TODO (this is a big one): syntax validations
				//User has sent data to join, create new UserModel to access the registration method
				$user = new UserModel();
				//Try to register
				$registrationErrorCode = $user->registration($request);
				//Registration method returns null if all data was successfully inserted into the database
				if(!is_null($registrationErrorCode)) {
					//Something went wrong during the registration, ApplicationHelper will provide the possible codes
					//for any error, fetching data through ApplicationRegistry. Codes are stored in /core/data/options.xml
					//A JavaScript function will be called to inform the user about the error
					try {
						$errorCodes = ApplicationHelper::getErrorCodes();
						$errorFunction = $errorCodes[$registrationErrorCode];
					} catch (AppException $e) {
						$errorFunction = "generalError";
					}
				} else {
					//The registration was successful
						$this->joinConfirm($request, $user);
						$render = false;
				}
			}
			if ($render) {
				ApplicationHelper::setViewLanguage(array('join','menu'));
				$this->render("join.php", array("errorFunction"=>$errorFunction), $request);
			}
		}

		protected function joinConfirm(Request $request, UserModel $user) {

			$hash = md5($user->getProperty('first_name') . $user->getProperty('user_email') . rand(0, 1000));

			ApplicationHelper::setViewLanguage(array('mails'));
			$language = SessionRegistry::instance()->getLanguage();
			$language = $language['mails'];

			$to = $user->getProperty('user_email');
			$subject = $language['activation-mail-subject'];
			$text = $language['activation-mail-content'] . $language['activation-link'] . $hash ;
			$headers = 'From: dev.smartdel@gmail.com' . "\r\n" . 'Reply-To: dev.smartdel@gmail.com';

			if (mail($to, $subject, $text, $headers)) {
				$user->setProperty('hash', $hash);
				$user->save();
				ApplicationHelper::setViewLanguage(array('join-confirm', 'menu'));
			}
            $this->render('join-confirm.php', array(), $request);
		}

	}

?>