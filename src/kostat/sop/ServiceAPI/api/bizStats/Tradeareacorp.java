package kostat.sop.ServiceAPI.api.bizStats;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neighborsystem.durian.exception.AbsAPIException;
import com.neighborsystem.durian.exception.AbsException;
import com.neighborsystem.durian.restapi.api.HttpMethod;

import kostat.sop.ServiceAPI.common.controller.AbsQuery;
import kostat.sop.ServiceAPI.common.util.StringUtil;
import kostat.sop.ServiceAPI.controller.service.BizStatsMapService;
import kostat.sop.ServiceAPI.exception.ApiException;
import kostat.sop.ServiceAPI.exception.NoResultException;

/**
* 상권정보 - 영역, 전국평균 현황 정보 API
* <pre>
* input : TradeareaRatio.json/xml
* output : json/xml
* </pre>
*
* <pre>
* <b>History:</b>
* 김성현, 1.0, 2015/12/04 초기 작성
* </pre>
* 
* @author 김성현
* @version 1.0, 2015/12/04 메서드 추가
* @see None
*/

@SuppressWarnings("rawtypes")
public class Tradeareacorp extends AbsQuery<List>{
private static final Log logger = LogFactory.getLog(Tradeareacorp.class);
	
	//생활업종지도 관련 서비스
	@Resource(name="bizStatsMapService")
	private BizStatsMapService bizStatsMapService;

	@Override
	public String getApiId() {
		// TODO Auto-generated method stub
		return "10006";
	}

	@Override
	public HttpMethod getHttpMethod() {
		// TODO Auto-generated method stub
		return HttpMethod.POST;
	}

	@Override
	public Class getMustParameter() throws AbsException {
		// TODO Auto-generated method stub
		return MustParam.class;
	}

	@Override
	public Class getOptionParameter() throws AbsException {
		// TODO Auto-generated method stub
		return OptionParam.class;
	}

	@Override
	protected String getQueryStr() {
		return null;
	}
	
	enum MustParam
	{
		tradearea_id,
		theme_cd
	}
	
	enum OptionParam
	{
	}
	
	@Override
	public List executeAPI(HttpServletRequest req, HttpServletResponse res,
			String trId) throws AbsException {
		// TODO Auto-generated method stub
		httpSession = req.getSession();

		List result = null;
		try {
			logger.info("START Query - ApiID[" + this.getApiId() + "] ");

			Map mapParameter = getParameterMap(req);

			_checkNullParameterValue(mapParameter);
			
			//영역 내 선택업종 현황
			result = bizStatsMapService.selectTradeAreaCorp(mapParameter);
			
			if(result.size()==0){
				throw new NoResultException();
			}
			logger.info("END Query - TXID[" + getApiId() + "] ");

		} catch (AbsAPIException e) {
			logger.error(e);
			throw e;
		} catch (IllegalArgumentException e) {
			logger.error(e);
			throw new ApiException("입력값을 체크 해 주세요");
		} catch (Exception e) {
			logger.error(e);
			throw new ApiException(StringUtil.getErrMsg());
		}
		return result;
	}

}
