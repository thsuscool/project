
<%
	/**************************************************************************************************************************
	* Program Name  : 활용사례 JSP  
	* File Name     : galleryUseCase.jsp
	* Comment       : 
	* History       : 네이버시스템 최재영 2016-09-05
	*
	**************************************************************************************************************************/
%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="format-detection" content="telephone=no" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<META http-equiv="Expires" content="-1">
<META http-equiv="Pragma" content="no-cache">
<META http-equiv="Cache-Control" content="No-Cache">
<title>메인 | 통계청SGIS 오픈플랫폼</title>

    <link href="/css/default.css" rel="stylesheet" type="text/css" />
	<link rel='stylesheet' type='text/css' href='/js/plugins/jquery-easyui-1.4/themes/default/easyui.css'>
	<link rel="stylesheet" type="text/css" href="/css/common.css" />
	<link rel="stylesheet" type="text/css" href="/css/layout.css" />
	<link rel="stylesheet" type="text/css" href="/css/um.css" />
	<link rel="stylesheet" type="text/css" href="/css/nm.css" />
	<link rel="stylesheet"  href="/js/plugins/jquery-easyui-1.4/sop.css" />
	
	<script type="text/javascript" src="/js/common/includeHead.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery-easyui-1.4/jquery.easyui.min.js'></script>
	<script type="text/javascript" src="/js/plugins/colorpicker/js/jquery.xcolor.js"></script>
	<script type="text/javascript" src="/js/plugins/jquery-easyui-1.4/sop-src.js"></script>
	<script type="text/javascript" src="/js/plugins/durian-v2.0.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script type="text/javascript" src="/js/common/sop.portal.absAPI.js"></script>
	<script type="text/javascript" src="/js/common/map.js"></script>

	<script src="/js/common/common.js"></script>
	<script src="/js/board/jquery.paging.js"></script>
	<script src="/js/plugins/ui.js"></script>
	<script src="/js/plugins/common.js"></script>
	<link href="/css/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="/js/plugins/jquery-ui-1.10.3.custom.js"></script>
	<script type='text/javascript' src='/js/plugins/jquery.form.js'></script>
	<script type="text/javascript" src="/js/plugins/jquery.tagsinput.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery.css" />
	<link rel="stylesheet" type="text/css" href="/sample2/include/css/gallery_pop.css" />
	<script type="text/javascript" src="/js/plugins/jquery.mCustomScrollbar.concat.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/css/jquery.mCustomScrollbar.css" />
	<script type="text/javascript" src="/js/gallery/galleryEtc.js"></script>
    <script type="text/javascript" src="/js/gallery/galleryAdd.js"></script>
    
	
	
	
	<!-- 2016.03.23 j.h.Seok -->
<!-- 	<link rel="stylesheet" type="text/css" href="/css/handsontable.full.css">
	<script type="text/javascript" src="/js/plugins/handsontable.full.js"></script> -->
</head>

<body>
	<div id="wrap">
		<!-- header // -->
		<header>
			<!-- Top Include -->
			<jsp:include page="/view/common/includeSearch"></jsp:include>
		</header>

		<!-- body -->
			<div class="containerBox">  
			<p class="mpGuide">
				<a href="/view/index">처음페이지&nbsp;>&nbsp;</a>
				<a href="/view/gallery/resultGallery">통계갤러리&nbsp;>&nbsp;</a>
				<a href="/view/gallery/writeGalleryUseCase"><span class="path_el current">활용사례 등록</span></a>
			</p>
			
			<div class="mpSubTitle">
				<h3>활용 사례 등록</h3>
				<p>이용자가 자료를 제공받아 직접 활용한 사례를 공유합니다.</p> 
			</div>
			
			<form id="fileForm" method="post" enctype="multipart/form-data">
			<div class="useArea">
			
				<div class="useWrite">
					<table>
						<colgroup>
							<col width="150" />
							<col width="" />
						</colgroup>
						<tr>
<!-- 						mng_s 20170717_주용민 -->
							<th>제목</th>
							<td><input id="gallery_title" type="text" class="inp full" maxlength="100"/></td>
