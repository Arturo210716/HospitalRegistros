<template>
  <b-container fluid>
    <b-row>
      <b-col md="12">
        <iq-card>
          <template v-slot:headerTitle>
            <h4 class="card-title">Registros de expedientes medicos</h4>
          </template>
          <template v-slot:body>
            <b-row>
              <div class="table-ad mb-3 me-2">
                <b-button
                  variant="btn btn-sm iq-bg-success float-end"
                  @click="add"
                  >+ Add New</b-button
                >
              </div>
              <b-col md="12" class="table-responsive w-100">
                <b-table striped bordered hover :items="rows" :fields="columns">
                  <template v-slot:cell(remove)="data">
                    <b-button
                      variant=" iq-bg-success mr-1 mb-1"
                      size="sm"
                      @click="edit(data.item)"
                      v-if="!data.item.editable"
                      ><i class="ri-ball-pen-fill m-0"></i
                    ></b-button>
                    <b-button
                      variant=" iq-bg-success mr-1 mb-1"
                      size="sm"
                      @click="submit(data.item)"
                      v-else
                      >Ok</b-button
                    >
                    <b-button
                      variant=" iq-bg-danger"
                      size="sm"
                      @click="remove(data.item)"
                      >Remove
                    </b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
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
  mounted() {
    this.loadRecords();
  },
  methods: {
    async loadRecords() {
      try {
        const response = await apiService.getItems();
        this.rows = response.data;
      } catch (error) {
        console.error("Error loading records:", error);
      }
    },
    add() {
      this.rows.push({
        nombre: "",
        edad: "",
        notasM: "",
      });
    },
    async remove(item) {
      try {
        const response = await apiService.deleteItem(item._id);
        if (response.status === 200) {
          const index = this.rows.indexOf(item);
          this.rows.splice(index, 1);
        } else {
          console.error("Error deleting record");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    },
  },
  data() {
    return {
      columns: [
        { key: "_id", label: "Id", headerClass: "text-left" },
        { key: "nombre", label: "Nombre completo", headerClass: "text-left" },
        { key: "edad", label: "Edad", headerClass: "text-left" },
        { key: "notasM", label: "Nota", headerClass: "text-left" },
        { key: "remove", label: "Remove", class: "text-center" },
      ],
      rows: [],
    };
  },
};
</script>
