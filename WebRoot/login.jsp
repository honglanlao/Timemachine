
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ page import="com.microsoft.samples.federation.wsfed.*"%>
<%@ page import="com.microsoft.samples.federation.saml2.*"%>

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

a{
	font-size:12px;
	color:#FFF;
	/* text-decoration:none; */
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
	left:0px;
	
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
	list-style-type: none;
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
						<!--  <li>
								<a href="<%=com.microsoft.samples.federation.wsfed.FederatedLoginManager.getFederatedLoginUrl(request.getParameter("returnUrl"))%>">
								<%="login " + com.microsoft.samples.federation.wsfed.FederatedConfiguration.getInstance().getStsFriendlyName() + " using wsfed" %></a>		  
							</li> -->	
							<li>
								<a href="<%=com.microsoft.samples.federation.saml2.FederatedLoginManager.getFederatedLoginUrl(request.getParameter("returnUrl"))%>">
								<%="login " + com.microsoft.samples.federation.saml2.FederatedConfiguration.getInstance().getStsFriendlyName() + " using saml2"%></a>		  
							</li>
							
						</ul>
					</aside>
					
	            </div>
	        </div>
		</div>
	</div>
  
</body>
</html>

