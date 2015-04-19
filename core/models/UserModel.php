<?php
	
	/**
	 * @author Enrico Zorra <enricozorra@gmail.com>
	 * 2014-12-13
	 */
	
	namespace core\models;

	require_once ("Entity.php");
	require_once ("/membri/xtest/core/helpers/DatabaseHelper.php");
	require_once ("/membri/xtest/core/controller/Request.php");

	use \core\helpers\DatabaseHelper as DatabaseHelper;	
	use \core\base\AppException as AppException;
	use \core\controller\Request as Request;

	class UserModel extends Entity {

		const TABLE = "users";

		public function __construct($username="", $password="") {

			parent::__construct (DatabaseHelper::NAME_DATABASE, self::TABLE);

			if (($username !== "") && ($password !== "")) {
				if(!$this->authenticate($username, $password)) throw new AppException("Login data not valid", 1);
			};
			
		}

		public function authenticate ($username="", $password="") {

			if (($username==="")||($password==="")) {
				return false;
			}

			$res = DatabaseHelper::checkLogin ($username, $password, self::TABLE);

			if (!$res) {
				return false;
			}
			
			foreach ($res as $key => $value) {
				if (array_key_exists($key, $this->values)) {
					$this->values["{$key}"] = $value;
				}
			}

			return true;

		}

		public function findByPK ($id=0) {

			$arr = DatabaseHelper::checkToDatabase("id",$id,self::TABLE);

			if (!$arr) {
				return false;
			}

			foreach ($arr as $k => $v) {
				if (array_key_exists($k, $this->values)) {
					$this->values["{$k}"] = $v;
				}
			}

			return true;
		}

		public function registration (Request $request) {

			foreach ($this->values as $k => $v) {
				$this->values["{$k}"] = $request->getProperty($k);
			}						
			
			return DatabaseHelper::insertIntoDb ($this->values, self::TABLE);
		}

		public function save() {
			parent::save(self::TABLE);
		}

		public static function getUserByHash($code){
			try {
				$connection = DatabaseHelper::databaseConnection();
			} catch (AppException $e) {
				throw new AppException("Database connection failed", 2);	
			} 

			try {
				$connection = DatabaseHelper::databaseSelection(DatabaseHelper::NAME_DATABASE);
			} catch (AppException $e) {
				throw new Exception("Database selection failed", 2);
			}

			$r = DatabaseHelper::checkToDatabase("hash", $code, self::TABLE);

			if ($r) {
				return new self($r["username"],$r["password"]);
			} else {
				return null;
			}

		}

	}
?>