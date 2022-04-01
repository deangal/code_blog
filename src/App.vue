<template>
  
  <div id="app"  >
    
  <router-view :Clickhandle="Clickhandle" :posts="posts">

    <Login />
    <Blog :Clickhandle="Clickhandle" />

  </router-view>
        <!-- modal  :class="{isClicked} ? 'bg_modal active' : 'bg_modal'" -->

  <div v-bind:class="[isClicked ? 'bg_modal active' : 'bg_modal']">
      <div class="modal_content">

        
        <div  @click="Clickhandle" class="close">+</div>
        <form class="modal_form"  @submit="newPost">
          <div class="form_header">
          <input class="form_title" v-model="title" placeholder="Title" type="text">
          <input class="form_tag" v-model="tag" placeholder="Tag" type="text">
          </div>

          <label label for="options">options:</label>

          <select @change="addToSelcetedOptions" class="form_options" name="options" >
          <option v-for="option in options" :key="option">{{option}}</option>
            </select>
          
            <div class="selcted_options_container">
              <div v-for="option in selected_options" :key="option"  >{{option}}</div>
            </div>

          <textarea class="form_body" v-model="body" cols="30" rows="10"></textarea>
        <input type="submit" value="Create" class="create"/>   
        </form>
           </div>
  </div>
  </div>

</template>

<script>
import Blog from './components/Blog.vue'
import Login from './components/Login.vue'
import axios from 'axios'
const baseURL = `http://localhost:3000/` 
export default {
  name: 'App',
  components: {
    Blog,
    Login
  },
  data(){
    return {
      title:'',
      tag:'',
      options : [],
      selected_options:[],
      body:'',
      isClicked:false,
       posts:'',

    }
  },

  async created(){
    try {
      const res = await axios.get(baseURL + 'posts')
      const options_res = await axios.get(baseURL + 'options')
      this.options = options_res.data
      console.log(this.options)
      this.posts = res.data
    } catch(e){
      console.error(e)
    }
  },

  methods:{

    Clickhandle(){
     return this.isClicked = !this.isClicked
    },

    async newPost(){
      if(this.title == '' || this.tag == '' || this.body == '' ){
        alert("Fill in all the fields!")
      } else {
        let object = {id:this.posts.length+1,date:this.getDate(),title:this.title,tag:this.tag,body:this.body,skills:this.selected_options}
        let res = await axios.post(baseURL + 'posts', object)
        this.posts = [...this.posts, res.data]
        this.isClicked = !this.isClicked    
        this.selected_options = [] 
        this.title = '' 
        this.tag = ''  
        this.body = ''  
      }
    },

    getDate(){
    let date = new Date().toLocaleDateString('en-GB')
      return date
    },

    addToSelcetedOptions(e){
      if(e.target.options.selectedIndex > -1) {
          this.selected_options = [...this.selected_options, e.target.options[e.target.options.selectedIndex].innerHTML]
      }
      console.log(this.selected_options)
    }

  }
}
</script>

<style>
html{
  overflow-x:hidden;
}
body.lock{
  overflow: hidden;
}
.close{
position: relative;
left: 14vw;
font-size: 32px;
transform: rotate(45deg);
padding: 4px;
cursor: pointer;
}
.selcted_options_container{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:0.5vw;
}
/* CSS */
.create {
  background-color: #e1ecf4;
  border-radius: 3px;
  border: 1px solid #7aa7c7;
  box-shadow: rgba(255, 255, 255, .7) 0 0.5px 0 0 inset;
  box-sizing: border-box;
  color: #39739d;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI","Liberation Sans",sans-serif;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.15385;
  margin-top: 5px;
  outline: none;
  padding: 12px 1em;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  white-space: nowrap;
}

.create:hover,
.create:focus {
  background-color: #b3d3ea;
  color: #2c5777;
}

.create:focus {
  box-shadow: 0 0 0 4px rgba(0, 149, 255, .15);
}

.create:active {
  background-color: #a0c7e4;
  box-shadow: none;
  color: #2c5777;
}


input:focus::-webkit-input-placeholder{
  visibility: hidden;
}


.form_title{
  width: 21vw;
  height: 3vh;
  font-size: 19px;

}

.form_tag{
  width: 5vw;
  height: 3vh;
  margin-left: 0.5vw;
  font-size: 19px;

}

.form_body{
  width: 27vw;
  height: 25vh;
  margin-left: 5px;
  margin-top: 2vh;
  resize: none;
  font-size: 19px;

}

.form_header{
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal_content{
  width: 30vw;
  height: 45vh;
  background-color: white;
  border-radius: 4px;
  
}

.bg_modal{

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
  transition: linear 1s ;
}

.active{
  display: flex;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
