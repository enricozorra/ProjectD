<?php
/**
 * Created by PhpStorm.
 * User: Enrico
 * Date: 13/04/15
 * Time: 12:42
 */

namespace core\command;

use core\base\SessionRegistry as SessionRegistry;
use core\controller\Request as Request;
use core\helpers\ApplicationHelper as ApplicationHelper;
use core\models\UserModel as UserModel;

require_once("Command.php");
require_once("/membri/xtest/core/controller/Request.php");
require_once("/membri/xtest/core/models/UserModel.php");
require_once("/membri/xtest/core/helpers/ApplicationHelper.php");


class AccountActivationCommand extends Command {

    public function doUserNotLogged(Request $request) {
        $code = $request->getProperty('c');
        if(isset($code)) {
            $user = UserModel::getUserByHash($code);
            if(!is_null($user)) {
                $user->setProperty('active', 1);
                $user->setProperty('hash', '');
                $user->save();
                ApplicationHelper::setViewLanguage(array('activation-confirm', 'menu'));
                $this->render('activation-confirm.php', array('user'=>$user), $request);
                exit();
            } else {
                ApplicationHelper::setViewLanguage(array('activation-deny','menu'));
                $this->render('activation-deny.php', array(), $request);
            }
        }
    }

}