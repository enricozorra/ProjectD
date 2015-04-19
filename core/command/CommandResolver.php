<?php

	/**
	 * @author Enrico Ghidoni <enricoghdn@gmail.com>
	 */
	
	namespace core\command;
	require_once("/membri/xtest/core/command/Command.php");
	require_once("/membri/xtest/core/command/DefaultCommand.php");

	class CommandResolver {
		private static $base_cmd;
		private static $default_cmd;

		function __construct() {
			if ( ! self::$base_cmd ) {
				self::$base_cmd = new \ReflectionClass( "\core\command\Command" );
			self::$default_cmd = new DefaultCommand();
			}
		}

		function getCommand( \core\controller\Request $request ) {
			$cmd = $request->getProperty( 'r' );
			$sep = DIRECTORY_SEPARATOR;
			if ( ! $cmd ) {
				return self::$default_cmd;
			}
			$cmd=str_replace( array('.', $sep), "", $cmd );
			$filepath = "core{$sep}command{$sep}{$cmd}Command.php";
			$classname = "core\\command\\{$cmd}Command";
			if ( file_exists( $filepath ) ) {
				@require_once( "$filepath" );
				if ( class_exists( $classname) ) {
					$cmd_class = new \ReflectionClass($classname);
						if ( $cmd_class->isSubClassOf( self::$base_cmd ) ) {
							return $cmd_class->newInstance();
						} else {
						$request->addFeedback( "command '$cmd' is not a Command" );
					}
				}
			}
			$request->addFeedback( "command '$cmd' not found" );
			return clone self::$default_cmd;
		}
	}

?>