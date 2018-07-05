<!-- 2017.11.25 [개발팀] -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=1" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/common.css" />
	<link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" type="text/css" href="/css/newhelp/help.css" />
	<title>SGIS 플러스 도움말</title>
</head>
<body>
	<div class="wrapper">
		<!--header start-->
		<jsp:include page="/view/newhelp/helpHeader"></jsp:include>
		<!--header end-->
		<div class="container">
			<!--leftmenu-->
			<div class="leftWrap">
				<div class="leftTitle">기술업종 통계지도</div>
				<div class="leftmenu">
					<ul>
						<li><a href="/view/newhelp/tc_help_10_0">서비스 개요</a></li>
						<li><a href="/view/newhelp/tc_help_20_0">기본조작 방법</a></li>
						<li><a href="/view/newhelp/tc_help_30_0">서비스 이용방법</a>
							<ul class="sub">
								<li><a href="/view/newhelp/tc_help_30_0">ㆍ시도별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_1">ㆍ시군구별 기술업종 현황</a></li>
								<li><a href="/view/newhelp/tc_help_30_2">ㆍ업종밀집도 변화</a></li>
								<li><a href="/view/newhelp/tc_help_30_5">ㆍ업종별 입지계수 지도</a></li>
								<li><a href="/view/newhelp/tc_help_30_6">ㆍ조건별 지역찾기</a></li>
								<li><a href="/view/newhelp/tc_help_30_3">ㆍ지원시설 조회</a></li>
								<li><a href="/view/newhelp/tc_help_30_4" class="on">ㆍ산업단지 조회</a></li>
							</ul>
						</li>							
					</ul>
				</div>
			</div><!--leftmenu-->
			<!--contents-->
			<div class="contentsWrap">
				<div class="contents">
					<h1>산업단지 현황</h1>
					<h2>○ 기술업종에 대한 산업단지 현황을 색상지도와 POI차트로 볼 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 산업단지 현황을 색상지도와 카운트 POI차트를 볼 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도상에 표출된 시도를 클릭하시면 해당지역의 상세정보를 데이터 보드에서 조회할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- 지도상에서 축척을 변경(마우스 휠 조작) 및 카운트 POI차트를 클릭하시면 더 자세한 산업단지 현황을 </h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;  확인할 수 있습니다.</h2>
					<h2>&nbsp;&nbsp;&nbsp;&nbsp;- POI차트의 '해당지역 상세정보보기' 버튼을 클릭하시면, 데이터보드에서 해당 산업단지의 상세정보를</h2>
					 <h2>&nbsp;&nbsp;&nbsp;&nbsp;  조회할 수 있습니다.</h2>
					
					<img src="/img/newhelp/Tc_help_30_4_1.png" width=700 height=auto border=0 alt="산업단지조회 전국"/>	
					<h2 style="text-align:center;">[산업단지조회 - 전국]</h2><br>
					<img src="/img/newhelp/Tc_help_30_4_2.png" width=700 height=auto border=0 alt="산업단지조회 상세"/>	
					<h2 style="margin-left: 250px;">[산업단지조회 - 상세]</h2><br>
					<br><br>
				</div>
			</div><!--contentsWrap-->
		</div><!--container-->
		<!--footer-->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
		<!--footer-->
	</div><!--wrapper-->
</body>
</html>
