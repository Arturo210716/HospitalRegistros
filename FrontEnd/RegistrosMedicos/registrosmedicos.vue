<template>
  <b-container fluid>
    <b-row>
      <b-col lg="6">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Consultas en la semana</h4>
          </template>
          <template v-slot:body>
            <v-chart class="chart" :option="LineChartOption" />
          </template>
        </iq-card>
      </b-col>
      <b-col lg="6">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Personas registradas</h4>
          </template>
          <template v-slot:body>
            <!-- <EChart theme="light" chartType="area" /> -->
            <v-chart class="chart" :option="AreaChartOption" />
          </template>
        </iq-card>
      </b-col>
      <b-col lg="6">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Pacientes y su seguro</h4>
          </template>
          <template v-slot:body>
            <!-- <EChart theme="light" chartType="area" /> -->
            <v-chart class="chart" :option="BarChart" />
          </template>
        </iq-card>
      </b-col>
      <b-col lg="6">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Enfermedades más comunes</h4>
          </template>
          <template v-slot:body>
            <!-- <EChart theme="light" chartType="area" /> -->
            <v-chart class="chart" :option="PieChartOption" />
            <!-- <CanvasJSChart :options="options" :style="styleOptions" @chart-ref="chartInstance"/> -->
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import iqCard from "../../components/xray/cards/iq-card";
import { xray } from "../../config/pluginInit";

// Echart
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import { ref } from "vue";
// import ECharts from 'vue-echarts'

export default {
  name: "HighCharts",
  components: { iqCard, VChart },
  mounted() {
    xray.index();
  },
  setup() {
    use([
      CanvasRenderer,
      PieChart,
      TitleComponent,
      TooltipComponent,
      LegendComponent,
    ]);

    const LineChartOption = ref({
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 300],
          type: "line",
          itemStyle: {
            color: "rgba(8, 155, 171, 1)",
          },
        },
      ],
    });
    const AreaChartOption = ref({
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],

      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["Adultos", "Infantes", "De la tercera edad"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          data: [300, 200, 800],
          type: "line",
          areaStyle: {},
          itemStyle: {
            color: "rgba(8, 155, 171, 1)",
          },
        },
      ],
    });
    const PieChartOption = ref({
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1048, name: "Sida" },
            { value: 735, name: "Malaria" },
            { value: 580, name: "Enfermedades infantiles" },
            { value: 484, name: "Muertes maternas" },
            { value: 300, name: "infecciones respiratorias" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    const BarChart = ref({
      xAxis: {
        type: "category",
        data: ["Sin seguro", "Seguro por convenio", "seguro social"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150],
          type: "bar",
          itemStyle: {
            color: "rgba(8, 155, 171, 1)",
          },
        },
      ],
    });

    return {
      LineChartOption,
      PieChartOption,
      AreaChartOption,
      BarChart,
    };
  },
  data() {
    return {
      chart: null,
      xVal: 0,
      options: {
        exportEnabled: true,
        title: {
          text: "live random data",
        },
        data: [
          {
            type: "line",
            dataPoints: [],
          },
        ],
      },
      styleOptions: {
        width: "100%",
        height: "345px",
        fontSize: "18px",
      },
    };
  },
  methods: {
    updateChart(count) {
      count = count || 1;
      var yVal = 100;
      for (var j = 0; j < count; j++) {
        yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
        this?.options.data[0].dataPoints.push({
          x: this.xVal++,
          y: yVal,
        });
      }
      if (!!this.options.data[0].dataPoints.length > 10) {
        this.options.data[0].dataPoints.shift();
      }
      this.chart.render();
      setTimeout(this.updateChart, 1000);
    },
    chartInstance(chart) {
      this.chart = chart;
      this.updateChart(100);
    },
  },
};
</script>
<style scoped>
.chart {
  height: 342px;
  width: 785px;
}
</style>
