<template>
    <div>


        <layout/>

        <Panel header="CLIENTES">
            <Toast/>

            <Menubar :model="items" /><br>

            <transition-group name="p-messages" tag="div">
                <Message v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{msg.content}}</Message>
            </transition-group>

            <DataTable :value="clients" :rows="10" selectionMode="single" :selection.sync="selected" dataKey="id">
                <Column field="id" header="#"></Column>
                <Column field="name" header="Nombre"></Column>
                <Column field="lastname" header="Apellido"></Column>
                <Column field="identification_number" header="Identificacion"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <img style="width: 57px;" :src="'http://localhost:8000/storage/files/clients/' + slotProps.data.id+ '/' +slotProps.data.image_profile" :alt="slotProps.data.image_profile" class="product-image" />
                    </template>
                </Column>
                <Column field="residence_address" header="Dirección"></Column>
                <Column field="birth_date" header="Nacimiento"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear cliente/Propietario" :visible.sync="display" :modal="true" :style="{width: '50vw'}">
            <div class="form-group">
                <label>Nombre</label>
                <input v-model="client.name" name="name" type="text" class="form-control" placeholder="Nombre de usuario">
            </div>
            <div class="form-group">
                <label>Apellido</label>
                <input v-model="client.lastname" name="lastname" type="text" class="form-control" placeholder="apellido">
            </div>
            <div class="form-group">
                <label>Numero identificación</label>
                <input v-model="client.identification_number" name="identification_number" type="text" class="form-control" placeholder="numero identificación">
            </div>
            <div class="form-group">
                <label>Foto de propietario</label>
                <input name="image_profile" type="file" @change="onFileSelected" class="form-control">
            </div>
            <div class="form-group">
                <label for="residence_address">Direccion de residencia</label>
                <input v-model="client.residence_address" type="text" class="form-control" id="residence_address" name="residence_address" 
                aria-describedby="addressHelp">
            </div> 
            <div class="form-group">
                <label>Fecha de nacimiento</label>
                <input v-model="client.birth_date" name="birth_date" type="date" class="form-control" placeholder="Fecha">
            </div>
            <button  @click="editing ? edit() : save()" class="btn btn-secondary float-right">{{ editing ? "Editar Cliente" : "Crear Cliente" }}</button>
        </Dialog>
    </div>
</template>
<script>

import ClientService from '@/services/ClientService'
import layout from '@/components/layout'

export default {
    name: 'clients-component',
    props: {
    },
    components: {
        layout
    },
    data(){
        return {
            ClientService: null,
            clients: null,
            client: {
                id: null,
                name: null,
                lastname: null,
                identification_number: null,
                image_profile: null,
                residence_address: null,
                birth_date: null,
            },
            selected: {
                id: null,
                name: null,
                lastname: null,
                identification_number: null,
                image_profile: null,
                residence_address: null,
                birth_date: null,
            },
            editing: false,
            items: [
                {
                    label:'Nuevo cliente',
                    icon:'pi pi-fw pi-plus',
                    command : () => {
                        this.showCreateModal();
                    }
                },
                {
                    label:'Editar cliente',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {
                        this.showEditModal();
                    }
                },
                {
                    label:'Eliminar cliente',
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
        this.ClientService = new ClientService();
    },
    mounted() {

        this.getAll();
    },
    methods: {
        getAll() {
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
        showCreateModal() {
            this.editing = false;
            this.resetModel();
            this.display = true;
        },
        showEditModal() {
            this.editing = true;
            this.client = this.selected;
            this.client.image_profile = null;
            this.display = true;
        },
        save() {
            let formData = new FormData();

            formData.append('name', this.client.name);
            formData.append('lastname', this.client.lastname);
            formData.append('identification_number', this.client.identification_number);
            formData.append('image_profile', this.client.image_profile);
            formData.append('residence_address', this.client.residence_address);
            formData.append('birth_date', this.client.birth_date);
            this.ClientService.save(formData).then(
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
            formMiData.append('name', this.client.name);
            formMiData.append('lastname', this.client.lastname);
            formMiData.append('identification_number', this.client.identification_number);
            console.log(this.client.image_profile == null)
            formMiData.append('residence_address', this.client.residence_address);
            formMiData.append('birth_date', this.client.birth_date);
            
            this.ClientService.update(this.client.id, formMiData).then(
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
            this.client = this.selected;
            this.ClientService.delete(this.client.id).then(
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
            this.client = {
                id: null,
                name: null,
                lastname: null,
                identification_number: null,
                image_profile: null,
                residence_address: null,
                birth_date: null,
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
        
            this.client.image_profile = event.target.files[0];
            console.log(this.client.image_profile);
        }
    }
}

</script>

<style scoped>

</style>