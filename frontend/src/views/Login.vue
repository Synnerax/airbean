<template>
    <main id="sign-in">
    <section class="sign-in-wrapper">
        <label for="name-input">Namn</label>
        <input id="name-input" v-model="userName" type="text">
        <label for="name-input">Epost</label>
        <input id="mail-input" v-model="userMail" type="text">
    </section>

    <button id="sign-in-button" @click="signIn" >Logga In</button>
    </main>
</template>

<script>

export default {
    name: 'Sign-In',
    data() {
        return {
            userName: '',
            userMail: ''
        }
    },
    methods: {
       async signIn() {
            let userInfo = JSON.stringify({name: this.userName, mail: this.userMail})
            sessionStorage.setItem('user', userInfo)
            await this.$store.dispatch('getUser')
            console.log(userInfo)
            await this.$router.push('/profile')
        }
    }
}
</script>

<style lang="scss">

#sign-in {
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .sign-in-wrapper {

        display: flex;
        flex-direction: column;
        width: 85%;

        height: 15rem;

        label {
            text-align: left;
        }
        input {
            width: 100%;
            height: 48px;
            border: 1px solid black;
            border-radius: 6px;
            margin-bottom: 1rem;
        }
    }

    #sign-in-button {
        width: 248px;
        height: 55px;
        color: #2F2926;
        background: #ffffff;
        border-radius: 50px;
    }
}
</style>