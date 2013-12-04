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

import uk.co.yunsoft.cssa.man.exception.CSSASystemException;
import uk.co.yunsoft.cssa.man.object.Page;

public class DBClient {

	private Connection dbConnection = null;

	private Statement stat = null;

	private ResultSet rs = null;

	public DBClient() throws CSSASystemException {

		DataSource ds = DBConnection.getInstance().getDataSource();

		try {
			dbConnection = ds.getConnection();
		} catch (SQLException e) {

			e.printStackTrace();

			throw new CSSASystemException("DB Connection");
		}

	}

	public List queryForList(Class object, String sql, Page pageInfo) {
		List result = new ArrayList();

		Field[] fields = object.getDeclaredFields();
		
		//StringBuilder condition = new StringBuilder();
		
		if(pageInfo != null){
			int start = (pageInfo.getCurrent()-1)*pageInfo.getLimit();
			int end = start+pageInfo.getLimit();
			sql += " limit "+start+","+end;

		}
			
		try {

			stat = dbConnection.createStatement();
			System.out.println("SQL"+sql);
			rs = stat.executeQuery(sql);

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

	public Object queryForObject(Class object, String sql) {
		Field[] fields = object.getDeclaredFields();

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

			rs = stat.executeQuery(sql);

			//System.out.println("sql = " + sql.getSQL());

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

	public int insertObject(Object objectInstance, String tableName) {
		Class object = objectInstance.getClass();
		Field[] fields = object.getFields();

		StringBuilder sqlBuilder = new StringBuilder();

		sqlBuilder.append("insert into ").append(tableName).append(" (");

		for (Field f : fields) {
			try {
				// if(f.get(object)!=null)
				sqlBuilder.append(f.getName()).append(",");
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			// } catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			// e.printStackTrace();
			// }

		}
		sqlBuilder.deleteCharAt(sqlBuilder.lastIndexOf(","));
		sqlBuilder.append(") values (");

		for (int i = 0; i < fields.length; i++) {
			Field f = fields[i];
			// if(f.get(object)!=null){
			String type = f.getType().getName();

			if (type.equals("java.lang.String")) {

				try {
					Object value = f.get(objectInstance);
					sqlBuilder.append("'" + value + "',");
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			} else {
				try {
					sqlBuilder.append(f.get(objectInstance));
				} catch (IllegalArgumentException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
			}

			// sqlBuilder.append("?,");

		}
		sqlBuilder.deleteCharAt(sqlBuilder.lastIndexOf(",")).append(")");
		System.out.println(sqlBuilder.toString());
		try {
			Statement ps = dbConnection.createStatement();

			int result = ps.executeUpdate(sqlBuilder.toString());

			return result;

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			return -1;
		}

	}

	public int updateObject(Class object, String condition, String tableName) {
		Field[] fields = object.getFields();

		StringBuilder sqlBuilder = new StringBuilder();

		sqlBuilder.append("update ").append(tableName).append(" set");

		for (Field f : fields) {
			sqlBuilder.append(f.getName()).append("=?,");

		}
		sqlBuilder.deleteCharAt(sqlBuilder.lastIndexOf(","));
		sqlBuilder.append(" " + condition);

		try {
			PreparedStatement ps = dbConnection.prepareStatement(sqlBuilder
					.toString());
			for (int i = 0; i < fields.length; i++) {
				Field f = fields[i];
				String type = f.getType().getName();
				if (type.equals("java.lang.String")) {
					ps.setString(i, (String) f.get(object));
				} else if (type.equals("int")) {
					ps.setInt(i, f.getInt(object));
				}
			}

			int result = ps.executeUpdate();

			return result;

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			return -1;
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			return -1;
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

			return -1;
		}

	}
	
	
	public int countObjects(String tableName){
		
		int count = 0;
		
		try {
			stat = dbConnection.createStatement();
			
			rs = stat.executeQuery("select count(*) num from "+tableName);
			
			while(rs.next()){
				count = rs.getInt("num");
			}
		} catch (SQLException e) {
			
			e.printStackTrace();
			return -1;
		}
		
		return count;
		
	}

	public void close() throws SQLException {
		if (dbConnection != null)
			dbConnection.close();
	}
}
