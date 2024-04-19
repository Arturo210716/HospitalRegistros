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
              <b-col md="12" class="table-responsive w-100">
                <b-table striped bordered hover :items="rows" :fields="columns">
                  <template v-slot:cell(notasM)="data">
                    <span v-if="!data.item.editable">{{
                      data.item.notasM
                    }}</span>
                    <input
                      type="text"
                      v-model="data.item.notasM"
                      v-else
                      class="form-control text-center"
                    />
                  </template>
                  <template v-slot:cell(remove)="data">
                    <b-button
                      variant=" iq-bg-success mr-1 mb-1"
                      size="sm"
                      @click="toggleEdit(data.item)"
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
        // Modificar los registros para incluir el nombre completo
        this.rows = response.data.map((item) => ({
          ...item,
          nombreCompleto: `${item.nombre} ${item.primer_apellido} ${item.segundo_apellido}`,
          editable: false, // Agregar la propiedad editable
        }));
      } catch (error) {
        console.error("Error loading records:", error);
      }
    },

    add() {
      this.rows.push({
        nombre: "",
        dob: "",
        notasM: "",
        editable: true, // Nuevo registro es editable
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

    toggleEdit(item) {
      item.editable = !item.editable; // Alternar entre editar y no editar
    },

    async submit(item) {
      try {
        // Aquí puedes enviar los cambios al servidor utilizando apiService.updateItem(item)
        // Por simplicidad, aquí solo cambiaremos el estado editable a false
        item.editable = false;
      } catch (error) {
        console.error("Error submitting changes:", error);
      }
    },
  },
  data() {
    return {
      columns: [
        { key: "_id", label: "Id", headerClass: "text-left" },
        {
          key: "nombreCompleto",
          label: "Nombre completo",
          headerClass: "text-left",
        },
        { key: "dob", label: "Fecha Nacimiento", headerClass: "text-left" },
        { key: "notasM", label: "Nota", headerClass: "text-left" },
        { key: "remove", label: "Remove", class: "text-center" },
      ],
      rows: [],
    };
  },
};
</script>
