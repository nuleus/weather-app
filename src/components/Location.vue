<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCityStore } from "../stores/city";

const store = useCityStore();
const { city, location } = storeToRefs(store);
</script>

<template>
    <div class="mt-16" v-show="city">
        <h2 class="text-white text-2xl font-bold">{{ city }}</h2>
        <p class="text-subtitle mt-2 text-xs">Latitude: {{ location.lat }}</p>
        <p class="text-subtitle text-xs">Longitude: {{ location.lon }}</p>
    </div>
</template>
