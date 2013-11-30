package uk.co.yunsoft.cssa.man.vo;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement
public class LoginJSObject {

	public boolean success = false;
	
	
	public String uid;
	
	public LoginJSObject(){
		
	}
	
}
