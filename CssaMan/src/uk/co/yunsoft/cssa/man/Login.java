package uk.co.yunsoft.cssa.man;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import uk.co.yunsoft.cssa.man.vo.LoginJSObject;
import uk.co.yunsoft.cssa.service.UserService;

@Path("/login")
public class Login {

	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public LoginJSObject login(LoginJSObject login) {

		UserService us = new UserService();

		String uid = us.login(login.username, login.password);

		if (uid == null) {
			login.success = false;
		} else {
			login.success = true;
			login.uid = uid;
		}
		return login;

	}
}
