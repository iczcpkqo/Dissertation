package com.dissertation.GraphDBIntegration;

import org.eclipse.rdf4j.repository.RepositoryConnection;
import org.eclipse.rdf4j.repository.http.HTTPRepository;
import org.eclipse.rdf4j.query.Binding;
import org.eclipse.rdf4j.query.BindingSet;
import org.eclipse.rdf4j.query.TupleQueryResult;
import org.eclipse.rdf4j.model.Value;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class QueryHandler {

    public ArrayList<HashMap<String,String>> executeQuery(String queryID, Map<String,String> params) throws Exception {
        ArrayList<HashMap<String,String>> result = new ArrayList<>();
        HTTPRepository repository = new HTTPRepository("http://SmurfsPC:7200/repositories/dev_22072805");

        RepositoryConnection connection = (RepositoryConnection) repository.getConnection();
        try {
            System.out.println("params " + params.keySet());
            System.out.println("queryID " +queryID);
            String query = resolveQuery(queryID,params);

            System.out.println(query);
            TupleQueryResult tupleQueryResult = QueryUtil.evaluateSelectQuery(connection,query);
            HashMap<String,String> temp = new HashMap<>();
            while (tupleQueryResult.hasNext()) {
                BindingSet bindingSet = tupleQueryResult.next();
                temp = new HashMap<>();
                for (Binding binding : bindingSet) {
                    String name = binding.getName();
                    Value value = binding.getValue();

                    System.out.println(name + " = " + value);
                    String ans = value.toString().contains("^^") ? value.toString().split("\\^\\^")[0] : value.toString();
                    name = "\"" + name + "\"";
                    temp.put(name,ans);
                }
                result.add(temp);
            }


            tupleQueryResult.close();

        } finally {
            connection.close();
        }
        return result;
    }

    private String resolveQuery(String query, Map<String,String> params){

        return switch (query) {
            case "homelist" ->  "PREFIX rr: <http://www.w3.org/ns/r2rml#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
                        "PREFIX xmd: <http://www.example.org/xiangmao/ont#>\n" +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +
                        "SELECT DISTINCT ?subject ?sub_type ?sub_name\n" +
                        "WHERE { \n" +
                        "            ?subject a xmd:"+ params.get("subType") +";\n" +
                        "                     a ?sub_type;\n" +
                        "                     ?predicate ?object;\n" +
                        "                     xmd:name ?sub_name.\n" +
//                        "            FILTER(CONTAINS(STR(?sub_name), \""+ params.get("sch") +"\"))\n" +
                    "            FILTER(CONTAINS(STR(?sub_name), \""+ URLDecoder.decode(params.get("sch"), StandardCharsets.UTF_8) +"\"))\n" +

                        "}\n" +
                        "ORDER BY(?subject)\n" +
                        "LIMIT 106\n";

            case "allchildren" ->

                        "PREFIX rr: <http://www.w3.org/ns/r2rml#>\n" +
                        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
                        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>\n" +
                        "PREFIX xmd: <http://www.example.org/xiangmao/ont#>\n" +
                        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n" +

                        "SELECT ?predicate ?object ?obj_type ?obj_name\n" +
                        "WHERE { \n" +
                                    "<"+ URLDecoder.decode(params.get("subject"), StandardCharsets.UTF_8)  +"> ?predicate ?object.\n" +
                                    "?object a ?obj_type;\n" +
                                    "xmd:name ?obj_name.\n" +
                        "}\n" +
                        "ORDER BY(?object)\n" +
                        "LIMIT 106";

            default -> "SELECT * WHERE {?s ?p ?o }";
        };
    }
}