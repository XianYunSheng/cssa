function ys_setGuiLabelAndTitle(){
	require(["dojo/i18n!js/nls/common.js", "dojo/dom", "dijit/registry"],
		function (common, dom, reg) {
				
			reg.byId("mgt_login_ok").set("label", common.btn_ok);
			reg.byId("mgt_login_reset").set("label", common.btn_reset);
			reg.byId("mgt_passwd_recallDlg_ok").set("label", common.btn_ok);
			reg.byId("mgt_passwd_recallDlg_cl").set("label", common.btn_cancel);
			reg.byId("master_article_typeDlg_cl").set("label", common.btn_cancel);
			
			
			reg.byId("mgt_loginDlg").set("title", common.login);
			reg.byId("mgt_passwd_recallDlg").set("title", common.passwd_recall);
			reg.byId("mgt_regDlg").set("title", common.reg_dlg_title);
			reg.byId("master_article_typeDlg").set("title", common.article_type);
			
		
			
			reg.byId("article_mgt_btn").set("label", common.article_mgt);
			reg.byId("calendar_mgt_btn").set("label", common.calendar_mgt);
			reg.byId("user_mgt_btn").set("label", common.user_mgt);
			reg.byId("master_mgt_btn").set("label", common.master_mgt);
			
			reg.byId("master_article_btn").set("label", common.article_mgt);
			reg.byId("master_article_type_btn").set("label", common.article_type);
			
			reg.byId("welcome_btn").set("label", common.welcome);
			reg.byId("pw_chg_btn").set("label", common.chg_pw);
			reg.byId("logout_btn").set("label", common.logout);
			
			reg.byId("mgt_regDlg_ok").set("label", common.btn_ok);
			reg.byId("mgt_regDlg_cl").set("label", common.btn_cancel);
			
			
			
			
			dom.byId("mgt_login_usr_lb").innerHTML = common.login_username;
	        dom.byId("mgt_login_pwd_lb").innerHTML = common.login_pwd;
	        dom.byId("mgt_login_error_lb").innerHTML = common.login_err;
	        dom.byId("mgt_password_forgot_lb").innerHTML = common.pw_forgot;  
	        dom.byId("mgt_registration_lb").innerHTML = common.registration;
	        dom.byId("mgt_password_forgot_text_lb").innerHTML = common.pw_forgot_tips; 
            dom.byId("mgt_password_usr_lb").innerHTML = common.login_username;  
            dom.byId("mgt_reg_username_format").innerHTML = common.username_format;  
            dom.byId("mgt_reg_pwd_format").innerHTML = common.pwd_format; 
            
            dom.byId("mgt_reg_varpw_lb").innerHTML = "<span class='text_red'>*</span>"+ common.pwd_repeat; 
            dom.byId("mgt_reg_passwd_lb").innerHTML = "<span class='text_red'>*</span>"+ common.login_pwd; 
            dom.byId("mgt_reg_email_lb").innerHTML = "<span class='text_red'>*</span>"+ common.email; 
            dom.byId("mgt_reg_username_lb").innerHTML = "<span class='text_red'>*</span>"+ common.login_username;  
//            dom.byId("mgt_password_email_lb").innerHTML = common.email;
//            dom.byId("mgt_password_reset_text").innerHTML = common.chg_pw_tips + "&nbsp;(" + common.password_format + ")";
//            dom.byId("mgt_old_password_lb").innerHTML = common.old_pw;
//            dom.byId("mgt_new_password_lb").innerHTML = common.new_pw;
//            dom.byId("mgt_new_password_2_lb").innerHTML = common.new_pw;
            
            reg.byId("calendar_mgt_calendar_tp").set("title", common.calendar);
            reg.byId("calendar_mgt_event_properties_tp").set("title", common.event_properties);
            
            dom.byId("calendar_mgt_summery_lb").innerHTML = common.summary;
            dom.byId("calendar_mgt_time_start_lb").innerHTML = common.start;
            dom.byId("calendar_mgt_time_end_lb").innerHTML = common.end;
            dom.byId("calendar_mgt_calendar_select_lb").innerHTML = common.calendar;
            dom.byId("calendar_mgt_calendar_team_checkbox_lb").innerHTML = common.team_calendar;
            dom.byId("calendar_mgt_calendar_public_checkbox_lb").innerHTML = common.public_calendar;
            dom.byId("calendar_mgt_all_day_checkbox_lb").innerHTML = common.all_day;
            
            reg.byId("calendar_mgt_event_update_btn").set("label", common.btn_update);
            reg.byId("calendar_mgt_event_delete_btn").set("label", common.btn_delete);
            
            reg.byId("article_mgt_gridToolbar_clean_btn").set("label", common.btn_clean);
            reg.byId("article_mgt_gridToolbar_insert_btn").set("label", common.btn_new);
            reg.byId("article_mgt_gridToolbar_change_btn").set("label", common.btn_update);
            reg.byId("article_mgt_gridToolbar_delete_btn").set("label", common.btn_delete);
            reg.byId("article_mgt_gridToolbar_refresh_btn").set("label", common.btn_refresh);
            
            
            reg.byId("mgt_userDlgGridToolbar_clean_btn").set("label", common.btn_clean);
            reg.byId("mgt_userDlgGridToolbar_insert_btn").set("label", common.btn_new);
            reg.byId("mgt_userDlgGridToolbar_change_btn").set("label", common.btn_update);
            reg.byId("mgt_userDlgGridToolbar_delete_btn").set("label", common.btn_delete);
            reg.byId("mgt_userDlgGridToolbar_refresh_btn").set("label", common.btn_refresh);
            
            
            reg.byId("master_article_typeDlgGridToolbar_clean_btn").set("label", common.btn_clean);
            reg.byId("master_article_typeDlgGridToolbar_insert_btn").set("label", common.btn_new);
            reg.byId("master_article_typeDlgGridToolbar_change_btn").set("label", common.btn_update);
            reg.byId("master_article_typeDlgGridToolbar_delete_btn").set("label", common.btn_delete);
            reg.byId("master_article_typeDlgGridToolbar_refresh_btn").set("label", common.btn_refresh);
            
            
        	reg.byId("mgt_userDlg").set("title", common.user_mgt);
			reg.byId("mgt_userDlg_cl").set("label", common.btn_cancel);
            dom.byId("mgt_user_username_lb").innerHTML = "<span class='text_red'>*</span>"+ common.login_username;
            dom.byId("mgt_user_dispname_lb").innerHTML = "<span class='text_red'>*</span>"+ common.name;
            dom.byId("mgt_user_email_lb").innerHTML = 	"<span class='text_red'>*</span>"+ common.email;
            dom.byId("mgt_user_roler_sel_lb").innerHTML = common.roler;

            dom.byId("article_refers_select_lb").innerHTML = common.refers;
            dom.byId("article_title_lb").innerHTML = common.title;
            dom.byId("article_time_lb").innerHTML = common.time;
            
            dom.byId("master_article_type_code_lb").innerHTML = "<span class='text_red'>*</span>"+ common.code;
            dom.byId("master_article_type_label_lb").innerHTML = "<span class='text_red'>*</span>"+ common.label;
		
	 });
	 
}