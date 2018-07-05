<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<div id="help-indicator" class="House_Index_Info" style="display:none;">
	<div class="ContBox">
		<h1>생활업종현황</h1>
		<div>
			<span style="color:#f63;">※</span>통계청에서 2016년에 조사한 전국 사업체조사(2015년 기준)를 활용하여 우리동네 생활업종을 서비스 하고 있습니다.
   			(우리동네 생활업종에서는 9차 산업분류 상의 사업체 명칭을 실생활에서 쉽게 이해 할 수 있는
    		명칭으로 변경하여 서비스 하고 있습니다. 이점 유의하시기 바랍니다.)
		</div>
		<a href="javascript:void(0);" onclick="$('#help-indicator').hide();" class="BtnClose">창닫기</a>
		<ul class="Tab">
			<li><a href="#" class="M_on" data-id="HML0001">음식점</a></li>
			<li><a href="#" data-id="HML0002">서비스</a></li>
			<li><a href="#" data-id="HML0003">도소매</a></li>
			<li><a href="#" data-id="HML0004">숙박</a></li>
		</ul>
		<table summary="생활업종 현황 목록">
			<thead>
				<tr>
					<th scope="col">생활업종</th>
					<th scope="col">관련산업분류(9차)</th>
				</tr>
			</thead>
			<!-- mng_s 20171011_김건민 -->			
			<tbody data-id="HML0001">
				<tr>
					<td scope="row">한식</td>
					<td>56111 한식 음식점업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56111" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>중식</td>
					<td>56112 중식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56112" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>일식</td>
					<td>56113 일식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56113" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>분식</td>
					<td>56194 분식 및 김밥 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56194" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>서양식</td>
					<td>56114 서양식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56114" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>제과점</td>
					<td>56191 제과점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56191" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>패스트푸드</td>
					<td>56192 피자, 햄버거, 샌드위치 및 유사 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56192" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>치킨</td>
					<td>56193 치킨 전문점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56193" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>호프 및 간이주점</td>
					<td>56219 기타 주점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56219" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>카페</td>
					<td>56220 비알콜 음료점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56220" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>기타 외국식</td>
					<td>56119 기타 외국식 음식점업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=56119" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0002" style="display:none;">
				<tr>
					<td scope="row">인테리어</td>
					<td>42412 도배, 실내장식 및 내장 목공사업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=42412" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>목욕탕</td>
					<td>96121 욕탕업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=96121" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>교습학원</td>
					<td>85501 일반 교과 학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=85501" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85509 기타 일반 교습학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=85509" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>어학원</td>
					<td>85502 외국어학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=85502" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>예체능학원</td>
					<td>85611 스포츠 교육시설기관
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=85611" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85612 레크레이션 교육시설기관
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=85612" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						85620 예술 학원
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=85620" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				 <tr>
					<td>부동산중개업</td>
					<td>68221 부동산 자문 및 중개업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=68221" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>이발소</td>
					<td>96111 이용업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=96111" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>미용실</td>
					<td>96112 두발미용업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=96112" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>세탁소</td>
					<td>96912 가정용 세탁업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=96912" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>PC방</td>
					<td>91222 컴퓨터 게임방 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=91222" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>노래방</td>
					<td>91223 노래연습장 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=91223" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0003" style="display:none;">
				<tr>
					<td scope="row">문구점</td>
					<td>47612 문구용품 소매업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47612" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>서점</td>
					<td>47611 서적 및 잡지류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47611" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>편의점</td>
					<td>47122 체인화 편의/문화점
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47122" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>식료품점</td>
					<td>
						47129 기타 음·식료품 위주 종합 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47129" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47212 육류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47212" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47213 수산물 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47213" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47214 과실 및 채소 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47214" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47215 빵 및 과자류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47215" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47219 기타 식료품 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47219" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>휴대폰점</td>
					<td>47312 통신기기 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47312" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				 <tr>
					<td>의류</td>
					<td>
						47411 가정용 직물제품 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47411" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47412 한복 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47412" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47413 남녀용 정장 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47413" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47414 유아용 의류 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47414" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47415 내의 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47415" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47416 셔츠 및 기타 의복 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47416" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47419 기타 섬유, 직물 및 의복액세서리 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47419" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
 				<tr>
					<td>화장품/방향제</td>
					<td>47813 화장품 및 방향제 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47813" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
 				<tr>
					<td>철물점</td>
					<td>47511 철물 및 난방용구 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47511" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>주유소</td>
					<td>
						47711 차량용 주유소 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47711" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						47712 차량용 가스 충전업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47712" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>꽃집</td>
					<td>47851 화초 및 산식물 소매업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47851" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>슈퍼마켓</td>
					<td>47121 슈퍼마켓
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=47121" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
			</tbody>
			<tbody data-id="HML0004" style="display:none;">
				<tr>
					<td scope="row">호텔 </td>
					<td>55111 호텔업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=55111" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>여관(모텔포함) 및 여인숙 </td>
					<td>55112 여관업 
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=55112" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a>
					</td>
				</tr>
				<tr>
					<td>팬션  </td>
					<td>
						55119 기타 관광숙박시설 운영업
						<a href="https://kssc.kostat.go.kr:8443/ksscNew_web/kssc/common/ClassificationContentMainTreeListView.do?strCategoryNameCode=001&strCategoryDegree=09&strCategoryCode=55119" onclick="window.open(this.href,'_blank','width=430,height=430,scrollbars=yes'); return false;">
							<img src="/js/plugins/EasyTree/skin-lion/tree_info_w.png"/>
						</a><br/>
						- 기타 관광 숙박시설 운영업으로서 단기간의 숙박시설을 운영하는 산업활동을 말한다.<br/> 
						  &lt;예시&gt;<br/>
						   ·산장 및 방가로 운영 ·민박시설 운영<br/> 
						   ·유스호스텔 운영 ·숙박용 펜션 운영 <br/>
						   ·야영장 운영 ·캠프장 운영<br/>
					</td>
				</tr>
			</tbody>
			<!-- mng_e 20171011_김건민 -->
		</table>
	</div>
	<div class="Blackbg">&nbsp;</div>
</div>
<script>
$(document).ready(function() {
	$("#helper-0003").mCustomScrollbar({axis:"y",advanced: { autoExpandHorizontalScroll: true }});	
});

$("#help-indicator .Tab>li>a").click(function(){
	$("#help-indicator .Tab>li>a").removeClass("M_on");
	$(this).addClass("M_on");
	$("#help-indicator tbody").hide();
	$("#help-indicator tbody[data-id="+$(this).data("id")+"]").show();
	return false;
});
</script>