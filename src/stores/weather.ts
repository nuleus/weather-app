import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useCityStore } from "./city";

type WeatherType = {
    temperature: number[];
    time: string[];
    humidity: number[];
    windspeed: number[];
};

type WeatherRequest = {
    lat: string;
    lon: string;
    display_name?: string;
};

export const useWeatherStore = defineStore("weather", () => {
    const city = useCityStore();

    const weather = reactive<WeatherType>({
        temperature: [],
        time: [],
        humidity: [],
        windspeed: [],
    });

    const units = reactive({
        temperature: "",
        humidity: "",
        windspeed: "",
    });

    const tableData = computed(() => {
        return weather.time.map((item, index) => {
            return {
                time: item,
                temperature: weather.temperature[index],
                humidity: weather.humidity[index],
                windspeed: weather.windspeed[index],
            };
        });
    });

    const fetchWeather = async ({ lat, lon, display_name }: WeatherRequest) => {
        city.setLocation({ lat, lon });
        if (display_name) city.setCity(display_name);
        try {
            const request = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&past_days=10&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
            );
            const {
                hourly: {
                    temperature_2m,
                    time,
                    relativehumidity_2m,
                    windspeed_10m,
                },
                hourly_units: {
                    temperature_2m: temperatureUnit,
                    relativehumidity_2m: humidityUnit,
                    windspeed_10m: windspeedUnit,
                },
            } = request.data;

            weather.temperature = temperature_2m;
            weather.humidity = relativehumidity_2m;
            weather.time = time;
            weather.windspeed = windspeed_10m;
            units.temperature = temperatureUnit;
            units.humidity = humidityUnit;
            units.windspeed = windspeedUnit;
        } catch (err) {
            console.log(err);
        }
    };

    return { fetchWeather, weather, units, tableData };
});
