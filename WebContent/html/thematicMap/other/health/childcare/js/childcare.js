/**
 * 
 */
(function (W, D) {
	W.$thematicMap = W.$thematicMap || {};
	
	$(document).ready(function () {
		// map.js 및 mapInfo.js를 사용하기위한 초기설정
		$thematicMap.ui.initialize();
		
	});
	
	$thematicMap.ui = {
		sMap : null, // map.js의 map객체
		map : {},
		bnd_year : '2014',
		comboControl : {},
		isMapCreated : false,
		mapNavi1 : null,
		
		initialize : function () {
			/* sMap.map생성 kcu 추가 */
			this.sMap = new sMap.map();
			this.sMap.mapInfo = new sMapInfo.mapInfo(this.sMap);
			this.sMap.mapInfo.initialize($thematicMap.ui);
			
			//네비게이션 init 함수
			this.mapNavi1 = new window.parent.mapNavigation.UI();
			this.mapNavi1.isThematicMap = true;
//			window.parent.$mapNavigation.ui.setMapObj(this.sMap);
//			window.parent.$mapNavigation.event.setUIEvent();
			
			// 가락동좌표
//			$thematicMap.ui.createMap([ 966621, 1944048 ], 9);
//			var center = window.parent.$mapNavigation.ui.getLocationCoords();
			var center = this.mapNavi1.getLocationCoords();
			$thematicMap.ui.createMap(center, 1);
			this.mapNavi1.create("mapNavi_1", 1, $thematicMap.ui);
		},
		createMap : function (centerPos, zoomlevel) {
			
			/* 최소 MIN 레벨 설정 */
			var maxLevel = 13;
			var minLevel = 8;
			if (!this.isMapCreated) {
				// 최초 로딩시
				$thematicMap.ui.map = sop.map('map', {
					scale : false,
					panControl : false,
					measureControl : false,
					maxZoom : maxLevel,
					minZoom : minLevel,
					attributionControl : false,
					zoomSliderControl: false
				});
				
				//네비게이션 추가
//				window.parent.$mapNavigation.ui.sidoSelectSet(1);
				
				/* 범례 생성 */
				this.sMap.gMap = $thematicMap.ui.map;
				
				var btnInfo = new interactiveMapBtnInfo.btnInfo($thematicMap.ui.sMap);
				$thematicMap.ui.sMap.mapBtnInfo = btnInfo;
				btnInfo.createUI({
					intrPoiControl : false,
					bizSettingControl : false,
					mapTypeControl : false,
					bizZoomControl : true
				});	
				
				this.sMap.mapInfo.createPoiInfo();
				this.sMap.mapInfo.colorPickerSet();
				this.sMap.MainObj = $thematicMap;
				this.sMap.addControlEvent("moveend");
				this.sMap.addControlEvent("zoomend");
				this.isMapCreated = true;
				
				// 마커들 그룹
				// $thematicMap.ui.markerGroup = new sop.LayerGroup();
				// 지도레이어에 POI Marker 그룹 레이어 추가
				// $thematicMap.ui.map.addLayer($thematicMap.ui.markerGroup);
				
				// 마커클러스터
				$thematicMap.ui.markers = sop.markerClusterGroup({
					animateAddingMarkers : true
				});
				$thematicMap.ui.map.addLayer($thematicMap.ui.markers);
			}
			
			$thematicMap.ui.initializeMap();
			
			$thematicMap.ui.map.setView(sop.utmk(centerPos), zoomlevel);
			
			//$thematicMap.ui.map.zoomSliderControl.setPosition("topleft");
			
		},
		initializeMap : function () {
			if (this.isGeoJsonCreated) {
				$thematicMap.geoJsonObj = {};
				$thematicMap.staticJsonObj = [];
				
				$thematicMap.ui.geoJson.onRemove($thematicMap.ui.map);
				$thematicMap.ui.clearDataOverlay();
				$thematicMap.ui.isGeoJsonCreated = false;
				
				// $thematicMap.ui.markers.clearLayers();
				
			}
			$($thematicMap.ui.sMap.mapInfo.barChartObj).hide();
			
			// $thematicMap.ui.markerGroup.clearLayers();
			$thematicMap.ui.markers.clearLayers();
		},
		clearDataOverlay : function () {
			if ($thematicMap.ui.sMap.dataGeojson) {
				$thematicMap.ui.sMap.dataGeojson.remove();
				$thematicMap.ui.sMap.dataGeojson.eachLayer(function (layer) {
					layer.removeCaption();
				});
			}
			$thematicMap.ui.sMap.data = [];
			$thematicMap.ui.sMap.combineData = [];
			$thematicMap.ui.sMap.dataGeojson = null;
			$thematicMap.ui.sMap.curDropPolygonCode = null;
		},
		setMapzoomLevel : function (zoomlevel, adm_cd, callbackApi) {
			// 초기화
			$thematicMap.ui.initializeMap();
			console.log('zoomlevel', zoomlevel);
			if (zoomlevel <= 1) {
				// 전국경계
				$thematicMap.ui.sMap.curPolygonCode = 1;
				// $thematicMap.request.countryArea();
				
			}
			else if (zoomlevel > 1 && zoomlevel <= 3) {
				// 전국시도경계
				$thematicMap.ui.sMap.curPolygonCode = 2;
				// $thematicMap.request.sidoArea($thematicMap.ui.bnd_year,
				// callbackApi);
			}
			else if (zoomlevel > 3 && zoomlevel <= 5) {
				$thematicMap.ui.sMap.curPolygonCode = 3;
				// 시도경계 hadmarea
				// $thematicMap.request.hadmArea(adm_cd, callbackApi);
			}
			else if (zoomlevel > 5 && zoomlevel <= 8) {
				$thematicMap.ui.sMap.curPolygonCode = 4;
				// 시군구 경계 hadmarea
				// $thematicMap.request.hadmArea(adm_cd, callbackApi);
				callbackApi();
			}
			else if (zoomlevel > 8) {
				$thematicMap.ui.sMap.curPolygonCode = 5;
				// 시군구 경계 hadmarea
				// $thematicMap.request.statsArea(adm_cd, callbackApi);
				callbackApi();
			}
		},
		// sop GeoJSON이 담길 객체
		geoJson : {},
		isGeoJsonCreated : false,
		isStatsGeoJson : false,
		isKosisStatsGeoJson : false,
		// geojson 초기화
		initGeoJson : function () {
			$thematicMap.geoJsonObj = {};
			$thematicMap.staticJsonObj = [];
		},
		setGeoJson : function (geoJsonObj) {
			$thematicMap.ui.initializeMap();
			this.isGeoJsonCreated = true;
			var type = 'data';
			
			/* 범례 색 설정을 위한 map.dataGeoJson 설정 */
			$thematicMap.ui.geoJson = sop.geoJson(geoJsonObj, {
				style : this.sMap.setPolygonGeoJsonStyle(type),
				onEachFeature : function (feature, layer) {
					$thematicMap.ui.sMap.setLayerColor(feature, layer);
					layer.on({
						mouseover : function (event) {
							$thematicMap.ui.sMap.setPolyLayerMouseover(event);
							$thematicMap.ui.sMap.didMouseOverPolygon(event, feature, type);
						},
						mouseout : $thematicMap.ui.sMap.setPolyLayerMouseout,
						click : function (event) {
							$thematicMap.ui.sMap.didSelectedPolygon(event, feature, type);
						}
					});
				}
			}).addTo($thematicMap.ui.map);
			
			$thematicMap.Popup.close();
			
			/* 통계+경계데이터 일경우에 setCatpion */
			$thematicMap.ui.sMap.dataGeojson = $thematicMap.ui.geoJson;
			
		},
		addMarker : function () {
			
		},
		createToolTip : function (event, feature) {
			
		}
	};
	// 경계데이터
	$thematicMap.geoJsonObj = {};
	
	// 통계데이터
	$thematicMap.staticJsonObj = [];
	
	/** ********* API 요청 ********* */
	$thematicMap.request = {
		getPoiInfobyThemecdHadm : function (_year, _area_type, _adm_cd, _bnd_year, _pagenum, callbackApi) {
			var param = {
				year : $thematicMap.ui.bnd_year,
				area_type : _area_type,
				adm_cd : _adm_cd,
				bnd_year : $thematicMap.ui.bnd_year,
				resultcount : '500',
				theme_cd : '7007',// 7007
				pagenum : _pagenum
			};
			$statsPotal.api.poi.getPoiInfobyThemecd({
				param : param,
				accessToken : accessToken,
				method : 'GET',
				success : $thematicMap.response.successPoiInfobyThemecd,
				options : {
					param : param,
					callbackApi : callbackApi,
					adm_cd : _adm_cd,
					year : $thematicMap.ui.bnd_year,
				
				}
			});
			
		},
		getPoiInfobyThemecdMBR : function (_year, _area_type, _adm_cd, _bnd_year, _pagenum, _area, callbackApi) {
			var param = {
				year : $thematicMap.ui.bnd_year,
				area_type : _area_type,
				adm_cd : _adm_cd,
				bnd_year : $thematicMap.ui.bnd_year,
				resultcount : '500',
				area : _area,
				theme_cd : '7007',// 7007
				pagenum : _pagenum
			};
			$statsPotal.api.poi.getPoiInfobyThemecd({
				param : param,
				accessToken : accessToken,
				method : 'GET',
				success : $thematicMap.response.successPoiInfobyThemecd,
				options : {
					param : param,
					callbackApi : callbackApi,
					adm_cd : _adm_cd,
					year : $thematicMap.ui.bnd_year,
				
				}
			});
			
		},
		// 남한경계
		countryArea : function () {
			options = {
				callbackFunc : null,
				adm_cd : null,
				info : 'countryArea'
			};
			$.ajax({
				type : "POST",
				url : "/js/data/geo.js",
				success : function (res, callbackStatsApi) {
					console.log('res..', res);
					$thematicMap.response.successCountryArea(res, options);
					
				},
				dataType : "json",
				error : function (e) {
					// alert(e.responseText);
				}
			});
		},
		// 시도경계
		sidoArea : function (year, callbackStatsApi) {
			options = {
				callbackFunc : callbackStatsApi,
				adm_cd : null,
				info : 'sidoArea'
			};
			$.ajax({
				type : "POST",
				url : "/js/data/geo_sido_" + year + ".js",
				success : function (res, callbackStatsApi) {
					$thematicMap.response.successSidoArea(res, options);
				},
				dataType : "json",
				error : function (e) {
					// alert(e.responseText);
					
				}
			});
		},
		// 행정경계
		hadmArea : function (adm_cd, callbackStatsApi) {
			console.log('adm_cd', adm_cd);
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.hadmarea({
				param : {
					year : $thematicMap.ui.bnd_year,
					adm_cd : adm_cd
				},
				accessToken : accessToken,
				success : $thematicMap.response.successHadmArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd,
					year : $thematicMap.ui.bnd_year,
				
				}
			});
		},
		
		// 집계구
		statsArea : function (adm_cd, callbackStatsApi) {
			if (sop.Util.isUndefined(adm_cd)) {
				throw new Error('Check adm_cd');
			}
			
			$statsPotal.api.boundary.statsarea({
				param : {
					adm_cd : adm_cd
				},
				accessToken : accessToken,
				success : $thematicMap.response.successStatsArea,
				options : {
					param : adm_cd,
					callbackApi : callbackStatsApi,
					adm_cd : adm_cd,
					year : $thematicMap.ui.bnd_year
				}
			});
		},
		
		// 리버스지오코드 시 호출되는 함수 (경계+ 표출데이터 호출)
		AreaAndStatsApis : function (_adm_cd, year) {
			var adm_cd = _adm_cd;
			// 시도 경계인 경우
			if (adm_cd == null) {
				
			}
			$thematicMap.ui.initializeMap();
			// zoomlevel별 행정경계 및 Callback API 설정..
			$thematicMap.ui.setMapzoomLevel($thematicMap.ui.map.getZoom(), adm_cd, function () {
				if ($thematicMap.ui.map.getZoom() == 8) {
					console.log('before poi request');
					
					var center = $thematicMap.ui.map.getCenter();
					console.log('before poi center', center);
					var area = 'CIRCLE(' + center.x + ' ' + center.y + ',' + '5000' + ')';
					
					//$thematicMap.request.getPoiInfobyThemecdHadm('2012', '0', adm_cd, '2012', '0');
					$thematicMap.request.getPoiInfobyThemecdMBR($thematicMap.ui.bnd_year, '1', adm_cd, $thematicMap.ui.bnd_year, '0', area);
					
				}
				if ($thematicMap.ui.map.getZoom() > 8) {
					console.log('before poi request');
					console.log('before poi getBounds', $thematicMap.ui.map.getBounds());
					var mapBounds = $thematicMap.ui.map.getBounds();
					var area = 'RECTANGLE(';
					area += mapBounds._southWest.x + ' ' + mapBounds._southWest.y + ',';
					area += mapBounds._northEast.x + ' ' + mapBounds._northEast.y;
					area += ')';
					$thematicMap.request.getPoiInfobyThemecdMBR($thematicMap.ui.bnd_year, '1', adm_cd, $thematicMap.ui.bnd_year, '0', area);
				}
			});
			
		}
	};
	
	$thematicMap.response = {
		successPoiInfobyThemecd : function (status, res, options) {
			if (res.errCd == '-401') {
				console.log('-401..successPoiInfobyThemecd..accessToken..Error....');
				accessTokenInfo();
				console.log('options', options);
				setTimeout(function () {
					$thematicMap.request.getPoiInfobyThemecd(options.param.year, options.param.area_type, options.param.adm_cd, options.param.bnd_year, options.param.pagenum, options.callbackApi);
				}, 500);
			}
			else if (res.errCd == '-200') {
				window.parent.messageAlert.open("알림", res.errMsg);
			}
			else if (res.errCd == '0') {
				console.log('res', res);
				var totalCount = res.result[0].totalcount;
				var returnCount = res.result[0].returncount;
				var pageNum = res.result[0].pagenum;
				var apicallCount = parseInt(totalCount / (options.param.resultcount * (pageNum + 1)));
				
				console.log('apicallCount', apicallCount);
				if (returnCount !== totalCount && apicallCount > 0) {
					$thematicMap.request.getPoiInfobyThemecd($thematicMap.ui.bnd_year, '0', options.adm_cd, $thematicMap.ui.bnd_year, pageNum + 1);
				}
				var poiList = res.result[0].company_list;
				if (poiList.length > 0) {
					for ( var i = 0; i < poiList.length; i++) {
						var _markerIcon = sop.icon({
							iconUrl : '/img/marker/marker/70_07.png',
							shadowUrl : '/img/marker/theme_shadow.png',
							iconAnchor : [ 13, 40 ],
							iconSize : [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						var _marker = sop.marker([ poiList[i].x, poiList[i].y ], {
							icon : _markerIcon
						});
						_marker.info = poiList[i];
						// _marker.addTo($thematicMap.ui.markerGroup);
						_marker.addTo($thematicMap.ui.markers);
						var tel_num = "";
						if (!sop.Util.isUndefined(poiList[i].tel_no)) {
							tel_num = poiList[i].tel_no;
							tel_num = appendHyphenToPhoneNumber(tel_num);
						}
						var html = '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
						html += '<tr>';
						html += '<th style="text-align: left; word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' + poiList[i].corp_nm + '</strong></th>';
						html += '<td >';
						html += '</td>';
						html += '</tr>';
						html += '<tr>';
						html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">&nbsp;' + poiList[i].naddr + '</th>';
						html += '<td >';
						html += '</td>';
						html += '</tr>';
//						html += '<tr>';
//						html += ' <th style="text-align: left; word-break:break-all;white-space: nowrap;width:50px;padding:0px 5px 5px 5px;font-size:12px;">&nbsp;' + tel_num + '</th>';
//						html += '<td >';
//						html += '</td>';
//						html += '</tr>';
						html += '</table>';
						_marker.bindInfoWindow(html);
					}
					
					var logOptions = {
						type : "C0",
						theme : parent.$thematicMapMain.param.theme,
						params : {
							title : parent.$thematicMapMain.themaInfo.title + "^" + parent.$thematicMapMain.themaInfo.stat_thema_map_id,
							param : options.param,
							map : $thematicMap.ui.map
						}
					}
					//API로그 쌓기 (행정동코드로 지역 조회)
					addrCdToNm($thematicMap.ui.bnd_year, options.adm_cd, logOptions);
					
				}
				else {
					//window.parent.messageAlert.open("알림", "해당 지역 보육업체 검색결과가 없습니다.");
				}
			}
			
		},
		successCountryArea : function (res, options) {
			// 경계데이터만 로딩
			console.log('successCountryArea', res);
			$thematicMap.geoJsonObj = res;
			$thematicMap.ui.isStatsGeoJson = false;
			// $thematicMap.ui.setGeoJson(res);
			options["geojson"] = res;
			$thematicMap.ui.sMap.lastGeojsonInfo = options;
			
			$thematicMap.Popup.close();
			
		},
		successSidoArea : function (res, options) {
			if (!sop.Util.isUndefined(options)) {
				options.callbackFunc();
			}
			// 경계데이터만 로딩
			console.log('successSidoArea', res);
			options["geojson"] = res;
			$thematicMap.ui.sMap.lastGeojsonInfo = options;
			
			$thematicMap.geoJsonObj = res;
			// $thematicMap.ui.setGeoJson($thematicMap.geoJsonObj);
			$thematicMap.Popup.close();
			
		},
		successHadmArea : function (status, res, options) {
			if (res.errCd == '-401') {
				console.log('-401..successHadmArea..accessToken..Error....');
				accessTokenInfo();
				console.log('options', options);
				
				setTimeout(function () {
					$thematicMap.request.hadmArea(options.param, options.callbackApi);
				}, 500);
			}
			else {
				$thematicMap.ui.initGeoJson();
				console.log('successHadmArea', res);
				
				options["geojson"] = res;
				$thematicMap.ui.sMap.lastGeojsonInfo = options;
				
				$thematicMap.ui.isStatsGeoJson = false;
				// $thematicMap.ui.setGeoJson(res);
				
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				// 경계데이터만 로딩
				$thematicMap.geoJsonObj = res;
				// $thematicMap.ui.setGeoJson($thematicMap.geoJsonObj);
			}
		},
		successStatsArea : function (status, res, options) {
			if (res.errCd == '-401') {
				console.log('-401..successStatsArea..accessToken..Error....');
				accessTokenInfo();
				setTimeout(function () {
					$thematicMap.request.statsArea(options.param);
				}, 500);
			}
			else {
				console.log('successStatsArea', res);
				options["geojson"] = res;
				$thematicMap.ui.sMap.lastGeojsonInfo = options;
				// 경계데이터만 로딩
				$thematicMap.ui.isStatsGeoJson = false;
				
				if (!sop.Util.isUndefined(options.callbackApi)) {
					options.callbackApi();
				}
				$thematicMap.geoJsonObj = res;
				// $thematicMap.ui.setGeoJson(res);
				
			}
		}
	
	};
	
	$thematicMap.Popup = {
		show : function () {
			this.blockUI = document.createElement("DIV");
			this.blockUI.style.backgroundColor = "#D3D3D3";
			this.blockUI.style.border = "0px solid black";
			this.blockUI.style.position = "absolute";
			this.blockUI.style.left = '0px';
			this.blockUI.style.top = '0px';
			if (window.innerHeight == undefined) {
				this.blockUI.style.height = document.documentElement.clientHeight + 'px';
				this.blockUI.style.width = document.documentElement.clientWidth + 'px';
			}
			else {
				this.blockUI.style.height = window.innerHeight + 'px';
				this.blockUI.style.width = window.innerWidth + 'px';
			}
			this.blockUI.style.zIndex = "10000";
			this.blockUI.style.filter = "alpha(opacity=60);";
			this.blockUI.style.MozOpacity = 0.6;
			this.blockUI.style.opacity = 0.6;
			this.blockUI.style.KhtmlOpacity = 0.6;
			document.body.appendChild(this.blockUI);
			
			this.popupUI = document.createElement("DIV");
			this.popupUI.style.backgroundColor = "rgb(255, 255, 255)";
			this.popupUI.style.border = "3px solid rgb(0,0,0)";
			this.popupUI.style.position = "absolute";
			this.popupUI.style.height = '10px';
			this.popupUI.style.lineHeight = '50px';
			this.popupUI.style.paddingBottom = '40px';
			this.popupUI.style.width = '400px';
			this.popupUI.style.top = '50%';
			this.popupUI.style.left = '50%';
			this.popupUI.style.zIndex = "11000";
			this.popupUI.style.cursor = 'wait';
			var divHeight = this.popupUI.style.height.replace('px', '');
			var divWidth = this.popupUI.style.width.replace('px', '');
			this.popupUI.style.margin = '-' + divHeight / 2 + 'px 0 0 -' + divWidth / 2 + 'px';
			this.popupUI.style.textAlign = 'center';
			
			// var errorMsg = "<p>Example message</p><br><img
			// src='../img/loding_type01.GIF'/>";
			var errorMsg = "Please Wait...";
			this.popupUI.innerHTML = errorMsg;
			
			document.body.appendChild(this.popupUI);
		},
		close : function () {
			if (!sop.Util.isUndefined(this.blockUI)) {
				document.body.removeChild(this.blockUI);
				delete this.blockUI;
			}
			if (!sop.Util.isUndefined(this.popupUI)) {
				D.body.removeChild(this.popupUI);
				delete this.popupUI;
			}
		}
	
	};
	/* window console.log 문제해결 */
	if (!window.console) {
		console = {
			log : function () {
			}
		};
	}
}(window, document));
