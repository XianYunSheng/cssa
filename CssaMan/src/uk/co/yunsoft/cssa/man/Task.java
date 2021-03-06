package uk.co.yunsoft.cssa.man;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import uk.co.yunsoft.cssa.man.object.Page;
import uk.co.yunsoft.cssa.man.object.TaskInfo;
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
			tojson.id = taskId;
		}else{
			tojson.success = false;
		}
			
		
		return tojson;
	}
	
	@GET
	@Produces("application/json")
	public Response getTasks(@HeaderParam("Range") String range){
		
		Page page = null;
		
		if(range != null){
			page = new Page();
			int start = Integer.parseInt(range.substring(range.indexOf("=")+1, range.indexOf("-")));
			int end = Integer.parseInt(range.substring(range.indexOf("-")+1));
			page.setLimit(end-start);
			page.setCurrent(start+1);
			page.setTotal(end);
			
		}
		List<TaskJSObject> results = taskService.getTaskList(page);
		
		
		
		return Response.ok(results).header("Content-Range", range+"/"+page.getTotal()).build();
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
