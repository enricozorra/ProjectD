<?php

	use \core\base\SessionRegistry as SessionRegistry;
	use \core\base\RequestRegistry as RequestRegistry;
	use \core\helpers\ViewHelper as ViewHelper;

	require_once("/membri/xtest/core/base/RequestRegistry.php");
	require_once("/membri/xtest/core/base/SessionRegistry.php");
	require_once("/membri/xtest/core/helpers/ViewHelper.php");

	$request = RequestRegistry::getRequest();
	$language = SessionRegistry::instance()->getLanguage();

	$language = $language['join'];
	$menuVoices = ViewHelper::getMenuItems();
	$errorFunction = $request->getProperty("errorFunction");

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
			      	<li class='col-md-3 col-sm-3 col-xs-12'><a href='<?php echo ViewHelper::createCmdLink("Login") ?>'> <?php echo $menuVoices['login'] ?></a></li>
			      </ul>
			    </div><!-- /.navbar-collapse -->
			  </div><!-- /.container-fluid -->
			</nav>
		</div>
	</div>

	<div id="container">

		<div id="join-section" class="row">
			<div id="join-label" class="col-md-4 col-md-offset-4">
				<h2><?php echo $language["join-label"] ?></h2>
			</div>
			<form id="join-form" method="POST" onsubmit="encryptData()" class="col-md-4 col-md-offset-4">
				<div class="row form-inline">
					<div>
						<div id="first_name-field" class="col-md-6 no-lateral-padding">
							<input id="first_name" class="form-control" type="text" name="first_name" placeholder="<?php echo $language['first-name-placeholder'] ?>">
						</div>
						<div id="family_name-field" class="col-md-6 no-lateral-padding">
							<input id="family_name" class="form-control" type="text" name="family_name" placeholder="<?php echo $language['family-name-placeholder'] ?>">
						</div>
					</div>
				</div>
				<div id="vat_number-field" class="row">
					<input type="text" id="vat_number" class="form-control" name="vat_number" placeholder="<?php echo $language['vat-number-placeholder'] ?>">
				</div>
				<div id="username-field" class="row">
					<input id="username" class="form-control" type="text" name="username" placeholder="<?php echo $language['username-placeholder'] ?>">
				</div>
				<div id="password-field" class="row">
					<input id="password" class="form-control" type="password" name="password" size="45" placeholder="<?php echo $language['password-placeholder'] ?>">
				</div>
				<div id="user_email-field" class="row">
					<input id="user_email" class="form-control" type="email" name="user_email" placeholder="<?php echo $language['email-placeholder'] ?>">
				</div>
				<div class="row">
					<div class="form-inline">
						<div class="row">
							<div id="address-field" class="col-md-6 no-lateral-padding">
								<input id="address" class="form-control" type="text" name="address" placeholder="<?php echo $language['address-placeholder'] ?>">
							</div>
							<div id="zip-field" class="col-md-6 no-lateral-padding">
								<input id="zip" class="form-control" type="text" name="zip" placeholder="<?php echo $language['zip-placeholder'] ?>">
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="form-inline">
						<div class="row">
							<div id="city-field" class="col-md-6 no-lateral-padding">
								<input id="city" class="form-control" type="text" name="city" placeholder="<?php echo $language['city-placeholder'] ?>">
							</div>
							<div id="country-field" class="col-md-6 no-lateral-padding">
								<input id="country" class="form-control" type="text" name="country" placeholder="<?php echo $language['country-placeholder'] ?>">
							</div>
						</div>
					</div>
				</div>
				<input class="col-md-12 btn btn-primary" type="submit" name="join-submit" value="<?php echo $language['join-label'] ?>">
			</form>
		</div>

	</div>

<?php

	print "<script>$errorFunction</script>";

?>