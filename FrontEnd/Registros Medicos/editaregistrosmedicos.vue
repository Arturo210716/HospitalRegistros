<template>
  <div class="container-fluid">
    <b-row>
      <b-col sm="12" lg="12">
        <iq-card class="iq-card">
          <template v-slot:headerTitle>
            <b-card-title>Editar expediente medico</b-card-title>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col md="3">
                <ul id="top-tabbar-vertical" class="p-0">
                  <li
                    class="active"
                    :class="`${currentindex == 1 ? 'active' : ''} ${
                      currentindex > 1 ? 'done active' : ''
                    } `"
                    id="personal"
                  >
                    <a href="#personal" @click="changeTab(1)">
                      <i class="ri-account-box-fill text-primary"></i>
                      <span>Datos Personales</span>
                    </a>
                  </li>
                  <li
                    id="contactos"
                    :class="`${currentindex == 2 ? 'active' : ''} ${
                      currentindex > 2 ? 'done active' : ''
                    }`"
                  >
                    <a href="#contactos" @click="changeTab(2)">
                      <i class="ri-phone-fill text-danger"></i>
                      <span>Contactos</span>
                    </a>
                  </li>
                  <li
                    id="padecimiento_actual"
                    :class="`${currentindex == 3 ? 'active' : ''} ${
                      currentindex > 3 ? 'done active' : ''
                    }`"
                  >
                    <a href="#padecimiento_actual" @click="changeTab(3)">
                      <i class="ri-file-fill text-success"></i
                      ><span>Padecimiento Actual</span></a
                    >
                  </li>
                  <li
                    id="signos_vitales"
                    :class="`${currentindex == 4 ? 'active' : ''} ${
                      currentindex > 4 ? 'done active' : ''
                    }`"
                  >
                    <a href="#signos_vitales" @click="changeTab(4)">
                      <i class="ri-drop-fill text-warning"></i
                      ><span>Signos vitales</span></a
                    >
                  </li>
                  <li
                    id="notas_medicas"
                    :class="`${currentindex == 5 ? 'active' : ''} ${
                      currentindex > 5 ? 'done active' : ''
                    }`"
                  >
                    <a href="#notas_medicas" @click="changeTab(5)">
                      <i class="ri-bookmark-fill text-info"></i
                      ><span>Notas Medicas</span></a
                    >
                  </li>
                </ul>
              </b-col>
              <b-col md="9">
                <b-form id="form-wizard3" class="text-center">
                  <!-- fieldsets -->
                  <div :class="`${currentindex == 1 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-start">
                        <b-row>
                          <b-col>
                            <h3 class="mb-4">Datos personales:</h3>
                          </b-col>
                        </b-row>
                        <b-row>
                          <div class="col-sm-6 col-md-5 col-lg-6">
                            <!-- Izquierda -->
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="nombre" class="form-label mb-2"
                                  >Nombre:</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="nombre"
                                  name="nombre"
                                  placeholder="Nombre"
                                  v-model="nombre"
                                  @focus="validarNombre"
                                  :class="{
                                    'is-invalid':
                                      nombreInvalido && nombre.length === 0,
                                  }"
                                  pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
                                  title="Solo se acepta texto"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="segundo_apellido"
                                  class="form-label mb-2"
                                  >Apellido materno:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="segundo_apellido"
                                  name="segundo_apellido"
                                  placeholder="Apellido materno"
                                  v-model="segundo_apellido"
                                  @focus="validarApellidoM"
                                  :class="{
                                    'is-invalid':
                                      apellidoMInvalido &&
                                      segundo_apellido.length === 0,
                                  }"
                                  pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
                                  title="Solo se acepta texto"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="dob" class="mb-2"
                                  >Fecha de nacimiento:</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  id="dob"
                                  name="dob"
                                  v-model="dob"
                                  @change="validateDate"
                                />
                                <small v-if="error" class="text-danger"
                                  >La fecha de nacimiento no es válida</small
                                >
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="ts" class="mb-2"
                                  >Tipo de Sangre:</label
                                >
                                <select
                                  class="custom-select form-select"
                                  id="ts"
                                  name="ts"
                                  v-model="selectedBloodType"
                                  @change="validateBloodType"
                                >
                                  <option value="" selected>
                                    Tipo de sangre...
                                  </option>
                                  <option value="A+">A+</option>
                                  <option value="A-">A-</option>
                                  <option value="B+">B+</option>
                                  <option value="B-">B-</option>
                                  <option value="AB+">AB+</option>
                                  <option value="AB-">AB-</option>
                                  <option value="O+">O+</option>
                                  <option value="O-">O-</option>
                                </select>
                                <div
                                  v-if="bloodTypeEmpty"
                                  class="invalid-feedback"
                                >
                                  Por favor, selecciona un tipo de sangre.
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Columnas separador -->
                          <div
                            class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0"
                          >
                            <!-- Derecha -->

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="primer_apellido"
                                  class="form-label mb-2"
                                  >Apellido paterno:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="primer_apellido"
                                  name="primer_apellido"
                                  placeholder="Apellido paterno"
                                  v-model="primer_apellido"
                                  @focus="validarApellidoP"
                                  :class="{
                                    'is-invalid':
                                      apellidoPInvalido &&
                                      primer_apellido.length === 0,
                                  }"
                                  pattern="[A-Za-záéíóúÁÉÍÓÚñÑ\s]+"
                                  title="Solo se acepta texto"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="curp" class="form-label mb-2"
                                  >CURP:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="curp"
                                  name="curp"
                                  placeholder="CURP"
                                  v-model="curp"
                                  @focus="validarCurp"
                                  :class="{
                                    'is-invalid':
                                      CurpInvalido && curp.length === 0,
                                  }"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="alergias" class="form-label mb-2"
                                  >Alergias:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="alergias"
                                  name="alergias"
                                  placeholder="Alergias"
                                  v-model="alergias"
                                  @focus="validarAlergias"
                                  :class="{
                                    'is-invalid':
                                      AlergiasInvalido && alergias.length === 0,
                                  }"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label class="my-2">Genero: </label>
                                <div class="form-check d-flex ps-0">
                                  <div
                                    class="custom-control custom-radio custom-control-inline me-4"
                                  >
                                    <input
                                      type="radio"
                                      id="customRadio1"
                                      name="customRadio"
                                      class="custom-control-input"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customRadio1"
                                    >
                                      Masculino</label
                                    >
                                  </div>
                                  <div
                                    class="custom-control custom-radio custom-control-inline"
                                  >
                                    <input
                                      type="radio"
                                      id="customRadio2"
                                      name="customRadio"
                                      class="custom-control-input"
                                    />
                                    <label
                                      class="custom-control-label"
                                      for="customRadio2"
                                    >
                                      Femenino</label
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-row>
                      </div>

                      <a
                        href="#contactos"
                        class="btn btn-primary next action-button float-center"
                        @click="changeTab(2)"
                        value="siguiente"
                        >Siguiente</a
                      >
                    </fieldset>
                  </div>
                  <div :class="`${currentindex == 2 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-start">
                        <b-row>
                          <b-col>
                            <h3 class="mb-4">Contactos:</h3>
                          </b-col>
                        </b-row>
                        <b-row>
                          <div class="col-sm-6 col-md-5 col-lg-6">
                            <!-- Izquierda -->

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="calle" class="form-label mb-2"
                                  >Calle:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="calle"
                                  name="calle"
                                  placeholder="Calle"
                                  v-model="calle"
                                  @focus="validarCalle"
                                  :class="{
                                    'is-invalid':
                                      CalleInvalido && calle.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="municipio" class="form-label mb-2"
                                  >Municipio:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="municipio"
                                  name="municipio"
                                  placeholder="Municipio"
                                  v-model="municipio"
                                  @focus="validarMunicipio"
                                  :class="{
                                    'is-invalid':
                                      MunicipioInvalido &&
                                      municipio.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="pais" class="form-label mb-2"
                                  >Pais:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="pais"
                                  name="pais"
                                  placeholder="País"
                                  v-model="pais"
                                  @focus="validarPais"
                                  :class="{
                                    'is-invalid':
                                      PaisInvalido && pais.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="numero_telefonico_familiar"
                                  class="form-label mb-2"
                                  >Numero telefonico familiar:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="numero_telefonico_familiar"
                                  name="numero_telefonico_familiar"
                                  placeholder="(+52) xxx xxx xx xx"
                                  v-model="numero_telefonico_familiar"
                                  @focus="validarNumero_telefonico_familiar"
                                  :class="{
                                    'is-invalid':
                                      Numero_telefonico_familiarInvalido &&
                                      numero_telefonico_familiar.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Columnas separador -->
                          <div
                            class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0"
                          >
                            <!-- Derecha -->

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="colonia" class="form-label mb-2"
                                  >Colonia:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="colonia"
                                  name="colonia"
                                  placeholder="Colonia"
                                  v-model="colonia"
                                  @focus="validarColonia"
                                  :class="{
                                    'is-invalid':
                                      ColoniaInvalido && colonia.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="estado" class="form-label mb-2"
                                  >Estado:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="estado"
                                  name="estado"
                                  placeholder="Estado"
                                  v-model="estado"
                                  @focus="validarEstado"
                                  :class="{
                                    'is-invalid':
                                      EstadoInvalido && estado.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="numero_telefonico"
                                  class="form-label mb-2"
                                  >Numero telefonico:
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="numero_telefonico"
                                  name="numero_telefonico"
                                  placeholder="(+52) xxx xxx xx xx"
                                  v-model="numero_telefonico"
                                  @focus="validarNumero_telefonico"
                                  :class="{
                                    'is-invalid':
                                      Numero_telefonicoInvalido &&
                                      numero_telefonico.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-row>
                      </div>

                      <a
                        href="#personal"
                        @click="changeTab(1)"
                        class="btn btn-dark previous action-button-previous float-center me-1"
                        value="Anterior"
                        >Anterior
                      </a>

                      <a
                        href="#padecimiento_actual"
                        @click="changeTab(3)"
                        class="btn btn-primary next action-button float-center"
                        value="Siguiente"
                        >Siguiente
                      </a>
                    </fieldset>
                  </div>
                  <div :class="`${currentindex == 3 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-start">
                        <b-row>
                          <div class="col-12">
                            <h3 class="mb-4">Padecimiento actual:</h3>
                          </div>
                        </b-row>
                        <b-row>
                          <div class="col-md-12">
                            <div class="form-group">
                              <label for="padecimiento" class="form-label mb-2"
                                >Padecimiento actual:
                              </label>
                              <textarea
                                class="form-control"
                                id="padecimiento"
                                name="padecimiento"
                                placeholder="Describe el padecimiento más acutal del paciente"
                                rows="3"
                                v-model="padecimiento"
                                @focus="validarPadecimiento"
                                :class="{
                                  'is-invalid':
                                    PadecimientoInvalido &&
                                    padecimiento.length === 0,
                                }"
                                title="Este campo es requerido"
                                required
                              ></textarea>
                              <div class="invalid-feedback">
                                Este campo es requerido
                              </div>
                            </div>
                          </div>
                        </b-row>
                      </div>

                      <a
                        href="#contactos"
                        @click="changeTab(2)"
                        class="btn btn-dark previous action-button-previous float-center me-1"
                        value="Anterior"
                        >Anterior</a
                      >

                      <a
                        href="#signos_vitales"
                        @click="changeTab(4)"
                        class="btn btn-primary next action-button float-center"
                        value="Siguiente"
                        >Siguiente</a
                      >
                    </fieldset>
                  </div>
                  <div :class="`${currentindex == 4 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-start">
                        <b-row>
                          <div class="col-12">
                            <h3 class="mb-4 text-left">Signos vitales:</h3>
                          </div>
                        </b-row>
                        <b-row>
                          <div class="col-sm-6 col-md-5 col-lg-6">
                            <!-- Izquierda -->

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="estatura" class="form-label mb-2"
                                  >Estatura:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="estatura"
                                  name="estatura"
                                  placeholder="Estatura"
                                  v-model="estatura"
                                  @focus="validarEstatura"
                                  :class="{
                                    'is-invalid':
                                      EstaturaInvalido && estatura.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="peso" class="form-label mb-2"
                                  >Peso:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="peso"
                                  name="peso"
                                  placeholder="Peso"
                                  v-model="peso"
                                  @focus="validarPeso"
                                  :class="{
                                    'is-invalid':
                                      PesoInvalido && peso.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="temperatura_corporal"
                                  class="form-label mb-2"
                                  >Temperatura corporal:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="temperatura_corporal"
                                  name="temperatura_corporal"
                                  placeholder="Temperatura corporal"
                                  v-model="temperatura_corporal"
                                  @focus="validarTemperatura_corporal"
                                  :class="{
                                    'is-invalid':
                                      Temperatura_corporalInvalido &&
                                      temperatura_corporal.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="presion_sistolica"
                                  class="form-label mb-2"
                                  >Presion sistolica:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="presion_sistolica"
                                  name="presion_sistolica"
                                  placeholder="Presion sistolica"
                                  v-model="presion_sistolica"
                                  @focus="validarPresion_sistolica"
                                  :class="{
                                    'is-invalid':
                                      Presion_sistolicaInvalido &&
                                      presion_sistolica.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- Columnas separador -->
                          <div
                            class="col-sm-6 col-md-5 offset-md-2 col-lg-6 offset-lg-0"
                          >
                            <!-- Derecha -->

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="presion_diastolica"
                                  class="form-label mb-2"
                                  >Presion diastolica:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="presion_diastolica"
                                  name="presion_diastolica"
                                  placeholder="Presion diastolica"
                                  v-model="presion_diastolica"
                                  @focus="validarPresion_diastolica"
                                  :class="{
                                    'is-invalid':
                                      Presion_diastolicaInvalido &&
                                      presion_diastolica.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="oxigenacion" class="form-label mb-2"
                                  >Oxigenación:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="oxigenacion"
                                  name="oxigenacion"
                                  placeholder="Oxigenación"
                                  v-model="oxigenacion"
                                  @focus="validarOxigenacion"
                                  :class="{
                                    'is-invalid':
                                      OxigenacionInvalido &&
                                      oxigenacion.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="frecuecia_cardiaca"
                                  class="form-label mb-2"
                                  >Frecuencia cardiaca:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="frecuecia_cardiaca"
                                  name="frecuecia_cardiaca"
                                  placeholder="Frecuecia cardiaca"
                                  v-model="frecuecia_cardiaca"
                                  @focus="validarFrecuecia_cardiaca"
                                  :class="{
                                    'is-invalid':
                                      Frecuecia_cardiacaInvalido &&
                                      frecuecia_cardiaca.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label
                                  for="frecuecia_respiratoria"
                                  class="form-label mb-2"
                                  >Frecuencia respiratoria:
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="frecuecia_respiratoria"
                                  name="frecuecia_respiratoria"
                                  placeholder="Frecuecia respiratoria"
                                  v-model="frecuecia_respiratoria"
                                  @focus="validarFrecuecia_respiratoria"
                                  :class="{
                                    'is-invalid':
                                      Frecuecia_respiratoriaInvalido &&
                                      frecuecia_respiratoria.length === 0,
                                  }"
                                  title="Este campo es requerido"
                                  required
                                />
                                <div class="invalid-feedback">
                                  Este campo es requerido
                                </div>
                              </div>
                            </div>
                          </div>
                        </b-row>
                      </div>

                      <a
                        href="#padecimiento_actual"
                        @click="changeTab(3)"
                        class="btn btn-dark previous action-button-previous float-center me-1"
                        value="Anterior"
                        >Anterior</a
                      >

                      <a
                        href="#notas_medicas"
                        @click="changeTab(5)"
                        class="btn btn-primary next action-button float-center mt-3"
                        value="Siguiente"
                        >Siguiente</a
                      >
                    </fieldset>
                  </div>
                  <div :class="`${currentindex == 5 ? 'show' : 'd-none'}`">
                    <fieldset>
                      <div class="form-card text-start">
                        <div class="row">
                          <div class="col-12">
                            <h3 class="mb-4 text-left">Notas medicas:</h3>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label for="notasM" class="form-label mb-2"
                                >Recomendaciones:
                              </label>
                              <textarea
                                class="form-control"
                                id="notasM"
                                name="notasM"
                                placeholder="Recomendaciones al paciente"
                                rows="3"
                                v-model="notasM"
                                @focus="validarNotasM"
                                :class="{
                                  'is-invalid':
                                    NotasMInvalido && notasM.length === 0,
                                }"
                                title="Este campo es requerido"
                                required
                              ></textarea>
                              <div class="invalid-feedback">
                                Este campo es requerido
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <a
                        href="#signos_vitales"
                        @click="changeTab(4)"
                        class="btn btn-dark previous action-button-previous float-center me-1"
                        value="Anterior"
                        >Anterior</a
                      >

                      <a
                        href="#notas_medicas"
                        @click="changeTab(5)"
                        class="btn btn-primary submit action-button float-center mt-3"
                        value="Enviar"
                        type="submit"
                        >Enviar</a
                      >
                    </fieldset>
                  </div>
                </b-form>
              </b-col>
            </b-row>
          </template>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import iqCard from "../../components/xray/cards/iq-card";
