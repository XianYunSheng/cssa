package uk.co.yunsoft.cssa.man.object;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class UserInfo {

	public String username;
	
	public String password;
	
	public String uid;
	
	public String email;
	
	public UserInfo(){
		
	}
	
	public UserInfo(String username, String password){
		this.username = username;
		
		this.password = password;
	}
	
}
