package uk.co.yunsoft.cssa.man;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.object.UserInfo;
import uk.co.yunsoft.cssa.man.vo.LoginInfo;
import uk.co.yunsoft.cssa.man.vo.LoginJSObject;
import uk.co.yunsoft.cssa.service.UserService;

@Path("/login")
public class Login {

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public LoginJSObject login(LoginInfo login) {

		UserService us = new UserService();

		String uid = us.login(login.username, login.password);

		LoginJSObject loginResult = new LoginJSObject();
		
		if (uid == null) {
			loginResult.success = false;
		} else {
			loginResult.success = true;
			loginResult.uid = uid;
		}
		return loginResult;

	}
}
