<?php
/**
 * 订单查询文件
 * @link      http://www.phpMae.com
 * @copyright Copyright (c) 2010-2018 eruyi
 * @license   http://www.phpMae.com/license
 * @package   phpMae/tools
 * @author    51154393@qq.com
 * @version   1.1 Beta
 */
require_once "MaePay.php";
$key = "75c45702ab240c4106d911e432b11eff";
$maepay = new MaePay($key);
$data = [
	'uid' => 1000,//商户ID
	'out_trade_no'  => 'T202106222358137429',
	'time'  => time()
];
$result = $maepay->oquery($data);
echo $result;
return;
?>