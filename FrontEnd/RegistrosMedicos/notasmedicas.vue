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
                    <th v-for="data in columns" :key="data">
                      {{ data.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in filteredRows" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.edad }}</td>
                    <td>{{ item.nota }}</td>
                  </tr>
                </tbody>
                <!--                 <tfoot>
                  <tr>
                    <th v-for="data in columns" :key="data">
                      {{ data.label }}
                    </th>
                  </tr>
                </tfoot> -->
              </table>
            </div>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { xray } from "../../config/pluginInit";
import iqCard from "../../components/xray/cards/iq-card";
export default {
  name: "UiDataTable",
  components: { iqCard },
  mounted() {
    xray.index();
  },
  data() {
    return {
      columns: [
        { label: "Id", field: "id", headerClass: "text-left" },
        { label: "Nombre completo", field: "name", headerClass: "text-left" },
        { label: "Edad", field: "edad", headerClass: "text-left" },
        { label: "Nota", field: "nota", headerClass: "text-left" },
      ],
      rows: [
        {
          id: 1,
          name: "Tiger Nixon",
          edad: "36",
          nota: "Necesita paracetamol cada 8 horas",
        },
        {
          id: 2,
          name: "Garrett Winters",
          edad: "24",
          nota: "Necesita paracetamol cada 8 horas",
        },
        {
          id: 3,
          name: "Ashton Cox",
          edad: "9",
          nota: "Necesita paracetamol cada 8 horas",
        },
        {
          id: 4,
          name: "Cedric Kelly",
          edad: "37",
          nota: "Necesita paracetamol cada 8 horas",
        },
        {
          id: 5,
          name: "Airi Satou",
          edad: "80",
          nota: "Necesita paracetamol cada 8 horas",
        },
      ],
      searchTerm: "",
    };
  },
  computed: {
    filteredRows() {
      const regex = new RegExp(this.searchTerm.trim(), "i");
      return this.rows.filter(
        (item) =>
          regex.test(item.id) ||
          regex.test(item.name) ||
          regex.test(item.edad) ||
          regex.test(item.nota)
      );
    },
  },
  methods: {
    search() {
      // Puedes añadir aquí lógica adicional si lo necesitas
    },
  },
};
</script>