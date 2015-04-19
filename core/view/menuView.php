<?php

	namespace core\view;

	//use \core\helpers\ViewHelper as ViewHelper;

	include_once("/membri/xtest/core/base/RequestRegistry.php" );
	include_once("/membri/xtest/core/helpers/ViewHelper.php");
	$request = \core\base\RequestRegistry::getRequest();
	$viewHelper = \core\helpers\ViewHelper::instance();

	$menu = $request->getProperty("menuElements");

?>

	<div id="menu-container">
		<div class="row">
			<nav class="navbar navbar-default">
			  <div class="container-fluid">
			    <!-- Brand and toggle get grouped for better mobile display -->
			    <div class="navbar-header col-md-3">
			      <a href="#" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			        <span class="sr-only">Toggle navigation</span>
			        <div>
			        	<span class="menu-bar"></span>
			        </div>
			      </a>
			      <a class="navbar-brand" href="#">ProjectX</a>
			    </div>

			    <!-- Collect the nav links, forms, and other content for toggling -->
			    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul class="nav navbar-nav col-md-9 col-sm-9">
			      	<?php $viewHelper->fetchMenu($menu); ?>
			      </ul>
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->
			</nav>
		</div>
	</div>