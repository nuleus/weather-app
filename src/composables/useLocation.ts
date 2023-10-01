import { onMounted } from "vue";
import { useWeatherStore } from "./../stores/weather";
import { useCityStore } from "./../stores/city";

export const useLocation = () => {
    const weatherStore = useWeatherStore();
    const cityStore = useCityStore();

    const success = (position: any) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        weatherStore.fetchWeather({ lat, lon, display_name: "" });
        cityStore.fetchByLocation({ lat, lon });
    };

    onMounted(() => {
        navigator.geolocation.getCurrentPosition(success);
    });
};
