<?php

	/**
	 * @author  Enrico Ghidoni <enricoghdn@gmail.com>
	 * 2014-12-15
	 * This MUST be a stand-alone class, not included by any existing class,
	 * Be careful generating a new AppException as a FATAL ERROR will stop the application
	 */
	
	namespace core\base;
	
	class AppException extends \Exception {

		/**
		 * Properties
		 */
		
		private $errorMessage;
		/**
		 * 1 = warning, 2 = generic error, 3 = fatal error
		 * use 
		 * @var [type]
		 */
		private $errorSeverity;
		
		/**
		 * Methods
		 */
		
		public function __construct($errorMessage="Generic error", $errorSeverity=1, Exception $previous = null) {
			if ($this->errorSeverity == 3) {
				die("Errore di livello 3");
			}
			parent::__construct($errorMessage, $errorType, $previous);
		}

		public function getErrorSeverity() {
			return $this->errorSeverity;
		}

	}

?>