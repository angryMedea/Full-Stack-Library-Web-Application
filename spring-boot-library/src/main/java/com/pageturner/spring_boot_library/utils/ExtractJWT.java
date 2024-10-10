package com.pageturner.spring_boot_library.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT {
    public static String payloadJWTExtraction(String token,String extraction) {

//        // 获取当前的认证信息
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//
//        // 检查是否为 JwtAuthenticationToken 类型
//        if (authentication instanceof JwtAuthenticationToken jwtToken) {
//
//            // 从 JWT 中提取声明（claims）
//            Object claimValue = jwtToken.getToken().getClaim(extraction);
//
//            // 返回提取的字段值
//            return claimValue != null ? claimValue.toString() : null;
//        }
//        return null;

        // 以下是手动分割法，很麻烦而且容易出错
        token.replace("Bearer ", "");

        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        String[] entries = payload.split(",");
        Map<String, String> map = new HashMap<String, String>();

        for (String entry : entries) {
            String[] keyValue = entry.split(":");
            if (keyValue[0].equals(extraction)) {

                int remove = 1;
                if (keyValue[1].endsWith("}")) {
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0, keyValue[1].length() - remove);
                keyValue[1] = keyValue[1].substring(1);

                map.put(keyValue[0], keyValue[1]);
            }
        }
        if (map.containsKey(extraction)) {
            return map.get(extraction);
        }
        return null;
    }
}
