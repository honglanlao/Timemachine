
import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;

import com.microsoft.samples.federation.saml2.FederatedAuthenticationListener;
import com.microsoft.samples.federation.saml2.FederatedLoginManager;
import com.microsoft.samples.federation.saml2.FederatedPrincipal;
import com.microsoft.samples.federation.saml2.FederationException;

public class FederationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
		
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		Enumeration<String> en =  request.getParameterNames();
		
		while(en.hasMoreElements()) {
			String key = en.nextElement();
		    System.out.println(key + " ->" + request.getParameter(key));
		}
		
		 
		String token = "";
		if(request.getParameter("SAMLResponse") == null){
			token = request.getParameter("wresult").toString();
		}else{
			token = request.getParameter("SAMLResponse").toString();
			// base64 decode token
			token =  new String(Base64.decodeBase64(token));
		}
		System.out.println("token returned ->" + token); 
		if (token == null) {
			response.sendError(400, "You were supposed to send a wresult parameter with a token");
		}
		
		FederatedLoginManager loginManager = FederatedLoginManager.fromRequest(request, new SampleAuthenticationListener());

		try {
	//		System.out.println("token ->" + token);
			loginManager.authenticate(token, response);
		} catch (FederationException e) {
			response.sendError(500, "Oops! and error occurred.");
		}
		
		System.out.println("in FederationServlet do Post, auth success, now check next step");

	}
	
	private class SampleAuthenticationListener implements FederatedAuthenticationListener {
		@Override
		public void OnAuthenticationSucceed(FederatedPrincipal principal) {
			// ***
			// do whatever you want with the principal object that contains the token's claims
			// ***
		}		
	}
}

