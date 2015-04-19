<?php

	use \core\base\RequestRegistry as RequestRegistry;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\helpers\ViewHelper as ViewHelper;

	require_once("/membri/xtest/core/base/RequestRegistry.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("core/helpers/ViewHelper.php");

	$request = RequestRegistry::getRequest();
	$language = SessionRegistry::instance()->getLanguage();

	$language = $language['home'];
	$menuVoices = ViewHelper::getMenuItems();

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
			      <a class="navbar-brand" href="#">ProjectD</a>
			    </div>

			    <!-- Collect the nav links, forms, and other content for toggling -->
			    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul class="nav navbar-nav col-md-9 col-sm-9">
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a class='box' href='<?php echo ViewHelper::createCmdLink("More") ?>'> <?php echo $menuVoices['more'] ?></a></li>
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a class='box' href='<?php echo ViewHelper::createCmdLink("About") ?>'> <?php echo $menuVoices['about'] ?></a></li>
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a class='box' href='<?php echo ViewHelper::createCmdLink("Login") ?>'> <?php echo $menuVoices['login'] ?></a></li>
			      </ul>
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->
			</nav>
		</div>
	</div>

	<div id="container" class="col-md-8 col-md-offset-2" style="text-align:center; margin-top:20%">
		<span style="" id="big-teal-glyph" class="glyphicon glyphicon-ok" aria-hidden="true"></span></br>
		<p><h4>Ottimo! La registrazione è andata a buon fine, ti abbiamo mandato una e-mail per attivare il tuo nuovo account</h4></p>
	</div>