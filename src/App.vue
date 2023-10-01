<script setup lang="ts">
import Combobox from "./components/Combobox.vue";
import Chart from "./components/Chart.vue";
import Table from "./components/Table.vue";
import Location from "./components/Location.vue";
</script>

<template>
    <div class="bg-background min-h-screen flex items-center py-6 flex-col">
        <div class="xl:w-1/2 w-screen px-6">
            <h1
                class="text-white xl:text-7xl text-4xl font-bold text-center mb-8"
            >
                Weather App
            </h1>
            <Combobox />
            <Location />
            <Chart />
            <Table />
        </div>
    </div>
</template>
