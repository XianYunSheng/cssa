package uk.co.yunsoft.cssa.man;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.StatusObject;
import uk.co.yunsoft.cssa.man.object.UserInfo;
import uk.co.yunsoft.cssa.service.UserService;

@Path("/usernamevalidation")
public class UserNameValidation {

	UserService userService;
	
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public StatusObject validate(UserInfo user){
		
		userService = new UserService();
		
		if(userService.usernameValidate(user.username))
			return new StatusObject(true);
		else
			return new StatusObject(false);
		
	}
}
