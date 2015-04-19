<?php

	include_once( "/membri/xtest/core/base/RequestRegistry.php" );
	include_once( "/membri/xtest/core/helpers/ViewHelper.php" );
	
	$request = \core\base\RequestRegistry::getRequest();
	$viewHelper = \core\helpers\ViewHelper::instance();

	$language = $request->getProperty("language");
	$pageCSS = $viewHelper->getStylePath() . $request->getProperty("view") . ".css";

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="cache-control" content="no-cache">
	<meta name="viewport" content="width=device-width, height=device-height, user-scalable=yes" />
	<title><?php echo $language["page_title"] ?></title>
	<!-- JQuery -->
	<script src="script/jquery-2.1.3.min.js<?php echo "?t=".time() ?>"></script>
	<!-- GoogleMaps -->
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;signed_in=true&amp;libraries=places"></script>
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCU7uBWhexZbP7apR6WcuC2z5ltbkV9H08&amp;sensor=true<?php echo "?t=".time() ?>"></script>
	<!-- CryptoJS -->
	<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js"></script>
	<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/components/enc-base64-min.js"></script>
	<!-- General JS -->
	<script src="<?php echo $viewHelper->getGeneralJsPath()."?t=".time() ?>"></script>
	<!-- Page JS -->
	<script src="<?php echo $viewHelper->getScriptPath().$request->getProperty("view").".js?t=".time() ?>"></script>
	<!-- Bootstrap -->
	<link rel="stylesheet" href="style/Bootstrap/css/bootstrap.min.css<?php echo "?t=".time() ?>">
	<script src="style/Bootstrap/js/bootstrap.min.js"></script>
	<!-- Google Font -->
	<link href='http://fonts.googleapis.com/css?family=Roboto:100,300,400<?php echo "?t=".time() ?>' rel='stylesheet' type='text/css'>
	<!-- General CSS -->
	<link rel="stylesheet" href="<?php echo $viewHelper->getGeneralCssPath()."?t=".time() ?>">
	<!-- Page CSS -->
	<link rel="stylesheet" href="<?php echo $viewHelper->getStylePath() . $request->getProperty("view") . ".css?t=".time() ?>">

</head>
<body>

	<?php include ($request->getProperty("view")) . ".php"; ?>
	
</body>
</html>