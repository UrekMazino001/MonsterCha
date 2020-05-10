<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>
                        Ingresa tu email y contraseña
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                   <v-text-field autofocus v-model="email" label="Email"> </v-text-field> 
                   <v-text-field @keyup.enter="Ingresar" v-model="password" label="Password" type="password"> </v-text-field> 
                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn @click="Ingresar" color="secondary"> Ingresar</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

import  {auth, db} from '@/firebase'

export default {
   data() {
       return {
           email: '',
           password: ''
       }
   }, 
   methods: {      
       async Ingresar () {
        if(!this.email){
           this.enviarNotificacion('Debes indicar un email', 'warning')
           return
        }
        if(!this.password){
           this.enviarNotificacion('Debes ingresar un password', 'warning')
           return
        }

        try {
            await auth.signInWithEmailAndPassword(this.email, this.password)  //Libreria de autenti
            if(auth.currentUser){  //Función que captura el usuario loggeado.
                let uid = auth.currentUser.uid

                let doc = await db.collection('usuarios')
                                .doc(uid)  //Documento en este caso se llama igual que el "ID de usuario"
                                .get()
                
                if(doc.exists){
                    let usuario = doc.data()  // camptura todo el documento del usuario.
                    this.$emit('onIngresar', usuario)
               }
               else{
                   this.enviarNotificacion('No se encontró la información del usuario', 'error')
               }
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                    this.enviarNotificacion('Usuario o contraseña incorrectas', 'warning')
                    break

                default:
                    this.enviarNotificacion('Ocurrió un error verificando la información','error')
                    break
           }
        }  
       },
       enviarNotificacion(mensaje, color){
           this.$emit('onNotificacion',{mensaje, color} )
       }
   },
}
</script>