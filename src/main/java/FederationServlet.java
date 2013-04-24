
import java.io.IOException;
import java.util.Enumeration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;

import com.microsoft.samples.federation.saml2.FederatedAuthenticationListener;
import com.microsoft.samples.federation.saml2.FederatedLoginManager;
import com.microsoft.samples.federation.saml2.FederatedPrincipal;
import com.microsoft.samples.federation.saml2.FederationException;
import com.microsoft.samples.federation.saml2.SAMLConsumer;

public class FederationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static Logger logger  = Logger.getLogger(FederationServlet.class);
		
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		logger.info("request url ->" +  ((HttpServletRequest)request).getRequestURL().toString());
//		Enumeration<String> en =  request.getParameterNames();
//		
//		while(en.hasMoreElements()) {
//			String key = en.nextElement();
//		    logger.info(key + " ->" + request.getParameter(key));
//		}
		String token = "";
		token = request.getParameter("SAMLResponse");
		if (token == null) {
			response.sendError(400, "You were supposed to send a wresult parameter with a token");
		}else{
			token = token.toString();
		}
			// base64 decode token
		
		logger.info("before decoding 64 ->" + token); 
		if(token!=null){
			token =  new String(Base64.decodeBase64(token));
		}
		logger.info("token returned ->" + token); 
		FederatedLoginManager loginManager = FederatedLoginManager.fromRequest(request, new SampleAuthenticationListener());

		try {
			loginManager.authenticate(token, response);
		} catch (FederationException e) {
			response.sendError(500, "Oops! and error occurred.");
		}
		
		logger.info("auth success, next step");
		
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doPost(request, response);
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

