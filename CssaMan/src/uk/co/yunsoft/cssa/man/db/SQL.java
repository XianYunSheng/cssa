package uk.co.yunsoft.cssa.man.db;

public class SQL {

	private  String sqlBase;

	private  StringBuilder condition;

	public final static int SQL_SELECT = 1;

	public final static int SQL_INSERT = 2;

	public final static int SQL_UPDATE = 3;

	public final static int SQL_DELETE = 4;
	
	public final static int SQL_COUNT = 5;

	public static class Builder {

		private  String sqlBase;

		private  StringBuilder condition;

		public Builder(int sqlType,String... tableName) {
			switch (sqlType) {
			case SQL_SELECT:
				this.sqlBase = "select * from ";
				for(int i = 0; i < tableName.length; i++){
					this.sqlBase += tableName[i]+ (i==tableName.length-1?"":",");
				}
				break;
			case SQL_INSERT:
				this.sqlBase = "insert into " + tableName[0]+"()";
				break;
			case SQL_UPDATE:
				this.sqlBase = "update " + tableName[0] +" set ";
				break;
			case SQL_DELETE:
				this.sqlBase = "delete from " + tableName[0];
				break;
			default:
				this.sqlBase = "";
				break;
			}
			
			
			condition = new StringBuilder();

		}
		
		public Builder insertValue(Object... values){
			condition.append("values (");
			for(Object object : values){
				if (object instanceof String)
					condition.append("'" + object + "'");
				else 
					condition.append(object);
			}
			
			return this;
		}

		public Builder isEqualTo(String fieldName, Object value) {
			condition.append(fieldName + " = ");
			if (value instanceof String)
				condition.append("'" + value + "'");
			else 
				condition.append(value);
			return this;

		}

		public Builder isGreaterThan(String fieldName, Object value) {
			condition.append(fieldName + " > ");
			if (value instanceof String)
				condition.append("'" + value + "'");
			else 
				condition.append(value);
			return this;
		}

		public Builder isLessThan(String fieldName, Object value) {
			condition.append(fieldName + " < ");
			if (value instanceof String)
				condition.append("'" + value + "'");
			else 
				condition.append(value);
			return this;
		}

		public Builder notEqualTo(String fieldName, Object value) {
			condition.append(fieldName + " <> ");
			if (value instanceof String)
				condition.append("'" + value + "'");
			else 
				condition.append(value);
			return this;
		}

		public Builder notGreaterThan(String fieldName, Object value) {
			condition.append(fieldName + " <= ");
			if (value instanceof String)
				condition.append("'" + value + "'");
			else 
				condition.append(value);
			return this;
		}

		public Builder notLessThan(String fieldName, Object value) {
			condition.append(fieldName + " >= ");
			if (value instanceof String)
				condition.append("'" + value + "'");
			else 
				condition.append(value);
			return this;
		}

		public Builder leftBracket() {
			condition.append("(");
			return this;
		}

		public Builder rightBracket() {
			condition.append(")");
			return this;
		}

		public Builder and() {
			condition.append("AND");
			return this;
		}

		public Builder or() {
			condition.append("OR");
			return this;
		}

		public SQL build() {
			return new SQL(this);
		}
	}

	private SQL(Builder builder) {
		this.sqlBase = builder.sqlBase;
		this.condition = builder.condition;
	}

	public String getSQL() {
		return sqlBase + condition.toString();
	}
}
