<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCityStore } from "../stores/city";
import { useWeatherStore } from "../stores/weather";

const showDropdown = ref(false);
const isListActive = ref(false);

const cityStore = useCityStore();
const weatherStore = useWeatherStore();

const { cities, inputError } = storeToRefs(cityStore);

const shouldHide = () => {
    if (isListActive.value) return;
    showDropdown.value = false;
};
</script>

<template>
    <div class="relative w-full">
        <input
            type="text"
            v-debounce:500.cancelonempty="cityStore.fetchCities"
            placeholder="Give permission to location or type a city..."
            class="w-full bg-transparent rounded-md border-input text-white border-2 p-3 outline-none"
            @focus="showDropdown = true"
            @blur="shouldHide"
        />
        <span class="text-red-500">{{ inputError }}</span>
        <ul
            class="absolute w-full rounded-md border-input border-2 bg-background z-10"
            v-show="showDropdown && cities.length"
            @mouseover="isListActive = true"
            @mouseleave="isListActive = false"
        >
            <li
                v-for="{ lat, lon, display_name } in cities"
                class="p-3 text-white cursor-pointer hover:bg-input"
                @click="
                    weatherStore.fetchWeather({ lat, lon, display_name }),
                        (showDropdown = false)
                "
            >
                {{ display_name }}
            </li>
        </ul>
    </div>
</template>