export default {
  name: "VerticalWizard",
  components: { iqCard },
  data() {
    return {
      currentindex: 1,

      nombre: "",
      nombreInvalido: false,

      segundo_apellido: "",
      apellidoMInvalido: false,

      dob: "",
      error: false,

      selectedBloodType: "",
      bloodTypeEmpty: false,

      primer_apellido: "",
      apellidoPInvalido: false,

      curp: "",
      CurpInvalido: false,

      alergias: "",
      AlergiasInvalido: false,

      calle: "",
      CalleInvalido: false,

      municipio: "",
      MunicipioInvalido: false,

      pais: "",
      PaisInvalido: false,

      numero_telefonico_familiar: "",
      Numero_telefonico_familiarInvalido: false,

      colonia: "",
      ColoniaInvalido: false,

      estado: "",
      EstadoInvalido: false,

      numero_telefonico: "",
      Numero_telefonicoInvalido: false,

      padecimiento: "",
      PadecimientoInvalido: false,

      estatura: "",
      EstaturaInvalido: false,

      peso: "",
      PesoInvalido: false,

      temperatura_corporal: "",
      Temperatura_corporalInvalido: false,

      presion_sistolica: "",
      Presion_sistolicaInvalido: false,

      presion_diastolica: "",
      Presion_diastolicaInvalido: false,

      oxigenacion: "",
      OxigenacionInvalido: false,

      frecuecia_cardiaca: "",
      Frecuecia_cardiacaInvalido: false,

      frecuecia_respiratoria: "",
      Frecuecia_respiratoriaInvalido: false,

      notasM: "",
      NotasMInvalido: false,
    };
  },
  methods: {
    changeTab(val) {
      this.currentindex = val;
    },
    validarNombre() {
      this.nombreInvalido = this.nombre.length === 0;
    },
    validarApellidoM() {
      this.apellidoMInvalido = this.segundo_apellido.length === 0;
    },
    validateDate() {
      const inputDate = new Date(this.dob);
      const currentDate = new Date();
      if (isNaN(inputDate) || inputDate > currentDate) {
        this.error = true;
      } else {
        this.error = false;
      }
    },
    validateBloodType() {
      this.bloodTypeEmpty = this.selectedBloodType === "";
    },

    validarApellidoP() {
      this.apellidoPInvalido = this.primer_apellido.length === 0;
    },
    validarCurp() {
      this.CurpInvalido = this.curp.length === 0;
    },
    validarAlergias() {
      this.AlergiasInvalido = this.alergias.length === 0;
    },

    validarCalle() {
      this.CalleInvalido = this.calle.length === 0;
    },
    validarMunicipio() {
      this.MunicipioInvalido = this.municipio.length === 0;
    },
    validarPais() {
      this.PaisInvalido = this.pais.length === 0;
    },
    validarNumero_telefonico_familiar() {
      this.Numero_telefonico_familiarInvalido =
        this.numero_telefonico_familiar.length === 0;
    },
    validarColonia() {
      this.ColoniaInvalido = this.colonia.length === 0;
    },
    validarEstado() {
      this.EstadoInvalido = this.estado.length === 0;
    },
    validarNumero_telefonico() {
      this.Numero_telefonicoInvalido = this.numero_telefonico.length === 0;
    },

    validarPadecimiento() {
      this.PadecimientoInvalido = this.padecimiento.length === 0;
    },

    validarEstatura() {
      this.EstaturaInvalido = this.estatura.length === 0;
    },
    validarPeso() {
      this.PesoInvalido = this.peso.length === 0;
    },
    validarTemperatura_corporal() {
      this.Temperatura_corporalInvalido =
        this.temperatura_corporal.length === 0;
    },
    validarPresion_sistolica() {
      this.Presion_sistolicaInvalido = this.presion_sistolica.length === 0;
    },
    validarPresion_diastolica() {
      this.Presion_diastolicaInvalido = this.presion_diastolica.length === 0;
    },
    validarOxigenacion() {
      this.OxigenacionInvalido = this.oxigenacion.length === 0;
    },
    validarFrecuecia_cardiaca() {
      this.Frecuecia_cardiacaInvalido = this.frecuecia_cardiaca.length === 0;
    },
    validarFrecuecia_respiratoria() {
      this.Frecuecia_respiratoriaInvalido =
        this.frecuecia_respiratoria.length === 0;
    },
    validarNotasM() {
      this.NotasMInvalido = this.notasM.length === 0;
    },
  },
};
</script>
