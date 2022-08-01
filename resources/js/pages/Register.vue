<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Registration</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error && !success">
                    <span v-if="error == 'registration_validation_error'">Error Validation</span>
                    <span v-else>Error, something went wrong.</span>
                </div>
                <form autocomplete="off" @submit.prevent="register" v-if="!success" method="post">
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.name }">
                        <label for="name">Name</label>
                        <input type="text" id="name" class="form-control" placeholder="Enter name" v-model="name">
                        <span class="help-block alert-danger" v-if="has_error && errors.name">{{ errors.name }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.username }">
                        <label for="username">Username</label>
                        <input type="text" id="username" class="form-control" placeholder="Enter username" v-model="username">
                        <span class="help-block alert-danger" v-if="has_error && errors.username">{{ errors.username }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.email }">
                        <label for="email">E-mail</label>
                        <input type="text" id="email" class="form-control" placeholder="user@example.com" v-model="email">
                        <span class="help-block alert-danger" v-if="has_error && errors.email">{{ errors.email }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password">
                        <span class="help-block alert-danger" v-if="has_error && errors.password">{{ errors.password }}</span>
                    </div>
                    <div class="form-group" v-bind:class="{ 'has-error': has_error && errors.password }">
                        <label for="password_confirmation">Confirm Password</label>
                        <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation">
                    </div>
                     <b-button type="submit" variant="primary" class="mb-2">
                        Registration
                    </b-button>

                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        has_error: false,
        error: '',
        errors: {},
        success: false
      }
    },
    components: {
    },
    methods: {
      async register() {
        var params = {
            data: { 
              name: this.name, 
              username: this.username,
              email: this.email,
              password: this.password, 
              password_confirmation: this.password_confirmation 
            }
        }

        try {
            const response = await this.$auth.register(params);
        } catch (err) {
            this.has_error = true
            this.error = err.response.data.error
            this.errors = err.response.data.errors || {}
        }
      }
    }
  }
</script>
