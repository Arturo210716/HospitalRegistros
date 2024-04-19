<template>
  <b-container fluid>
    <b-row>
      <b-col lg="6">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Titulo de cortecia</h4>
          </template>
          <template v-slot:body>
            <!-- <EChart theme="light" chartType="area" /> -->
            <v-chart class="chart" :option="DoughnutChartOption" />
          </template>
        </iq-card>
      </b-col>
      <b-col lg="6">
        <iq-card>
          <template v-slot:headerTitle>
            <h4>Personas/personal nacidos (1970-2024)</h4>
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
            <h4>Edades</h4>
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
            <h4>Tipo de sangre</h4>
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
import apiService from "@/services/apiService";
import { onMounted } from "vue";
import axios from "axios"; // Importamos axios para hacer llamadas a la API

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
    // ---------grafica de titulo profesional
    const DoughnutChartOption = ref({
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    });

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/personas"); // Realizamos la llamada a la API del servidor backend
        const personas = response.data;

        // Contamos la cantidad de cada título de cortesía
        const conteoTitulos = personas.reduce((acc, persona) => {
          const titulo = persona.Titulo || "C."; // Si el título está vacío o no existe, usamos "C."
          acc[titulo] = (acc[titulo] || 0) + 1;
          return acc;
        }, {});

        // Construimos los datos para la serie del gráfico de dona
        const dataDoughnutChart = Object.entries(conteoTitulos).map(
          ([titulo, cantidad]) => ({
            value: cantidad,
            name: titulo === null ? "C." : titulo,
          })
        );

        // Actualizamos los datos de la serie del gráfico de dona
        DoughnutChartOption.value.series[0].data = dataDoughnutChart;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });
    //----------------------------------------------------------------------------------------
    // -------------grafica de personas registradas---------------------------------------------
    const AreaChartOption = ref({
      color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],

      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["1970", "1980", "1990", "2000", "2010", "2020", "2024"], // Años de nacimiento
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          data: [], // Se llenará con la suma de personas nacidas en cada año
          type: "line",
          areaStyle: {},
          itemStyle: {
            color: "rgba(8, 155, 171, 1)",
          },
        },
      ],
    });

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:3000/personas");
        const personas = response.data;

        // Inicializar contadores para cada año de nacimiento
        const sumaPorAño = {
          1970: 0,
          1980: 0,
          1990: 0,
          2000: 0,
          2010: 0,
          2020: 0,
          2024: 0,
        };

        personas.forEach((persona) => {
          // Obtener el año de nacimiento
          const añoNacimiento = new Date(persona.Fecha_Nacimiento)
            .getFullYear()
            .toString();

          // Incrementar el contador del año correspondiente
          if (sumaPorAño[añoNacimiento] !== undefined) {
            sumaPorAño[añoNacimiento]++;
          }
        });

        // Actualizar los datos del gráfico con las sumas por año de nacimiento
        AreaChartOption.value.series[0].data = Object.values(sumaPorAño);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });

    // --------------------------------------------------------------------------------------------------
    // grafica de tipo de sangre ------------------------------------------------------------------------
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
          name: "Tipos de Sangre",
          type: "pie",
          radius: "50%",
          data: [],
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
    onMounted(async () => {
      try {
        const response = await apiService.getItems(); // Hacer la llamada a la API para obtener los datos
        const pacientes = response.data;

        // Contar la cantidad de cada tipo de sangre
        const conteoTipoSangre = pacientes.reduce((acc, paciente) => {
          acc[paciente.selectedBloodType] =
            (acc[paciente.selectedBloodType] || 0) + 1;
          return acc;
        }, {});

        // Construir los datos para la serie del gráfico de pastel
        const dataPieChart = Object.entries(conteoTipoSangre).map(
          ([tipo, cantidad]) => ({
            value: cantidad,
            name: tipo,
          })
        );

        // Actualizar la serie del gráfico de pastel
        PieChartOption.value.series[0].data = dataPieChart;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });
    // ---------------------------------------------------------------------------------------------------
    /*grafica de edades------------------------------------------------------------------------------ */
    const BarChart = ref({
      xAxis: {
        type: "category",
        data: [
          "(0-5)",
          "(6 - 11)",
          "(12 - 18)",
          "(14 - 26)",
          "(27- 59)",
          "(60 o mas)",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [0, 0, 0, 0, 0, 0],
          type: "bar",
          itemStyle: {
            color: "rgba(8, 155, 171, 1)",
          },
        },
      ],
    });

    // Función para actualizar los datos del gráfico de barras
    const actualizarBarChart = (datos) => {
      BarChart.value.series[0].data = datos;
    };

    onMounted(async () => {
      try {
        const response = await apiService.getItems(); // Hacer la llamada al API para obtener los datos
        const pacientes = response.data;

        // Calcular la edad de cada paciente y contar la cantidad de pacientes en cada rango de edad
        const conteoEdades = [0, 0, 0, 0, 0, 0];
        const hoy = new Date();

        pacientes.forEach((paciente) => {
          const fechaNacimiento = new Date(paciente.dob);
          const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
          const indiceEdad = obtenerIndiceEdad(edad);
          if (indiceEdad !== -1) {
            conteoEdades[indiceEdad]++;
          }
        });

        // Actualizar el gráfico de barras con los datos de conteo de edades
        actualizarBarChart(conteoEdades);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    });

    // Función para obtener el índice del rango de edad correspondiente
    const obtenerIndiceEdad = (edad) => {
      if (edad >= 0 && edad <= 5) {
        return 0;
      } else if (edad >= 6 && edad <= 11) {
        return 1;
      } else if (edad >= 12 && edad <= 18) {
        return 2;
      } else if (edad >= 14 && edad <= 26) {
        return 3;
      } else if (edad >= 27 && edad <= 59) {
        return 4;
      } else if (edad >= 60) {
        return 5;
      } else {
        return -1; // Edad no válida
      }
    };
    // -----------------------------------------------------------------------------
    return {
      DoughnutChartOption,
      PieChartOption,
      AreaChartOption,
      BarChart,
      actualizarBarChart,
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
