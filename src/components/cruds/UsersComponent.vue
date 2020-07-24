<template>
    <div>
        <layout/>

        <Panel header="USUARIOS">
            <Toast/>

            <Menubar :model="items" /><br>

            <transition-group name="p-messages" tag="div">
                <Message v-for="msg of messages" :severity="msg.severity" :key="msg.content">{{msg.content}}</Message>
            </transition-group>

            <DataTable :value="users" :rows="10" selectionMode="single" :selection.sync="selected" dataKey="id">
                <Column field="id" header="#"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="email" header="E-mail"></Column>
                <Column field="role.role_name" header="Rol"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Crear usuario" :visible.sync="display" :modal="true" :style="{width: '50vw'}">
            <div class="form-group">
                <label>Nombre</label>
                <input v-model="user.name" name="name" type="text" class="form-control" placeholder="Nombre de usuario">
            </div>
            <div class="form-group">
                <label>Correo electronico</label>
                <input v-model="user.email" name="email" type="text" class="form-control" placeholder="email">
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input v-model="user.password" name="password" type="password" class="form-control" placeholder="Contraseña">
            </div>
            <button  @click="editing ? edit() : save()" class="btn btn-secondary float-right">{{ editing ? "Editar usuario" : "Crear usuario" }}</button>
        </Dialog>
    </div>
</template>

<script>

import UserService from '@/services/UserService'
import layout from '@/components/layout'

export default {
    name: 'users-component',
    props: {
    },
    components: {
        layout
    },
    data(){
        return {
            UserService: null,
            users: null,
            user: {
                id: null,
                name: null,
                email: null,
                rol_id: null,
                password: null,
            },
            selected: {
                id: null,
                name: null,
                email: null,
                rol_id: null,
                password: null,
            },
            editing: false,
            items: [
                {
                    label:'Nuevo usuario',
                    icon:'pi pi-fw pi-plus',
                    command : () => {
                        this.showCreateModal();
                    }
                },
                {
                    label:'Editar usuario',
                    icon:'pi pi-fw pi-pencil',
                    command : () => {
                        this.showEditModal();
                    }
                },
                {
                    label:'Eliminar usuario',
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
        this.UserService = new UserService();
    },
    mounted() {

        this.getAll();
    },
    methods: {
        getAll() {
            this.UserService.getAll().then(
                data => {
                    this.users = data.data.data;
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
            this.user = this.selected;
            this.display = true;
        },
        save() {
            this.UserService.save(this.user).then(
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
            this.UserService.update(this.user.id, this.user).then(
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
            this.user = this.selected;
            this.UserService.delete(this.user.id).then(
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
            this.user = {
                name: null,
                email: null,
                rol_id: null,
                password: null,
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

        }
    }
}
</script>

<style scoped>

</style>