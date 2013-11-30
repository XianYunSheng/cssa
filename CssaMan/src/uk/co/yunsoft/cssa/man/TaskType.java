package uk.co.yunsoft.cssa.man;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.TaskTypeInfo;
import uk.co.yunsoft.cssa.man.vo.TaskTypeJSObject;
import uk.co.yunsoft.cssa.man.vo.TaskTypeOperationJSObject;
import uk.co.yunsoft.cssa.service.TaskTypeService;

@Path("/tasktype")
public class TaskType {

	TaskTypeService taskTypeService = new TaskTypeService();
	
	@PUT
	@Consumes("application/json")
	@Produces("application/json")
	public TaskTypeOperationJSObject addTaskType(TaskTypeJSObject taskType){
		
		TaskTypeInfo taskTypeInfo = new TaskTypeInfo();
		
		
		int result = taskTypeService.addTaskType(taskTypeInfo);
		
		TaskTypeOperationJSObject reply = new TaskTypeOperationJSObject();
		
		if(result == -1){
			reply.success = false;
		}else{
			reply.success = true;
		}
		
		return reply;
	}
	
	@Path("{typeId}")
	@GET
	@Produces("application/json")
	public TaskTypeJSObject getTaskType(@PathParam("typeId") String typeId){
		TaskTypeJSObject taskType = new TaskTypeJSObject();
		
		String info = taskTypeService.getTaskTypeNameById(typeId);
		
		if(info!=null){
			taskType.typeName = info;
		}
		
		return taskType;
	}
}
