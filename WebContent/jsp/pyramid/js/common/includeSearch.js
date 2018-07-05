//검색창
document.write("<div class='gnb'>");
document.write("	<ul class='accessibility'>");
document.write("		<li><a href='#container'>컨텐츠바로가기</a></li>");
document.write("	</ul>");
document.write("	<h1><a href='/'><img src='images/logo.gif' alt='SGIS 오픈플랫폼' /></a></h1>");
document.write("	<h2 class='blind'>주메뉴</h2>");
document.write("	<div class='search'>");
document.write("		<form>");
document.write("			<fieldset>");
document.write("				<legend class='blind'>통합검색</legend>");
document.write("				<div class='f-el'>");
document.write("					<span class='el-h'>");
document.write("					</span>");
document.write("					<span class='el-b'>");
document.write("						<input type='text' id='searchKeyword' value='지역명 검색어 or 검색어 예)서울시 인구' onfocus='if(this.value==defaultValue){this.value=\"\";}' onfocusout='if(this.value==\"\"){this.value=defaultValue;}' />");
document.write("					</span>");
document.write("				</div>");
document.write("			</fieldset>");
document.write("			<div class='sbm'>");
document.write("				<input type='image' onclick='moveSearchList(); return false;' src='images/btn_search.gif' alt='검색' title='검색' />");
document.write("			</div>");
document.write("		</form>");
document.write("	</div>");
document.write("	<ul class='account'>");
document.write("				<li><a href='/html/thematicMap/categoryList.html'>로그인</a></li>");
document.write("				<li><a href='/html/interactive/interactiveMap.html'>회원가입</a></li>");
document.write("				<li><a href='/html/bizStats/bizStatsMap.html'>도움말</a></li>");
document.write("	</ul>");
document.write("</div>");

//1Depth 메뉴
document.write("<div class='gnbbox'>");
document.write("	<div class='gnb_section'>");
document.write("		<div>");
document.write("			<ul class='gn-lst'>");
document.write("				<li class='gn2'><a href='/thematicMap/categoryList.html'>통계주제도</a></li>");
document.write("				<li class='gn1'><a href='/interactive/interactiveMap.html'>대화형 통계지도</a></li>");
document.write("				<li class='gn3'><a href='/bizStats/bizStatsMap.html'>활용사례</a></li>");
document.write("				<li class='gn4'><a href='/board/sopBoardMain.html'>알림마당</a></li>");
document.write("			</ul>");
document.write("		</div>");
document.write("	</div>");
//2Depth 메뉴
document.write("	<div class='dpeth_menu' style='display: none;'>");
document.write("		<div class='depth2'>");
document.write("			<ul>");
document.write("				<li class='first'><a href='/thematicMap/thematicMapList.html?theme=CTGR_001'>인구와 주거</a></li>");
document.write("				<li><a href='/thematicMap/thematicMapList.html?theme=CTGR_002'>복지와 문화</a></li>");
document.write("				<li><a href='/thematicMap/thematicMapList.html?theme=CTGR_003'>일과 산업</a></li>");
document.write("				<li><a href='/thematicMap/thematicMapList.html?theme=CTGR_004'>환경과 안전</a></li>");
document.write("			</ul>");
document.write("			<ul style='padding-left: 170px;'>");
document.write("				<li class='first'><a href='/interactive/interactiveMap.html?type=intr&code=population'>인구통계</a></li>");
document.write("				<li><a href='/interactive/interactiveMap.html?type=intr&code=household'>가구통계</a></li>");
document.write("				<li><a href='/interactive/interactiveMap.html?type=intr&code=house'>주택통계</a></li>");
document.write("				<li><a href='/interactive/interactiveMap.html?type=intr&code=company'>사업체통계</a></li>");
document.write("				<li><a href='/interactive/interactiveMap.html?type=intr&code=3f'>농림어가통계</a></li>");
document.write("				<li><a href='/interactive/interactiveMap.html?type=intr&code=kosis'>행정구역통계</a></li>");
document.write("			</ul>");
document.write("			<ul style='padding-left: 555px;'>");
document.write("				<li class='first'><a href='/bizStats/bizStatsMap.html'>창업통계맵</a></li>");
document.write("			</ul>");
document.write("			<ul style='padding-left: 520px;'>");
document.write("				<li class='first'><a href='/board/sopIntro.html'>SOP 소개</a></li>");
document.write("				<li><a href='/board/expAndNotice.html'>설명과 공지</a></li>");
//document.write('				<li><a href="#" onclick="window.open(&quot;http://sgis1.kostat.go.kr/contents/shortcut/shortcut_05_02.jsp&quot;)">데이터현황 및 제공</a></li>');
document.write('				<li><a style="cursor: pointer;" onclick="dataStateAlert();">데이터현황 및 제공</a></li>');
document.write("				<li><a href='/board/qnaAndRequest.html'>질문과 개선요청</a></li>");
document.write("			</ul>");
document.write("		</div>");
document.write("	</div>");
document.write("</div>");

