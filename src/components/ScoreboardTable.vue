<script setup lang="ts">
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, themeQuartz } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { ref } from 'vue'
ModuleRegistry.registerModules([AllCommunityModule])

const themeQuartzDark = themeQuartz.withPart(colorSchemeDark)

const columnDefs = ref([
  { field: 'athlete', headerName: 'Athlete' },
  { field: 'country', headerName: 'Country' },
  { field: 'year', headerName: 'Year' },
  { field: 'date', headerName: 'Date' },
  { field: 'sport', headerName: 'Sport' },
  { field: 'gold', headerName: 'Gold' },
  { field: 'silver', headerName: 'Silver' },
  { field: 'bronze', headerName: 'Bronze' },
])
const rowData = ref([
  {
    athlete: 'Michael Phelps',
    country: 'USA',
    year: '2008',
    date: '24/08/2008',
    sport: 'Swimming',
    gold: 8,
    silver: 0,
    bronze: 0,
  },
])
</script>

<template>
  <div class="ag-theme-quartz-dark" style="width: 100%">
    <AgGridVue
      :columnDefs="columnDefs"
      :domLayout="'autoHeight'"
      :rowData="rowData"
      :theme="themeQuartzDark"
    />
  </div>
</template>
