<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 *
	 * Abstract class for registry pattern
	 */
	
	namespace core\base;
	
	abstract class Registry {

		abstract protected function get( $key );

		abstract protected function set ( $key, $value );
	}

?>