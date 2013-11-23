package uk.co.yunsoft.cssa.man.db;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class DBConnection {

	private static DBConnection instance;

	private Context initCtx;

	private DataSource ds;

	private DBConnection() {
		try {
			initCtx = new InitialContext();
		} catch (NamingException e) {
			e.printStackTrace();
		}

		try {

			Context envCtx = (Context) initCtx.lookup("java:comp/env");
			ds = (DataSource) envCtx.lookup("jdbc/CssaManDB");

		} catch (NamingException e) {
			e.printStackTrace();
		}

	}

	public static DBConnection getInstance() {
		if (instance == null) {
			instance = new DBConnection();
		}
		return instance;
	}

	public DataSource getDataSource() {

		return ds;
	}
}
