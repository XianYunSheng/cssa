package uk.co.yunsoft.cssa.man.vo;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class UserJSObject {

	public String id;
	
	public String username;
	
	public String password;
	
	public String email;
	
	public UserJSObject(){
		
	}
}
