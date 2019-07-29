<template>
  <div class="login">
		<b-container fluid class ="login-form">
			<b-row order="1">
				<span>Login:</span> <br>
				<v-icon name="mail"></v-icon>
				<input v-model="email" type="email" placeholder="email@domain.it" required/><br>
				<v-icon name="lock"></v-icon>
				<input v-model="password" type="password" placeholder="password" required/><br>
				<b-button pill variant="success"> Accedi </b-button>
			</b-row>	
			<b-row order="2">
				<span>Crea un nuovo account:</span> <br>
				<v-icon name="mail"></v-icon>
				<input v-model="email" type="email" placeholder="email@domain.it" required/> <br>
				<v-icon name="user"></v-icon>
				<input v-model="text" type="text" placeholder="Maria Rossi" required/> <br>
				<v-icon name="gift"></v-icon>
				<input v-model="date" type="date" required/> <br>
				<v-icon name="lock"></v-icon>
				<input v-model="password" type="password" placeholder="password" required/> <br>
				<v-icon name="lock"></v-icon>
				<input v-model="password" type="password" placeholder="confirm password" required/><br>
				<b-button pill variant="success"> Iscriviti </b-button>	
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

	@import 'node_modules/bootstrap/scss/bootstrap';
	@import 'node_modules/bootstrap-vue/src/index.scss';

	.row{
		width: 50%;
		height: auto;
		display: inline-table;
	}

	span {
		font-weight: bolder; 
	}

	input {
    outline: 0;
    border: 0;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    align-self: center;
    width: 300px;
    height: 40px;
		margin-top: 15px;
    margin-bottom: 1px;
    border: 1px solid #cfd9db;
    background-color: #ffffff;
    border-radius: 0.25em;
    color: black;
  }

	@media (max-width: 800px) {
		.row {
			width: 100%;
			align-content: center;
		}

		input {
			width: 270px;
		}
  }

  .btn {
    width: 140px;
    height: 40px;
    text-align: center;
		margin-top: 20px;
		margin-bottom: 20px;
  }

  .icon{
    margin-right: 20px;
    width: 20px;
    height: 100%;
    text-align: center;
  }

	@media (max-width: 340px) {
    input {
      width: 250px;
    }

    .btn {
      width: 120px;
    }

		.icon{
			margin-top: 10px;
		}

  }
</style>