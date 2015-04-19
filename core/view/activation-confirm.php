<?php

	use \core\base\SessionRegistry as SessionRegistry;
	use \core\base\RequestRegistry as RequestRegistry;
	use \core\helpers\ViewHelper as ViewHelper;

	require_once("/membri/xtest/core/base/RequestRegistry.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("/membri/xtest/core/helpers/ViewHelper.php");

	$request = RequestRegistry::getRequest();
	$language = SessionRegistry::instance()->getLanguage();

	$language = $language['activation-confirm'];

?>

	<div>
		<h1>Attivato!!!"</h1>
	</div>