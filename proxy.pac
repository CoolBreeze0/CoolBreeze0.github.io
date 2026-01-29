function FindProxyForURL(url, host) {
    // 本地网络直连
    if (isPlainHostName(host) || 
        shExpMatch(host, "*.local") || 
        isInNet(dnsResolve(host), "127.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) {
        return "DIRECT";
    }
    
    // 国内主流网站直连
    var directDomains = [
        // 通用.cn域名
        "||cn",
        "||com.cn",
        "||net.cn",
        "||org.cn",
        "||gov.cn",
        "||edu.cn",
        "||ac.cn",
        
        // 百度系
        "||baidu.com",
        "||baiducontent.com",
        "||bdstatic.com",
        "||bdimg.com",
        "||baidupcs.com",
        
        // 阿里巴巴系
        "||alibaba.com",
        "||alicdn.com",
        "||aliyun.com",
        "||alipay.com",
        "||taobao.com",
        "||tmall.com",
        "||1688.com",
        
        // 腾讯系
        "||qq.com",
        "||weixin.com",
        "||tencent.com",
        "||tencent-cloud.com",
        "||qcloud.com",
        "||dnspod.com",
        
        // 字节跳动系
        "||bytedance.com",
        "||toutiao.com",
        "||douyin.com",
        "||ixigua.com",
        "||snssdk.com",
        "||pstatp.com",
        
        // 京东
        "||jd.com",
        "||jd.hk",
        "||jcloud.com",
        
        // 网易
        "||163.com",
        "||126.com",
        "||netease.com",
        "||yanxuan.com",
        
        // 新浪
        "||sina.com.cn",
        "||weibo.com",
        "||weibocdn.com",
        
        // 搜狐
        "||sohu.com",
        "||v-56.com",
        
        // 其他知名国内网站
        "||bilibili.com",
        "||hdslb.com",
        "||bilivideo.com",
        "||iqiyi.com",
        "||qiyi.com",
        "||youku.com",
        "||tudou.com",
        "||douyu.com",
        "||huya.com",
        "||meituan.com",
        "||dianping.com",
        "||xiaomi.com",
        "||mi.com",
        "||xiaomi.cn",
        "||huawei.com",
        "||oppo.com",
        "||vivo.com",
        "||360.cn",
        "||360.com",
        "||360safe.com",
        "||csdn.net",
        "||zhihu.com",
        "||zhimg.com",
        "||smzdm.com",
        "||chiphell.com",
        
        // 金融机构
        "||icbc.com.cn",
        "||ccb.com",
        "||abchina.com",
        "||bankcomm.com",
        "||cmbchina.com",
        
        // 运营商
        "||chinaunicom.com",
        "||chinamobile.com",
        "||chinanetcenter.com",
        "||189.cn",
        
        // 教育科研
        "||cernet.edu.cn",
        "||cnu.edu.cn",
        "||moe.edu.cn",
        
        // 政府机构
        "||12306.cn",
        "||weather.com.cn",
        "||gov.cn",
        "||12315.cn"
    ];
    
    // 检查是否匹配直连域名
    for (var i = 0; i < directDomains.length; i++) {
        if (shExpMatch(host, directDomains[i])) {
            return "DIRECT";
        }
    }
    
    // 需要代理访问的国外网站
    var proxyDomains = [
        // Google系
        "||google.com",
        "||google.cn",
        "||googleapis.com",
        "||gstatic.com",
        "||googleusercontent.com",
        "||gmail.com",
        "||youtube.com",
        "||ytimg.com",
        "||googlevideo.com",
        "||google-analytics.com",
        "||googleadservices.com",
        "||google.com.hk",
        "||google.com.tw",
        "||google.com.sg",
        "||google.co.jp",
        "||google.co.kr",
        
        // Facebook系
        "||facebook.com",
        "||fb.com",
        "||fbcdn.net",
        "||instagram.com",
        "||cdninstagram.com",
        "||whatsapp.com",
        "||whatsapp.net",
        
        // Twitter系
        "||twitter.com",
        "||twimg.com",
        "||t.co",
        
        // 微软系
        "||microsoft.com",
        "||windows.com",
        "||office.com",
        "||live.com",
        "||skype.com",
        "||onedrive.com",
        "||onenote.com",
        
        // 苹果系
        "||apple.com",
        "||icloud.com",
        "||appstore.com",
        "||apple-cloudkit.com",
        
        // Amazon系
        "||amazon.com",
        "||amazonaws.com",
        "||aws.amazon.com",
        
        // GitHub
        "||github.com",
        "||githubusercontent.com",
        "||github.io",
        "||githubapp.com",
        
        // Wikipedia
        "||wikipedia.org",
        "||wikimedia.org",
        "||wiktionary.org",
        
        // 流媒体
        "||netflix.com",
        "||nflxvideo.net",
        "||nflxso.net",
        "||nflxext.com",
        "||spotify.com",
        "||spotifycdn.com",
        "||twitch.tv",
        "||ttvnw.net",
        "||discord.com",
        "||discordapp.com",
        "||discordapp.net",
        "||discord.gg",
        
        // 开发者工具
        "||stackoverflow.com",
        "||gitlab.com",
        "||docker.com",
        "||npmjs.com",
        "||medium.com",
        "||atlassian.com",
        "||jira.com",
        "||confluence.com",
        "||slack.com",
        "||trello.com",
        "||figma.com",
        
        // 新闻媒体
        "||bbc.com",
        "||bbc.co.uk",
        "||cnn.com",
        "||nytimes.com",
        "||wsj.com",
        "||bloomberg.com",
        "||reuters.com",
        "||apnews.com",
        
        // 其他常用
        "||reddit.com",
        "||redditmedia.com",
        "||redd.it",
        "||quora.com",
        "||telegram.org",
        "||t.me",
        "||tdesktop.com",
        "||dropbox.com",
        "||dropboxusercontent.com",
        "||notion.so",
        "||pixiv.net",
        "||pinterest.com",
        "||tumblr.com",
        "||flickr.com",
        "||deviantart.com",
        "||tiktok.com",
        "||tiktokcdn.com",
        "||bytedance.net",
        
        // 成人内容（可选）
        "||pornhub.com",
        "||xvideos.com",
        "||xnxx.com",
        "||xhamster.com",
        "||youporn.com"
    ];
    
    // 检查是否匹配代理域名
    for (var j = 0; j < proxyDomains.length; j++) {
        if (shExpMatch(host, proxyDomains[j])) {
            return "PROXY 127.0.0.1:7890; DIRECT";
        }
    }
    
    // 特殊处理：已知的中国IP段直连
    // 这里只列出部分主要IP段，实际应用中可能需要更完整的IP库
    var chinaIPRanges = [
        ["1.0.1.0", "1.0.3.255"],     // 福建
        ["1.0.8.0", "1.0.15.255"],    // 广东
        ["1.0.32.0", "1.0.63.255"],   // 浙江
        ["1.1.0.0", "1.1.255.255"],   // 福建
        ["1.2.0.0", "1.2.255.255"],   // 北京
        ["1.4.0.0", "1.4.255.255"],   // 广东
        ["1.10.0.0", "1.10.255.255"], // 内蒙古
        // 更多中国IP段可以在这里添加
    ];
    
    var ip = dnsResolve(host);
    if (ip) {
        // 检查是否在中国IP范围内
        for (var k = 0; k < chinaIPRanges.length; k++) {
            if (isInRange(ip, chinaIPRanges[k][0], chinaIPRanges[k][1])) {
                return "DIRECT";
            }
        }
    }
    
    // 默认规则
    // 如果是IP地址（直接IP访问），默认直连（通常是内网或国内服务）
    var ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(host)) {
        return "DIRECT";
    }
    
    // 对未知域名：.cn域名直连，其他使用代理
    if (host.endsWith(".cn") || host.endsWith(".中国")) {
        return "DIRECT";
    }
    
    // 对于其他未匹配的域名，默认使用代理
    return "PROXY 127.0.0.1:7890; DIRECT";
}

// 辅助函数：检查IP是否在范围内
function isInRange(ip, start, end) {
    var ipNum = ipToNum(ip);
    var startNum = ipToNum(start);
    var endNum = ipToNum(end);
    return ipNum >= startNum && ipNum <= endNum;
}

// 辅助函数：将IP地址转换为数字
function ipToNum(ip) {
    var parts = ip.split(".");
    return (parseInt(parts[0]) << 24) + 
           (parseInt(parts[1]) << 16) + 
           (parseInt(parts[2]) << 8) + 
           parseInt(parts[3]);
}