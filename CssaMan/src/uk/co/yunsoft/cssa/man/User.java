package uk.co.yunsoft.cssa.man;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import uk.co.yunsoft.cssa.man.object.StatusObject;
import uk.co.yunsoft.cssa.man.object.UserInfo;

@Path("/user")
public class User {
//	String id;
//
//	public User(String id) {
//		this.id = id;
//	}

	@GET
	@Produces("application/json")
	public List<UserInfo> getUsers() {
		
			UserInfo u1 = new UserInfo("test1","xr");
			UserInfo u2 = new UserInfo("test","rr");
			List<UserInfo> users = new ArrayList<UserInfo>();
			users.add(u1);
			users.add(u2);
			return users;
		
	}

	// @PUT
	// @Produces("application/json")
	// public UserInfo addUser(){
	//
	// }

	@Path("{user}")
	@GET
	@Produces("application/json")
	public UserInfo getUserById(@PathParam("user") String uid) {
		return new UserInfo("fsdfds",uid);
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/json")
	public StatusObject addUser(UserInfo user) {
		
		user.uid = UUID.randomUUID().toString();
		
		System.out.println("username = "+ user.password);
		
		return new StatusObject(true);
	}
	
	@Path("{user}")
	@DELETE
	@Produces("application/json")
	public StatusObject deleteUser(@PathParam("user") String uid){
		System.out.println("uid = "+uid);
		return new StatusObject(true);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces("application/json")
	public StatusObject getUserInfomation(UserInfo user){
		return new StatusObject(false);
	}
}
