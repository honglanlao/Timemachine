/**
 * 
 */
package com.microsoft.windowsazure.activedirectory.sample.timemachine.controllers;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author Azure Active Directory Contributor
 *
 */
public class AuthServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6937590576618247591L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		
			
		String action = request.getParameter("action");
		switch(action){
			case "logout":
				response.setContentType("text/html");
				response.setHeader("Cache-Control", "no-cache, no-store");
				response.setHeader("Pragma", "no-cache");
				HttpSession session= request.getSession();
		        session.invalidate();
		        Cookie[] cookies = request.getCookies();
		        if (cookies != null){
		            for (int i = 0; i < cookies.length; i++) {
		            	System.out.println("cookie name ->" + cookies[i].getName());
		            	System.out.println("cookie value ->" + cookies[i].getValue());
		            	System.out.println("cookie path ->" + cookies[i].getPath());
		            	System.out.println("cookie domain ->" + cookies[i].getDomain());

		                cookies[i].setValue("");
		                cookies[i].setPath("/");
		                cookies[i].setMaxAge(0);
		                response.addCookie(cookies[i]);
		            }
		        }
		//        response.sendRedirect("/sample/login.jsp?returnUrl=https://holao-desk1.redmond.corp.microsoft.com:8443/sample/");
		          response.sendRedirect("/sample/login.jsp?returnUrl=https://localhost:8443/sample/");

		 //       RequestDispatcher rd = request.getRequestDispatcher("/login.jsp?returnUrl=https://localhost:8443/sample/"); //The url where go after logout
		 //       rd.forward(request,response);
				return;
			
		}
		
	       
	  }

}
