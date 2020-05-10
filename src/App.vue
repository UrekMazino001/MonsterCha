<template>
  <v-app>
    <v-toolbar app color="primary" dark>
      <v-toolbar-title class="headline monster-font">
       Monster Chat
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-layout v-if="usuario" align-center justify-end>
          <v-avatar size="40" color="white">
            <v-img :src="usuario.foto" > </v-img>
          </v-avatar>
            <span class="ml-3 monster-font"> {{usuario.nombre}} </span>
            <v-btn class="monster-font" flat small @click="usuario = null">Salir </v-btn>
        </v-layout>
   </v-toolbar>

     <!--Mostrar los componentes -->
    <v-content>
      <v-container fluid fill-height class="fondo">
        <login v-if="!usuario" @onNotificacion="mostrarNotificacion" @onIngresar="ingresar"/>
        <chat v-else @onNotificacion="mostrarNotificacion" :usuario="usuario"/>
      </v-container>
    </v-content>

    <!-- Notificacion tipo SnackBar -->
    <v-snackbar v-model="notificacion.visible" :color="notificacion.color" multi-line top :timeout="6000" dark >
      <span> {{notificacion.mensaje}} </span>

      <v-btn color="white" flat @click="notificacion.visible = false">
        Cerrar
      </v-btn>
    </v-snackbar>
    
    <v-footer color="primary" dark>
      <v-layout justify-center>
          <span>Monster Chat  -   Ariel Cabrera </span>
      </v-layout>
    </v-footer>

  </v-app>
</template>

<script>
import login from './components/login'
import chat from './components/chat'

export default {
  name: 'App',
  components: {
    login,
    chat
  },
  data () {
    return {
      usuario: null,
      notificacion: {
        mensaje: '',
        color: 'info',
        visible: false
      }
    }
  },
  methods: {
    ingresar (usuario){  //Lo va a recibir desde el componente Login
      this.usuario = usuario
    },
    mostrarNotificacion (notificacion){
      this.notificacion.mensaje = notificacion.mensaje
      this.notificacion.color = notificacion.color
      this.notificacion.visible = true
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah');

.monster-font{
   font-family: 'Gloria Hallelujah', cursive !important;
}
  .fondo{
        background-color: #f1f1f1
  }
</style>
