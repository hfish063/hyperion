//package com.backend.demo.config;
//
//import com.backend.demo.external.dtos.old.BookDescription;
//import com.fasterxml.jackson.core.JacksonException;
//import com.fasterxml.jackson.core.JsonParser;
//import com.fasterxml.jackson.databind.DeserializationContext;
//import com.fasterxml.jackson.databind.JsonDeserializer;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import java.io.IOException;
//
///**
// * Handles inconsistent responses from OpenLibraryApi pertaining to description field data type.
// */
//public class DescriptionDeserializer extends JsonDeserializer<BookDescription> {
//    @Override
//    public BookDescription deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
//        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
//
//        if (node.isTextual()) {
//            return new BookDescription(node.asText()); // handle text case
//        } else if (node.isObject()) {
//            ObjectMapper mapper = (ObjectMapper) jsonParser.getCodec();
//            return mapper.treeToValue(node, BookDescription.class); // handle object case
//        } else {
//            return null;
//        }
//    }
//}
