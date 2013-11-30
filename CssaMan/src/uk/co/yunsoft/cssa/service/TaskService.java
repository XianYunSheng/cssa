package uk.co.yunsoft.cssa.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import uk.co.yunsoft.cssa.man.db.DBClient;
import uk.co.yunsoft.cssa.man.exception.CSSABusinessException;
import uk.co.yunsoft.cssa.man.object.TaskInfo;
import uk.co.yunsoft.cssa.man.vo.TaskJSObject;

public class TaskService {

	private DBClient dbClient;

	public String addTask(TaskInfo task) throws CSSABusinessException {
		try {
			dbClient = new DBClient();

			String tid = UUID.randomUUID().toString();

			task.setTaskId(tid);
			int result = dbClient.insertObject(task, "tsk_taskinfo");
			if (result != -1)
				return tid;
			else
				return null;
		} catch (CSSABusinessException e) {
			e.printStackTrace();
			return null;
		}

	}

	public List<TaskJSObject> getTaskList() {
		dbClient = new DBClient();
		List<TaskJSObject> taskJsons = null;

		List<TaskInfo> tasks = dbClient
				.queryForList(TaskInfo.class, "tsk_taskinfo");

		if (tasks != null) {
			taskJsons = new ArrayList<TaskJSObject>();
			for (TaskInfo task : tasks) {
				TaskJSObject taskJson = new TaskJSObject();

				taskJson.id = task.getTaskId();

				taskJson.taskTitle = task.getTitle();

				taskJson.content = task.getContent();

				taskJson.dueDate = task.getDueDate();

				taskJson.pubDate = task.getPubDate();

				taskJson.taskTypeId = task.getTaskTypeId();

				taskJsons.add(taskJson);
			}
		}
		return taskJsons;
	}

	public TaskInfo getTaskDetail(String taskId) {
		dbClient = new DBClient();

		TaskInfo task = (TaskInfo) dbClient.queryForObject(TaskInfo.class,
				"tsk_taskinfo", " where taskId='" + taskId + "'");

		return task;

	}
}
