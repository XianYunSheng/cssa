package uk.co.yunsoft.cssa.service;

import uk.co.yunsoft.cssa.man.db.DBClient;
import uk.co.yunsoft.cssa.man.exception.CSSASystemException;

public class DBService {

	DBClient dbClient;

	public DBService() {
		try {
			dbClient = new DBClient();

		} catch (CSSASystemException e) {
			
		}
	}
}
