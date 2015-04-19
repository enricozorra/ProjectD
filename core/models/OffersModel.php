<?php

	/**
	 * @author Enrico Zorra <enricozorra@gmail.com>
	 * 2015-01-16
	 */
	
	require_once ("Entity.php");

	use \core\models\Entity as Entity;

	class OffersModel extends Entity {

		const DATABASE = "my_xtest";
		const TABLE = "offers";

		public function __construct() {

			Tools::databaseConnection();

			Tools::databaseSelection(self::DATABASE);

			$r = Tools::getColumnName(self::TABLE, self::DATABASE);

			while ($row = mysql_fetch_array ($r)) { 
				$this->values[$row["COLUMN_NAME"]] = "";
			}	
		}

		public function findByPK ($id=0) {
			try {
				$connection = Tools::databaseConnection();
			} catch (Exception $e) {
				echo "There was an error: ".$e->getMessage();
			}

			try {
				$connection = Tools::databaseSelection(self::DATABASE);
			} catch (Exception $e) {
				echo "There was an error: ".$e->getMessage();
			}

			if ($id == 0) {
				return false;
			}

			$arr = Tools::checkToDatabase("id",$id,self::TABLE);

			if (!$arr) {
				return false;
			}

			foreach ($arr as $k => $v) {
				if (array_key_exists($k, $this->values)) {
					$this->values[$k] = $v;
				}
			}

			return true;
		}
	}
?>