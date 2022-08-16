<?php
/**
 * 支付请求文件
 * @link      http://www.phpMae.com
 * @copyright Copyright (c) 2010-2018 eruyi
 * @license   http://www.phpMae.com/license
 * @package   phpMae/tools
 * @author    51154393@qq.com
 * @version   1.1 Beta
 */
$out_trade_no = isset($_POST['out_trade_no']) ? addslashes($_POST['out_trade_no']) : json("订单号为空",201);
$name = isset($_POST['name']) ? addslashes($_POST['name']) : json("商品名称有误",201);
$money = isset($_POST['money']) ? addslashes($_POST['money']) : json("金额为空",201);
$type = isset($_POST['type']) ? addslashes($_POST['type']) : json("支付方式不正确",201);
require_once "MaePay.php";
$uid=  1000;
$key = "29ff1c73dd968ca16f99a660436e9f5a";
$maepay = new MaePay($key);
$data = [
	'uid' => $uid,//商户ID
	'type'  => $type,//支付方式，ali、wx
	'out_trade_no'  => $out_trade_no,
	'name'  => $name,
	'money'  => $money,
	'notify_url'  => '',
	'return_url'  => ''
];
$result = $maepay->pay($data);

if(strstr($result, '<title>错误信息</title>')){
    $msg = txt_zhong($result, '<div class="title">','</div>');
    json($msg,201);
}

$url = txt_zhong($result, 'window.location.href="','"</script>');
if($url){
    json("请求成功",200,$url);
}json('请求失败',201);

function json($msg,$code,$data = null) {//json输出
    if($data){
       $udata = array('code'=>$code,'msg'=>$msg,'data'=>$data); 
    }else{
        $udata = array('code'=>$code,'msg'=>$msg);
    }
	$jdata = json_encode($udata);
	echo $jdata;
	exit;
}


function txt_zhong($str, $leftStr, $rightStr){//取文本中间
	$left = strpos($str, $leftStr);
	$right = strpos($str, $rightStr,$left);
	if($left < 0 or $right < $left) return '';
	return substr($str, $left + strlen($leftStr), $right-$left-strlen($leftStr));
}
?>