<?php
	
	/**
	 * @author Enrico Zorra <enricozorra@gmail.com>
	 * 2015-01-18
	 */
	
	namespace core\helpers;
	require_once("/membri/xtest/core/base/Helper.php");
	use \core\base\Helper as Helper;

	class DatabaseHelper extends Helper {

		const HOST = "localhost";
		const USER = "xtest";
		const PASSWORD = "nabtifupru88";

		const NAME_DATABASE = "my_xtest";

		public function __construct () {
		} 

		public static function databaseConnection () {
			if ($db = mysql_connect(self::HOST, self::USER, self::PASSWORD)) {
				return true;
			}
			return false;
		}

		public static function databaseSelection ($db) {
			if ($conn = mysql_select_db($db)) {
				return true;
			}
			return false;
		}

		public static function getColumnName ($table, $database) {
			$sql = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '{$table}'
				AND TABLE_SCHEMA = '{$database}'
			";
			$r = mysql_query($sql) or die (mysql_error());
			return $r;
		}

		public static function checkToDatabase($param, $value, $table) {
			$sql = "SELECT * FROM {$table} WHERE {$param} = '{$value}'";
			$r = mysql_query($sql) or die (mysql_error());
			return mysql_fetch_array($r);
		}

		public static function checkLogin ($username, $password, $table){
			$sql = "SELECT * FROM {$table} WHERE username = '{$username}' AND password = '{$password}'";
			$r = mysql_query($sql) or die (mysql_error());
			return mysql_fetch_array($r);
		}

		public static function checkFieldUnique ($param, $value, $table) {
			$sql = "SELECT {$param} FROM {$table} WHERE {$param}='{$value}'";
			$r = mysql_fetch_array(mysql_query($sql));
			if ($r) {
				return true;
			}
			return false;
		}

		public static function insertIntoDb ($array, $table) {

			foreach ($array as $k => $v) {
				$key_tmp .= "{$k},";
				$val_tmp .= "'{$v}',";
			}

			$key_tmp = rtrim($key_tmp,",");
			$val_tmp = rtrim($val_tmp,",");

			$sql = "INSERT INTO {$table} ({$key_tmp})
				VALUES ({$val_tmp})";

			if (self::checkFieldUnique("username",$array["username"],$table)) {
				return "code_1";
			}

			if (self::checkFieldUnique("user_email",$array["user_email"],$table)) {
				return "code_2";
			}

			if (self::checkFieldUnique("vat_number",$array["vat_number"],$table)) {
				return "code_3";
			}

			$r = mysql_query ($sql);

			if ($r) {
				return null;
			}
		}
	}
	
?>