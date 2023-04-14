package com.example.BBGG_Backend.gps.controller;

import com.example.BBGG_Backend.gps.service.MarkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/vworld")
@Api(value = "VWorld API", tags = { "VWorld" })
public class coordController {
    @Autowired
    private MarkService markService;


   @GetMapping("/req/data")
    @ApiOperation(value = "Get Feature Data from VWorld API", notes = "Get Feature Data from VWorld API")
    public ResponseEntity<String> getFeatureData(
            @RequestParam(required = false) String parameter1
            // 요청 파라미터가 더 있을 경우 계속 추가
    ) {

        // 요청 URL 생성
        String url = "http://api.vworld.kr/req/data?service=data&request=GetFeature&data=LT_C_ADEMD_INFO&key=" + "7F82299F-E3DB-3A90-B881-2EC64DD905A9" + "&domain=" + "http://localhost:8080" + "&attrFilter=full_nm:=:";
        if (parameter1 != null) {
            url +=parameter1;
        }

        // 요청 보내기
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response;
    }
}