<!-- 							<td colspan="2"><input id="gallery_title" type="text" class="inp full" placeHolder="제목을 입력하세요" maxlength="100"/></td> -->
<!-- 						mng_e 20170717_주용민 -->
						</tr>
						<tr>
							<th>활용자명</th>
							<td><input id="userName" type="text" class="inp" maxlength="40"/></td>
						</tr>
						<tr>
							<th>구분</th>
							<td>
								<select id="section" class="select">
									<option value="공간통계자료">공간통계자료</option>
									<option value="OpenAPI">OpenAPI</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>활용목적</th>
							<td>
								<select id="usePurpose" class="select">
									<option value="연구자료">연구자료</option>
									<option value="DB구축">DB구축</option>
									<option value="지도작성">지도작성</option>
									<option value="시스템개발">시스템개발</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>활용분야</th>
							<td>
								<select id="applicationField" class="select">
									<option value="경제산업">경제산업</option>
									<option value="교육문화">교육문화</option>
									<option value="교통환경">교통환경</option>
									<option value="도시계획">도시계획</option>
									<option value="사회복지">사회복지</option>
									<option value="재해기후">재해기후</option>
									<option value="기타">기타</option>
								</select>
							</td>
						</tr>
						<tr>
							<th>이용자료(통계청)</th>
							<td><input id="dataUse1" type="text" class="inp t01" maxlength="100"/></td>
						</tr>
						<tr>
							<th>이용자료(타기관)</th>
							<td><input id="dataUse2" type="text" class="inp t01" maxlength="100"/></td>
						</tr>
						<tr>
							<th>주요 활용내용</th>
							<td><textarea id="applicationContent" class="textarea t01"></textarea></td>
						</tr>
					</table>
				</div>
				<div class="useSide">
					<a class="imgView" onclick="fileEvent('#imgFile')">
						<span id="viewText">이미지 첨부하기</span>
						<!-- <span id="preViewImage"><img src=""></img></span> -->
						<span id="preViewImage" style="display:none;"><img id="target" src="#" width="260px" height="150px" /></span> 
					</a>
					<input type="file" name="preView" class="hidden" id="imgFile" onchange="$galleryAdd.imageUploadAndPreView(this);" />
					<p class="usSubj"><span>사이트 URL</span></p>
					<div class="usForm">
						<input id="siteUrl" type="text" maxlength="40"/>
					</div>
					<p class="usSubj">
						<span>참고자료</span>
						<a onclick="javascript:$galleryAdd.referenceFileEvent();" style="cursor: pointer;">첨부파일추가</a>
						<div id="refFiles" style="display:none;"></div>
					</p>
					<div class="usListBox">
						<ul id="referenceFileList">
						<!-- 	<li>
								<a href="javascript:void(0)" onclick="dataFileDel(this)"><img src="/img/ico/ico_del01.png" /></a>
								<a href="javascript:void(0)" onclick="dataFileUp(this)"><img src="/img/ico/ico_add01.png" /></a>
								<span>11_1_논문지 기재_권요규_결과물.pdf</span>
							</li>
							<li>
								<a href="javascript:void(0)" onclick="dataFileDel(this)"><img src="/img/ico/ico_del01.png" /></a>
								<a href="javascript:void(0)" onclick="dataFileUp(this)"><img src="/img/ico/ico_add01.png" /></a>
								<span>12_1_논문지 기재_권요규_결과물.pdf</span>
							</li> -->
						</ul>
					</div>
					<div class="hashTag">
						<input id="hashTag" type="text" class="tags" value="" />
					</div>
					<p class="usSubj"><span>설문조사</span></p>
					<div class="usForm">
						<input name="surveySubject" type="text" placeholder="설문제목" maxlength="40"/>
					</div>
					
					<div class="josaListBox">
						<div id="surveyDetail" class="josaListBoxScroll">
							<ul id="surveyDetailUl">
								<li name="ansLi">
									<input type="text" name="ansDetail"  placeholder="항목 입력" value="" />
										<a name="removePoll" onclick="$galleryAdd.removePollDetail(this);" class="itemDel">
											<img src="/img/ico/ico_close03.png" />
										</a>
								</li>
								<li id="surveyAdd_1">
									<a onclick="javascript:$galleryAdd.addSurveyDetail(1);">+ 항목추가</a>
								</li>
							</ul>
						</div>
						<a class="radioLink" onclick="radioCross(this);" data-event="toggle" id="endSurveyTime">마감시간 설정</a>
						<div class="calendarEtcBox">
							<input id="survey_surv_end_dt" type="text" class="date" />
						</div>
						<a class="radioLink" onclick="radioCross(this);" id="surveyType">복수선택</a>
						<a class="radioLink on" onclick="radioCross(this);" id="publicType">공개여부</a>
					</div>
					<!-- <div id="surveyDetail" class="josaListBox">
						<ul id="surveyDetailUl" class="josaListBoxScroll">
							<li name="ansLi"><input name="ansDetail" type="text" placeholder="항목 입력"/><a name="removePoll" href="javascript:void(0)" onclick="$galleryAdd.removePollDetail(this)" class="itemDel"><img src="/img/ico/ico_close03.png" /></a></li>
							<li id="surveyAdd_1"><a href="javascript:$galleryAdd.addSurveyDetail(1)">+ 항목추가</a></li>
						</ul> 
						<a href="javascript:void(0)" class="radioLink" onclick="radioCross(this);" data-event="toggle">마감시간 설정</a>
						<div class="calendarEtcBox"><input id="survey_surv_end_dt" type="text" class="date" /></div>
						<a href="javascript:void(0)" class="radioLink" onclick="radioCross(this)">복수선택</a>
					</div>
				</div>
			</div>
			</form>
			<div class="btnbox ar">
				<a onclick="javascript:$galleryAdd.saveFormSubmit();" style="cursor: pointer;" class="gbtnType01">등록</a>
			</div>
		
		</div> 
		
		<!-- footer// -->
		<footer id="footer">
			<!-- Bottom Include -->
			<jsp:include page="/view/common/includeBottom"></jsp:include>
		</footer>
	</div>

</body>
</html>