function moveSearchList() {	//연관검색 화면으로 이동
	var val = $("#searchKeyword").val();
	var arrayKey = val.split(" ");
	if(val == "") { 
		messageAlert.open("알림", "검색어를 입력하세요.");
	} else { 
		window.location.href = contextPath + "/common/searchList.html?searchKeyword=" + val;
	}
}

//데이터현황 및 제공 이동알림 Alert
function dataStateAlert() {
	messageAlert.open(
			"알림", 
			//"데이터현황 및 제공 메뉴는 시범서비스 기간 동안 SGIS(http://sgis1.kostat.go.kr)에서 자료제공 기능(로그인, 자료신청, 다운로드 등)으로 서비스 합니다. 시범서비스 이후는 SGIS 오픈플랫폼 서비스에 이관 예정입니다.",
			"\"데이터현황 및 제공\" 메뉴는 시범 서비스 기간 동안<br/>" +
			"<font color='blue'><u>SGIS</u></font>에서 자료제공 기능(로그인, 자료신청, 다운로드 등)으로 서비스 합니다.<br/>" +
			"시범서비스 이후는 <font color='blue'><u>SGIS오픈플랫폼</u></font> 서비스에 이관 예정입니다.",
			function done() {
				window.open("http://sgis1.kostat.go.kr/contents/shortcut/shortcut_05_02.jsp");
			}
	);
}

//Menu Tab Index
$(function() {
	//인터랙티브맵
	$(".gnbbox").find("a:eq(0)").bind("focus", function() {
		$(".gn-lst li:eq(0)").trigger("mouseover");
	});
	
	//창업통계맵
	$(".gnbbox").find("a:eq(1)").bind("focus", function() {
		$(".gn-lst li:eq(1)").trigger("mouseover");
	});
	
	//통계주제도
	$(".gnbbox").find("a:eq(2)").bind("focus", function() {
		$(".gn-lst li:eq(2)").trigger("mouseover");
	});
	
	//알림마당
	$(".gnbbox").find("a:eq(3)").bind("focus", function() {
		$(".gn-lst li:eq(3)").trigger("mouseover");
	});
	/*
	//인터랙티브맵 하위메뉴
	$(".dpeth_menu > div > ul > li:eq(0)").find("a").bind("focus", function() {
		$(".gn-lst li").eq(0).trigger("mouseover");
	});
	
	//통계주제도 하위메뉴
	$(".dpeth_menu > div > ul > li:eq(1)").find("a").bind("focus", function() {
		$(".gn-lst li").eq(1).trigger("mouseover");
	});
	
	//알림마당 하위메뉴
	$(".dpeth_menu > div > ul > li:eq(3)").find("a").bind("focus", function() {
		$(".gn-lst li").eq(3).trigger("mouseover");
	});
	
	//알림마당 하위메뉴 포커스 아웃
	$(".dpeth_menu > div > ul > li:eq(3)").find("a:eq(3)").bind("focusout", function() {
		$(".gnbbox").trigger("mouseleave");
	});
	*/
});