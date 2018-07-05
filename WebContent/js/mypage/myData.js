/**
 * mydata 입력 메소드
 * 
 * history : 네이버시스템(주), 1.0, 2015/11/03  초기 작성
 * author : 최재영
 * version : 1.0
 * see : 
 *
 */
var stat="0";
(function(W, D) {
	
	W.$myData = W.$myData || {};
	
	$(document).ready(function() {
		if($(".popBox > div> a").length){
			$myData.popClose();
		}
		
		$("#gioPop1").draggable();
		$("#gioPop2").draggable();
		$("#gioPop3").draggable();
		$("#newSavePop").draggable();
		$("#mpfSubj").val("");
		
	});
	
	$myData = {
			
		file : null,
		fsize : null,
		ftype : null,
		fRealName : null,
		fname : null,
		fileReady : false,
		gioCoding : null,
		gioX : null, //x값 필드
		gioY : null, //y값 필드
		gioField : null,//주소 필드
		geoDataArray : new Array(),//가져온 데이터에 대한 값
		usrData : null,
		metaData : null,
		dispData : new Array(),//표출데이터 설정
		tooltipSetting : new Array(), // 툴팁 표출 설정
		dataVisualSetting : "location",//데이터 시각화 적용 유형
		rdOption : null,
		map : null,
		hot : null,
		myData : null,
		marker : new Array(),
		currentIndex : 0,
		currentSuccessCount : 0,
		failCount  : 0,
		successCount : 0,
		endPointIndex : 0,
		maxCodingRow : 0, //지오코딩할 로우 개수
		lastCodingRow : null, // 마지막 지오코딩 로우
		checkedArrayRow : new Array(),//지오코딩할 로우 Index 배열
		splitString : ",",
		kmlName : null,
		firstX : 0,
		firstY : 0,
		sumField : null,
		
		tot_type : null,
		adm_array : null,
		totReg_array : null,
		
		
		//반복문으로 실행시 인덱스
		loopWork : null,
		loopStart : 1,
		loopLevel : 0,
		loopEnd : 0,
		loopTotalLevel : 0,
		
		//실패한 내용의 array
		failArray : new Array(),
		
		init : function(){
		
		},
	
		openFileBrowser : function() {
			
		},
		
		fileInit : function(){
			
			
		},
		
		fileDownLoad : function(type){
			var url = "/view/mypage/myData/sampleDownLoad?type=sample."+type;
			window.open(url,"_self","enabled");
		},
		
		setFile : function(file){
			
			$myData.fileReady = false;
			$myData.gioCoding = null;
			$myData.gioX = null;
			$myData.gioY = null;
			$myData.gioField = null;
			$myData.dispData = null;
			$myData.tooltipSetting = new Array();
			$myData.dataVisualSetting = "location";
			$myData.rdOption = null;
			$myData.map = null;
			$myData.hot = null;
			$myData.myData = null;
			$myData.marker = new Array();
			$myData.currentSuccessCount = 0;
			$myData.endPointIndex = 0;
			$myData.failCount = 0;
			$myData.successCount = 0;
			$myData.splitString =",";
			$myData.tot_type=null;
			$myData.kmlName = null;
			
			$("#disp_subj_3").show();						 
			$("#disp_content_3").show();
			 
			$("#mapDisp").hide();
			
			if(file.value ==""){
				return;
			}
			var fileName = file.value.substring(file.value.lastIndexOf('\\') + 1);
			var ftype = fileName.substring(fileName.indexOf(".")+1).toLowerCase();
			var size = file.size;
			
			if(ftype == "xls" || ftype == "xlsx" || ftype=="csv" ||ftype=="txt" || ftype=="kml"){
				$myData.file = file;
				$myData.fileName = fileName;
				$myData.ftype = ftype;
				$myData.fsize = size;
				$myData.fileReady = true;
				
				
				if(ftype=="txt"){
					$("#splitSelectBox").show();
					
				}else if(ftype=="kml"){
					$myData.upLoadFile();
					$("#tableRowChange").hide();
				}else{
					$myData.upLoadFile();
					$("#tableRowChange").show();
				}
				
				
			}else{
				alert("지원 하지 않는 파일 형식 입니다");
				$("#mpsFile").val("");
				$myData.fileReady = false;
				return;
			}
		},
		
		checkedBoxCount : function(){
			var count = 0;
			for(var i = 1; i < $myData.myData.length;i++){
				if($myData.myData[i][0] == true){
					count = count + 1;
				}
			}
			$("#maxCodingRow").text(count);
			$myData.maxCodingRow = count;
		},
		setSplit : function(){
			$myData.splitString = $("#splitSelectBox option:selected").val();
			$("#splitSelectBox").hide();
			$myData.upLoadFile();
			$("#tableRowChange").show();
			
		},
		
		gridKml : function(){
			
			 $("#mapSettingDisp").html("<li>kml은 표출 데이터를 <br> 설정 하지 않습니다</li>");
			 $("#mapSettingTooltip").html("<li>kml은 툴팁 데이터를 <br> 설정 하지 않습니다</li>");
			 
			 $("#disp_subj_3").hide();						 
			 $("#disp_content_3").hide();
			 $("#mapRgn_1").hide();
			 $("#mapRgn_2").show();
			 $("#mapSetting").show();
			 
			var mapOptions = {
						statisticTileLayer: true
			};
			
			 var customLayer = sop.geoJson(null, {
					onEachFeature: onEachFeature
				});

				function onEachFeature (feature, layer) {
					var name = feature.properties.name || '';
					var description = feature.properties.description || '';
					layer.bindInfoWindow( name + '<br>' + description);

					layer.on({
						click: function (e) {
							layer.openInfoWindow();
						}
					});
				}
				
			$myData.map = sop.map('mapRgn_2',mapOptions);
			$myData.map.setView([953427, 1950827], 5);
			//kml좌표 구하는거 필요
			
			 var runLayer = sop.kml("/upload/myData/"+$myData.kmlName+".kml_copy",null,customLayer)
	            .on('ready', function(e) {
	                $myData.map.fitBounds(runLayer.getBounds());
	            }).addTo($myData.map);
		},
		
		popGio : function(idx){
			if(idx == 1){
				$("#gioPop1").show();
			}else if(idx ==2){
				$("#gioPop1").hide();
				$("#gioPop2").show();
			}else if(idx ==3){
				$("#gioPop1").hide();
				$("#gioPop3").show();
			}else if(idx ==4){
				$("#gioPop1").hide();
				$("#gioPop4").show();
			}else if(idx ==5){
				$("#gioPop1").hide();
				$("#gioPop5").show();
			}else if(idx ==6){
				$("#gioPop1").hide();
				$("#gioPop6").show();
			}
			
		},
		
		gioBack : function(){
			$myData.setFile( $("#mpsFile")[0] );
			$myData.adm_array = null;
			$myData.tot_type = null;
			
			$("#gioBack").css('display', 'none').hide();
			$("#gioCoding").css('display', '').show();
		},
		
		/**
		 * 
		 * @name         : getGioCode
		 * @description  : 주소로 입력 하였을 경우 Geo코드 가져오기
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		getGioCode : function(field){
			$myData.hot.updateSettings({
		    	cells: function (row, col, prop,td) {
		    		var cellProperties = {};
		    		if (col == $myData.hot.countCols()-4 |col == $myData.hot.countCols()-3 | col == $myData.hot.countCols()-2 | col == $myData.hot.countCols()-1 ) {
		    			cellProperties.editor = false;
		    		}else if(col == 0 && row > 0){
		    			cellProperties.type="checkbox";
		    		}
		    		return cellProperties;
		    	},

			});
			
			$("#basic_handson01").handsontable("render");
			var col = changeWord(field);
			
				if($myData.failArray.length < 1){
					/*$myData.loopTotalLevel = $myData.hot.countRows() / 5;*/
					/*$myData.loopTotalLevel = $myData.hot.countRows() / 10;*/
					$myData.loopTotalLevel = $myData.maxCodingRow / 10;
					$myData.endPointIndex = $myData.maxCodingRow;
				}else{
					/*$myData.loopTotalLevel = $myData.failArray.length /5;*/
					/*$myData.endPointIndex = $myData.maxCodingRow;*/
					$myData.loopTotalLevel = $myData.failArray.length /10;
				}
				
				$myData.loopStart = 1;
				$myData.loopLevel = 1;
				/*$myData.loopEnd = $myData.loopLevel * 5;*/
				$myData.loopEnd = $myData.loopLevel * 10;
				if($myData.loopTotalLevel == 0){
					if($myData.failArray.length < 1){
						/*$myData.loopEnd = $myData.hot.countRows();*/
						$myData.loopEnd = $myData.maxCodingRow;
					}else{
						$myData.loopEnd = $myData.failArray.length;
					}
					
				};
				//2017.04.03 최재영 속도 수정
				$myData.loopWork = setInterval($myData.loopGeoCode,700,col);
		},
		/**
		 * 
		 * @name         : getAdmdrcd
		 * @description  : 주소로 입력 하였을 경우 Geo코드 가져오기
		 * @date         : 2018. 01. 19. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		getAdmdrcd : function(field){
			
			$myData.hot.updateSettings({
		    	cells: function (row, col, prop,td) {
		    		var cellProperties = {};
		    		if (col == $myData.hot.countCols()-4 |col == $myData.hot.countCols()-3 | col == $myData.hot.countCols()-2 | col == $myData.hot.countCols()-1 ) {
		    			cellProperties.editor = false;
		    		}else if(col == 0 && row > 0){
		    			cellProperties.type="checkbox";
		    		}
		    		return cellProperties;
		    	},

			});
			
			$("#basic_handson01").handsontable("render");
			var col = changeWord(field);
			
				if($myData.failArray.length < 1){
					/*$myData.loopTotalLevel = $myData.hot.countRows() / 5;*/
					/*$myData.loopTotalLevel = $myData.hot.countRows() / 10;*/
					$myData.loopTotalLevel = $myData.maxCodingRow / 10;
					$myData.endPointIndex = $myData.maxCodingRow;
				}else{
					/*$myData.loopTotalLevel = $myData.failArray.length /5;*/
					/*$myData.endPointIndex = $myData.maxCodingRow;*/
					$myData.loopTotalLevel = $myData.failArray.length /10;
				}
				
				$myData.loopStart = 1;
				$myData.loopLevel = 1;
				/*$myData.loopEnd = $myData.loopLevel * 5;*/
				$myData.loopEnd = $myData.loopLevel * 10;
				if($myData.loopTotalLevel == 0){
					if($myData.failArray.length < 1){
						/*$myData.loopEnd = $myData.hot.countRows();*/
						$myData.loopEnd = $myData.maxCodingRow;
					}else{
						$myData.loopEnd = $myData.failArray.length;
					}
					
				};
			
				$myData.loopWork = setInterval($myData.loopAdmdrcd,700,col);
			
		},
		
		/**
		 * 
		 * @name         : sumGioCalc
		 * @description  : 지오코딩된 주소를 집계
		 * @date         : 2016. 07. 19. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		sumGioCalc : function(gioField){
			//선택 된 필드의 SUM !!!
			var tempSumArray = new Array();
			
			if($myData.tot_type =="1"){
				//시도
				for(var i =0; i < $myData.hot.countRows()-1; i++){
					var admStrArray = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-1);
					admStrArray = admStrArray.split("_");
					var tempStr = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-2);
					//집계구 코드
					var admStr = admStrArray[0];					
					if($myData.hot.getDataAtCell(i+1,1) == "O"){
						for(var j = 3; j <$myData.hot.countCols()-4;j++){
							if(changeWord(gioField) != j){
								if(i == 0){
									tempSumArray[tempStr.substring(0,2)+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
								}else{
									if(tempSumArray[tempStr.substring(0,2)+"_"+admStr + "_" +j] != undefined){
										tempSumArray[tempStr.substring(0,2)+"_"+admStr + "_" +j] =Number(tempSumArray[tempStr.substring(0,2)+"_"+admStr + "_" +j]) + Number($myData.hot.getDataAtCell(i+1,j));
									}else{
										tempSumArray[tempStr.substring(0,2)+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
									}
								}
							}else{
								tempSumArray[tempStr.substring(0,2)+"_"+admStr + "_" +j] = admStr;
							}
						}
					}
				}
			}else if($myData.tot_type =="2"){
				//시군구
				for(var i =0; i < $myData.hot.countRows()-1; i++){
					var admStrArray = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-1);
					admStrArray = admStrArray.split("_");
					var tempStr = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-2);
					var admStr = admStrArray[0] +" "+ admStrArray[1];
					
					if($myData.hot.getDataAtCell(i+1,1) == "O"){
						/*for(var j = 2; j <$myData.hot.countCols()-4;j++){*/
						for(var j = 3; j <$myData.hot.countCols()-4;j++){
							if(changeWord(gioField) != j){
								if(i == 0){
									tempSumArray[tempStr.substring(0,5)+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
								}else{
									if(tempSumArray[tempStr.substring(0,5)+"_"+admStr + "_" +j] != undefined){
										tempSumArray[tempStr.substring(0,5)+"_"+admStr + "_" +j] =Number(tempSumArray[tempStr.substring(0,5)+"_"+admStr + "_" +j]) + Number($myData.hot.getDataAtCell(i+1,j));
									}else{
										tempSumArray[tempStr.substring(0,5)+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
									}
								}
							}else{
								tempSumArray[tempStr.substring(0,5)+"_"+admStr + "_" +j] = admStr;
							}
						}
					}
				}
			}else if($myData.tot_type =="3"){
				//읍면동
				for(var i =0; i <$myData.hot.countRows()-1; i++){
					var admStrArray = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-1);
					admStrArray = admStrArray.split("_");
					var tempStr = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-2);
					var admStr = admStrArray[0] +" "+ admStrArray[1] + " "+admStrArray[2];
					
					if($myData.hot.getDataAtCell(i+1,1) == "O"){
						/*for(var j = 2; j <$myData.hot.countCols()-4;j++){*/
						for(var j = 3; j <$myData.hot.countCols()-4;j++){
							if(changeWord(gioField) != j){
								if(i == 0){
									tempSumArray[tempStr.substring(0,7)+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
								}else{
									if(tempSumArray[tempStr.substring(0,7)+"_"+admStr + "_" +j] != undefined){
										tempSumArray[tempStr.substring(0,7)+"_"+admStr + "_" +j] =Number(tempSumArray[tempStr.substring(0,7)+"_"+admStr + "_" +j]) + Number($myData.hot.getDataAtCell(i+1,j));
									}else{
										tempSumArray[tempStr.substring(0,7)+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
									}
								}
							}else{
								tempSumArray[tempStr.substring(0,7)+"_"+admStr + "_" +j] = admStr;
							}
						}
					}
				}
			}else if($myData.tot_type =="4"){
				//집계구
				for(var i =0; i < $myData.hot.countRows()-1; i++){
					var admStrArray = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-1);
					admStrArray = admStrArray.split("_");
					var tempStr = $myData.hot.getDataAtCell(i+1,$myData.hot.countCols()-2);
					var admStr = admStrArray[0] +" "+ admStrArray[1] + " "+admStrArray[2];
					
					
					if($myData.hot.getDataAtCell(i+1,1) == "O"){
						/*for(var j = 2; j <$myData.hot.countCols()-4;j++){*/
						for(var j = 3; j <$myData.hot.countCols()-4;j++){
							if(changeWord(gioField) != j){
								if(i == 0){
									tempSumArray[tempStr+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
								}else{
									if(tempSumArray[tempStr+"_"+admStr + "_" +j] != undefined){
										tempSumArray[tempStr+"_"+admStr + "_" +j] =Number(tempSumArray[tempStr+"_"+admStr + "_" +j]) + Number($myData.hot.getDataAtCell(i+1,j));
									}else{
										tempSumArray[tempStr+"_"+admStr + "_" +j] = Number($myData.hot.getDataAtCell(i+1,j));
									}
								}
							}else{
								tempSumArray[tempStr+"_"+admStr + "_" +j] = admStr;
							}
						}
					}
					
				}
			}

			$myData.gioCalcMakeRowData(tempSumArray);
		},
		
		gioCalcMakeRowData : function(tempSumArray){
									
			var gridArray= new Array();
			var headerArray = new Array();
			/*for(var i = 1; i < $myData.hot.countCols()-4; i ++){
				headerArray[i-1] = $myData.hot.getDataAtCell(0,i);
			}*/
			
			for(var i = 2; i < $myData.hot.countCols()-4; i ++){
				if( i == 2 ) {
					headerArray[0] = $myData.hot.getDataAtCell(0,i);
				} else if( changeWord( $myData.gioField ) == i ){
					headerArray[1] = $myData.hot.getDataAtCell(0,i);
				} else if( changeWord( $myData.sumField ) == i ){
					headerArray[2] = $myData.hot.getDataAtCell(0,i);
				}
			}
			
			var rowList = new Array();
			var tempRow = new Array();
			var sumArrayIdx = 0;
			var bTr = false;
			for(var key in tempSumArray){
				if(key != "isEmpty"){
					var admCode = key.split("_")[0];
					var admNm = key.split("_")[1];
					var colCode = key.split("_")[2];

					var row = new Array();
					if(bTr == false){
						var tArray = new Array();
						tArray.push(tempSumArray[key]);
						sumArrayIdx = sumArrayIdx +1;
						tempRow[admNm + "(" + admCode + ")"] = tArray;
					}else{
						if(tempRow[admNm + "(" + admCode + ")"] !=undefined){
							var tArray = new Array();
							tArray.push(tempSumArray[key]);
							var oArray = tempRow[admNm + "(" + admCode + ")"];
							oArray = oArray.concat(tArray);
							tempRow[admNm + "(" + admCode + ")"] = oArray;
							
						}else{
							var tArray = new Array();
							tArray.push(tempSumArray[key]);
							sumArrayIdx = sumArrayIdx +1;
							tempRow[admNm + "(" + admCode + ")"] = tArray;
						}
					}
					bTr = true;
				}
			}
			
			
			$myData.adm_array = new Array();
			var keyIdx = 0;
			var rowList = new Array();
			var gioIdx = 0;
			
			for(var key in tempRow){
				var row = new Array();
				row.push(keyIdx + 1);
				var rObject = new Object();
				if(key !="isEmpty"){
					var inRow = tempRow[key];
					var iKeyIdx = 0;
					
					for(var iKey in inRow){
						if(iKey !="isEmpty"){
							if(iKeyIdx+3 == Number(changeWord($myData.gioField))){
								var startAdmIdx = key.indexOf("(");
								var endAdmIdx = key.indexOf(")");
								var admCode = key.substring(startAdmIdx + 1 , endAdmIdx);
								$myData.adm_array.push(admCode);
								gioIdx = iKeyIdx;
								row[1] = (key);
							}else if( iKeyIdx+3 == Number(changeWord($myData.sumField)) ) {
								row[2] = (inRow[iKey]);
							}
							iKeyIdx = iKeyIdx +1;
						}
					}
					rowList.push(row);
				}
				keyIdx = keyIdx +1;
			}
			
			$myData.dataVisualSetting = "colorFull";
			//선택 빼면 +1
			/*$myData.gioField = changeNumber(gioIdx+2);*/
			$myData.gioField = changeNumber(gioIdx);
			/*$myData.sumField = changeNumber(Number(changeWord($myData.sumField)-1));*/
			$myData.sumField = changeNumber(Number(changeWord($myData.sumField)));
			
			gridArray.push(headerArray);
			gridArray = gridArray.concat(rowList);
			$("#progeress").hide();
			$("#cellModifyButton").hide();
			$myData.handsonTable01(gridArray, true);
		},
		
		/**
		 * 
		 * @name         : getReverseGeoCode
		 * @description  : 좌표로 입력 하였을 경우 Geo코드 가져오기
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 : getgioCode와 중복 되어버림 변경 필요
		 */
		getReverseGeoCode : function(xField,yField){

			$myData.hot.updateSettings({
		    	cells: function (row, col, prop) {
		    		var cellProperties = {};
		    		if (col == $myData.hot.countCols()-4 |col == $myData.hot.countCols()-3 | col == $myData.hot.countCols()-2 | col == $myData.hot.countCols()-1 ) {
		    			cellProperties.editor = false;
		    		}else if(col == 0 && row > 0){
		    			cellProperties.type="checkbox";
		    		}
		    		return cellProperties;
		    	}
			});
			
			$myData.geoDataArray = new Array();
			var col1 = changeWord(xField);
			var col2 = changeWord(yField);
			
			if($myData.failArray.length < 1){
				/*$myData.loopTotalLevel = $myData.hot.countRows() / 5;*/
				/*$myData.loopTotalLevel = $myData.hot.countRows() / 10;*/
				$myData.loopTotalLevel = $myData.maxCodingRow / 10;
				$myData.endPointIndex = $myData.maxCodingRow;
			}else{
				/*$myData.loopTotalLevel = $myData.failArray.length /5;*/
				/*$myData.endPointIndex = $myData.maxCodingRow;*/
				$myData.loopTotalLevel = $myData.failArray.length /10;
			}
			
			$myData.loopStart = 1;
			$myData.loopLevel = 1;
			/*$myData.loopEnd = $myData.loopLevel * 5;*/
			$myData.loopEnd = $myData.loopLevel * 10;
			
			
			
			if($myData.loopTotalLevel == 0){
				if($myData.failArray.length < 1){
					/*$myData.loopEnd = $myData.hot.countRows();*/
					$myData.loopEnd = $myData.maxCodingRow ;
				}else{
					$myData.loopEnd = $myData.failArray.length;
				}
				
			};
			//2017.04.03 최재영 속도 수정
			$myData.loopWork = setInterval($myData.loopReverseGeoCode,700,col1,col2);

			
		},
		
		/**
		 * 
		 * @name         : loopReverseGeoCode
		 * @description  : 리버스 코드 반복문 실행
		 * @date         : 2016. 05. 19. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		loopReverseGeoCode : function(col1,col2){
			if($myData.failArray.length < 1){
				if($myData.lastCodingRow > $myData.loopEnd){
					//2017.03.28 최재영 수정
					for(var i=$myData.loopStart;i<$myData.loopEnd;i++){
						if($myData.checkedArrayRow.length !=0){
							$myData.openApiReverseGeoCode($myData.checkedArrayRow.shift(),col1,col2);
						}
					}
					//2017.03.14 최재영 수정
					/*while($myData.checkedArrayRow.length != 0){
						$myData.openApiReverseGeoCode($myData.checkedArrayRow.shift(),col1,col2);
					}*/
					
					$myData.loopStart = $myData.loopEnd;
					$myData.loopLevel = $myData.loopLevel + 1;
					$myData.loopEnd = $myData.loopLevel * 5;
				}else{
					/*$myData.loopEnd = $myData.hot.countRows();*/
					$myData.loopEnd = $myData.checkedArrayRow.length;
					for(var i=0;i<$myData.loopEnd;i++){
						/*$myData.openApiReverseGeoCode(i,col1,col2);*/
						$myData.openApiReverseGeoCode($myData.checkedArrayRow.shift(),col1,col2);
					}
					clearInterval($myData.loopWork);
				}
			}else{
				//실패할경우 
				if($myData.failArray.length > $myData.loopEnd){
					for(var i =$myData.loopStart-1;i<$myData.loopEnd-1;i++){
						$myData.openApiReverseGeoCode($myData.failArray[i],col1,col2);
					}
					$myData.loopStart = $myData.loopEnd;
					$myData.loopLevel = $myData.loopLevel + 1;
					$myData.loopEnd = $myData.loopLevel * 5;
				}else{
					$myData.loopEnd = $myData.failArray.length;
					//원래 for(var i = $myData.loopStart;i<$myData.loopEnd;i++){
					for(var i = $myData.loopStart-1;i<$myData.loopEnd;i++){
						$myData.openApiReverseGeoCode($myData.failArray[i],col1,col2);
					}
					clearInterval($myData.loopWork);
				} 
			}
			
		},
		
		/**
		 * 
		 * @name         : loopGeoCode
		 * @description  : 리버스 코드 반복문 실행
		 * @date         : 2016. 05. 19. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		loopGeoCode : function(col){
			if($myData.failArray.length < 1){
				if($myData.lastCodingRow > $myData.loopEnd){
					//2017.03.28 최재영 수정
					for(var i=$myData.loopStart;i<$myData.loopEnd;i++){
						if($myData.checkedArrayRow.length != 0){
							$myData.openApiGeocode($myData.checkedArrayRow.shift(),col);
						}
					}
					/*console.log("$myData.checkedArrayRow.length = " + $myData.checkedArrayRow.length);
					while($myData.checkedArrayRow.length != 0){
						$myData.openApiGeocode($myData.checkedArrayRow.shift(),col);
					}*/
					
					$myData.loopStart = $myData.loopEnd;
					$myData.loopLevel = $myData.loopLevel + 1;
					$myData.loopEnd = $myData.loopLevel * 5;

				}else{
					$myData.loopEnd = $myData.checkedArrayRow.length;
					for(var i=0;i<$myData.loopEnd;i++){
						$myData.openApiGeocode($myData.checkedArrayRow.shift(),col);
					}
					
					clearInterval($myData.loopWork);
				}
			}else{
				//실패할경우 
				if($myData.failArray.length > $myData.loopEnd){
					for(var i =$myData.loopStart-1;i<$myData.loopEnd-1;i++){
						$myData.openApiGeocode($myData.failArray[i],col);
					}
					$myData.loopStart = $myData.loopEnd;
					$myData.loopLevel = $myData.loopLevel + 1;
					$myData.loopEnd = $myData.loopLevel * 5;
				}else{
					$myData.loopEnd = $myData.failArray.length;					
					for(var i = $myData.loopStart-1;i<$myData.loopEnd;i++){
						$myData.openApiGeocode($myData.failArray[i],col);
					}
					clearInterval($myData.loopWork);
				} 
			}
		},
		
		/**
		 * 
		 * @name         : loopAdmdrcd
		 * @description  : admdrcd 반복문 실행
		 * @date         : 2018. 01. 18. 
		 * @author	     : 이경현
		 * @history 	 :
		 */
		loopAdmdrcd : function(col){
			if($myData.failArray.length < 1){
				if($myData.lastCodingRow > $myData.loopEnd){
					for(var i=$myData.loopStart;i<$myData.loopEnd;i++){
						if($myData.checkedArrayRow.length != 0){
							$myData.openApiAdmdrcd($myData.checkedArrayRow.shift(),col);
						}
					}
					/*console.log("$myData.checkedArrayRow.length = " + $myData.checkedArrayRow.length);
					while($myData.checkedArrayRow.length != 0){
						$myData.openApiGeocode($myData.checkedArrayRow.shift(),col);
					}*/
					
					$myData.loopStart = $myData.loopEnd;
					$myData.loopLevel = $myData.loopLevel + 1;
					$myData.loopEnd = $myData.loopLevel * 5;
					
				}else{
					$myData.loopEnd = $myData.checkedArrayRow.length;
					for(var i=0;i<$myData.loopEnd;i++){
						$myData.openApiAdmdrcd($myData.checkedArrayRow.shift(),col);
					}
					
					clearInterval($myData.loopWork);
				}
			}else{
				//실패할경우 
				if($myData.failArray.length > $myData.loopEnd){
					for(var i =$myData.loopStart-1;i<$myData.loopEnd-1;i++){
						$myData.openApiAdmdrcd($myData.failArray[i],col);
					}
					$myData.loopStart = $myData.loopEnd;
					$myData.loopLevel = $myData.loopLevel + 1;
					$myData.loopEnd = $myData.loopLevel * 5;
				}else{
					$myData.loopEnd = $myData.failArray.length;					
					for(var i = $myData.loopStart-1;i<$myData.loopEnd;i++){
						$myData.openApiAdmdrcd($myData.failArray[i],col);
					}
					clearInterval($myData.loopWork);
				} 
			}
		},
		
		/**
		 * 
		 * @name         : confirmGioPop
		 * @description  : 위치조회(지오코딩) 확인 버튼을 눌렀을 경우 단계에 따른 처리
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		confirmGioPop : function(step,value){
			//x,y 필드 선택 / 주소 필드 선택
			if(step ==1){
				$myData.gioCoding = value;
				if(value=="xy"){
					$myData.popGio(2);
					
					var html = "";
					for(var i=3; i < $myData.hot.countCols();i++){
						var sWord = changeNumber(i);
						html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
					}
					
					$("#awSelect01").html(html);
					$("#awSelect02").html(html);
					
					
				}else if(value=="addr"){
					$myData.popGio(3);
					
					var html = "";
					for(var i=3; i < $myData.hot.countCols();i++){
						var sWord = changeNumber(i);
						html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
					}
					$("#awSelect03").html(html);
					
				}else if(value=="admdrcd"){
					$myData.popGio(6);
					
					var html = "";
					for(var i=3; i < $myData.hot.countCols();i++){
						var sWord = changeNumber(i);
						html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
					}
					$("#awSelect06").html(html);
					
				}else if(value="sumAddr"){
					var html = "";
					for(var i=3; i < $myData.hot.countCols();i++){
						var sWord = changeNumber(i);
						html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
					}
					$("#awSelect04").html(html);
					$("#sumFieldName").html(html);
					$myData.popGio(4);
					
				}else if(value="admCd"){
					var html = "";
					for(var i=3; i < $myData.hot.countCols();i++){
						var sWord = changeNumber(i);
						html +="<option value='"+sWord+ "'>" +sWord.toUpperCase() +"</option>";
					}
					$("#awSelect05").html(html);
					$myData.popGio(5);
				}
				
				
				$("#gioPop1").hide();
				
			}else if(step ==2){
				////
				$myData.currentSuccessCount = 0;
				$myData.failCount = 0;
				$myData.successCount = 0;
				$("#successCount").text("0");
				$("#failCount").text("0");
				$("#currentCodingRow").text("0");
				
				$myData.checkedArrayRow = new Array();
				for(var i = 1; i < $myData.hot.countRows();i++){
					if($myData.myData[i][0] == true){
						$myData.checkedArrayRow.push(i)
					}
				}
				
				$myData.lastCodingRow = $myData.checkedArrayRow[$myData.checkedArrayRow.length -1];
				//로딩바 삽입구간
				//x,y시 값
				if(value=="gio"){
					$myData.gioX = $("#awSelect01").val();
					$myData.gioY = $("#awSelect02").val();
					$("#gioPop2").hide();
					
					$("#mapDisp").css("display","");
					$myData.getReverseGeoCode($myData.gioX,$myData.gioY);
				}else if(value=="reverse"){
					//주소필드시 값
					$myData.gioField=$("#awSelect03").val();
					$("#gioPop3").hide();
					$myData.getGioCode($myData.gioField);
					//주소 필드를 xy 좌표로 변환 하는 코드가 필요하다.
				}else if(value=="sumAddr"){
					$myData.gioField=$("#awSelect04").val();
					$("#gioPop4").hide();
					$myData.tot_type = ($("#gioType1").val());
					$myData.sumField = $("#sumFieldName").val();
					$myData.getGioCode($myData.gioField);
					
					$("#gioCoding").css("display","none").hide();
					$("#gioBack").css("display","").show();
					
					/*$myData.sumGioCalc($myData.gioField);*/
					
					//주소 지오 정보를 가져오고 집계하는 로직을
				}else if(value=="admdrcd"){
					$myData.gioField=$("#awSelect06").val();
					$("#gioPop6").hide();
					$myData.getAdmdrcd($myData.gioField);
					
					
					/*$myData.sumGioCalc($myData.gioField);*/
					
					//주소 지오 정보를 가져오고 집계하는 로직을
				}else if(value=="admCd"){
					$myData.gioField=$("#awSelect05").val();
					$("#gioPop5").hide();
					//ADM코드를 가지고 와서 집계를 실행 하는 과정을
				}
			}
		},
		
		
		saveSubject : function(){
			$("#mpfSubj").val($("#mpfSubject2").val());
			$myData.confirmMapSetting();
		},
		
		
		/**
		 * 
		 * @name         : confirmMapSetting
		 * @description  : 지도 표출 설정 확인시 최종적으로 데이터 저장
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		confirmMapSetting : function(){
			//표출데이터 설정
			//툴팁표출설정
			//데이터시각화적용유형
			
			$myData.dispData = new Array();
			var radioLength =  $("input[name=rd_pselect]").length;
			for(var i =0;i<radioLength;i++){
				if($("input[name=rd_pselect]").eq(i).attr("checked") == "checked"){
					$myData.dispData[i] = true;
				}else{
					$myData.dispData[i] = false;
				}
			}
			
			$myData.tooltipSetting = new Array();
			var checkLength = $("input[name=rd_pck]").length;
			for(var i = 0; i < checkLength; i++){
				if($("input[name=rd_pck]").eq(i).attr("checked") == "checked"){
					/*$myData.tooltipSetting.push($("input[name=rd_pck]").eq(i).val());*/
					$myData.tooltipSetting[i]=true;
				}else{
					$myData.tooltipSetting[i]=false;
				}
			}
			
			
			var visLength = $("input[name=rd_ptype]").length;
			for(var i = 0; i < visLength; i ++){
				if($("input[name=rd_ptype]").eq(i).attr("checked") == "checked"){
					$myData.dataVisualSetting =$("input[name=rd_ptype]").eq(i).val(); 
				}
			}
			
			
			var rdLength =  $("input[name=rd_option]").length;
			
			$myData.rdOption = new Array();
			
			for(var i = 0 ; i < rdLength ; i ++){
				if($("input[name=rd_option]").eq(i).attr("checked") == "checked"){
					$myData.rdOption.push($("input[name=rd_option]").eq(i).val()); 
				}
			}
			
			//저장시
			$myData.saveMyData();
		},
		
		newSaveData : function(){
			
			var usrData = $myData.makeUsrData2($myData.rowDataArray);
			var metaData = $myData.makeMetaData2($myData.rowHeaderArray);
			
			var newSaveData = new sop.portal.newSaveMyData.api();
			/*newSaveData.addParam("data_title",$("#newSubject").val());*///제목
			newSaveData.addParam("data_title",$("#mpfSubj").val());
			newSaveData.addParam("geoDataArray",JSON.stringify($myData.geoDataArray));//기존의 geoDataArray
			newSaveData.addParam("usr_data",usrData);//usr_data
			newSaveData.addParam("meta_data",metaData);//metaData
			newSaveData.addParam("map_disp_type" ,$myData.dataVisualSetting);
			newSaveData.addParam("dispData",$myData.dispData);//dispData
			newSaveData.addParam("tooltipSetting",$myData.tooltipSetting);//tooltipSetting
			newSaveData.addParam("file_nm_real",$myData.fileName);
			newSaveData.addParam("tot_type",$myData.tot_type);
			newSaveData.addParam("gioField" , $myData.gioField);
			
			newSaveData.request({
				method : "POST",
				async : true,
				url : contextPath + "/ServiceAPI/mypage/myData/newSaveData.json",
				
			});
		},
		
		
		pselect : function(idx){
			var radioLength = $("input[name=rd_pselect]").length;
			for(var i =0;i<radioLength;i++){
				$("input[name=rd_pselect]").eq(i).attr("checked",false);
			}
			$("input[name=rd_pselect]").eq(idx-1).attr("checked","checked");
		},
		
		pck : function(idx){
			var checkLength = $("input[name=rd_pck]").length;
			if($("input[name=rd_pck]").eq(idx -1).attr("checked") == "checked"){
				$("input[name=rd_pck]").eq(idx -1).attr("checked",false);
			}else{
				$("input[name=rd_pck]").eq(idx -1).attr("checked","checked");
			}
			
			var checkedLength = 0;
			$("input:checkbox[name=rd_pck]").each(function(i){
				if($("input[name=rd_pck]").eq(i).attr("checked")){
					checkedLength = checkedLength+1;
				}
			});
			
			
			
			if(checkedLength >3){
				alert("3개 이상 체크 불가");
				$("label[for='rd_pck"+idx+"']").removeClass("on");
				$("input[name=rd_pck]").eq(idx -1).attr("checked",false);
			}
			
			
		},
		
		
		ptype : function(idx){
			var radioLength = $("input[name=rd_ptype]").length;
			for(var i =0;i<radioLength;i++){
				$("input[name=rd_ptype]").eq(i).attr("checked",false);
			}
			$("input[name=rd_ptype]").eq(idx-1).attr("checked","checked");
			$myData.dataVisualSetting =$("input[name=rd_ptype]").eq(idx-1).val(); 
			
		},
		
		rdOptionCheck : function(idx){
			var checkLength = $("input[name=rd_option]").length;
			if($("input[name=rd_option]").eq(idx -1).attr("checked") == "checked"){
				$("input[name=rd_option]").eq(idx -1).attr("checked",false);
			}else{
				$("input[name=rd_option]").eq(idx -1).attr("checked","checked");
			}
		},
		
		popMapMenuSetting : function(){
			var menuData=new Array();
			if($myData.adm_array !=null){
				for(var i =1;i<$myData.hot.countCols();i++){
					menuData[i-1] = $myData.hot.getDataAtCell(0,i); 
				}
			}else{
				for(var i =3;i<$myData.hot.countCols();i++){
					menuData[i-3] = $myData.hot.getDataAtCell(0,i); 
				}
			}
			
			var html = "";
			//표출데이터 설정
			
			
			var i =1;
			for(var j in menuData){
				if(j !="isEmpty"){
					html +='<li>';
					if(i == 1){
						html +=	'<input type="radio" value="'+menuData[j]+'" name="rd_pselect" id="rd_pselect'+i+'" checked="checked" onclick="$myData.pselect('+i+')">';
						html +='<label for="rd_pselect'+i+'" class="on" onclick="$myData.pselect('+i+')">'+menuData[j]+'</label>';
					}else{
						html +=	'<input type="radio" value="'+menuData[j]+'" name="rd_pselect" id="rd_pselect'+i+'" onclick="$myData.pselect('+i+')">';
						html +='<label for="rd_pselect'+i+'" onclick="$myData.pselect('+i+')">'+menuData[j]+'</label>';
					}
					html +='</li>';
				}
				i = i+1;
			}
			
			
			$("#mapSettingDisp").html(html);
			i = 1;
			html = "";
			for( var j in menuData){
				if(j != "isEmpty"){
					html +='<li>';
					if(i == 1){
						html +=	'<input type="checkbox" value="'+menuData[j]+'" name="rd_pck" id="rd_pck'+i+'" checked="checked" >';
						html +='<label for="rd_pck'+i+'" class="on" >'+menuData[j]+'</label>';
					}else{
						html +=	'<input type="checkbox" value="'+menuData[j]+'" name="rd_pck" id="rd_pck'+i+'" >';
						html +='<label for="rd_pck'+i+'" >'+menuData[j]+'</label>';			
					}
					html +='</li>';
				}
				i = i+1;
			}
			
			$("#mapSettingTooltip").html(html);
			
		},
		
		
		
		reMakeMap : function(){
			$myData.map.gMap.remove();
			$myData.createMap("mapRgn_1", 0);
			
			var radioLength = $("input[name=rd_pselect]").length;
			var checkLength = $("input[name=rd_pck]").length;
			var radioValue;
			var checkValue = new Array();
			
			var radioIndex;
			var checkedIndex = new Array();

			for(var i =0;i<radioLength;i++){
				if($("input[name=rd_pselect]").eq(i).attr("checked") =="checked"){
					radioValue = $("input[name=rd_pselect]").eq(i).val();
					radioIndex = i;
				}
			}
			
			if( $myData.gioCoding == 'sumAddr' ){
				radioIndex = 1;
			}
			
			for(var i =0; i<checkLength;i++){
				if($("input[name=rd_pck]").eq(i).attr("checked") =="checked"){
					checkValue.push($("input[name=rd_pck]").eq(i).val());
					checkedIndex.push(i);
				}
			}
			
			if($myData.dataVisualSetting =="location"){
				
				var markerIcon = sop.icon({
					iconUrl: '/js/plugins/jquery-easyui-1.4/images/marker-icon.png',
					shadowUrl: '/js/plugins/jquery-easyui-1.4/images/marker-shadow.png',
					iconAnchor: [12.5, 40 ],
					iconSize: [ 25, 40 ],
					infoWindowAnchor: [1, -34]
				});
				
				/*if($myData.geoDataArray.length >=1){*/
					for (var i = 0; i< $myData.marker.length; i++) {
							var marker = $myData.marker[i];
							marker.remove();
					}
					
					for(var i=1;i<$myData.hot.countRows();i++){
						var marker;
						marker = sop.marker([$myData.hot.getDataAtCell(i,$myData.hot.countCols()-4),$myData.hot.getDataAtCell(i,$myData.hot.countCols()-3)],{
							icon:markerIcon
						});
						
						var html ="";
						html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
						html += 	'<tr>';
						html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' +$myData.hot.getDataAtCell(0,radioIndex+3)+":"+$myData.hot.getDataAtCell(i,radioIndex+3) + '</strong></th>';
						html += 		'<td></td>';
						html += 	'</tr>';
						html += 	'<tr>';
						
						html +='<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">'; 
						for(var x = 0; x<checkedIndex.length; x++){
							if(x != 0){
								html +="<br>";
							}
							html += ""+$myData.hot.getDataAtCell(0,checkedIndex[x]+3)+":"+ $myData.hot.getDataAtCell(i,checkedIndex[x]+3);
						}
						html +="</th>";
						
						html += 		'<td></td>';
						html += 	'</tr>';
						html += '</table>';
						
						marker.bindInfoWindow(html);
						marker.addTo($myData.map.gMap);
						$myData.marker.push(marker);
					}
				/*}*/
				
				//열지도 삭제
				if($myData.map.heatMap){
					$myData.map.heatMap.setUTMKs([]);
				}
			
			}else if($myData.dataVisualSetting =="ratio"){
				
				for(var i=1;i<$myData.hot.countRows();i++){
						$myData.map.addHeatMap($myData.hot.getDataAtCell(i,$myData.hot.countCols()-4),$myData.hot.getDataAtCell(i,$myData.hot.countCols()-3), 1000);
				}
					
				for (var i = 0; i< $myData.marker.length; i++) {
					var marker = $myData.marker[i];
					marker.remove();
				}	
			}else{
				//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
				//adm_cd는 adm_cd로 그냥 가면 된다.
				var resultList = new Array();
				var result = new Array();
				var resultArray = new Array();
			
				for(var i = 0 ; i < $myData.adm_array.length;i++){
					var resultRow = new Array();
					/*resultRow["adm_cd"] = $myData.adm_array[i];*/
					var rowAddressFullCode = $myData.hot.getDataAtCell(i+1,changeWord($myData.gioField));
					var startAdmIdx = rowAddressFullCode.indexOf("(");
					var endAdmIdx = rowAddressFullCode.indexOf(")");
					var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
					resultRow["adm_cd"] = rowAdmCode;
					resultRow["data"] = $myData.hot.getDataAtCell(i+1,radioIndex +1);
					//흠 데이터는 disp로 선택 한 (표출데이터로) 한 경우에만 보여주자 !!!
					//단 첫 집계시의 경우에는 무조건 집계한 필드에 대한 데이터를 가져오는게 좋을것 같다!!
					/*resultRow["data"] = getFirstKeyValue($myData.rowDataArray[i].USR_DATA[radio1Index]);*/
					resultArray[i] = resultRow;
				}
				
				$myData.map.selectedBoundList = [];
				for(var i = 0; i < resultArray.length; i ++){
					resultObject = new Array();
					//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
					if(i == 0){
						resultObject["id"] = "API_MYDATA"
						resultObject["result"] = new Array();
						resultObject["result"].push(resultArray[i]);
						if($myData.tot_type =="1"){
							resultObject["pAdmCd"] = "00";
							resultList["00"] = resultObject;
						}else if($myData.tot_type =="2"){
							resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
							resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
						}else if($myData.tot_type =="3"){
							resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
							resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
						}else if($myData.tot_type =="4"){
							resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
							resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
							
						}
						$myData.map.selectedBoundList.push(resultObject);
						
					}else if(resultList["00"] != undefined){
						resultList["00"].result.push(resultArray[i]);
					}else if(resultList[resultArray[i].adm_cd.substring(0,2)] !=undefined ){
						resultList[resultArray[i].adm_cd.substring(0,2)].result.push(resultArray[i]);
					}else if(resultList[resultArray[i].adm_cd.substring(0,5)] != undefined){
						resultList[resultArray[i].adm_cd.substring(0,5)].result.push(resultArray[i]);
					}else if(resultList[resultArray[i].adm_cd.substring(0,7)] != undefined){
						resultList[resultArray[i].adm_cd.substring(0,7)].result.push(resultArray[i]);
					}else{
							resultObject["id"] = "API_MYDATA";
							resultObject["result"] = new Array();
							resultObject["result"].push(resultArray[i]);
							
							if($myData.tot_type =="1"){
								resultObject["pAdmCd"] = "00";
								resultList["00"] = resultObject;
							}else if($myData.tot_type =="2"){
								resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
								resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
							}else if($myData.tot_type =="3"){
								resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
								resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
							}else if($myData.tot_type =="4"){
								resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
								resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
							}
							$myData.map.selectedBoundList.push(resultObject);
					}
				}

				for(var i in resultList){
					if(i != "isEmpty"){
						switch(resultList[i].pAdmCd.length) {
							case 2:
								if(resultList[i].pAdmCd =="00"){
									$myData.map.curPolygonCode = 1;
								}else{
									$myData.map.curPolygonCode = 2;
								}
								break;
							case 5:
								$myData.map.curPolygonCode = 3;
								break;
							case 7:
								$myData.map.curPolygonCode = 4;
								break;
						}
						
						var options = {
							params : {
								filter : "data",
								unit: "",
								adm_cd : resultList[i].pAdmCd,
								year : "2014"
							}	
						};
						if($myData.dataVisualSetting !="colorFull"){
							$myData.map.legend.selectType = "bubble";
						}else{
							$myData.map.legend.selectType = "color";
						}
						
						$myData.map.multiLayerControl.setStatsData("normal", resultList[i], options, false);
					}
					
				}
			}
		},
		
		/**
		 * 
		 * @name         : popMapGisSetting
		 * @description  : 지도표출 설정시 팝업창을 띄움과 동시에 맵과 마커를 생성 한다.
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		popMapGisSetting : function(){
			if($myData.ftype=="kml"){
				$myData.gridKml();
			}else{
				$myData.popMapMenuSetting();
				
				if( $myData.gioCoding == 'sumAddr' ){
					$("input:radio[name=rd_pselect]").eq(1).prop("checked", "checked");
					$("input:radio[name=rd_pselect]").eq(1).closest('li').find('label').addClass('on');
					$("input:radio[name=rd_pselect]").eq(0).closest('li').css('display','none').hide();
				}
				
				if($myData.tot_type != null){
					$("#contentType_1").hide();
					$("#contentType_2").show();
				} else {
					$("#contentType_1").show();
					$("#contentType_2").hide();
				}
				
				$("#mapSetting").show();
				
				$myData.createMap("mapRgn_1", 0);

				
				$myData.map.gMap.whenReady(function() {
					
					var radio1 = $("input:radio[name=rd_pselect]");
					var radio1Index = radio1.index(radio1.filter(":checked"));
					
					var checkList = new Array();
					$("input:checkbox[name=rd_pck]").each(function(i){
						if(this.checked){
							checkList.push(i);
						}
					});
					
					if($myData.tot_type != null){
						/*$("#rd_ptype1").attr("checked",false);
						$("#rd_ptype2").attr("checked",false);
						$("label[for='rd_ptype1']").removeClass("on");
						$("label[for='rd_ptype2']").removeClass("on");*/
						
						$myData.ptype(3);
						
						//집계된 필드를 값으로 표출 하기 위해서
						/*$myData.pselect(Number(changeWord($myData.sumField)));*/
						//rd_pselect2
						//b = 1 c =2 라벨은 1부터 시작
						//$myData.pselect(2);rd_pselect1
						
						$("label[for='rd_pselect"+changeWord($myData.sumField)+"']").trigger("click");
						$("input[name='rd_pselect']").eq(Number(changeWord($myData.sumField)-1)).trigger("click");
						radio1 = $("input:radio[name=rd_pselect]");
						radio1Index = radio1.index(radio1.filter(":checked"));
						
						//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
						//adm_cd는 adm_cd로 그냥 가면 된다.
						var resultList = new Array();
						var result = new Array();
						var resultArray = new Array();
					
						for(var i = 0 ; i < $myData.adm_array.length;i++){
							var resultRow = new Array();
							//resultRow["adm_cd"] = $myData.adm_array[i];
							var rowAddressFullCode = $myData.hot.getDataAtCell(i+1,changeWord($myData.gioField));
							var startAdmIdx = rowAddressFullCode.indexOf("(");
							var endAdmIdx = rowAddressFullCode.indexOf(")");
							var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
							resultRow["adm_cd"] = rowAdmCode;
							//data 부분을 $myData.sumField
							//그리고 표출 데이터 설정에 해당 부분으로 바꾸어 주어야 한다.
							//var radio1Index = radio1.index(radio1.filter(":checked"));
							//changeWord
							//d 일때 
							resultRow["data"] = $myData.hot.getDataAtCell(i+1,radio1Index +1);
							/*var selectFiled = changeWord($myData.sumField);
							resultRow["data"] = $myData.hot.getDataAtCell(i+1,selectFiled);*/
							resultArray[i] = resultRow;
						}
						
						$myData.map.selectedBoundList = [];
						for(var i = 0; i < resultArray.length; i ++){
							resultObject = new Array();
							//tot_type : null,//1:시도, 2:시군구, 3:읍면동, 4:집계구 ,0:하지 않음
							if(i == 0){
								resultObject["id"] = "API_MYDATA";
								resultObject["result"] = new Array();
								resultObject["result"].push(resultArray[i]);
								if($myData.tot_type =="1"){
									resultObject["pAdmCd"] = "00";
									resultList["00"] = resultObject;
								}else if($myData.tot_type =="2"){
									resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
									resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
								}else if($myData.tot_type =="3"){
									resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
									resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
								}else if($myData.tot_type =="4"){
									resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
									resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
									
								}
								$myData.map.selectedBoundList.push(resultObject);
								
							}else if(resultList["00"] != undefined){
								resultList["00"].result.push(resultArray[i]);
							}else if(resultList[resultArray[i].adm_cd.substring(0,2)] !=undefined ){
								resultList[resultArray[i].adm_cd.substring(0,2)].result.push(resultArray[i]);
							}else if(resultList[resultArray[i].adm_cd.substring(0,5)] != undefined){
								resultList[resultArray[i].adm_cd.substring(0,5)].result.push(resultArray[i]);
							}else if(resultList[resultArray[i].adm_cd.substring(0,7)] != undefined){
								resultList[resultArray[i].adm_cd.substring(0,7)].result.push(resultArray[i]);
							}else{
									resultObject["id"] = "API_MYDATA";
									resultObject["result"] = new Array();
									resultObject["result"].push(resultArray[i]);
									
									if($myData.tot_type =="1"){
										resultObject["pAdmCd"] = "00";
										resultList["00"] = resultObject;
									}else if($myData.tot_type =="2"){
										resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,2);
										resultList[resultArray[i].adm_cd.substring(0,2)] = resultObject;
									}else if($myData.tot_type =="3"){
										resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,5);
										resultList[resultArray[i].adm_cd.substring(0,5)] = resultObject;
									}else if($myData.tot_type =="4"){
										resultObject["pAdmCd"] = resultArray[i].adm_cd.substring(0,7);
										resultList[resultArray[i].adm_cd.substring(0,7)] = resultObject;
									}
									$myData.map.selectedBoundList.push(resultObject);
							}
						}

						for(var i in resultList){
							if(i != "isEmpty"){
								switch(resultList[i].pAdmCd.length) {
									case 2:
										if(resultList[i].pAdmCd =="00"){
											$myData.map.curPolygonCode = 1;
										}else{
											$myData.map.curPolygonCode = 2;
										}
										break;
									case 5:
										$myData.map.curPolygonCode = 3;
										break;
									case 7:
										$myData.map.curPolygonCode = 4;
										break;
								}
								
								var options = {
									params : {
										filter : "data",
										unit: "",
										adm_cd : resultList[i].pAdmCd,
										year : "2014"
									}	
								};
								
								if($myData.dataVisualSetting !="bubble"){
									$myData.map.legend.selectType = "color";
								}else{
									$myData.map.legend.selectType = "bubble";
								}
								$myData.map.multiLayerControl.setStatsData("normal", resultList[i], options, false);
							}
							
						}
						
					}else{
						$myData.ptype(1);
						/*$("#rd_ptype3").attr("checked",false);
						$("#rd_ptype4").attr("checked",false);
						$("label[for='rd_ptype3']").removeClass("on");
						$("label[for='rd_ptype4']").removeClass("on");*/
						
						var markerIcon = sop.icon({
							iconUrl: '/js/plugins/jquery-easyui-1.4/images/marker-icon.png',
							shadowUrl: '/js/plugins/jquery-easyui-1.4/images/marker-shadow.png',
							iconAnchor: [12.5, 40 ],
							iconSize: [ 25, 40 ],
							infoWindowAnchor: [1, -34]
						});
						
							for(var i=1;i<$myData.hot.countRows();i++){
								var marker;
								if($myData.hot.getDataAtCell(i,1)=="O"){
									marker = sop.marker([$myData.hot.getDataAtCell(i,$myData.hot.countCols()-4),$myData.hot.getDataAtCell(i,$myData.hot.countCols()-3)],{
										icon:markerIcon
									});
									
									
									var html ="";
									html += '<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
									html += 	'<tr>';
									html += 		'<th style="word-break:break-all;width:30%;padding:5px;color: #3792de;font-size:14px;"><strong>' +$myData.hot.getDataAtCell(0,radio1Index+3)+":"+$myData.hot.getDataAtCell(i,radio1Index+3) + '</strong></th>';
									html += 		'<td></td>';
									html += 	'</tr>';
									html += 	'<tr>';
									for(var x = 0; x<checkList.length; x++){
										html += 		'<th style="word-break:break-all;white-space: nowrap;width:50px;padding:5px;font-size:12px;">' +$myData.hot.getDataAtCell(0,checkList[x]+3)+":"+ $myData.hot.getDataAtCell(i,checkList[x]+3) + '</th>';
									}
									
									html += 		'<td></td>';
									html += 	'</tr>';
									html += '</table>';
									
									marker.bindInfoWindow(html);
									marker.addTo($myData.map.gMap);
									$myData.marker.push(marker);			
								}
							}
					}
					
				});
			}

		},
		
		
		
		/**
		 * 
		 * @name         : popClose
		 * @description  : 창닫기
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		popClose : function(){
			$("body").on("click",".popBox > div> a",
					function(){
						$(this).parents(".popBox").eq(0).hide();
					}
			)
		},
		hideMap : function(){
			$("#mapSetting").hide();
			if($myData.ftype =="kml"){
				$("#mapRgn_2").hide();
				$myData.map.remove();
				$("#mapRgn_1").show();
			}else{
				$myData.map.gMap.remove();
			}
		},
		
		makeUsrData : function(){
			$myData.geoDataArray=new Array();
			var rowDataSet = new Array();
			for(var i = 1; i<$myData.hot.countRows()+1; i ++){
				if($myData.hot.getDataAtCell(i,1) == "O"){
					var rowData = {};
					var geoData = {};
					for(var j = 3; j < $myData.hot.countCols(); j++){
						var value = $myData.hot.getDataAtCell(i,j);
						
							if(j ==$myData.hot.countCols()-4 ){
								//x
								geoData["x"] = value;
							}else if(j ==$myData.hot.countCols()-3){
								//y
								geoData["y"] = value;
							}else if(j ==$myData.hot.countCols()-2){
								//tot_reg_cd
								geoData["tot_reg_cd"] = value;
								geoData["adm_cd"] = value.substr(0,7);
							}else if(j ==$myData.hot.countCols()-1){
								//adm_nm
								geoData["adm_nm"] =value;
							}
							rowData[$myData.hot.getColHeader(j-1)] = value;
					}
					$myData.geoDataArray.push(geoData);
					rowDataSet.push(rowData);
					
				}	
			}
			return rowDataSet;
		},
		makeUsrData2 : function(){
			$myData.geoDataArray=new Array();
			var rowDataSet = new Array();
			for(var i = 0; i<$myData.hot.countRows()-1; i ++){
				
				var rowAddressFullCode = $myData.hot.getDataAtCell(i+1,changeWord($myData.gioField));
				var startAdmIdx = rowAddressFullCode.indexOf("(");
				var endAdmIdx = rowAddressFullCode.indexOf(")");
				var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
				
				var rowData = {};
				var rowObject = new Object();
				rowObject.ADM_CD = rowAdmCode;
				/*if($myData.tot_type=="4"){
					rowObject.ADM_CD = $myData.adm_array[i].substring(0,7);
				}else{
					rowObject.ADM_CD = $myData.adm_array[i];
				}*/
				
				rowObject.TOT_REG_CD = $myData.adm_array[i];
				rowObject.GEO_X = $myData.firstX;
				rowObject.GEO_Y = $myData.firstY;
				$myData.geoDataArray.push(rowObject);
				for(var j = 0; j < $myData.hot.countCols()-1; j++){
					/*var value = getFirstKeyValue(myData[i].USR_DATA[j]);*/
					var value = $myData.hot.getDataAtCell(i+1,j+1);
					rowData[$myData.hot.getColHeader(j+1)] = value;
				}
				rowDataSet.push(rowData);
				
			}
			
			
			/*rowDataSet.sort();*/
			return JSON.stringify(rowDataSet);
			//console.log(JSON.stringify(rowDataSet));
			/* rowObjList 
			 * {c:대호갈비 옆상가 
			 *  d : 주소
			 *  E : 123
			 *  F : 456
			 * 
			 * */
		},
		
	
		
		makeMetaData : function(){
			
			var rowDataSet = new Array();
			for(var i = 0; i<1; i ++){
				var rowData = {};
				for(var j = 3; j < $myData.hot.countCols(); j++){
					var value =$myData.hot.getDataAtCell(i,j);
					rowData[$myData.hot.getColHeader(j-1)] = value;
				}
				rowDataSet.push(rowData);
			}
			
			return rowDataSet;
			/*
			 * {c:명칭
			 *  d:주소
			 *  e:x좌표
			 *  f:y좌표
			 * }
			 */
		},
		
		makeMetaData2 : function(){
			
			var rowDataSet = new Array();
			for(var i = 0; i<1; i ++){
				var rowData = {};
				for(var j = 1; j < $myData.hot.countCols(); j++){
					var value =$myData.hot.getDataAtCell(i,j);
					rowData[$myData.hot.getColHeader(j)] = value;
				}
				rowDataSet.push(rowData);
			}
			
			return JSON.stringify(rowDataSet);
			/*
			 * {c:명칭
			 *  d:주소
			 *  e:x좌표
			 *  f:y좌표
			 * }
			 */
		},
		
		
		makeCheckData : function(){
			
		},
		
		
		
		/**
		 * 
		 * @name         : saveMyData
		 * @description  : 설정된 데이터와 엑셀 파일을 DB 에 저장
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		saveMyData : function(){
			
			if($("#mpfSubj").val().trim()==""){
				/*alert("제목을 입력 하세요.");*/
				$("#newSavePop").show();
				return;
			}
			
			var usrData = null;
			var metaData = null;
			
			$myData.onBlockUIPopup();
			
			if($myData.adm_array ==null){
				if($myData.ftype !="kml"){
					usrData = $myData.makeUsrData();
					metaData = $myData.makeMetaData();
				}
				
				var checkData = $myData.makeCheckData();
				
				$("#fileForm").ajaxForm({
					async : false,
					type : "POST",
					url : "/view/mypage/myData/fileUpload",
					contentType:"application/json",
					dataType:"json",
					data: {
						gioCoding : $myData.gioCoding,
						gioX	:	$myData.gioX,
						gioY	:	$myData.gioY,
						gioField: 	$myData.gioField,
						dispData: 	$myData.dispData,
						tooltipSetting :	$myData.tooltipSetting,
						dataVisualSetting: 	$myData.dataVisualSetting,
						rdOption : $myData.rdOption,
						geoDataArray : JSON.stringify($myData.geoDataArray),
						usrData : JSON.stringify(usrData),
						metaData : JSON.stringify(metaData)
					},
					success : function(data){
						
					},
					error:function(xhr, textStatus, error){
						
					},
					complete : function(data){
						$("#mapSetting").hide();
						$("#newSavePop").hide();
						messageConfirm.open(
				    			 "알림", 
				    			 "목록으로 이동 하시겠습니까?" +
				    			 "편집하기 버튼을 누르면 저장된 데이터를 편집 합니다..",
				    			 btns = [
									{
									    title : "목록으로",
									    fAgm : null,
									    disable : false,
									    func : function() {
									    	location.href="/view/mypage/myData/dataList";
									    }
									 },
									 
				    			     {
									   title : "편집하기",
									   fAgm : null,
									   disable : false,
									   func : function() {
										   location.href = "/view/mypage/myData/dataModify?data_uid="+data.responseText;
									   }
				    			     }   
				    			 ],
				    			 function(){
				    				 location.href="/view/mypage/myData/dataList";
				    			 }
				    	);
						//location.href = "/view/mypage/myData/dataModify?data_uid="+data.responseText;
						//location.href="/view/mypage/myData/dataList";
					}
					
				
				}).submit();
			}else{
				$myData.newSaveData();
			}
			
		},
		
		/**
		 * 
		 * @name         : upLoadFile
		 * @description  : 엑셀을 서버로 전송 후 엑셀내 데이터를 배열로 돌려 받기 
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		upLoadFile : function(){
			
			if($myData.fileReady == true && $("#mpfSubj").val !=""){
				$("#fileForm").ajaxForm({
					async: false,
					type:"POST",
					url:"/view/mypage/myData/getMetaData",
					contentType: "application/json",
					dataType:'json',
					/*data: {
						"subject": $("#mpfSubj").val()
						
					},*/
					
					data : {
						"splitString" : $myData.splitString
					},
					
					success : function(data){
						if($myData.ftype =="kml"){
							$myData.kmlName = data.user_id;
						}
						
						$myData.orgnData = data.data;
						$myData.handsonTable01(data.data);
					},
					complete:function(){
						
					},
					error: function(xhr, textStatus, error) {
						alert("데이터가 맞지 않습니다.");
			        }
					
					
				}).submit();
		
			}else{
				alert("전송 불가");
				return;
			}
			
		},
		
		/**
		 * 
		 * @name         : handsonTable01
		 * @description  : 엑셀에 있는 데이터를 웹 화면상 표출
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		handsonTable01 : function(obj, btnHide){
			
			if($myData.ftype=="kml"){
				document.getElementById('basic_handson01').innerHTML = "<textarea disabled cols='118' rows='10' style='resize: none;wrap:hard'>"+obj+"</textarea>";
				$("#gioCoding").hide();
				$("#mapDisp").show();
				//여기서 kml 전용 Map 을 보여 주면 된다 !!!
			}else{
				/*document.getElementById('basic_handson01').innerHTML = "";*/
				var container = document.getElementById('basic_handson01');
					
					
				/*var data = function() {
					 return Handsontable.helper.createSpreadsheetData(100, 12);
				}; */
		
				$myData.myData = obj;
				
				$("#maxCodingRow").text($myData.myData.length-1);
				$myData.maxCodingRow = $myData.myData.length-1;
				  handHeight = 30*10;
				  handHeight = handHeight + 10;
			
				  
				for(var i =0; i < $myData.myData.length; i ++){
					var mData = $myData.myData[i];
					 if($myData.dataVisualSetting =="location" || $myData.dataVisualSetting =="ratio"){
						 if(i ==0){
								$myData.myData[i].unshift("선택");
							 }else{
								$myData.myData[i].unshift(true);
							 }
					 }
				} 
				  
				  $myData.hot = new Handsontable(container, {
					  data : $myData.myData,
					  height : handHeight,
					  colHeaders : true,
					  rowHeaders : true,
					  stretchH : 'all',
					  columnSorting : true,
					  contextMenu:false,
					  currentRowClassName: 'currentRow',
					  outsideClickDeselects: false,
					  search: true,
					  cells : function(row,col,prop){
						 var cellProperties ={};
						  if(col ===0 && row != 0){
							  cellProperties.readOnly = false;
							  cellProperties.type ="checkbox";
						  }else{
							  cellProperties.readOnly = false;
						  }
						  return cellProperties;
					  },
					  //2017.04.03 최재영 수정
					  afterRender : function(){
						  $('#basic_handson01 input[type=checkbox]').click(function () {
							  setTimeout("$myData.checkedBoxCount()",100);
					    });
					  }
				  }); 
				  
				  if($myData.dataVisualSetting !="location" && $myData.dataVisualSetting !="ratio"){
					  $myData.hot.updateSettings({
					    	cells: function (row, col, prop,td) {
					    		var cellProperties = {};
					    		if (col == changeWord($myData.gioField)) {
					    			cellProperties.editor = false;
					    			cellProperties.renderer = customRenderer;
					    		}/*else if(col === 0 && row != 0){
					    			cellProperties.readOnly = false;
									cellProperties.type ="checkbox";
					    		}*/
					    		return cellProperties;
					    	},
						});
				  }
				  
				  
				  $("#basic_handson01").handsontable("render");
				  
				  if( !btnHide ){
					  $("#gioCoding").css("display","");
				  }
				  
				  /*$myData.hot.updateSettings({
					  columnSorting: false
				  });*/
				  //$myData.hot.sort(0,false);
			} 
		},
		
		handsonTable02 : function(sumArray){
			document.getElementById('basic_handson01').innerHTML = "";
		},
		
		createRow : function(){
			var emptyRow = new Array();
			for(var i =0;i<$myData.hot.countCols();i++){
				emptyRow[changeNumber(i)] = "";
			}
			$myData.myData.push(emptyRow);
			$("#basic_handson01").handsontable("render");
			/*$("#maxCodingRow").text($myData.hot.countRows()-1);*/
		},
		removeRow : function(){
			
			/*if($myData.hot.countRows() >1){
				var selection = $myData.hot.getSelected();
				$myData.endPointIndex = $myData.endPointIndex -1;
				var currentRowIndex = $myData.hot.countRows()-1;
				if(selection != undefined){
					if(selection[1] == 0 && selection[3] == ($myData.hot.countCols()-1) && selection[0] !=0){
						currentRowIndex = selection[0];
						$myData.hot.alter('remove_row', selection[0]);
						$("#basic_handson01").handsontable("render");

					}else{
						$myData.myData.pop();
						$("#basic_handson01").handsontable("render");
					}
				}else{
					if($myData.hot.getDataAtCell(currentRowIndex,0) == "O"){
						var currentNo = $myData.hot.getDataAtCell(currentRowIndex,1);
						for(var idx in $myData.geoDataArray){
							if($myData.geoDataArray[idx].No != undefined){
								if($myData.geoDataArray[idx].No == currentNo){
									$myData.geoDataArray.splice(idx,1);
								}
							}
						}
					}
					
					$myData.myData.pop();
					$("#basic_handson01").handsontable("render");
				}
				$("#maxCodingRow").text($myData.hot.countRows() -1);
			}*/
			
			var count = 0;
			
			for(var i = 1; i < $myData.hot.countRows(); i ++){
				if($myData.myData[i][0] == true){
					count = count + 1;
				}
			}
			
			messageConfirm.open(
					"알림",
					"현재 삭제할 행은 총 " +count+ "입니다.<br> 삭제 하시겠습니까?",
					btns = [
						{
							title : "삭제",
							fAgm : null,
							disable : false,
							func : function(opt){
								var myDataTemp = new Array();
								myDataTemp.push($myData.myData[0]);
								myDataTemp[0].shift();
								for(var i = 1; i < $myData.hot.countRows(); i ++){
									if($myData.myData[i][0] == false){
										$myData.myData[i].shift();
										$myData.myData[i][1] = myDataTemp.length;
										myDataTemp.push($myData.myData[i]);
									}else{
										
									}
								}
								
								$("#basic_handson01").handsontable("render");
								//destory
								$myData.hot.destroy();
								$myData.handsonTable01(myDataTemp);
								
								/*var chkTargetList = $myData.hotCheckList($myData.myData);	
								
								var tempDataList = $myData.myData.filter(function(item,idx){
									return chkTargetList.indexOf(idx) === -1;
								});*/
								
							}
						},
						{
							title : "취소",
							fAgm : null,
							disable : false,
							func : function(opt){
								
							}
						}
					]
			
			
			);
			
			
			/*var checkCount = $(".htCheckboxRendererInput:checkbox:checked").length;*/
			/*$(".htCheckboxRendererInput : checked").each({
				function(index){
					
				}
			});*/
			
			/*alert(checkCount);*/
		},
		
		/**
		 * @name         : hotCheckList
		 * @description  : handsonTable 체크박스 선택된 리스트 return
		 * @date         : 2017. 01. 06. 
		 * @author	     : 김성현
		 * @param	dataList
		 */
		/*hotCheckList : function(dataList) {
			var that = $myData;
			
			
			var chkTargetList = [];
			for(var i = 0; i < that.dataList.length; i ++) {
				if(that.dataList[i][0] == true) {
					chkTargetList.push(i);
				}
			}
			return chkTargetList;
		},*/
		createCol : function(){
			$myData.hot.alter('insert_col',$myData.hot.countRows());
			$("#basic_handson01").handsontable("render");
		},
		removeCol : function(){
			$myData.hot.alter('remove_col',$myData.hot.countRows());
			$("#basic_handson01").handsontable("render");

		},
		
		
		/**
		 * 
		 * @name         : searchFailRow
		 * @description  : 지오코딩 실패한 ROW 검색 
		 * @date         : 2016. 06. 13. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		searchFailRow : function(){
			var queryResult = [];
			var queryMethod = Handsontable.Search.global.getDefaultQueryMethod();
			for (var rowIndex = 0; rowIndex < $myData.hot.countRows(); rowIndex++) {
			        var cellData = $myData.hot.getDataAtCell(rowIndex, 1);
			        var cellProperties = $myData.hot.getCellMeta(rowIndex, 1);
			        //var cellCallback = cellProperties.search.callback || callback;
			        var cellQueryMethod = cellProperties.search.queryMethod || queryMethod;
			        var testResult = cellQueryMethod("X", cellData);
			        if (testResult) {
			          queryResult.push(rowIndex);
			        }
			    }
			
			$myData.failArray = new Array();
			for(var i = 0; i < queryResult.length; i ++ ){
				$myData.failArray[i] = queryResult[i];
			}
			
			$myData.currentSuccessCount = 0;
			$myData.failCount = 0;
			$myData.successCount = 0;
			$("#successCount").text("0");
			$("#failCount").text("0");
			$("#currentCodingRow").text("0");
			$("#maxCodingRow").text($myData.failArray.length);
			
			if($myData.gioCoding=="xy"){
				$myData.getReverseGeoCode($myData.gioX,$myData.gioY);
			}else{
				$myData.getGioCode($myData.gioField);
			}
		},
		
		/**
		 * 
		 * @name         : showFailButton
		 * @description  : 실패 한 행이 있을 경우 수정 버튼을 보여주는 버튼 
		 * @date         : 2016. 06. 13. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		showFailButton : function(){
			if($myData.failCount > 0){
				$("#searchFailButton").show();
			}else{
				$("#searchFailButton").hide();
			}
		},
		
		/**
		 * 
		 * @name         : createMap
		 * @description  : 맵 및 맵에 오버레이될 그래프, 범례 등을 생성한다.
		 * @date         : 2015. 11. 10. 
		 * @author	     : 최재영
		 * @history 	 :
		 */
		createMap : function(id, seq) {
			$myData.map = new sMap.map();
			
			
			$myData.map.createMap($myData, id, {
				center : [$myData.firstX,$myData.firstY],
				zoom : 8, //9->8
				measureControl : false,
				statisticTileLayer: true
			});
			
			
			
			$myData.map.createHeatMap();
			$myData.map.id = seq;
			
			var legend = new sLegendInfo.legendInfo($myData.map);
			legend.initialize($myData);
			/*legend.createLegend();*/
			
			$myData.map.legend = legend;
			$myData.map.legend.numberData = true;
			$myData.map.legend.legendColor = ["#CCCCCC","#C5BAC0","#BFA9B5","#B998AA","#B3879E","#AD7693","#A76588","#A1547C","#9B4371","#953266"];
			
			//버블 그리기 재정의
			$myData.map.legend.drawBubbleMap = function(geojson){
				var searchYear = "";
	    		var delegate = $myData.map.delegate.ui;
	    		if (delegate != undefined && delegate.curDropParams != undefined && delegate.curDropParams[$myData.map.id] != undefined) {
					for(var i = 0; i < delegate.curDropParams[$myData.map.id].param.length; i ++) {
						if (delegate.curDropParams[$myData.map.id].param[i].key == "year") {
							searchYear = delegate.curDropParams[$myData.map.id].param[i].value + "년 ";
						}
					}	
				}
	    		
	    		geojson.eachLayer(function(layer) {
		    		var info = null;
		    		var data = null;
		    		var unit = null;
		    		var color = layer.options.fillColor;
		    		var idx = 0;
		    		var x = layer.feature.properties.x;
		    		var y = layer.feature.properties.y;
		    		var adm_nm = layer.feature.properties.adm_nm;

		    		if (layer.feature.info.length > 0) {
		    			
		    			var radioLength = $("input[name=rd_pselect]").length;
						var checkLength = $("input[name=rd_pck]").length;
						var radioValue;
						var checkValue = new Array();
						
						var radioIndex;
						var checkList = new Array();
						
						for(var i =0;i<radioLength;i++){
							if($("input[name=rd_pselect]").eq(i).attr("checked") =="checked"){
								radioValue = $("input[name=rd_pselect]").eq(i).val();
								radioIndex = i;
							}
						}
						
						for(var i =0; i<checkLength;i++){
							if($("input[name=rd_pck]").eq(i).attr("checked") =="checked"){
								checkValue.push($("input[name=rd_pck]").eq(i).val());
								checkList.push(i);
							}
						}
						
						
						
						var sMessage = "";
						for(var i = 0; i<$myData.adm_array.length;i++){
							var rowAddressFullCode = $myData.hot.getDataAtCell(i+1,changeWord($myData.gioField));
							var startAdmIdx = rowAddressFullCode.indexOf("(");
							var endAdmIdx = rowAddressFullCode.indexOf(")");
							var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
							
							if(rowAdmCode == layer.feature.properties.adm_cd){
		    					/*if($myData.adm_array[i] == layer.feature.properties.adm_cd){*/
		    						for(var j = 0; j<checkList.length; j++){
		    							sMessage +="<tr style='font-size:12px;padding-left:5px;'>";
		    							sMessage +="<td>";
		    							/*sMessage +=$myData.hot.getDataAtCell(0,changeWord(getFirstKey($myData.rowDataArray[i].USR_DATA[checkList[j]])));*/
		    							sMessage +=$myData.hot.getDataAtCell(0,checkList[j] +1);
		    							sMessage +=":";
		    							/*sMessage +=getFirstKeyValue($myData.rowDataArray[i].USR_DATA[checkList[j]]);*/
		    							sMessage +=$myData.hot.getDataAtCell(i+1,checkList[j] +1);
		    							sMessage +="</td>";
		    							sMessage +="</tr>";
		    						}
		    					}
						}
		    			
		    				info = layer.feature.info[0];
			    			data = info[info.showData];
				    		unit = info.unit;
				    		
				    		var toolTip  = "<table style='margin:10px;'>";
			    			toolTip +=sMessage;
			    			toolTip += "</table>";
		    			
			    			
			    		for (var i=0; i<$myData.map.legend.legendColor.length; i++) {
			    			if (color == $myData.map.legend.legendColor[i]) {
			    				idx = i;
			    				break;
			    			}
			    		}
			    			
			    		var marker = $myData.map.addCircleMarker(x, y, {
			    			radius : $myData.map.legend.legendCircleRadius[idx],
			    			fillColor : color,
			    			weight : 2,
			    			tooltipMsg : toolTip 
			    		});
			    		$myData.map.legend.circleMarkerGroup.push(marker);
		    		}
		    	});	 
	    		
			}
			
		},
		
		callbackFunc : {
			didMouseOverPolygon : function(event, data, type, map) {
				
				var radioLength = $("input[name=rd_pselect]").length;
				var checkLength = $("input[name=rd_pck]").length;
				var radioValue;
				var checkValue = new Array();
				
				var radioIndex;
				var checkList = new Array();
				
				for(var i =0;i<radioLength;i++){
					if($("input[name=rd_pselect]").eq(i).attr("checked") =="checked"){
						radioValue = $("input[name=rd_pselect]").eq(i).val();
						radioIndex = i;
					}
				}
				
				for(var i =0; i<checkLength;i++){
					if($("input[name=rd_pck]").eq(i).attr("checked") =="checked"){
						checkValue.push($("input[name=rd_pck]").eq(i).val());
						checkList.push(i);
					}
				}
				
				
				
				var html ='<table style="text-align:left;width:auto;white-space: nowrap;word-break:break-all;padding:5px;" >';
				
				if(data.info.length >=1){
						for(var i =0;i<$myData.adm_array.length;i++){
							
							var rowAddressFullCode = $myData.hot.getDataAtCell(i+1,changeWord($myData.gioField));
							var startAdmIdx = rowAddressFullCode.indexOf("(");
							var endAdmIdx = rowAddressFullCode.indexOf(")");
							var rowAdmCode = rowAddressFullCode.substring(startAdmIdx +1 ,endAdmIdx);
							
							if($myData.tot_type !="4"){
								if(rowAdmCode == data.info[0].adm_cd){
									html +=data.properties.adm_nm;
									for(var x = 0; x<checkList.length; x++){
										html +="<br>";
										html += $myData.hot.getDataAtCell(0,checkList[x]+1);
										html +=":";
										/*html +=getFirstKeyValue($myData.rowDataArray[i].USR_DATA[checkList[x]]);*/
										html += $myData.hot.getDataAtCell(i+1,checkList[x]+1);
									}
								}
							}else{
								if(rowAdmCode == data.info[0].adm_cd){
									html +=data.properties.adm_nm;
									for(var x = 0; x<checkList.length; x++){
										html +="<br>";
										/*html += $myData.hot.getDataAtCell(0,changeWord(getFirstKey($myData.rowDataArray[i].USR_DATA[checkList[x]])));*/
										html += $myData.hot.getDataAtCell(0,checkList[x]+1);
										html +=":";
										/*html +=getFirstKeyValue($myData.rowDataArray[i].USR_DATA[checkList[x]]);*/
										html += $myData.hot.getDataAtCell(i+1,checkList[x]+1);
									}
								}
							}
						}
				}
				
				html +="</table>";
				
				event.target.bindToolTip(html, {
					direction: 'right',
					noHide:true,
					opacity: 1

				}).addTo($myData.map.gMap)._showToolTip(event);
				
				
			}
	},
		
		sessionIncrease: function() {
			var sopPortalSessionInfoObj = new sop.portal.sessionIncrease.api();
			sopPortalSessionInfoObj.request({
				method : "POST",
				async : false,
				url : contextPath + "/ServiceAPI/auth/sessionInfo.json"
			});
		},
		
		openApiGeocode : function(currentRow,addressCol){
			
			if(accessToken == "none"){
				accessTokenInfo(function() {
					$myData.openApiGeocode(currentRow,addressCol);
				});
				return;
			}
			
			/*openApiPath = "//sgisapi.kostat.go.kr";*/ 	//운영서버
			dataYear = "2013";
			if($myData.failArray.length < 1){
				/*$myData.endPointIndex = $myData.myData.length-1;*/// 다른걸로 바꾸고
				/*$myData.endPointIndex = $myData.lastCodingRow;*/
			}else{
				$myData.endPointIndex = $myData.failArray.length-1;// 다른걸로 바꾸고
				if($myData.endPointIndex == 0){
					$myData.endPointIndex =1;
				}
			}
			
			$myData.onBlockUIPopup();
			var sopOpenApiGeocodeObj = new sop.openApi.openApiuserGeocode.api();
			
			if(currentRow % 100 == 0){
				$myData.sessionIncrease();
			}
			
			
			//$myData.myData[currentRow][addressCol] // 여기 있는 값을 변경 해야 함
			//집계한 데이터에 주소(집계구코드) 가 들어가 있는 경우 건물 주소를 검색 하여 제거한다.
			var colData = $myData.myData[currentRow][addressCol];
			if($myData.gioCoding == "sumAddr" || $myData.gioCoding == "addr"){
				var strIdx = colData.indexOf('(');
				
				if(strIdx != -1){
					colData = colData.substring(0,strIdx);
				}
			}else{
				
			}
			sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
			/*sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent($myData.myData[currentRow][addressCol])));*/
			sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent(colData)));
			sopOpenApiGeocodeObj.request({
		        method : "GET",
		        async : false,
		        url : openApiPath+"/OpenAPI3/addr/geocode.json",
		        options : {
		        	address : $myData.myData[currentRow][addressCol],
		        	addressCol : addressCol,
		        	index : currentRow,
		        	maxIdx : $myData.endPointIndex
		        }
		    });
			
		},
		openApiAdmdrcd : function(currentRow,addressCol){
			/*if(accessToken == "none"){
				accessTokenInfo(function() {
					$myData.openApiAdmdrcd(currentRow,addressCol);
				});
				return;
			}*/ 
			
			/*openApiPath = "//sgisapi.kostat.go.kr";*/ 	//운영서버
		//	dataYear = "2013";
			if($myData.failArray.length < 1){
				/*$myData.endPointIndex = $myData.myData.length-1;*/// 다른걸로 바꾸고
				/*$myData.endPointIndex = $myData.lastCodingRow;*/
			}else{
				$myData.endPointIndex = $myData.failArray.length-1;// 다른걸로 바꾸고
				if($myData.endPointIndex == 0){
					$myData.endPointIndex =1;
				}
			}
			$myData.onBlockUIPopup();
			//여기
			var openApiAdmdrcd = new sop.openApi.openApiAdmdrcd.api();
			
			if(currentRow % 100 == 0){
				$myData.sessionIncrease();
			}
			
			
			//$myData.myData[currentRow][addressCol] // 여기 있는 값을 변경 해야 함
			//집계한 데이터에 주소(집계구코드) 가 들어가 있는 경우 건물 주소를 검색 하여 제거한다.
			var colData = $myData.myData[currentRow][addressCol];
		/*	if($myData.gioCoding == "sumAddr" || $myData.gioCoding == "addr"){
				var strIdx = colData.indexOf('(');
				
				if(strIdx != -1){
					colData = colData.substring(0,strIdx);
				}
			}else{
				
			}*/
			
			//여기 할 차례
			
		//	sopOpenApiGeocodeObj.addParam("accessToken", accessToken);
			/*sopOpenApiGeocodeObj.addParam("address", encodeURIComponent(encodeURIComponent($myData.myData[currentRow][addressCol])));*/
			openApiAdmdrcd.addParam("code", encodeURIComponent(encodeURIComponent(colData)));
			openApiAdmdrcd.request({
				method : "POST",
				async : false,
				url : "/ServiceAPI/admdrcd/admdrcd.json",
				options : { 
					address : $myData.myData[currentRow][addressCol],
					addressCol : addressCol,
					index : currentRow,
					maxIdx : $myData.endPointIndex
				}
			});
			
		},
		
		
		
		// OpenAPI 리버스지오코딩
		openApiReverseGeoCode : function (currentRow,xCol,yCol) {
			//운영
			/*openApiPath = "//sgisapi.kostat.go.kr";*/ 	//운영서버
			dataYear = "2013";
			if($myData.failArray.length < 1){
				/*$myData.endPointIndex = $myData.myData.length-1;*/// 다른걸로 바꾸고
				/*$myData.endPointIndex = $myData.lastCodingRow;*/
				
			}else{
				$myData.endPointIndex = $myData.failArray.length-1;// 다른걸로 바꾸고
				if($myData.endPointIndex == 0){
					$myData.endPointIndex =1;
				}
			}
			
			$myData.onBlockUIPopup();
			var sopOpenApiReverseGeoCodeObj = new sop.openApi.myDataReverseGeoCode.api();
			
			if(currentRow % 100 == 0){
				$myData.sessionIncrease();
			}
			/*console.log("x_coor = " + $myData.hot.getDataAtCell(currentRow,xCol));
			console.log("y_coor = " + $myData.hot.getDataAtCell(currentRow,yCol));*/
			
			sopOpenApiReverseGeoCodeObj.addParam("accessToken", accessToken);
			sopOpenApiReverseGeoCodeObj.addParam("addr_type", "20");
			
			sopOpenApiReverseGeoCodeObj.addParam("x_coor", $myData.hot.getDataAtCell(currentRow,xCol));
			sopOpenApiReverseGeoCodeObj.addParam("y_coor", $myData.hot.getDataAtCell(currentRow,yCol));
			
			sopOpenApiReverseGeoCodeObj.request({
				method : "GET",
				async : false,
				url : openApiPath + "/OpenAPI3/addr/rgeocode.json",
				options : {
					x:$myData.hot.getDataAtCell(currentRow,xCol),
					y:$myData.hot.getDataAtCell(currentRow,yCol),
					xCol:xCol,
					yCol:yCol,
					idx : currentRow,
					maxIdx : $myData.endPointIndex
				}
			});
		},
		
		
		// OpenAPI 소지역구 sop.openApi.findcodeinsmallarea.api
		openApifindcodeinsmallarea : function (idx,x_coor,y_coor) {
			
			//openApiPath = "http://localhost:8080/SOPOpenAPI"; 		//개발서버
			/*openApiPath = "//sgisapi.kostat.go.kr"; 	*///운영서버
			dataYear = "2014";
			
			var openApifindcodeinsmallarea = new sop.openApi.findcodeinsmallarea.api();
			openApifindcodeinsmallarea.addParam("accessToken", accessToken);
			openApifindcodeinsmallarea.addParam("x_coor", x_coor);
			openApifindcodeinsmallarea.addParam("y_coor", y_coor);
			
			openApifindcodeinsmallarea.request({
				method : "GET",
				async : false,
				url : openApiPath + "/OpenAPI3/personal/findcodeinsmallarea.json",
				options : {
					idx : idx,
					x_coor : x_coor,
					y_coor : y_coor
				}
			});
		},
		
		
		  onBlockUIPopup : function(){
	        	var elements = document.getElementById("durianMask");
	        	var id = null;
	        	if (elements != null) {
	        		id = elements.getAttribute('id');
	        	}
	        	
	        	if (id != "durianMask") {
	        		 this.blockUI = document.createElement("DIV");
	                 this.blockUI.id = "durianMask";
	                 this.blockUI.style.backgroundColor = "#D3D3D3";
	                 this.blockUI.style.border = "0px solid black";
	                 this.blockUI.style.position = "absolute";
	                 this.blockUI.style.left = '0px';
	                 this.blockUI.style.top = '0px';

	                 if(window.innerHeight == undefined){
	                 	this.blockUI.style.height = document.body.scrollHeight + 'px';
	                     this.blockUI.style.width = document.documentElement.clientWidth + 'px';
	                 }else{
	                 	this.blockUI.style.height = document.body.scrollHeight + 'px';
	                 	this.blockUI.style.width = document.documentElement.clientWidth + 'px';
	                 }
	                 this.blockUI.style.zIndex = "10000";
	                 this.blockUI.style.filter = "alpha(opacity=60);";
	                 this.blockUI.style.MozOpacity = 0.6;
	                 this.blockUI.style.opacity = 0.6;
	                 this.blockUI.style.KhtmlOpacity = 0.6;
	                 document.body.appendChild(this.blockUI);
	        	
	                 this.popupUI=document.createElement("DIV");

	                 this.popupUI.style.position = "absolute";
	                 this.popupUI.style.height = '10px';
	                 this.popupUI.style.lineHeight = '50px';
	                 this.popupUI.style.paddingBottom='40px';
	                 this.popupUI.style.width ='400px';
	                 this.popupUI.style.top ='50%';
	                 this.popupUI.style.left = '50%';
	                 this.popupUI.style.zIndex = "11000";
	                 
	                 var errorMsg = "<img src='/img/common/loding_type01.gif'/>";
	                 this.popupUI.innerHTML=errorMsg;
	                 document.body.appendChild(this.popupUI);
	        	}
	           
	        },
	        
	        
	        onBlockUIClose : function() {
	        	
				if(!$d.util.isUndefined(this.blockUI)) {
					D.body.removeChild(this.blockUI);
					delete this.blockUI;
				}
				if(!$d.util.isUndefined(this.popupUI)) {
					D.body.removeChild(this.popupUI);
					delete this.popupUI;
				}
			}
	        
		
		
	},
	
	/** ********* 세션 시간 증가 ********* */
	(function () {
		$class("sop.portal.sessionIncrease.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res) {
				var result = res.result;
				if (res.errCd == "0") {
					// 2016. 03. 24 j.h.Seok modify
					if (result.sessionId == null) {
						Authobj = {
							authStatus : false
						}
					} else {
						Authobj = {
							authStatus : true
						}
					}

					AuthInfo = Authobj;
					getSession(Authobj.authStatus);
				}
				else {
					messageAlert.open("알림", res.errMsg);
				}
			},
			onFail : function (status) {
			}
		});
	}());
	
	

	/** ********* OpenAPI 지오코딩 Start ********* */
	(function() {
	    $class("sop.openApi.openApiuserGeocode.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	if(res.errCd == "0") {
	        		var idx = options.index;
	        		
	        		var maxIdx = options.maxIdx;
	        		$myData.hot.setDataAtCell(options.index,1,"진행중");
	        		$myData.hot.setDataAtCell(options.index,$myData.hot.countCols()-4,res.result.resultdata[0].x);
	        		$myData.hot.setDataAtCell(options.index,$myData.hot.countCols()-3,res.result.resultdata[0].y);
	        		$myData.firstX =  res.result.resultdata[0].x;
	        		$myData.firstY =  res.result.resultdata[0].y;
	        		
	        		$myData.openApifindcodeinsmallarea(options.index,res.result.resultdata[0].x,res.result.resultdata[0].y);
	        	}else if(res.errCd == "-401"){
	        		accessTokenInfo(function() {
	        			$myData.openApiGeocode(options.index,options.addressCol);
	        		});
	        	}else{
	        		//failCount +
	        		var idx = options.index;
	        		var maxIdx = options.maxIdx;
	        		$myData.failCount = $myData.failCount + 1;
	        		$("#failCount").text($myData.failCount);
	        		if($myData.currentSuccessCount <= maxIdx){
	        			$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
						$("#currentCodingRow").text($myData.currentSuccessCount);
						
						$myData.hot.setDataAtCell(options.index,1,"X");
						if($myData.currentSuccessCount !=maxIdx){
							//$myData.openApiGeocode(options.index +1 ,options.addressCol);
						}else{
							$myData.onBlockUIClose();
	        				$("#mapDisp").css("display","");
	        				$myData.showFailButton();
	        				//
	        				if($myData.gioCoding == "sumAddr"){
	        					$myData.sumGioCalc($myData.gioField);
	        				}
	        				$myData.failArray = new Array();
	        				//끝났을떄
						}
	        		}else{	
	        			$myData.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				$myData.showFailButton();
        				//
        				if($myData.gioCoding == "sumAddr"){
        					$myData.sumGioCalc($myData.gioField);
        				}
        				$myData.failArray = new Array();
        				//끝났을때
	        		}
	        	}
	        	
	        	
	        },
	        onFail : function(status, options) {
        		//failCount +
	        	$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
	        	$("#currentCodingRow").text($myData.currentSuccessCount);
	        	$myData.failCount = $myData.failCount + 1;
	        	$("#failCount").text($myData.failCount);
	        	var idx = options.index;
        		
        		
        		var maxIdx = options.maxIdx;
        		if($myData.currentSuccessCount <=maxIdx){
        			$myData.hot.setDataAtCell(options.index,1,"X");
        			if($myData.currentSuccessCount !=maxIdx){
						//$myData.openApiGeocode(options.index +1 ,options.addressCol);
					}else{
						$myData.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				$myData.showFailButton();
        				//
        				if($myData.gioCoding == "sumAddr"){
        					$myData.sumGioCalc($myData.gioField);
        				}
        				$myData.failArray = new Array();
        				//끝났을때
					}
        			
        		}else{
        			$myData.onBlockUIClose();
    				$("#mapDisp").css("display","");
    				$myData.showFailButton();
    				//
    				if($myData.gioCoding == "sumAddr"){
    					$myData.sumGioCalc($myData.gioField);
    				}
    				$myData.failArray = new Array();
    				//끝났을때
        		}
	        }
	    });
	}());
	
	
	
	/** ********* OpenAPI openAdmdrcd Start ********* */
	(function() {
		$class("sop.openApi.openApiAdmdrcd.api").extend(sop.portal.absAPI).define({
			onSuccess : function(status, res, options) {
				if(res.errCd == "0") {
					var idx = options.index;
					
					var maxIdx = options.maxIdx;
					$myData.hot.setDataAtCell(options.index,1,"진행중");
					
					if(res.result.resultdata == null){
						//failCount +
						var idx = options.index;
						var maxIdx = options.maxIdx;
						$myData.failCount = $myData.failCount + 1;
						$("#failCount").text($myData.failCount);
						if($myData.currentSuccessCount <= maxIdx){
							$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
							$("#currentCodingRow").text($myData.currentSuccessCount);
							
							$myData.hot.setDataAtCell(options.index,1,"X");
							if($myData.currentSuccessCount !=maxIdx){
								//$myData.openApiGeocode(options.index +1 ,options.addressCol);
							}else{
								$myData.onBlockUIClose();
								$("#mapDisp").css("display","");
								$myData.showFailButton();
								//
								if($myData.gioCoding == "sumAddr"){
									$myData.sumGioCalc($myData.gioField);
								}
								$myData.failArray = new Array();
								//끝났을떄
							}
						}else{	
							$myData.onBlockUIClose();
							$("#mapDisp").css("display","");
							$myData.showFailButton();
							//
							if($myData.gioCoding == "sumAddr"){
								$myData.sumGioCalc($myData.gioField);
							}
							$myData.failArray = new Array();
							//끝났을때
						}
					}else{
						$myData.hot.setDataAtCell(options.index,$myData.hot.countCols()-4,res.result.resultdata.x);
						$myData.hot.setDataAtCell(options.index,$myData.hot.countCols()-3,res.result.resultdata.y);
						$myData.firstX =  res.result.resultdata.x;
						$myData.firstY =  res.result.resultdata.y;
						
						$myData.openApifindcodeinsmallarea(options.index,res.result.resultdata.x,res.result.resultdata.y);
					}
					
					
					
					
				}else if(res.errCd == "-401"){
					accessTokenInfo(function() {
						$myData.openApiGeocode(options.index,options.addressCol);
					});
				}else{
					//failCount +
					var idx = options.index;
					var maxIdx = options.maxIdx;
					$myData.failCount = $myData.failCount + 1;
					$("#failCount").text($myData.failCount);
					if($myData.currentSuccessCount <= maxIdx){
						$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
						$("#currentCodingRow").text($myData.currentSuccessCount);
						
						$myData.hot.setDataAtCell(options.index,1,"X");
						if($myData.currentSuccessCount !=maxIdx){
							//$myData.openApiGeocode(options.index +1 ,options.addressCol);
						}else{
							$myData.onBlockUIClose();
							$("#mapDisp").css("display","");
							$myData.showFailButton();
							//
							if($myData.gioCoding == "sumAddr"){
								$myData.sumGioCalc($myData.gioField);
							}
							$myData.failArray = new Array();
							//끝났을떄
						}
					}else{	
						$myData.onBlockUIClose();
						$("#mapDisp").css("display","");
						$myData.showFailButton();
						//
						if($myData.gioCoding == "sumAddr"){
							$myData.sumGioCalc($myData.gioField);
						}
						$myData.failArray = new Array();
						//끝났을때
					}
				}
				
				
			},
			onFail : function(status, options) {
				//failCount +
				$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
				$("#currentCodingRow").text($myData.currentSuccessCount);
				$myData.failCount = $myData.failCount + 1;
				$("#failCount").text($myData.failCount);
				var idx = options.index;
				
				
				var maxIdx = options.maxIdx;
				if($myData.currentSuccessCount <=maxIdx){
					$myData.hot.setDataAtCell(options.index,1,"X");
					if($myData.currentSuccessCount !=maxIdx){
						//$myData.openApiGeocode(options.index +1 ,options.addressCol);
					}else{
						$myData.onBlockUIClose();
						$("#mapDisp").css("display","");
						$myData.showFailButton();
						//
						if($myData.gioCoding == "sumAddr"){
							$myData.sumGioCalc($myData.gioField);
						}
						$myData.failArray = new Array();
						//끝났을때
					}
					
				}else{
					$myData.onBlockUIClose();
					$("#mapDisp").css("display","");
					$myData.showFailButton();
					//
					if($myData.gioCoding == "sumAddr"){
						$myData.sumGioCalc($myData.gioField);
					}
					$myData.failArray = new Array();
					//끝났을때
				}
			}
		});
	}());
	
	
	
	/** ********* OpenAPI 리버스지오코딩 Start ********* */
	(function () {
		$class("sop.openApi.myDataReverseGeoCode.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
				if (res.errCd == "0") {
					var idx = options.idx;
					var maxIdx = options.maxIdx;
					$myData.hot.setDataAtCell(options.idx,1,"진행중");
					$myData.firstX = options.x;
					$myData.firstY = options.y;
					
					$myData.hot.setDataAtCell(options.idx,$myData.hot.countCols()-4,options.x);
					$myData.hot.setDataAtCell(options.idx,$myData.hot.countCols()-3,options.y);
					$myData.openApifindcodeinsmallarea(options.idx,options.x,options.y);
					
					/*if(idx <=maxIdx){
						$myData.openApifindcodeinsmallarea(options.idx,options.x,options.y);
						if(idx !=maxIdx){
							//$myData.openApiReverseGeoCode(options.idx+1,options.xCol,options.yCol);
						}	
					}*/
				}
				else if (res.errCd == "-401") {
					accessTokenInfo(function() {
						$myData.openApiReverseGeoCode(options.idx,options.xCol,options.yCol);
	        		});
				}
				else {
					var idx = options.idx;
					idx = idx+1;
					var maxIdx = options.maxIdx;
					$myData.failCount = $myData.failCount + 1;
					$("#failCount").text($myData.failCount);
					if($myData.currentSuccessCount <= maxIdx){
	        			$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
						$("#currentCodingRow").text($myData.currentSuccessCount);
						$myData.hot.setDataAtCell(options.idx,1,"X");
						if($myData.currentSuccessCount !=maxIdx){
							//2017.03.28 최재영 수정
							//$myData.openApiReverseGeoCode(options.idx+1,options.xCol,options.yCol);
						}else{
							$myData.onBlockUIClose();
	        				$("#mapDisp").css("display","");
	        				$myData.showFailButton();
	        				$myData.failArray = new Array();
	        				//끝났을때
						}
						
					}else{
						$myData.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				$myData.showFailButton();
        				$myData.failArray = new Array();
        				//끝났을때
					}
					
					
					
				}
			},
			onFail : function (status) {
				$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
				$myData.failCount = $myData.failCount + 1;
				$("#failCount").text($myData.failCount);
				$("#currentCodingRow").text($myData.currentSuccessCount);
				
				var idx = options.idx;
				idx = idx+1;
				var maxIdx = options.maxIdx;
				if($myData.currentSuccessCount <= maxIdx){
        			$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
					$("#currentCodingRow").text($myData.currentSuccessCount);
					$myData.hot.setDataAtCell(options.idx,1,"X");
					if($myData.currentSuccessCount !=maxIdx){
						//$myData.openApiReverseGeoCode(options.idx+1,options.xCol,options.yCol);
					}else{
						$myData.onBlockUIClose();
        				$("#mapDisp").css("display","");
        				$myData.showFailButton();
					}
					
				}else{
					$myData.onBlockUIClose();
    				$("#mapDisp").css("display","");
    				$myData.showFailButton();
				}
				
			}
		});
	}());
	
	/** ********* OpenAPI 소지역구 Start ********* */
	(function () {
		$class("sop.openApi.findcodeinsmallarea.api").extend(sop.portal.absAPI).define({
			onSuccess : function (status, res, options) {
							
				if (res.errCd == "0") {
					$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
					$("#currentCodingRow").text($myData.currentSuccessCount);
						
					try{
						/*$myData.hot.setDataAtCell(options.idx,0,"O");*/
						$myData.hot.setDataAtCell(options.idx,1,"O");
						$myData.hot.setDataAtCell(options.idx,$myData.hot.countCols()-2,res.result.tot_reg_cd);
						$myData.hot.setDataAtCell(options.idx,$myData.hot.countCols()-1,res.result.sido_nm+"_"+res.result.sgg_nm+"_"+res.result.emdong_nm);
						
						$myData.successCount = $myData.successCount + 1;
						$("#successCount").text($myData.successCount);
						
					}catch(err){
						//충청북도에 대한 데이터가 미존재 하여 예외처리
						/*$myData.hot.setDataAtCell(options.idx,0,"X");*/
						$myData.hot.setDataAtCell(options.idx,1,"X");
						$myData.failCount = $myData.failCount + 1;
						$("#failCount").text($myData.failCount);
					}
					
					//sido_nm: "서울특별시"
					//sgg_nm: "마포구"
					//emdong_nm: "성산2동"
					/*console.log("성공개수 : "+Number($myData.successCount) +":: 실패 개수 = "+ Number($myData.failCount) +":: 끝 = "+$myData.maxCodingRow);*/
					if(Number($myData.successCount) + Number($myData.failCount) == $myData.endPointIndex ){
						$myData.onBlockUIClose();
	    				$("#mapDisp").css("display","");
	    				$myData.showFailButton();
	    				//
	    				if($myData.gioCoding == "sumAddr"){
	    					$myData.sumGioCalc($myData.gioField);
	    				}
	    				$myData.failArray = new Array();
	    				//끝났을때
	    				
					}
					
				}
				else if (res.errCd == "-401") {
					/*$myData.hot.setDataAtCell(options.idx,0,"X");*/
					accessTokenInfo(function() {
						$myData.openApifindcodeinsmallarea(options.idx,options.x_coor,options.y_coor);
	        		});
				} else {
					$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
					$myData.failCount = $myData.failCount + 1;
					$("#failCount").text($myData.failCount);
					$("#currentCodingRow").text($myData.currentSuccessCount);					
					$myData.hot.setDataAtCell(options.idx,1,"X");
					
					if(Number($myData.successCount) + Number($myData.failCount) == $myData.endPointIndex ){
						$myData.onBlockUIClose();
	    				$("#mapDisp").css("display","");
	    				$myData.showFailButton();
	    				//
	    				if($myData.gioCoding == "sumAddr"){
	    					$myData.sumGioCalc($myData.gioField);
	    				}
	    				$myData.failArray = new Array();
	    				//끝났을때
	    				
					}
				}
			},
			onFail : function (status,options) {
				
				$myData.currentSuccessCount = $myData.currentSuccessCount + 1;
				$myData.failCount = $myData.failCount + 1;
				$("#failCount").text($myData.failCount);
				$("#currentCodingRow").text($myData.currentSuccessCount);
				
				$myData.hot.setDataAtCell(options.idx,1,"X");
				
				if(Number($myData.successCount) + Number($myData.failCount) == $myData.endPointIndex ){
					$myData.onBlockUIClose();
    				$("#mapDisp").css("display","");
    				$myData.showFailButton();
    				//
    				if($myData.gioCoding == "sumAddr"){
    					$myData.sumGioCalc($myData.gioField);
    				}
    				$myData.failArray = new Array();
    				//끝났을때
    				
				}
			}
		});
	}());
	
	/** ********* 집계 데이타Data 업데이트 ********* */
	(function() {
	    $class("sop.portal.newSaveMyData.api").extend(sop.portal.absAPI).define({
	        onSuccess : function(status, res, options) {
	        	location.href="/view/mypage/myData/dataList";
	        	if(res.errCd == "0") {
	        		
	        	}else if(res.errCd == "-401"){
	        		
	        	}
	        },
	        onFail : function(status, options) {
	        }
	        
	    });
	}());
	
	
}(window, document));;


