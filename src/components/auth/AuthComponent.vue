<template>
    <div>
        <div class="sidenav">
            <div class="login-main-text text-center">
                <img alt="Vue logo" src="../../assets/logo.png">
                <h2>PRUEBA GARDIWEB<br>Login Page</h2>
                <p>ingresa para tener acceso.</p>
                <p><b>UI realizado con VueJs</b></p>
            </div>
        </div>
        <div class="main">
            <div class="col-md-6 col-sm-12">
                <div class="login-form">
                    <form>
                        <LoginComponent/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginComponent from '@/components/auth/forms/LoginComponent'
export default {
  name: 'AuthComponent',
  props: {
  },
  components: {
    LoginComponent,
  }
}
</script>

<style scoped>
body {
    font-family: "Lato", sans-serif;
}



.main-head{
    height: 150px;
    background: #FFF;
   
}

.sidenav {
    height: 100%;
    background-color: #000;
    overflow-x: hidden;
    padding-top: 20px;
}


.main {
    padding: 0px 10px;
}

@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (max-width: 450px) {
    .login-form{
        margin-top: 10%;
    }

    .register-form{
        margin-top: 10%;
    }
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 33%; 
    }

    .sidenav{
        width: 30%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }

    .login-form{
        margin-top: 80%;
    }

    .register-form{
        margin-top: 20%;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}
</style>