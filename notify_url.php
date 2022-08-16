<?php
/**
 * 异步通知文件
 * @link      http://www.phpMae.com
 * @copyright Copyright (c) 2010-2018 eruyi
 * @license   http://www.phpMae.com/license
 * @package   phpMae/tools
 * @author    51154393@qq.com
 * @version   1.1 Beta
 */
require_once "MaePay.php";//引用码易支付文件
$key = "75c45702ab240c4106d911e432b11eff";//商户秘钥
x(json_encode($_REQUEST));
$maepay = new MaePay($key);
$verify_sign = $maepay->verify($_REQUEST);//验证签名
if($verify_sign){//签名验证成功
    //请在这里加上商户的业务逻辑程序代
	$out_trade_no = $_REQUEST['out_trade_no'];//商户订单号
	$trade_no = $_REQUEST['trade_no'];//商户订单号
	$status = $_REQUEST['status'];//交易状态
	
	if($status=='SUCCESS'){//交易成功
        x('异步验证成功');
	}
	die('success');//处理完业务逻辑必须输出：success，否则系统则会重复发送通知
}else{
    x('异步验证失败');
    die('error');//验证失败
}

function x($data,$path = './app') {
	$file = $path.'/log/'.date('Ymd');
	if(!is_dir($file)){
		mkdir($file, 0777, true);
	}
	$file .= '/'.date('h').'.log';
	$contents=$data."\r\n";
	return file_put_contents($file,$contents,FILE_APPEND);//如果文件不存在，则创建一个新文件。
}

?>