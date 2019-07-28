<template>
  <div class="login">
	<b-container class="login-form">
		<b-row>
			<v-icon name="mail"></v-icon>
			<input v-model="email" type="email" placeholder="email@domain.it" required/>
		</b-row>
		<b-row>
			<v-icon name="user"></v-icon>
			<input v-model="text" type="text" placeholder="Maria Rossi" required/>
		</b-row>
		<b-row>
			<v-icon name="calendar"></v-icon>
			<input v-model="date" type="date" placeholder="gg/mm/aaaa" required/>
		</b-row>
		<b-row>
			<v-icon name="lock"></v-icon>
			<input v-model="password" type="password" placeholder="password" required/>
		</b-row>
		<b-row>
			<v-icon name="lock"></v-icon>
			<input v-model="password" type="password" placeholder="password" required/>
		</b-row>
		<b-row>
			<input v-model="password" type="password" placeholder="password" required/>
			<button class="btn btn-unique"> Iscriviti </button>
		</b-row>
	</b-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    
  }
}
</script>

<style scoped lang="scss">
  .login-form {
  }

  input {
    outline: 0;
    border: 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    margin-top: 10%;
    align-self: auto;
    width: 300px;
    height: 40px;
    margin-bottom: 1px;
    border: 1px solid #cfd9db;
    background-color: #ffffff;
    border-radius: 0.25em;
    color: black;
  }

  .btn {
    align-self: auto;
    width: 140px;
    height: 40px;
    border-radius: 0.9em;
    text-align: center;
	margin-top: 20px;
  }

  .icon{
    margin-right: 20px;
    width: 20px;
    height: 100%;
    text-align: center;
    vertical-align: middle;
  }
</style>