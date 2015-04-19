<?php
/**
 * Created by PhpStorm.
 * User: Enrico
 * Date: 13/04/15
 * Time: 13:26
 */

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

$language = $language['activation-deny'];
$menuItems = ViewHelper::getMenuItems();


?>

<div id="menu-container">
    <div class="row">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header col-md-3">
                    <a class="navbar-brand" href="#">ProjectD</a>
                </div>
            </div><!-- /.container-fluid -->
        </nav>
    </div>
</div>

<div id="container" class="col-md-8 col-md-offset-2" style="text-align:center; margin-top:20%">
    <span style="" id="big-red-glyph" class="glyphicon glyphicon-remove" aria-hidden="true"></span></br>
    <p><h4><?php echo $language['error-message'] ?></h4></p>
    <input type="button" class="btn btn-primary" value="<?php echo $language['create-new-account-button'] ?>" href="<?php echo ViewHelper::createCmdLink('Join') ?>">
</div>