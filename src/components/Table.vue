<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useWeatherStore } from "../stores/weather";
import { format } from "date-fns";

const weatherStore = useWeatherStore();
const { tableData, units } = storeToRefs(weatherStore);
</script>

<template>
    <table class="w-full mt-7" v-show="tableData.length">
        <thead>
            <tr
                class="text-white border-b border-input text-xs opacity-50 text-left"
            >
                <th class="py-2">Date</th>
                <th class="py-2">Temperature [{{ units.temperature }}]</th>
                <th class="py-2">Humidity [{{ units.humidity }}]</th>
                <th class="py-2 text-right">
                    Windspeed [{{ units.windspeed }}]
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="text-white text-xs border-b border-input hover:bg-input"
                v-for="{ time, temperature, humidity, windspeed } in tableData"
            >
                <td class="py-2">
                    {{ format(new Date(time), "dd/MM/yyyy haa") }}
                </td>
                <td class="py-2">{{ temperature }}</td>
                <td class="py-2">{{ humidity }}</td>
                <td class="text-right py-2">{{ windspeed }}</td>
            </tr>
        </tbody>
    </table>
</template>
