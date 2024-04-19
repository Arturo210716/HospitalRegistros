<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle
            ><br />
            <h4 class="card-title">Notas medicas</h4>
            <br />
            <div class="iq-search-bar">
              <form action="#" class="searchbox" @submit.prevent="search">
                <input
                  type="text"
                  class="text search-input"
                  placeholder="Buscar..."
                  v-model="searchTerm"
                />
                <a class="search-link" href="#"
                  ><i class="ri-search-line"></i
                ></a>
              </form>
            </div>
            <br />
          </template>
          <template v-slot:body>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th v-for="data in columns" :key="data.field">
                      {{ data.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredRows" :key="item._id">
                    <!-- <td>{{ item._id }}</td> -->
                    <td>
                      {{ item.nombre }} {{ item.primer_apellido }}
                      {{ item.segundo_apellido }}
                    </td>
                    <td>
                      {{ item.curp }}
                    </td>
                    <td>{{ calcularEdad(item.dob) }}</td>
                    <td>{{ item.notasM }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import iqCard from "../../components/xray/cards/iq-card";
import apiService from "@/services/apiService";

export default {
  name: "UiDataTable",
  components: { iqCard },
  data() {
    return {
      columns: [
        /* { label: "Id", field: "_id", headerClass: "text-left" }, */
        { label: "Nombre completo", field: "nombre", headerClass: "text-left" },
        { label: "CURP", field: "curp", headerClass: "text-left" },
        { label: "Edad", field: "edad", headerClass: "text-left" },
        { label: "Nota", field: "notasM", headerClass: "text-left" },
      ],
      registros: [],
      searchTerm: "",
    };
  },
  mounted() {
    this.obtenerRegistros();
  },
  methods: {
    async obtenerRegistros() {
      try {
        const response = await apiService.getItems();
        this.registros = response.data;
      } catch (error) {
        console.error("Error al obtener los registros:", error);
      }
    },
    search() {
      // Aquí puedes implementar la lógica para filtrar los registros
    },
    calcularEdad(fechaNacimiento) {
      // Aquí puedes implementar la lógica para calcular la edad a partir de la fecha de nacimiento
      // Por ejemplo:
      const today = new Date();
      const birthDate = new Date(fechaNacimiento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  computed: {
    filteredRows() {
      const regex = new RegExp(this.searchTerm.trim(), "i");
      return this.registros.filter(
        (item) =>
          regex.test(item._id) ||
          regex.test(item.nombre) ||
          regex.test(item.primer_apellido) ||
          regex.test(item.segundo_apellido) ||
          regex.test(item.notasM)
      );
    },
  },
};
</script>
