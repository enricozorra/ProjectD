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

	$language = $language['login'];
	$menuVoices = ViewHelper::getMenuItems();
	$errorFunction = $request->getProperty("loginErrorFunction");

	echo "<script>$loginErrorFunction</script>";

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
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a href='<?php echo ViewHelper::createCmdLink("More") ?>'> <?php echo $menuVoices['more'] ?></a></li>
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a href='<?php echo ViewHelper::createCmdLink("About") ?>'> <?php echo $menuVoices['about'] ?></a></li>
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a href='<?php echo ViewHelper::createCmdLink("Join") ?>'> <?php echo $menuVoices['join'] ?></a></li>
			      </ul>
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->
			</nav>
		</div>
	</div>

	<div id="container">

		<p id="title">
			Inserisci le credenziali per accedere 	
		</p>

		<div id="login-section" class="row">
			<form method="POST" onsubmit="encryptData()" class="form-group col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3">
				<div class="col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1">
					<input class="form-control login-input" type="text" name="username" placeholder="<?php echo $language['username-placeholder'] ?>">
					<input id="password" class="form-control login-input" type="password" name="password" style="margin-top:5px" size="45" placeholder="<?php echo $language['password-placeholder'] ?>"></br>
					<input class="form-control btn btn-primary" type="submit" name="login-submit" value="<?php echo $language['login-label'] ?>">
				</div>
			</form>

		</div>

		<p>

	</div>