<template>
  <div class="about">
    <b-container class="container">
      <b-row>
        <b-col>
          <h1>City Clar</h1> 
          &mdash; urban decor solution &mdash; <br><br>
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          blabla
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        scrolled: false
      };
    },
    methods: {
      handleScroll () {
        this.scrolled = window.scrollY > 0;
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
>

<style>
* {
  box-sizing: border-box;
}

.about{
      scroll-behavior: smooth;
      min-height: 100%;
      width: 70%;
      background-color: transparent;
      margin-top: 10%;
      position: fixed;
      top: 5%;
      right: 15%;
      font-weight: bold;
  }

  @media (max-width: 800px) {
    .about {
      flex: 100%;
      max-width: 100%;
      top: 40%;
    }
  }

  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media (max-width: 600px) {
    .about {
      flex: 100%;
      max-width: 100%;
      top: 25%;
    }
  }

  h1 {
    font-family: Georgia, Times, 'Times New Roman', serif;
    color: #008000;
    font-weight: bolder;  
    font-style: italic;      
  }

</style>
