package uk.co.yunsoft.cssa.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import uk.co.yunsoft.cssa.man.db.DBClient;
import uk.co.yunsoft.cssa.man.exception.CSSASystemException;
import uk.co.yunsoft.cssa.man.object.UserInfo;
import uk.co.yunsoft.cssa.man.vo.UserJSObject;

public class UserService {

	private DBClient dbClient;

	public String login(String username, String password) {
		UserInfo user;
		try {
			dbClient = new DBClient();

			user = (UserInfo) dbClient.queryForObject(UserInfo.class,
					"tsk_users", " where username='" + username + "'"
							+ " and password='" + password + "'");

			dbClient.close();

		} catch (SQLException e) {
			return null;
		}
		return user.getUid();
	}

	public boolean usernameValidate(String username) {
		try {
			dbClient = new DBClient();

			UserInfo user = (UserInfo) dbClient.queryForObject(UserInfo.class,
					"tsk_users", " where username='" + username + "'");

			dbClient.close();

			if (user == null)
				return true;
			else
				return false;

		} catch (SQLException e) {
			return false;
		}
	}

	public String addUser(UserInfo user) {
		user.setUid(UUID.randomUUID().toString());
		try {
			dbClient = new DBClient();

			int result = dbClient.insertObject(user, "tsk_users");

			dbClient.close();

			if (result != -1)
				return user.getUid();

		} catch (SQLException e) {
			return null;
		}
		return null;

	}

	public UserInfo getUser(String uid) {
		try {
			dbClient = new DBClient();

			UserInfo user = (UserInfo) dbClient.queryForObject(UserInfo.class,
					"tsk_users", " where uid='" + uid + "'");

			return user;

		} catch (CSSASystemException e) {
			return null;
		} finally {
			try {
				dbClient.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}

	public List<UserJSObject> getUsers(int total, int limit, int pageNo) {

		List<UserJSObject> userList = null;

		try {
			dbClient = new DBClient();

			List<UserInfo> users = dbClient.queryForList(UserInfo.class,
					"tsk_users");

			if (users != null) {
				userList = new ArrayList<UserJSObject>();
				for (UserInfo u : users) {
					UserJSObject userJson = new UserJSObject();
					userJson.email = u.getEmail();
					userJson.id = u.getUid();
					userJson.username = u.getUsername();

					userList.add(userJson);
				}
			}

		} catch (CSSASystemException e) {
			return null;
		}

		return userList;

	}
}
