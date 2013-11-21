package uk.co.yunsoft.cssa.man.object;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class StatusObject {

	public boolean success;

	public StatusObject() {
		// TODO Auto-generated constructor stub
	}

	public StatusObject(boolean success) {
		this.success = success;
	}
}
