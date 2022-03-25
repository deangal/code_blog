<template>
   <form @submit.prevent="LoginHandle">

  <div class="login_containter">
    <label  for="uname"><b>Username</b></label>
    <input v-model="username" type="text" placeholder="Enter Username" name="uname" required>
    <label for="psw"><b>Password</b></label>
    <input v-model="password" type="password" placeholder="Enter Password" name="psw" required>
        
    <button   type="submit">Login</button>
  </div>


</form>
</template>

<script>
import jwt from 'jsonwebtoken'
import axios from 'axios'
const baseURL = `http://localhost:3000/token/` 
    export default {
        
        data(){
        return{
          username:'',
          password:'',
          token:''
        }
      },
      methods:{
        async LoginHandle(){
          if(this.username == 'admin' & this.password == 'admin'){
            let localToken = jwt.sign({ foo: 'bar' }, this.password)
             try {
              await axios.put(baseURL  ,{"token" :localToken})
              localStorage.setItem('token', localToken);
              window.location.replace("http://localhost:8080/#/blog");

            } catch(e){
              console.error(e)
            }
            console.log(localToken);

          }
        }
      },

     async created(){
        try {

              const res = await axios.get(baseURL)
              this.token = res.data.token
              const localToken = localStorage.getItem('token');
              if(this.token == localToken){
                window.location.replace("http://localhost:8080/#/blog");

              }
            } catch(e){
              console.error(e)
            }
      }
    }

</script>

<style scoped>
form {border: 3px solid #f1f1f1;}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imglogin_containter {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.login_containter {
  padding: 16px;
  width: 30vw;
  position: absolute;
  top: 25%;
  left: 35vw;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>