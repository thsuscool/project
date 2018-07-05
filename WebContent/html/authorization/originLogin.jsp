<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="org.springframework.core.io.ClassPathResource" %> 
<%@ page import="org.springframework.core.io.support.PropertiesLoaderUtils" %> 
<%@ page import="kostat.sop.ServiceAPI.common.security.SecureDB" %>
<%@ page import="kostat.sop.ServiceAPI.common.security.Security" %>
<%@ page import="java.util.Properties" %>


<%	
	String strUsrId = request.getParameter("SYS_USR_ID");			//기존사용자 ID
	String strUsrPw = request.getParameter("SYS_USR_PW");			//기존사용자 PW
	strUsrId = Security.cleanXss(strUsrId);
	strUsrPw = Security.cleanXss(strUsrPw);
	//=================== 로컬 테스트시 주석 ================
	//=================== 실환경 주석 해제 요망 =============
	//strUsrPw = SecureDB.encryptSha256(strUsrPw);
	//====================================================
%>
<!DOCTYPE>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="/js/plugins/jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				//alert('originLogin.js')
				$("#checkOrginloginForm").find("#SYS_URL").val(window.location.protocol+"//"+window.location.host + "/view/authorization/originLoginCheck");
				$("#checkOrginloginForm").find("#CUR_URL").val(window.location.protocol+"//"+window.location.host + "/view/member/login");
				$("#checkOrginloginForm").submit();
			});
		</script>
	</head>
	<body>
		<!-- 운영용 -->
		<form action="//kosis.kr/oneid/cmmn/login/ItgrUsrInfoChk.do" method="post" id="checkOrginloginForm" name="checkOrginloginForm">
			<input type="hidden" id="CUR_URL" name="CUR_URL" />
			<input type="hidden" id="SYS_URL" name="SYS_URL" />
			<input type="hidden" id="SYS_CD" name="SYS_CD" value="S" />
			<input type="hidden" id="SYS_USR_ID" name="SYS_USR_ID" value="<%=strUsrId %>" />
			<input type="hidden" id="SYS_USR_PW" name="SYS_USR_PW" value="<%=strUsrPw %>" />
		</form>
		 
		<!-- 
		<form action="/ServiceAPI/member/login.json" method="post" id="checkOrginloginForm" name="checkOrginloginForm">
			<input type="hidden" id="member_id" name="member_id" value="<%=strUsrId %>" />
			<input type="hidden" id="pw" name="pw" value="<%=strUsrPw %>" />
		</form>
		 -->
		
		
	</body>
</html>