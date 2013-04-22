
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="com.microsoft.samples.federation.wsfed.*"%>

<!doctype html>
<html>
<head>
 <meta charset="utf-8" />
  <title>jQuery UI Tabs - Default functionality</title>
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
  <link href="localhost:8443/sample/styles/common.css" rel="stylesheet" type="text/css">
  <link href="/sample/styles/default.css" rel="stylesheet" type="text/css">
  <link href="/styles/Site.css" rel="stylesheet" type="text/css">
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
  <script>
  $(function() {
    $( "#tabs" ).tabs();
  });
  </script>
  <style type="text/css">
  	
body{
	margin:0px;
	padding:0px;
	background:none repeat scroll 0 0 #FFFFFF;
	font-size:12px;
	font-family: #020F3B, Arial, Verdana;
}
h1,h2,h3,h4,ul,li,form{
	margin:0px;
	padding:0px;
	list-style-type:none;
}
a{
	font-size:12px;
	color:#FFF;
	text-decoration:none;	
}
a:hover{
	color: #066;
}
a img{
	border:none;
}
.input-text{
	height:14px;
	font-size:12px;
}
#clear{
	text-align:center;
	clear:both;
	line-height:30px;
}
.clear{
	clear:both;
	overflow:auto;
	zoom:1;
}
.clear:after{
    clear: both;
    content: " ";
    display: block;
    height: 0;
}
.hide{
	display:none;
}
.show{
	display:block;
}
.f20{
	font-size:20px;
}
.f14{
	font-size:14px;
}
.f12{
	font-size:12px;
}
.lh30{
	line-height:30px;
}
#w1002{
	width:1002px;
}
.mt30{
	margin-top:30px;
}
.mt120{
	margin-top:120px;
}
.mt180{
	margin-top:180px;
}
.ml22{
	margin-left:22px;
}
.mr10{
	margin-right:10px;
	display:inline;
}
.mtb10{
	margin-top:10px;
	margin-bottom:10px;
}
.border-bottom-none{
	border-bottom:none;
}
.left{
	float:left;
}
.right{
	float:right;
}
.header{
	background:url("http://l.yimg.com/a/lib/uh/15/uh_sprites_1.5-1.0.3.png") 0px 0px repeat-x;
	height:120px;
	position:relative;
	z-index:1;
}
.header .top{
	width:1002px;
	margin:0 auto;
	z-index:1;
	position:relative;
}
.top .logo{
	position:absolute;
	background:url("http://l.yimg.com/a/lib/uh/15/uh_sprites_1.5-1.0.3.png") no-repeat;
	width:500px;
	height:90px;
	top:0px;
	left:-100px;
	
}
.top .logo a{
	position:absolute;
	top:10px;
	/* left:120px; */
	width:235px;
	height:68px;
}
.top .link{
	background:#020f3b;
	line-height:20px;
	padding:0px 10px;
	position:absolute;
	top:3px;
	right:20px;
}
.top .link li{
	float:left;
	background:url("http://l.yimg.com/a/lib/uh/15/uh_sprites_1.5-1.0.3.png") right center no-repeat;
	padding:0px 8px;
	color:#FFF;
}
.top .link .chinese-link{
	background:url("http://l.yimg.com/a/lib/uh/15/uh_sprites_1.5-1.0.3.png");
	background-position:-337px -283px;
	margin-left:-2px;
}
.nav{
/* 	background:url("http://l.yimg.com/a/lib/uh/15/uh_sprites_1.5-1.0.3.png") 0px -91px repeat-x;
 */	width:100%;
	position:absolute;
	top:120px;
}
.nav .nav-box{
	width:1002px;
	margin:0 auto;
	/* line-height:250px; */
}
.nav ul{
	padding-left:40px;
}
.nav li{
	float:left;
	height:37px;
	padding:0px 12px;
/*   	background:url(/template/english/images/icon.png) right center no-repeat;
 */}
.nav li a{
	font-size:14px;
}
.nav li a:hover{
	/* color:#FFF; */
}
.nav .nav-last{
	background:none;
}
.nav .search-box{
/* 	background:url(/template/english/images/background.png) -159px -184px no-repeat;
 */	width:174px;
	height:25px;
	float:left;
	margin:5px 0px 0px 40px;
	display:inline;
	position:relative;
}
.search-box #keywords{
	border:none;
	background:none;
	width:140px;
	position:absolute;
	top:5px;
	left:5px;
	color:#666
}
.search-box .search-submit{
	position:absolute;
	right:5px;
	top:5px;
	background:url(/template/english/images/background.png) -159px -210px no-repeat;
	height:16px;
	width:14px;
	border:none;
	cursor:pointer;
}
.copyright{
	background:url(/template/english/images/background.png) 0px -129px repeat-x;
	height:44px;
	width:988px;
	margin:0 auto;
	color:#FFF;
	clear:both;
	line-height:18px;
	text-align:center;
	overflow:hidden;
	padding-top:10px;
}
.copyright p {margin:0px; padding:0px;font-family:"Î¢ÈíÑÅºÚ", Arial, Verdana; font-size:12px;}
  
  </style>
  
  <style>
  @charset "gb2312";

