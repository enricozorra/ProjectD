<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 *
	 * Session registry class
	 */
	
	namespace core\base;

	require_once("Registry.php");

	class SessionRegistry extends Registry {

		private static $instance;

		private function __construct() {
			session_start();
		}

		static function instance() {
			if( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		protected function get( $key ) {
			if ( isset( $_SESSION[__CLASS__][$key] ) ) {
				return $_SESSION[__CLASS__][$key];
			}
			return null;
		}

		protected function set( $key, $value ) {
			$_SESSION[__CLASS__][$key] = $value;
		}

		protected function unsetValue( $key ) {
			unset($_SESSION[__CLASS__][$key]);
		}

		//

		public function setUsername( $username ) {
			self::instance()->set('username', $username);
		}

		public function getUsername() {
			return self::instance()->get('username');
		}

		public function unsetUsername() {
			self::instance()->unsetValue('username');
		}

		public function setLanguage( array $language ) {
			self::instance()->set('language', $language);
		}

		public function getLanguage() {
			return self::instance()->get('language');
		}

		public function unsetLanguage() {
			self::instance()->unsetValue('language');
		}

		public function setLanguageCode( $languageCode) {
			self::instance()->set('languageCode', $languageCode);
		}

		public function getLanguageCode() {
			return self::instance()->get('languageCode');
		}

		public function setIdRefreshedTime($idRefreshedTime) {
			self::instance()->set('idRefreshedTime', $idRefreshedTime);
		}

		public function getIdRefreshedTime() {
			return self::instance()->get('idRefreshedTime');
		}

		public function sessionClose() {
			session_destroy();
		}

		public function setTmpValue($val) {
			self::instance()->set('tmpValue', $val);
		}

		public function getTmpValue() {
			return self::instance()->get('tmpValue');
		}

	}

?>