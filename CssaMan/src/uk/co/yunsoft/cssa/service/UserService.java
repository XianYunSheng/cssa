package uk.co.yunsoft.cssa.service;

import java.sql.SQLException;
import java.util.UUID;

import uk.co.yunsoft.cssa.man.db.DBClient;
import uk.co.yunsoft.cssa.man.exception.CSSASystemException;
import uk.co.yunsoft.cssa.man.object.UserInfo;

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

			int result = dbClient.insertObject(user.getClass(), "tsk_users");

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
		}

	}
}
