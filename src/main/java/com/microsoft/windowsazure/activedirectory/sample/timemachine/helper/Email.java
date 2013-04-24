package com.microsoft.windowsazure.activedirectory.sample.timemachine.helper;
// File Name SendEmail.java
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;

import com.microsoft.windowsazure.activedirectory.sample.timemachine.controllers.UserServlet;

public class Email {

	  // Recipient's email ID needs to be mentioned.
	  private String to = "lao.honglan@gmail.com";
	
	  // Sender's email ID needs to be mentioned
	  private String from = "TimeMachine@timecardsample.ccsctp.net";
	
	  // Assuming you are sending email from localhost
	  private String host = "smtp.gmail.com";
	
	  // Get system properties
	  private Properties props = System.getProperties();
	  
	  private static Logger logger  = Logger.getLogger(Email.class);

	  // Setup mail server
	  public Email(){
		  props.put("mail.smtp.host", "smtp.gmail.com");
		  props.put("mail.smtp.socketFactory.port", "465");
		  props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		  props.put("mail.smtp.auth", "true");
		  props.put("mail.smtp.port", "465");
		  
		  /*
		   * below 2 lines are for hotmail account
		   */
	//	  props.put("mail.smtp.starttls.enable", "true");
	//	  props.put("mail.smtp.auth", "true");
		  
	  }
	
     
      // Get the default Session object.
      public void sendEmail(String to){
    	  Session session = Session.getDefaultInstance(props,
		  			new javax.mail.Authenticator() {
		  				protected PasswordAuthentication getPasswordAuthentication() {
		  					return new PasswordAuthentication("lao.honglan@gmail.com","022054604");
		  				}
		  			});
    	  try{
    	      // Create a default MimeMessage object.
    		  MimeMessage message = new MimeMessage(session);

    		  // Set From: header field of the header.
    		  message.setFrom(new InternetAddress(from));

    		  // Set To: header field of the header.
    		  message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

    		  // Set Subject: header field
    		  message.setSubject("Time Off Request");

    		  // Now set the actual message
    		  message.setText("To approve or reject the request, please go to <a href='https://localhost:8443/sample/main'>Time Machine</a>", "utf-8", "html");

    		  // Send message
    		  Transport.send(message);
    		  logger.info("Sent message successfully....");
	      }catch (MessagingException mex) {
	         mex.printStackTrace();
	      }
      }
      
      
      public static void main(String[] args){
    	  new Email().sendEmail("brentn@timecardsample.ccsctp.net");
      }
}