<template>
  <div class="login-component">
      <div class="form-group">
          <label>Nombre de usuario</label>
          <input type="text" class="form-control" placeholder="Nombre de usuario">
      </div>
      <div class="form-group">
          <label>Contraseña</label>
          <input type="password" class="form-control" placeholder="Contraseña">
      </div>
      <button type="submit" class="btn btn-black">¡Iniciar!</button>
      <button type="button" class="btn btn-secondary">No tengo cuenta</button>
      <hr>
  </div>

</template>

<script>
export default {
    name: 'LoginComponent',
    props: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-black{
    background-color: #000 !important;
    color: #fff;
}
</style>
