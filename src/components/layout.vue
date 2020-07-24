<template>
   <div>
        <nav id="menu" class="navbar navbar-expand-md navbar-dark bg-dark">
        
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto pull-right">            
                    <li class="nav-item active">
                        <a class="nav-link" href="/#/vehicles">Vehiculos</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="/#/clients">Clientes</a>
                    </li>  
                    <li class="nav-item active">
                        <a class="nav-link" href="/#/users">Usuarios</a>
                    </li>                       
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
                
                </ul>            
            </div>
        </nav>   
    </div> 
</template>

<script>
export default {
    name: 'layout-component',
    props: {

    }
    
}
</script>

<style scoped>

</style>