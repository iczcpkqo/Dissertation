package com.dissertation.GraphDBIntegration;

import java.util.HashMap;

public class Helper {

    public static HashMap<String, String> checkRow(HashMap<String, String> row){

        row.forEach((key, val)->{
            if (row.get(key).contains("http://www.example.org/xiangmao/"))
                row.put(key, "\""+ row.get(key) + "\"");
        });

        return row;
    }
}
