<template>
    <div class="container">
        <div class="card card-default">
            <div class="card-header">Login</div>
            <div class="card-body">
                <div class="alert alert-danger" v-if="has_error">
                    <span>Error, Invalid credentials.</span>
                </div>
                <form autocomplete="off" @submit.prevent="login" method="post">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" class="form-control" placeholder="user@example.com" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control" v-model="password" required>
                    </div>
                    <b-button type="submit" variant="primary" class="mb-2">
                        <b-icon icon="box-arrow-in-right" aria-hidden="true"></b-icon> Login
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
            email: null,
            password: null,
            has_error: false
        }
    },
    components: {
    },
    mounted() {
      //
      console.log(this.$auth);
    },
    methods: {
        async login() {
            var redirect = this.$auth.redirect()
            var params = {
                data: { email: this.email, password: this.password },
                rememberMe: true,
                fetchUser: true
            }

            try {
                const response = await this.$auth.login(params);
            } catch (err) {
                this.has_error = true
            }
            
        }
    }
}
</script>