function inputEvent(){
	$("body").on("click",".radio label",function(){
		
		$(this).parents("ul").eq(0).find("label").removeClass("on");
		$(this).addClass("on");
		
		var ckName = $(this).attr("for");
		var ckStr = ckName.split("_");
		if(ckStr.length >1){
			if(stat =="0"){
				
				if(ckStr[1].replace(/[0-9]/g, "") =="ptype"){
					$myData.ptype(ckName.replace(/[^0-9]/g,''));
				}else{
					$myData.pselect(ckName.replace(/[^0-9]/g,''));
				}
				
			}
		}else{
			$("#"+ckName).attr("checked","checked");
		}
		
		
    });
	$("body").on("click",".ckbox label",function(){
		
		var ck = $(this).hasClass("on"); 
		if(!ck){
			$(this).addClass("on");
		}else{
			$(this).removeClass("on");
		}
		
		var ckName = $(this).attr("for");
		var ckStr = ckName.split("_");
		if(ckStr.length >1){
			if(stat =="0"){
				$myData.pck(ckName.replace(/[^0-9]/g,''));
			}
		}else{
			if(ckName == 'sharedChecked'){
				$myData.rdOptionCheck(1);
			}else if(ckName == 'useHistoryChecked'){
				$myData.rdOptionCheck(2);
			}else{
				$("#"+ckName).attr("checked","checked");
			}
		}
		
    });
	
/*	$(".htCheckboxRendererInput").chage(function(){
		var count = 0;
		for(var i = 1; i < $myData.myData.length;i++){
			if($myData.myData[i][0] == true){
				count = count + 1;
			}
		}
		$("#maxCodingRow").text(count);
	});*/
	//2017.04.03 최재영 주석 처리
	/*$("body").on("click", ".htCheckboxRendererInput", function() {
		//클릭시 전체 체크된 개수와  선택된 행 리턴
		setTimeout("$myData.checkedBoxCount()",100);
		
	});*/
}


