package uk.co.yunsoft.cssa.man;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.StatusObject;
import uk.co.yunsoft.cssa.man.object.TaskInfo;

@Path("/task")
public class Task {

	@PUT
	@Consumes("application/json")
	@Produces("application/json")
	public StatusObject addTask(TaskInfo task){
		return new StatusObject(true);
	}
	
//	@GET
//	@Produces("application/json")
//	public List<TaskInfo> getTasks(){
//		
//	}
//	
//	@Path("{taskId}")
//	public TaskInfo getTask(@PathParam("taskId") String taskId){
//		
//	}
}
