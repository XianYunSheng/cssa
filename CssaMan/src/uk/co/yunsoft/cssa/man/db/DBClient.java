package uk.co.yunsoft.cssa.man.db;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

public class DBClient {

	private Connection dbConnection = null;

	private Statement stat = null;

	private ResultSet rs = null;

	public DBClient() throws SQLException {

		DataSource ds = DBConnection.getInstance().getDataSource();

		dbConnection = ds.getConnection();

	}

	public List queryForList(Class object, String tableName) {
		List result = new ArrayList();

		Field[] fields = object.getFields();

		try {

			stat = dbConnection.createStatement();

			rs = stat.executeQuery("select * from " + tableName);

			while (rs.next()) {
				try {
					Object newObject = object.newInstance();
					for (Field f : fields) {
						f.set(newObject, rs.getObject(f.getName()));
					}
					result.add(newObject);

				} catch (InstantiationException e) {
					e.printStackTrace();
					break;
				} catch (IllegalAccessException e) {
					e.printStackTrace();
					break;
				}

			}

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return result;
	}

	public Object queryForObject(Class object, String tableName,
			String condition) {
		Field[] fields = object.getFields();

		Object newObject = null;

		try {
			newObject = object.newInstance();

		} catch (InstantiationException e) {
			e.printStackTrace();
			
			return null;
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		try {

			stat = dbConnection.createStatement();

			rs = stat.executeQuery("select * from " + tableName + condition);

			System.out.println("sql = " + "select * from " + tableName
					+ condition);

			while (rs.next()) {
				try {
					for (Field f : fields) {
						f.set(newObject, rs.getObject(f.getName()));
					}

				} catch (IllegalAccessException e) {
					e.printStackTrace();
					break;
				}

			}

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
		return newObject;

	}
	
	public int insertObject(Class object, String tableName){
		Field[] fields = object.getFields();
		
		StringBuilder sqlBuilder = new StringBuilder();
		
		sqlBuilder.append("insert into ").append(tableName).append(" (");
		
		for(Field f: fields){
			sqlBuilder.append(f.getName()).append(",");
			
		}
		sqlBuilder.deleteCharAt(sqlBuilder.lastIndexOf(","));
		sqlBuilder.append(") values (");
		
		for(Field f: fields){
			sqlBuilder.append("?,");
			
		}
		sqlBuilder.deleteCharAt(sqlBuilder.lastIndexOf(",")).append(")");
		
		try {
			PreparedStatement ps = dbConnection.prepareStatement(sqlBuilder.toString());
			for(int i=0;i<fields.length;i++){
				Field f = fields[i];
				//if(f. instanceof String)
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return 0;
	}

	public void close() throws SQLException {
		if (dbConnection != null)
			dbConnection.close();
	}
}
