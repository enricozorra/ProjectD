<?php
	
	use \core\base\RequestRegistry as RequestRegistry;
	use \core\base\SessionRegistry as SessionRegistry;
	use \core\base\Language as Language;
	use \core\helpers\ViewHelper as ViewHelper;

	require_once("/membri/xtest/core/base/RequestRegistry.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("/membri/xtest/core/base/Language.php");
	require_once("/membri/xtest/core/helpers/ViewHelper.php");

	$request = RequestRegistry::getRequest();
	$language = SessionRegistry::instance()->getLanguage();

	$language = $language['home'];
	$menuVoices = ViewHelper::getMenuItems();
	//$loginErrorFunction = $request->getProperty("loginErrorFunction");

	/*$language = $request->getProperty("language");

	if (!isset($language)) {
		throw new AppException("No language found", 3);
	}*/


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
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a href='<?php echo ViewHelper::createCmdLink("Offers") ?>'><?php echo $menuVoices['offers'] ?></a></li>
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a href='<?php echo ViewHelper::createCmdLink("Accepted") ?>'><?php echo $menuVoices['accepted'] ?></a></li>
			      	<li class="dropdown col-md-3 col-sm-3 col-xs-12">
			          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><?php echo $menuVoices['profile'] ?> <span class="caret"></span></a>
			          <ul class="dropdown-menu" role="menu">
			            <li><a href="#"> <?php echo $menuVoices['stats'] ?> </a></li>
			            <li><a href="#"> <?php echo $menuVoices['mod_profile'] ?> </a></li>
			            <li><a href="#"> <?php echo $menuVoices['change_password'] ?> </a></li>
			            <li class="divider"></li>
			            <li><a href="<?php echo ViewHelper::createCmdLink("Login&logout=true") ?>"> <?php echo $menuVoices['exit'] ?> </a></li>
			          </ul>
			        </li>
			      </ul>
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->
			</nav>
		</div>
	</div>

	<div style="margin-top:5%" id="container" class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
		<div style="margin-bottom:10%">
			<span>Non sei qui? Inserisci la tua posizione</span><input id="pac-input" placeholder="Inserisci l'indirizzo" type="text"></input>
		</div>
		<div id="map-canvas">
		</div>
	</div>