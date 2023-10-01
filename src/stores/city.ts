import axios from "axios";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

type LocationType = {
    lat: string;
    lon: string;
};

export const useCityStore = defineStore("city", () => {
    const city = ref("");
    const inputError = ref("");
    const rawCities = ref([]);
    const location = reactive<LocationType>({ lat: "", lon: "" });

    const cities = computed(() =>
        rawCities.value.map(({ display_name, lat, lon }) => ({
            display_name,
            lat,
            lon,
        }))
    );

    const fetchCities = async (city: string) => {
        inputError.value = "";
        try {
            const request = await axios.get(
                `https://nominatim.openstreetmap.org/search?city=${city}&format=json`
            );
            if (request.data.length === 0)
                inputError.value = "Ops! Type a valid location";
            rawCities.value = request.data;
        } catch (err) {
            inputError.value = "Ops! Something went wrong";
        }
    };

    const fetchByLocation = async ({ lat, lon }: LocationType) => {
        try {
            const request = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );

            city.value = request.data.display_name;
        } catch (err) {
            console.log(err);
        }
    };

    const setLocation = ({ lat, lon }: LocationType) => {
        location.lat = lat;
        location.lon = lon;
    };

    const setCity = (name: string) => {
        city.value = name;
    };

    return {
        city,
        inputError,
        cities,
        fetchCities,
        setLocation,
        setCity,
        location,
        fetchByLocation,
    };
});
