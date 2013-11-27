package uk.co.yunsoft.cssa.man.vo;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement
public class StatusObject {

	public boolean success;

	@XmlTransient
	public String uid;
	
	public StatusObject() {
		// TODO Auto-generated constructor stub
	}

	public StatusObject(boolean success) {
		this.success = success;
	}
}
