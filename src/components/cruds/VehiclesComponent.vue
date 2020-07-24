<template>
    <div>
        <layout/>

        <Panel header="VEHICULOS">
            <Toast/>

            <Menubar :model="items" /><br>

            <transition-group name="p-messages" tag="div">
                <Message v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{msg.content}}</Message>
            </transition-group>

            <DataTable :value="vehicles" :rows="10" selectionMode="single" :selection.sync="selected" dataKey="id">
                <Column field="id" header="#"></Column>
                <Column field="model" header="Modelo"></Column>
                <Column field="plate" header="Placa"></Column>
                <Column field="color" header="Color"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <img style="width: 57px;" :src="'http://localhost:8000/storage/files/vehicles/' + slotProps.data.id+ '/' +slotProps.data.image" :alt="slotProps.data.image" class="product-image" />
                    </template>
                </Column>
                <Column field="brand.brand_name" header="Marca"></Column>
                <Column field="client.name" header="Propietario"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear vehiculo" :visible.sync="display" :modal="true" :style="{width: '50vw'}">
            <div class="form-group">
                <label>Modelo</label>
                <input v-model="vehicle.model" name="model" type="text" class="form-control" placeholder="Modelo">
            </div>
            <div class="form-group">
                <label>Placa</label>
                <input v-model="vehicle.plate" name="plate" type="text" class="form-control" placeholder="Placa">
            </div>
            <div class="form-group">
                <label>Color</label>
                <input v-model="vehicle.color" name="color" type="text" class="form-control" placeholder="Color">
            </div>
            <div class="form-group">
                <label>Foto de vehiculo</label>
                <input name="image" type="file" @change="onFileSelected" class="form-control">
            </div>
            <div class="form-group">
                <label>Marca</label>
                <select v-model="vehicle.brand_id" class="form-control">
                    <option v-for="brand in brands" :value="brand.id" :key="brand.id">
                    {{ brand.brand_name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label>Propietario</label>
                  <select v-model="vehicle.client_id" class="form-control">
                        <option v-for="client in clients" :value="client.id" :key="client.id">
                        {{ client.name }}
                        </option>
                    </select>
            </div>
            <button  @click="editing ? edit() : save()" class="btn btn-secondary float-right">{{ editing ? "Editar vehiculo" : "Crear vehiculo" }}</button>
        </Dialog>
    </div>
</template>

<script>

import VehicleService from '@/services/VehicleService'
import ClientService from '@/services/ClientService'
import BrandService from '@/services/BrandService'
import layout from '@/components/layout'

export default {
    name: 'vehicles-component',
    props: {
    },
    components: {
        layout
    },
    data(){
        return {
            VehicleService: null,
            ClientService: null,
            BrandService: null,
            vehicles: null,
            clients: null,
            brands: null,
            vehicle: {
                id: null,
                model: null,
                plate: null,
                color: null,
                image: null,
                brand_id: null,
                client_id: null,
            },
            selected: {
                id: null,
                model: null,
                plate: null,
                color: null,
                image: null,
                brand_id: null,
                client_id: null,
            },
            editing: false,
            items: [
                {
                    label:'Nuevo vehiculo',
                    icon:'pi pi-fw pi-plus',
                    command : () => {
                        this.showCreateModal();
                    }
                },
                {
                    label:'Editar vehiculo',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {
                        this.showEditModal();
                    }
                },
                {
                    label:'Eliminar vehiculo',
                    icon:'pi pi-fw pi-trash',
                    command : () => {
                        this.delete();
                    }                    
                },
                {
                    label:'Refrescar',
                    icon:'pi pi-fw pi-refresh',
                    command : () => {
                        this.refresh();
                    }                    
                },
            ],
            display : false,
            messages: []
        }
    },
    created() {
        this.VehicleService = new VehicleService();
        this.ClientService = new ClientService();
        this.BrandService = new BrandService();
    },
    mounted() {
        this.getAll();
        this.getAllClients();
        this.getAllBrands();
    },    
    methods: {
        getAll() {
            this.VehicleService.getAll().then(
                data => {
                    this.vehicles = data.data.data;
                }
            ).catch(
                error => {
                    console.log(error);
                    this.addMessage("error");
                }
            )
        },
        getAllClients() {
            this.ClientService.getAll().then(
                data => {
                    this.clients = data.data.data;
                }
            ).catch(
                error => {
                    console.log(error);
                    this.addMessage("error");
                }
            )
        },
        getAllBrands() {
            this.BrandService.getAll().then(
                data => {
                    this.brands = data.data.data;
                }
            ).catch(
                error => {
                    console.log(error);
                    this.addMessage("error");
                }
            )
        },
        showCreateModal() {
            this.editing = false;
            this.resetModel();
            this.display = true;
        },
        showEditModal() {
            this.editing = true;
            this.vehicle = this.selected;
            this.vehicle.image = null;
            this.display = true;
        },
        save() {
            let formData = new FormData();

            formData.append('model', this.vehicle.model);
            formData.append('plate', this.vehicle.plate);
            formData.append('color', this.vehicle.color);
            formData.append('image', this.vehicle.image);
            formData.append('brand_id', this.vehicle.brand_id);
            formData.append('client_id', this.vehicle.client_id);
            this.VehicleService.save(formData).then(
                data => {
                    console.log(data);
                    this.addMessage("success");
                    this.refresh();
                }
            ).catch(
                error => {
                    console.log(error);
                    this.addMessage("error");
                }
            ) 
        },
        edit() {
            let formMiData = new FormData();
            
            formMiData.append('model', this.vehicle.model);
            formMiData.append('plate', this.vehicle.plate);
            formMiData.append('color', this.vehicle.color);
            formMiData.append('brand_id', this.vehicle.brand_id);
            formMiData.append('client_id', this.vehicle.client_id);
            
            this.VehicleService.update(this.vehicle.id, formMiData).then(
                data => {
                    console.log(data);
                    this.addMessage("success");
                    this.refresh();
                }
            ).catch(
                error => {
                    console.log(error);
                    this.addMessage("error");
                }
            )
        },
        delete() {
            this.vehicle = this.selected;
            this.VehicleService.delete(this.vehicle.id).then(
                data => {
                    console.log(data);
                    this.addMessage("success");
                    this.refresh();
                }
            ).catch(
                error => {
                    console.log(error);
                    this.addMessage("error");
                }
            )
        },
        refresh() {
            this.display = false;
            this.getAll();
            this.resetModel();
        },
        resetModel() {
            this.vehicle = {
                id: null,
                model: null,
                plate: null,
                color: null,
                image: null,
                brand_id: null,
                client_id: null,
            }
        },
        addMessage(type) {

            if(type == "success")
            {
                this.$toast.add(
                    {
                        severity:'success', 
                        summary: 'Acción realizada con exito', 
                        detail:'Message Content', 
                        life: 6000
                    }
                );
            }
            else
            {
                this.$toast.add(
                    {
                        severity:'error', 
                        summary: 'Error al realizar la acción', 
                        detail:'Message Content', 
                        life: 3000
                    }
                );
            }

        },
        onFileSelected(event) {
        
            this.vehicle.image = event.target.files[0];
            console.log(this.vehicle.image);
        }
    }
}
</script>

<style scoped>

</style>