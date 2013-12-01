<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
    
    
<%

    String lang = request.getParameter("lang");

    if ("en".equals(lang)) {
        lang = "en-us";
    }else {
        lang = "zh-cn";
    }     //default language


    String app_name = request.getSession().getServletContext().getInitParameter("app_name");

    //get client ip
    String ip = request.getHeader("x-forwarded-for");

    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getHeader("Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getHeader("WL-Proxy-Client-IP");
    }
    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
        ip = request.getRemoteAddr();
    }

%>
 

<html>
<head>
<meta charset="utf-8">
<title>曼彻斯特学联管理系统 version 0.1©2013 YunSheng Co.,Ltd. All rights reserved.</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="default"/>
<meta name="format-detection" content="telephone=yes, email=yes"/>

<link rel="stylesheet" href="js/dojoBase/dijit/themes/claro/claro.css?version=0.1" media="screen">
<link rel="stylesheet" href="js/dojoBase/gridx/resources/claro/Gridx.css?version=0.1" media="screen">
<link rel="stylesheet" href="js/dojoBase/dojox/calendar/themes/claro/Calendar.css?version=0.1" media="screen">
<link rel="stylesheet" href="js/dojoBase/dojox/calendar/themes/claro/MonthColumnView.css?version=0.1" media="screen">

<link rel="stylesheet" href="js/dojoBase/dojox/form/resources/FileUploader.css?version=0.1" media="screen">
<link rel="stylesheet" href="js/dojoBase/dojox/editor/plugins/resources/css/LocalImage.css?version=0.1" media="screen">

<link rel="stylesheet" href="assets/css/gridx.css?version=0.1" media="screen">
<link rel="stylesheet" href="assets/css/calendar.css?version=0.1" media="screen">
 
<link rel="stylesheet" href="assets/css/gui.css?version=0.1" media="screen">

<script>
    var dojoConfig = {
        has:{
            "dojo-firebug":true,
            "dojo-debug-messages":true,
            "dojo-guarantee-console":true,
            "debugContainerId:":true
        },
        "baseUrl":"js/",
        "packages":[
            {
                "location":"dojoBase/dojo",
                "name":"dojo"
            },
            {
                "location":"dojoBase/dijit",
                "name":"dijit"
            },
            {
                "location":"dojoBase/dojox",
                "name":"dojox"
            },

            {
                "location":"dojoBase/gridx",
                "name":"gridx"
            } 
 

        ],

        map:{
            // Instead of having to type "dojo/domReady!", we just want "ready!" instead
            "*":{
                ready:"dojo/domReady"
            }
        },
        parseOnLoad:true,
        async:true,
        cacheBust:true,
        locale:'<%=lang%>'  //之后应该变更成可有参数动态
    };
 
    
    var SYS_LANG = '<%=lang%>';
    var SYS_PATH = '<%=app_name%>';
    
    //console.log("dojoConfig",dojoConfig);
</script>

<!-- <script type="text/javascript" src="js/dojoBase/dojo/dojo.js.uncompressed.js?version=0.1"></script> -->
<script type="text/javascript" src="js/dojoBase/dojo/dojo.js?version=0.1"></script>
<script type="text/javascript" src="js/util/global_vars.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_label_and_title.js?version=0.1"></script>

<script type="text/javascript" src="js/gui/ys_loadingOverlay.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_mgt_login.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_mgt_registration.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_layout.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_calendar.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_article.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_user.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/ys_master_data.js?version=0.1"></script>
<script type="text/javascript" src="js/gui/grid_toolbar.js?version=0.1"></script>

<script>
    require([
        "dijit/dijit",
        "dojo/parser",
        "dijit/form/Button",
        "dijit/form/TextBox",
        "dijit/form/SimpleTextarea",
        "dijit/form/NumberTextBox",
        "dijit/form/FilteringSelect",
        "dijit/form/MultiSelect",
        "dijit/form/ComboBox",
        "dijit/form/CheckBox",
        "dijit/Menu",
        "dojox/form/PasswordValidator",
        "dijit/Toolbar",
        "dijit/Editor",        
        "dijit/_editor/plugins/FontChoice", // 'fontName','fontSize','formatBlock'
        "dijit/_editor/plugins/TextColor",
        "dojox/editor/plugins/LocalImage",
        "dijit/Fieldset",
        "dijit/PopupMenuItem",
        "dijit/MenuItem",
        "dijit/MenuSeparator",
        "dijit/Calendar",
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox",
        "dijit/form/ValidationTextBox",
        "dojox/validate/web",
        "dojox/validate/check",
        "dijit/Dialog",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane", 
        "ready!"], 
        function () {
                YS_PAGE_OVERLAY.endLoading();
            }
    );

    require(["dojo/cookie", "dojo/ready"], function (cookie, ready) {
        ready(function () {
            // This function won't run until the DOM has loaded and other modules that register
            YS_PHPSESSID  = cookie("PHPSESSID");
            console.log("PHPSESSID  = ", YS_PHPSESSID);
            ys_setGuiLabelAndTitle();
            
            ys_showLoginDlg();
        });
    });


</script>

</head>

<body class="claro" id="mgt_page_body">
<div id="loadingOverlay" class="pageOverlay"></div>

<jsp:include page="page/login.jsp"></jsp:include>
<jsp:include page="page/mainLayout.jsp"></jsp:include>
<jsp:include page="page/passwdForgot.jsp"></jsp:include>
<jsp:include page="page/registration.jsp"></jsp:include>
<jsp:include page="page/masterDataArticleType.jsp"></jsp:include>


</body>

<noscript>
    <style>
            /* ensure no-javascript browsers aren't obstructed */
        #loadingOverlay {
            display: none !important;
        }
    </style>
</noscript>

</html>

