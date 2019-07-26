<template>
  <!-- Default form register -->
    <div class="find-me">
        <input type="text" id="findPlace" class="grey-text" placeholder="Inserisci il luogo"/>
        <div class="text-center mt-4">
          <button class="btn btn-unique">Cerca</button>
          <button class="btn btn-unique">Trovami</button>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.find-me{
    width: 400px;
    height: 200px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -200px;
}

.grey-text {
  margin-top: 10%;
  align-self: auto;
  width: 300px;
  height: 40px;
  border: 1px solid #cfd9db;
  background-color: #ffffff;
  border-radius: 0.25em;
}

.btn {
  text-align: center;
  width: 36%;
  height: 40px;
  border-radius: 0.30em;
}

</style>

