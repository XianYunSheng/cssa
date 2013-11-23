package uk.co.yunsoft.cssa.man;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.StatusObject;
import uk.co.yunsoft.cssa.man.object.UserInfo;

@Path("/usernamevalidation")
public class UserNameValidation {

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public StatusObject validate(UserInfo user){
		
		return new StatusObject(true);
	}
}
