<?php
/**
 * 码易支付类
 * @link      http://www.phpMae.com
 * @copyright Copyright (c) 2010-2018 eruyi
 * @license   http://www.phpMae.com/license
 * @package   phpMae/tools
 * @author    51154393@qq.com
 * @version   1.1 Beta
 */
class MaePay {
	public $host = "http://pay.maecn.com";
	public $method = "POST";
	public $appkey = "";
	
	public function __construct($key){
        $this->appkey = $key;
    }
	public function pay($data,$headers = null){//发送支付请求
		if(empty($this->appkey) || !is_array($data))return false;
		
		$post ='';
		foreach ($data as $v => $k){
			$post .= $v."=".$k.'&';
		}
		$post = rtrim($post,"&");
		
		$sign = $this->sign($post);
		$querys = $post."&sign=".$sign;
		//die($querys);
		$res = $this->get("/pay/api",$querys,$headers);
		return $res;
	}
	public function oquery($data){//查询订单
		if(empty($this->appkey) || !is_array($data))return false;
		$post ='';
		foreach ($data as $v => $k){
			$post .= $v."=".$k.'&';
		}
		$post = rtrim($post,"&");
		$sign = $this->sign($post);
		$querys = $post."&sign=".$sign;
		//die($querys);
		$res = $this->get("/api/oquery",$querys);
		return $res;
	}
	
	
	public function get($path,$data,$headers = null){//发送支付请求
		$url = $this->host .$path."?".$data;
		$curl = curl_init();
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $this->method);
		curl_setopt($curl, CURLOPT_URL, $url);
		$head = [];
		if(!$headers){
			$headers = 'User-Agent:'.$_SERVER['HTTP_USER_AGENT'];
		}
		array_push($head, $headers);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $head);
		curl_setopt($curl, CURLOPT_FAILONERROR, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		if (1 == strpos("$".$this->host, "https://")){
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		}
		return curl_exec($curl);
	}
	
	
	public function sign($arr) {//生成签名
        $data ='';
        if(is_array($arr)){
            foreach ($arr as $v => $k){
                $data .= $v."=".$k.'&';
            }
            return md5(rtrim($data,"&").$this->appkey);
        }else{
            return md5($arr.$this->appkey);
        }
	}
	
	public function verify($data) {//签名验证
		if(!isset($data['sign']) || empty($data['sign']))return false;
		$sign = strtolower($data['sign']);
		unset($data['sign']);
		$arr='';
		foreach ($data as $k => $v) {
			$arr .= $k . '='. $v .'&';
		}
		$arr = rtrim($arr,"&").$this->appkey;
		return md5($arr).'-'.$arr;
		if(md5($arr) != $sign)return false;
		return true;
	}
	
}



?>