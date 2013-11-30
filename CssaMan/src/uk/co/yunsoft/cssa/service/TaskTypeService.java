package uk.co.yunsoft.cssa.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import uk.co.yunsoft.cssa.man.db.DBClient;
import uk.co.yunsoft.cssa.man.object.TaskTypeInfo;
import uk.co.yunsoft.cssa.man.vo.TaskTypeJSObject;

public class TaskTypeService {

	
	private DBClient dbClient;
	
	public int addTaskType(TaskTypeInfo taskType){
		
		dbClient = new DBClient();
		
		int result = dbClient.insertObject(taskType, "tsk_tasktype");
		
		try {
			dbClient.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return result;
	}
	
	
	public List<TaskTypeJSObject> getTaskTypes(){
		
		dbClient = new DBClient();
		
		List<TaskTypeJSObject> resultList = null;
		
		List<TaskTypeInfo> taskTypeList = dbClient.queryForList(TaskTypeInfo.class, "tsk_tasktype");
		
		if(taskTypeList != null){
			resultList = new ArrayList<TaskTypeJSObject>();
			for(TaskTypeInfo tskType:taskTypeList){
				TaskTypeJSObject tskTypeJson = new TaskTypeJSObject();
				tskTypeJson.typeName = tskType.getTypeName();
				tskTypeJson.id = tskType.getTypeId();
				resultList.add(tskTypeJson);
			}
		}
		
		return resultList;
	}
	
	public String getTaskTypeNameById(String taskTypeId){
		dbClient = new DBClient();
		
		TaskTypeInfo info = (TaskTypeInfo)dbClient.queryForObject(TaskTypeInfo.class, "tsk_tasktype", " where typeId="+taskTypeId);
		
		if(info!=null){
			return info.getTypeName();
		}else{
			return null;
		}
	}
}
