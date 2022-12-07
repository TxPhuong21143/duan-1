package shop.clothesshop.lib;


import com.google.gson.*;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.time.LocalDate;

@Service
public class GsonMix {
    public static Gson gsonLocalDate() {
        return new GsonBuilder().registerTypeAdapter(LocalDate.class, new JsonDeserializer<LocalDate>() {
            @Override
            public LocalDate deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
                return LocalDate.parse(json.getAsJsonPrimitive().getAsString());
            }
        }).create();
    }
}
