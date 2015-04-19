<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 *
	 * Provides the system preferences
	 */

	namespace core\helpers;
	require_once("/membri/xtest/core/base/Helper.php");
	require_once("/membri/xtest/core/base/ApplicationRegistry.php");
	require_once("/membri/xtest/core/base/AppException.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("/membri/xtest/core/base/Language.php");
	require_once("/membri/xtest/core/models/UserModel.php");

	use \core\base\AppException as AppException;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\base\Helper as Helper;
	use \core\base\Language as Language;
	use \core\base\ApplicationRegistry as ApplicationRegistry;

	class ApplicationHelper extends Helper {
		private static $instance;
		protected static $languagesFolder = "languages/";
		protected static $config = "core/data/options.xml";
		protected static $sessionExpireTime = 1800; //As time()'s return is in second

		static function instance() {
			if ( ! self::$instance ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		function init() {
			if (!is_null(SessionRegistry::instance()->getLanguage())) {
				SessionRegistry::instance()->unsetLanguage();
			}
			/*if (is_null(SessionRegistry::instance()->getLanguage())) {
				$language = Language::instance();
				$language->setLanguage($this->getLanguagePath());
				SessionRegistry::instance()->setLanguage($language);
				SessionRegistry::instance()->setLanguageCode('it');
				if(!is_null(SessionRegistry::instance()->getTmpValue())) {
					SessionRegistry::instance()->setTmpValue(SessionRegistry::instance()->getTmpValue()+1);
				} else {
					SessionRegistry::instance()->setTmpValue(1);
				}
			}*/
		}

		private static function getLanguagePath() {
			if (!is_null(SessionRegistry::instance()->getLanguageCode())) {
				return self::$languagesFolder . SessionRegistry::instance()->getLanguageCode() . ".xml";
			} else {
				$lC = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
				SessionRegistry::instance()->setLanguageCode($lC);
				return self::$languagesFolder . $lC . ".xml";
			}
		}

		public static function getErrorCodes() {
			$errorCodes = ApplicationRegistry::getErrorCodes();
			if (is_null ($errorCodes)) {
				try {
					self::getOptions();
				}
				catch (AppException $e) {
					throw new AppException("L'elicottero &egrave; caduto", 2);					
				}
			}
			$errorCodes = ApplicationRegistry::getErrorCodes();
			return $errorCodes;
		}

		private static function getOptions() {
			self::ensure( file_exists( self::$config ), "Could not find options file", 2 );
			$options = SimpleXml_load_file( self::$config );
			$errorCodes = (array)$options->errorCodes;
			self::ensure($errorCodes, "No ERROR_CODES found", 2);
			ApplicationRegistry::setErrorCodes($errorCodes);
		}

		private static function ensure( $expr, $message, $severity=1 ) {
			try {
				if ($expr) {}
			} catch (AppException $e) {
				throw new AppException($message, $severity);
			}
		}

		public static function updateSessionId() {
			session_regenerate_id();
			SessionRegistry::instance()->setIdRefreshedTime(time());
		}

		public static function checkSessionId() {
			if((is_null(SessionRegistry::instance()->getIdRefreshedTime()))||(time() - SessionRegistry::instance()->getIdRefreshedTime() >= self::$sessionExpireTime)) {
				self::updateSessionId();
			}
		}

		public static function userLogged() {
			if (!is_null(SessionRegistry::instance()->getUsername())) {
				return true;
			}
			return false;
		}

		public static function login($username) {
			SessionRegistry::instance()->setUsername($username);
		}

		public static function logout() {
			SessionRegistry::instance()->unsetUsername();
		}

		public static function setViewLanguage(array $views) {
			SessionRegistry::instance()->unsetLanguage();
			/**
			 * @var Language $objLanguage
			 */
			$objLanguage = Language::instance();
			$objLanguage->setLanguage(self::getLanguagePath());
			/**
			 * Main array to be saved in SessionRegistry, contains the requested views' messages and labels
			 * @var array
			 */
			$viewLanguage = array();

			foreach ($views as $value) {
				$viewLanguage[$value] = $objLanguage->getElementsByView($value);
			}

			SessionRegistry::instance()->setLanguage($viewLanguage);
		}
	}

?>