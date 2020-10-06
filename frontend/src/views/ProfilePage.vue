<template>
  <main id="profile">
      <LeafOverlay />
        <article class="create-user" v-if="createUserForm">
            <img src="@/assets/userFormLogo.svg" alt="">
            <h2>Välkommen till AirBean-familjen!</h2>
            <p>
                Genom att skapa ett konto nedan kan du spara och
                 se din orderhistorik.

            </p>

             <section class="form-wrapper">
                <label for="name-input">Namn</label>
                <input id="name-input" v-model="userName" type="text">

                <label for="mail-input">Epost</label>
                <input id="mail-input" v-model="userMail" type="text">

                <label class="container">
                <input type="checkbox" @click="gdprToggle">
                <span class="checkmark"></span>
                GDPR Ok!
                </label>
             </section>


            <button class="push-user" @click="pushUser">Brew me a cup!</button>
        </article>
      <div class="user-img">
          <img src="@/assets/Union.svg" alt="">
      </div>

      <h3 class="user-name">{{userName}}</h3>
      <p class="user-mail">{{userMail}}</p>

      <h2 class="order-history-header">Orderhistorik</h2>
      <section class="order-history">
          <article class="order-item" v-for="(order, index) in orderHistory" :key="index">
              <h4>#{{order.purchase}}</h4>
              <p>{{order.orderDate}}</p>
              <p>total ordersumma</p>
              <p>{{order.totalCost}} kr</p>

          </article>
          <h4 class="total-cost">Totalt spennderat <span class="total-cost-span">{{historyCost}} kr</span></h4>
      </section>
  </main>
</template>

<script>

import LeafOverlay from '@/components/LeafOverlay'


export default {
    name: 'profile-page',
    data() {
        return {
            createUserForm: false,
            gdprCheck: false,
            userName: 'Sixten Kaffelövér',
            userMail: 'sixten.kaffelover@zocom.se',
            history: [],
            lastName: '',
            firstName: ''
        }
    },
    components: {
        LeafOverlay
    },
    computed: {
        orderHistory: function() {
            console.log('order history ',this.$store.state.orderHistory.history)
            
            return this.$store.state.orderHistory.history
        },
        user() {
            return this.$store.state.user
        },
        historyCost(){
            if(!this.orderHistory){
                return 0
            }else {
                return this.orderHistory.reduce((acc, item) => acc + item.totalCost , 0)
            }

        }
    },
    beforeMount(){
            if(sessionStorage.getItem('user') === null) {
                console.log('du är inte inloggad')
                this.createUserForm = true
            } else {
                this.$store.dispatch('getUser')
                let user = JSON.parse(sessionStorage.getItem('user'))
                this.userName = user.name
                this.userMail = user.mail
                console.log('beforemount', user, this.userMail)
                this.$store.dispatch('fetchOrders')
            }
  },
  methods: {
      async pushUser() {
          if(this.gdprCheck) {
            
            let userInfo = {name: this.userName, mail: this.userMail}

            
            console.log('PUSHuSERin profilepage.vue', userInfo)
            //let LastOrder = sessionStorage.getItem('NoUserOrder')
            //this.userName =  
            await this.$store.dispatch('createUser', userInfo)
            //this.$store.dispatch('fetchOrders')
           
            //this.$store.commit('currentSignedInUser', this.userName)
            //this.$store.dispatch('fetchOrders')
            if(!this.$store.state.ui.showCreateUser) {
                //this.createUserForm = false
                console.log('hejhejhejhej')
            } else {
                this.createUserForm = false
            }
          }else {
              console.log('no gdpr check')
          }
      },
      gdprToggle() {
          this.gdprCheck = !this.gdprCheck
      }
  }
}
</script>

<style lang="scss">
@import './../scss/variables';



.user-name, .order-history-header {
    font-family: 'PT Serif';
    height: 31px;
    font-size: 24px;
    line-height: 120%;

    color: #FFFFFF;
}

.order-history-header {
    width: 80%;
    text-align: left;
}
.user-mail {
    
    font-family: 'Work Sans';
    
    font-size: 14px;
    line-height: 120%;

    color: rgba(255, 255, 255, 0.8);
}

.user-img {
    width: 94px;
    height: 94px;
    background: $airBeanPink;

    border-radius: 999rem;

    overflow: hidden;
    position: relative;

    img {
        position: absolute;
        left: 0;
        bottom: 0;
    }
}

.order-history {
    width: 80%;
    position: relative;

    

    .order-item {
        display: grid;
        text-align: left;
        grid-template-columns: 75% auto;
        grid-template-rows: 25px 20px;
        font-family: 'Work Sans';
        align-items: flex-end;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        //margin-bottom: .5rem;

        
    
        h4 {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
        p {

            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            /* or 14px */

            color: rgba(255, 255, 255, 0.5);

            &:nth-child(2), &:nth-child(4) {
                margin-left: auto;
            }
        }
        
    }

    .total-cost {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(255, 255, 255, 0.6);
        padding-top: .5rem;


        font-family: 'Work Sans';
        font-size: 14px;
        line-height: 25px;
        color: rgba(255, 255, 255, 0.7);

    }
}

.create-user {
    top: 75px;
    position: absolute;
    width: 20rem;
    height: 35rem;
    background: #F3E4E1;
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.55);

    display: flex;
    flex-direction: column;
    align-items: center;

    z-index: 10;
    
    padding-top: 2.5rem;

    p {
        margin-bottom: 3rem;
    }
    
    .push-user {
        width: 248px;
        height: 55px;
        

        /* Airbean - brown */
        background: $airBeanBrown;
        border-radius: 50px;
    }


}

.form-wrapper {
    width: 90%;

    display: flex;
    flex-direction: column;

    #name-input, #mail-input {
        width: 100%;
        height: 48px;
        

        /* Airbean - brown */
        border: 1px solid #2F2926;
        box-sizing: border-box;
        border-radius: 6px;
    }
    #mail-input {
        margin-bottom: 1rem;
    }

    label {
        text-align: left;
    }


}



.container {
  display: block;
  position: relative;
  padding-left: 15px;
  margin-bottom: 2rem;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 12px;
  width: 12px;
  border-radius: 999rem;
  background-color: #eee;
  border: 1px solid black;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $airBeanDarkGreen;
}

/* Create the checkmark/indicator (hidden when not checked) 
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
*/
/* Show the checkmark when checked 
.container input:checked ~ .checkmark:after {
  display: block;
}
*/
/* Style the checkmark/indicator 
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
*/
</style>