<template>
<div>

 <div v-if="isAuth == true">
    <Navbar  @clicked="optionsFromInput" :options="options" :Clickhandle="Clickhandle"/>

  <div v-if="isFilter == false" class="container">
    <div  v-for="post in posts" :key='post.id' class="card">
      <div class="post_header">
      <span class="post_title">{{post.title}}</span> - "<span class="post_tag">{{post.tag}}</span>", <span  class="post_date">{{post.date}}</span>
      </div>
        <div class="post_skills">
          <div v-for="skill in post.skills" :key="post.id + skill">{{skill}}</div>
        </div>
      <div class="post_body">{{post.body}}</div>
      <div class="buffer"></div>
    </div>
  </div>

  <div v-if="isFilter == true" class="container">
    <div  v-for="post in FilteredPosts" :key='post.id + 99' class="card">
      <div class="post_header">
      <span class="post_title">{{post.title}}</span> - "<span class="post_tag">{{post.tag}}</span>", <span  class="post_date">{{post.date}}</span>
      </div>
        <div class="post_skills">
          <div v-for="skill in post.skills" :key="post.id + skill">{{skill}}</div>
        </div>
      <div class="post_body">{{post.body}}</div>
      <div class="buffer"></div>
    </div>
  </div>  
</div> 
   <h1 v-if="isAuth == false">Error 404 </h1>
</div>

</template>

<script>
import Navbar from '../components/Navbar.vue'
import axios from 'axios'
const baseURL = `http://localhost:3000/` 

export default {
  components:{
    Navbar,
  },
  name: 'Blog',
  props:['posts','Clickhandle','options'],
  data(){
    return{
      isAuth : false,
      isFilter : false,
      token:'',
      FilteredPosts: ''
    }
  },
   methods: {
    // gets options data from parent component and filter if (posts skills = option)
    optionsFromInput (value) {
      this.isFilter = true
      this.FilteredPosts = this.posts.filter( post => post.skills.includes(value[0]))
      console.log(this.FilteredPosts)
    }
  },

  async created(){
    try {
      console.log(this.options)

          const token_res = await axios.get(baseURL + 'token')
          this.token = token_res.data.token
          const localToken = localStorage.getItem('token');

          //check token
          if(this.token == localToken){
             this.isAuth = true 
          } else {
             this.isAuth = false 

          }
        } catch(e){
          console.error(e)
        }
  }
}
</script>

<style scoped>
.buffer{
  background-color: rgb(184, 184, 184);
  width: 100vw;
  height: 1px;
  margin-top: 5vw;
}

.container{
  font-size: 20px;
  position: relative;
  top: 10vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  white-space: pre;
}

.card{
  padding: 30px;

}

.post_header{
  font-size: 40px;
}

.post_title{
  font-weight: 600;
}


</style>