.main{
	background:url(/template/english/images/default_bg.jpg) 50% 1px no-repeat;
	width:1440px;
	width:auto;
	height:625px;
	overflow:hidden;
	margin:0 auto;
}
.main .container{
	position:relative;
	width:1002px;
	margin:0 auto;
	background:url(/template/english/images/bodybg.png) repeat-y;
}
.main .banner{
	height:570px;
	overflow:hidden;
	margin:0 auto;
	text-align:center;
	
}
.main .news-box{
	position:absolute;
	top:50px;
	left:620px;
	width:341px;
	background:url(/template/english/images/background.png) 0px -858px no-repeat;
	background:url(/template/english/images/news_top_bg.png) no-repeat;
	padding-top:11px;
}
.news-box .news-tab{
	background:#ac6303;
	padding:0px 8px;
	height:20px;
	margin:5px 0px;
	font-weight:100;
	float:left;
	margin-right:5px;
}
.news-box .news-tab-active{
	background:#e58100;
}
.news-box .news-tab-hover{
	background:#c26e02;
}
.news-box .news-tab a{
	color:#FFF;
}
.news-box .news-list{
	clear:both;
	display:none;
}
.news-box .list-show{
	display:block;
}
.news-box .news-list li{
	line-height:17px;
	height:38px;
	overflow:hidden;
	background:url(/template/english/images/background.png) 0px -353px repeat-x;
}
.news-box .news-list li div{
	width:40px;
	height:38px;
	float:left;
	color:#e58100;
	text-align:center;
}
.news-box .news-list li span{
	display:block;
	color:#780900;
	font-weight:bold;
}
.news-box .news-list .news-more{
	text-align:right;
	padding-bottom:3px;
	clear:both;
}
.news-box .news-list .news-more a{
	color:#c87202;
	padding-right:10px;
	background:url(/template/english/images/icon4.png) right center no-repeat;
}
.news-box .news-box-bottom{
	background:url(/template/english/images/background.png) 0px -392px no-repeat;
	background:url(/template/english/images/news_bottom_bg.png) no-repeat;
	height:9px;
	overflow:hidden;
}
.news-box .news-box-main{
	background:url(/template/english/images/news_bg.png) repeat-y;
	background:url(/template/english/images/news_bg.png) repeat-y;
	padding:0px 18px;
}
.news-box .news-top{
	background:#e58100;
	padding:10px 15px;
	
}
.news-box .news-top .container{
	overflow:hidden;
	width:275px;
	height:223px;
	background:none;
}
.news-top .news-pic{
	float:left;
	width:275px;
	height:223px;
}
#news_pic{
}
#news_pic img{
	width:275px;
	height:155px;
}
.news-top .news-pic .news-content{
	line-height:140%;
}
.news-top .news-pic .news-content p{
	color:#912300;
	font-weight:bold;
	margin:0px;
	padding:0px;
	height:20px;
	line-height:20px;
}
.news-pic a:hover{
	text-decoration:underline;
}
.news-top #news_icon{
	height:7px;
	
	float:right;
}
.news-top  #news_icon li{
	background:url(/template/english/images/background.png) -277px -449px no-repeat;
	width:7px;
	height:7px;
	_width:6px;
	overflow:hidden;
float:left;
	margin-left:3px;
	cursor:pointer;
}
.news-top  #news_icon li.icon-hover{
	background:url(/template/english/images/background.png) -285px -449px no-repeat;
}
.news-box .news-bottom{
	background:url(/template/english/images/news_bg_1.jpg) #ac6304 repeat-x;
	padding:0px 18px;
	overflow:hidden;
}
.news-box .news-bottom .news-tabs{
	overflow:hide;
	_margin-bottom:4px;
}
.news-box .news-bottom .news-tabs:after{
	display:block;
	content:"";
	clear:both;
}
.main .subnav{
	background: url(/template/english/images/subnav_bg.png) repeat;
	height:70px;
	position:absolute;
	bottom:1px;
	left:7px;
	width:988px;
	font-size:14px;
}
.main .subnav .subnav-left{
	width:300px;
	padding:5px 0px 0px 20px;
}
.main .subnav .subnav-left li{
	float:left;
	width:130px;
	background:url(/template/english/images/icon4.png) left center no-repeat;
	padding-left:15px;
	line-height:20px;
	white-space:nowrap;
}
.main .subnav .subnav-left li a{
	color:#e58100;
}
.main .subnav .subnav-right{
	position:absolute;
	top:5px;
	left:620px;
}
.main .subnav .subnav-right li{
	background:url(/template/english/images/icon2.png) left center no-repeat;
	line-height:30px;
	padding-left:20px;
}
.main .subnav .subnav-right li a{
	color:#FFF;
}


  
  </style>
<title>Login Page</title>
</head>
<body>
 	<div class="header">
		<div class="top">
	    	<div class="logo"><h1><a href="#" title="Time Machine"><img src="images/time-machine.gif" alt="Time Machine"/></a></h1></div>
	        <div class="link">
	   
	        </div>
	    </div>
   </div>
   <div class="main">
    	<div class="nav">  
	        <div id="tabs" style="width:1200px" class="nav-box">
	            <ul>
	            	 <li><a href="#tabs-1">HR Tools</a></li>
				   
	            </ul>    
	            <div id="tabs-1" style="height:200px">	            	
	            	<aside>
						<ul>
							<li>
								<a href="<%=FederatedLoginManager.getFederatedLoginUrl(request.getParameter("returnUrl"))%>"><%=FederatedConfiguration.getInstance().getStsFriendlyName()%></a>		  
							</li>
							<li>
								<a href="#">Pay Stub</a>		  
							</li>
							<li>
								<a href="#">Benefits</a>		  
							</li>
							
						</ul>
					</aside>
					
	            </div>
	        </div>
		</div>
	</div>
  
</body>
</html>

