
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.regex.*;

import com.microsoft.samples.federation.saml2.FederatedLoginManager;
import com.microsoft.samples.federation.saml2.URLUTF8Encoder;

public class FederationFilter implements Filter {
	private String loginPage;
	private String allowedRegex;

	public void init(FilterConfig config) throws ServletException {
		this.loginPage = config.getInitParameter("login-page-url");
		this.allowedRegex = config.getInitParameter("allowed-regex");
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		if (request instanceof HttpServletRequest) {
			HttpServletRequest httpRequest = (HttpServletRequest) request;
			System.out.println("is FederationFilter, this login page ->" + loginPage);
			System.out.println("in FederationFilter doFilter request url->" + httpRequest.getRequestURL().toString());

		//	System.out.println("in FederationFilter doFilter request uri->" + httpRequest.getRequestURI().toString());

			if (!httpRequest.getRequestURL().toString().contains(this.loginPage)) {
				FederatedLoginManager loginManager = FederatedLoginManager.fromRequest(httpRequest);
				boolean allowedUrl = Pattern.compile(this.allowedRegex).matcher(httpRequest.getRequestURL().toString()).find();
				System.out.println("allowedUrl " +  this.allowedRegex + " ->" + allowedUrl);
				System.out.println("isAuthenticated ->" + loginManager.isAuthenticated());
				
				if (!allowedUrl && ! loginManager.isAuthenticated()) {				
					HttpServletResponse httpResponse = (HttpServletResponse) response;
					String encodedReturnUrl = URLUTF8Encoder.encode(httpRequest.getRequestURL().toString());
					httpResponse.setHeader("Location", this.loginPage + "?returnUrl=" + encodedReturnUrl);
					System.out.println("in FederationFilter doFilter returnUrl ->" + encodedReturnUrl);
					httpResponse.setStatus(302);
					return;
				}
			}
		}

		chain.doFilter(request, response);
	}

	public void destroy() {
	}
}

