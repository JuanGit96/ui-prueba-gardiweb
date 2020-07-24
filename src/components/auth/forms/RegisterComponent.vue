<template>
  <div class="register-component">
    <div class="form-group">
        <label>Nombre</label>
        <input name="name" type="text" class="form-control" placeholder="Nombre de usuario">
    </div>
    <div class="form-group">
        <label>Correo electronico</label>
        <input name="email" type="text" class="form-control" placeholder="email">
    </div>
    <div class="form-group">
        <label>Rol</label>
        <select class="form-control" name="role_id" id="role_id">
            <option value="">Seleccione</option>
            <option value="1">Administrador</option>
        </select>
    </div>
    <div class="form-group">
        <label>Contraseña</label>
        <input name="password" type="password" class="form-control" placeholder="Contraseña">
    </div>
    <div class="form-group">
        <label>Confirma la contraseña</label>
        <input name="password_confirmation" type="password" class="form-control" placeholder="Confirma la contraseña">
    </div>
    <button type="button" class="btn btn-black">Ya tengo cuenta</button>
    <button type="submit" class="btn btn-secondary">¡Registrate!</button>
    <hr>
  </div>

</template>

<script>
export default {
  name: 'RegisterComponent',
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
