<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="Site.css" />
<title>Error</title>
</head>
<body>

<body> 
    <div class="page"> 
       <div id="header"> 
           <h1>Windows Azure Active Directory Graph Sample(Java)</h1> 
            <div id="menucontainer"> 
                <ul id="menu"> 
                      <li><a href="/JavaSampleApp">Home</a></li> 
                  <li><a href="/JavaSampleApp/Home?op=about">About</a></li>   
                </ul> 
            </div> 
        </div> 
        <div id="main"> 
			<% String mssg = (String)request.getSession().getAttribute("MSG"); %>
			
			<div class="main">
				<div><h2> <%=mssg%></h2></div>	
				
					
			</div>
 		 	<div id="footer"></div> 
    	</div> 
    </div>
</body> 
</html>