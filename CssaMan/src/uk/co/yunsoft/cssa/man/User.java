package uk.co.yunsoft.cssa.man;

import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import uk.co.yunsoft.cssa.man.object.Page;
import uk.co.yunsoft.cssa.man.object.UserInfo;
import uk.co.yunsoft.cssa.man.vo.LoginJSObject;
import uk.co.yunsoft.cssa.man.vo.StatusObject;
import uk.co.yunsoft.cssa.man.vo.UserJSObject;
import uk.co.yunsoft.cssa.service.UserService;

@Path("/user")
public class User {

	UserService userService;

	@GET
	@Produces("application/json")
	public List<UserJSObject> getUsers(@HeaderParam("Range") String range,
			@Context HttpServletResponse response) {

		Page page = null;

		if (range != null) {
			page = new Page();
			int start = Integer.parseInt(range.substring(
					range.indexOf("=") + 1, range.indexOf("-")));
			int end = Integer.parseInt(range.substring(range.indexOf("-") + 1));
			page.setLimit(end - start);
			page.setCurrent(start + 1);
			page.setTotal(end);

		}

		userService = new UserService();

		List<UserJSObject> users = userService.getUsers(page);
		
		response.setHeader("Content-Range", range+"/"+page.getTotal());

		return users;

	}

	@Path("{user}")
	@GET
	@Produces("application/json")
	public UserJSObject getUserById(@PathParam("user") String uid) {
		userService = new UserService();

		UserInfo user = userService.getUser(uid);

		UserJSObject userJson = new UserJSObject();

		if (user != null) {
			userJson.id = user.getUid();
			userJson.email = user.getEmail();
			userJson.username = user.getUsername();
			return userJson;
		} else
			return new UserJSObject();
	}

	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/json")
	public LoginJSObject addUser(UserJSObject user) {

		userService = new UserService();

		UserInfo userToAdd = new UserInfo();

		userToAdd.setEmail(user.email);

		userToAdd.setPassword(user.password);

		userToAdd.setUsername(user.username);

		String uid = userService.addUser(userToAdd);

		LoginJSObject login = new LoginJSObject();

		if (uid != null) {
			login.id = uid;
			login.success = true;
		}

		return login;
	}

	@Path("{user}")
	@DELETE
	@Produces("application/json")
	public StatusObject deleteUser(@PathParam("user") String uid) {
		System.out.println("uid = " + uid);
		return new StatusObject(true);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/json")
	public StatusObject getUserInfomation(UserInfo user) {
		return new StatusObject(false);
	}
}
