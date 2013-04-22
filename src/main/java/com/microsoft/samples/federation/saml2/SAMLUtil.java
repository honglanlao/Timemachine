/**
 * 
 */
package com.microsoft.samples.federation.saml2;

import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.security.KeyException;
import java.security.cert.CertificateException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.opensaml.Configuration;
import org.opensaml.saml2.core.Response;
import org.opensaml.xml.ConfigurationException;
import org.opensaml.xml.io.Unmarshaller;
import org.opensaml.xml.io.UnmarshallingException;
import org.opensaml.xml.security.SecurityException;
import org.opensaml.xml.validation.ValidationException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * @author Azure Active Directory Contributor
 * 
 */
public class SAMLUtil {

	public static String getRedirectUrl(String samlTokenStr){

		 DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	        DocumentBuilder builder;
			try {
				builder = factory.newDocumentBuilder();
				 InputSource is = new InputSource(new StringReader(samlTokenStr));
			        Document doc = builder.parse(is);
			        
		            NodeList list = doc.getElementsByTagName("samlp:Response");
		            Element node = (Element)list.item(0);
		            String redirectUrl = (String) node.getAttribute("Destination");
		            System.out.println("res ->" + redirectUrl);
		            return redirectUrl;
			} catch (ParserConfigurationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SAXException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
	}
	
	
}
