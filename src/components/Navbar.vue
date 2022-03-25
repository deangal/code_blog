<template>
  <div class="navbar">
    <input
      type="text"
      placeholder="Search By Skills..."
      class="search"
      v-model="filter"
      @change="filterArray"
    />
    <div class="logo">{{ icon }}</div>
    <button class="new_post" @click="Clickhandle">New Post</button>
    <div id="menu">
      <a id="github" href="https://github.com/deangal">github</a>
      <a id="linkedin" href="https://www.linkedin.com/in/deangal/">linkedin</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "</>",
      filter: "",
      // filteredArray:[]
      filteredString: "",
    };
  },
  props: ["Clickhandle", "options"],
  methods: {
    filterArray() {
      this.filteredString = this.options.filter(
        (option) => option.toUpperCase() == this.filter.toUpperCase()
      );
      // if(filteredString != undefined && filteredString != ''){
      // 	this.filteredArray.push(filteredString[0])

      // }
      console.log(this.filteredString);
      this.$emit("clicked", this.filteredString);
    },
  },
};
</script>

<style scoped>
.search {
  font-size: 25px;
  border-radius: 30px;
  border: 0.5px solid black;
  padding: 10px;
}

.new_post {
  position: absolute;
  left: 1px;
  justify-content: center;
  height: 79px;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
}

body {
  margin: 0;
  padding: 0;
}

.navbar {
  position: fixed;
  height: 80px;
  width: 100%;
  overflow: hidden;
  top: 0;
  align-items: center;
  background: #f1f1f1;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 50px;
  font-size: 3rem;
  position: absolute;
  top: 17%;
  left: 7.5vw;
  background-size: cover;
  background-position: 50% 50%;
  transition: color 0.5s;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 600;
}

.logo:hover {
  color: #6ab04c;
}

#menu {
  position: absolute;
  right: 20px;
  top: 35%;
}

#menu a {
  color: #333;
  text-decoration: none;
  font-weight: 700;
  margin-left: 20px;
  transition: color 0.3s;
  text-transform: uppercase;
}

#menu #linkedin:hover {
  color: #0a66c2;
}
#menu #github:hover {
  color: #6e7781;
}

.header {
  width: 100%;
  height: 600px;
  background: url("https://source.unsplash.com/Oo33n4t-qzc/1600x900") no-repeat
    50% 50%;
  background-size: cover;
  margin-top: 80px;
}

p {
  padding: 20px;
  font-size: 18px;
  text-align: justify;
}

#btn {
  display: none;
  position: absolute;
  right: 20px;
  top: 25%;
}

#btn:hover > span {
  background-color: #6ab04c;
}

#btn span {
  display: block;
  margin: 6px;
  width: 40px;
  height: 3px;
  background: #333;
}

@media only screen and (max-width: 600px) {
  .navbar {
    overflow: visible;
  }
  #menu {
    width: 100%;
    right: 0;
    top: 60px;
    background: #f1f1f1;
    overflow: hidden;
    max-height: 0;
  }
  #menu a {
    display: block;
    text-align: center;
    padding: 10px;
    margin: 0;
  }
  #btn {
    display: block;
    cursor: pointer;
  }
  .show {
    max-height: 500px;
  }
}
</style>
