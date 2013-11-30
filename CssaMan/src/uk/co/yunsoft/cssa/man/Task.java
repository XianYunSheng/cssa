package uk.co.yunsoft.cssa.man;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.TaskInfo;
import uk.co.yunsoft.cssa.man.vo.StatusObject;
import uk.co.yunsoft.cssa.man.vo.TaskJSObject;
import uk.co.yunsoft.cssa.man.vo.TaskOperationJSObject;
import uk.co.yunsoft.cssa.service.TaskService;

@Path("/task")
public class Task {

	TaskService taskService = new TaskService();
	
	@PUT
	@Consumes("application/json")
	@Produces("application/json")
	public TaskOperationJSObject addTask(TaskJSObject task){
		TaskInfo taskInfo = new TaskInfo();
		
		taskInfo.setTitle(task.taskTitle);
		
		taskInfo.setContent(task.content);
		
		taskInfo.setDueDate(task.dueDate);
		
		taskInfo.setPubDate(task.pubDate);
		
		taskInfo.setTaskTypeId(task.taskTypeId);
		
		String taskId = taskService.addTask(taskInfo);
		
		TaskOperationJSObject tojson = new TaskOperationJSObject();
		if(taskId!=null){
			tojson.success = true;
			tojson.taskId = taskId;
		}else{
			tojson.success = false;
		}
			
		
		return tojson;
	}
	
	@GET
	@Produces("application/json")
	public List<TaskJSObject> getTasks(){
		List<TaskJSObject> results = taskService.getTaskList();
		return results;
	}
	
	@Path("{taskId}")
	@GET
	@Produces("application/json")
	public TaskJSObject getTask(@PathParam("taskId") String taskId){
		TaskInfo task = taskService.getTaskDetail(taskId);
		
		TaskJSObject taskDetail = new TaskJSObject();
		
		if(task!=null){
			taskDetail.content = task.getContent();
			
			taskDetail.dueDate = task.getDueDate();
			
			taskDetail.pubDate = task.getPubDate();
			
			taskDetail.taskTitle = task.getTitle();
			
			taskDetail.taskTypeId = task.getTaskTypeId();
		}
		
		return taskDetail;
	}
}
