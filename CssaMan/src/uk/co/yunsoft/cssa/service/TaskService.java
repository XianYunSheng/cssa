package uk.co.yunsoft.cssa.service;

import java.sql.SQLException;

import uk.co.yunsoft.cssa.man.db.DBClient;
import uk.co.yunsoft.cssa.man.exception.CSSABusinessException;
import uk.co.yunsoft.cssa.man.object.TaskInfo;

public class TaskService {

	private DBClient dbClient;
	
	public String addTask(TaskInfo task) throws CSSABusinessException{
		try {
			dbClient = new DBClient();
			
			dbClient.insertObject(task.getClass(), "tsk_info");
			
			return null;
		} catch (CSSABusinessException e) {
			e.printStackTrace();
			return null;
		}
		
		
	}
}
