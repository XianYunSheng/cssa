package uk.co.yunsoft.cssa.man;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.StatusObject;
import uk.co.yunsoft.cssa.man.object.UserInfo;
import uk.co.yunsoft.cssa.service.UserService;

@Path("/login")
public class Login {

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public StatusObject login(UserInfo userinfo){
				
		UserService us = new UserService();
		
		String uid = us.login(userinfo.username, userinfo.password);
		
		StatusObject so = new StatusObject();
		
		
		
		if(uid==null)
			
		
		return  new StatusObject(false);
		
		else
			return new StatusObject(true);
	}
}
