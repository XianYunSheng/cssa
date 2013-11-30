package uk.co.yunsoft.cssa.man.vo;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class TaskJSObject {

	public TaskJSObject() {

	}

	public String taskId;

	public String taskTitle;

	public String content;

	public String taskTypeId;

	public long pubDate;

	public long dueDate;

}
