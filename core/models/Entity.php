<?php

	/**
	 * @author Enrico Zorra <enricozorra@gmail.com>
	 * 2014-12-13
	 */
	
	namespace core\models;

	require_once("/membri/xtest/core/helpers/DatabaseHelper.php");
	require_once("/membri/xtest/core/base/AppException.php");

	use core\helpers\DatabaseHelper as DatabaseHelper;
	use core\base\AppException as AppException;

	abstract class Entity {
		
		protected $values = Array();

		protected function __construct ($nd, $nt) {
			DatabaseHelper::databaseConnection();

			DatabaseHelper::databaseSelection($nd);

			$r = DatabaseHelper::getColumnName($nt, $nd);

			while ($row = mysql_fetch_array ($r)) { 
				$this->values[$row["COLUMN_NAME"]] = "";
			}
		}

		public function getValues() {
			return $this->values;
		}

		public function getProperty($key) {
			if (array_key_exists($key, $this->values)) {
				return $this->values[$key];
			}
			return null;
		}

		public function setProperty($key, $value) {
			if (array_key_exists($key, $this->values)) {
				$this->values[$key] = $value;
			} else {
				throw new AppException("Key not found in values", 1);			
			}
		}

		public function save($table) {

			foreach ($this->values as $k => $v) {
				if (isset($this->values[$k])) {
					$str .= "{$k}='{$v}',";
				}
			}

			$str = rtrim($str,",");
			
			$sql = "UPDATE {$table} SET {$str} WHERE user_email = '{$this->values['user_email']}'";

			$r = mysql_query($sql);

			if ($r) {
				return true;
			} else {
				throw new AppException("Cannot save to database", 1);	
			}
		}

	}

?>