app.component('product-display',
{   
    props:{
        premium:{
            type: Boolean,
            required : true
        }
    },

    template:
    /* html */
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image"
        :class = "{'out-of-stock-img': !inStock }"
         alt="Image not loading!">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="onSale">{{ saleMessage }}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p> Shipping Cost: {{ shipping }}</p>
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <!-- <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul> -->

        <p v-if="inventory > 10">On Sale</p>
        <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p>
        <p v-else>Out of Stock!</p>

        <!-- <div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>
        <div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div>
        <div v-for="variant in variants" :key="variant.id">{{ variant.color }}</div> -->

        <div v-for="(variant , index) in variants" 
          :key="variant.id" 
          @mouseover="updateVariant(index)" 
          class="color-circle"
          :style = "{ backgroundColor : variant.color }"
          
          > 
          <!-- {{ variant.color }}  -->
        </div>
        <button class="button" 
          v-on:click = "addToCart()" 
          :disabled = "!inStock" 
          :class="{disabledButton : !inStock}">
        Add to Cart
      </button>

      <!-- Remove from cart -->
        <button class="button" 
            v-on:click = "addToCart()" 
            :disabled = "!inStock" 
            :class="{disabledButton : !inStock}">
            Remove from Cart
        </button>

        <!-- // ** Remove from cart functionality ** // 
           <button class="button" @click="removeFromCart()">Remove from Cart</button> 
          -->

      </div>
      
    </div>
  </div>`,
  
 
  data(){
    return{
        brand : 'Vue Mastery',
        cart : 0 ,
        product : 'Socks',
        selectedVariant: 0,
        onSale: true,
        // inventory: 0,
        details:['50% Cotton','30% Wool','20% Polyester'],
        sizes:['1', '2', '3', '4', '5', '6'],
        variants:[
            {id: 2234, color:'green', image: 'assets/images/socks_green.jpg', quantity:50 },
            {id: 2235, color:'blue', image: 'assets/images/socks_blue.jpg', quantity:0 },
        ]
    }
},

methods:{
    addToCart(){
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart(){
        this.cart -= 1
    },
    // updateImage(variantImage){
    //     this.image = variantImage
    // },
    updateVariant(index){
        this.selectedVariant = index
    }
    
},

computed:{
    title(){
        return this.brand + ' ' + this.product
    },
    image(){
       return this.variants[this.selectedVariant].image
    },
    inStock(){
        return this.variants[this.selectedVariant].quantity
    },
    saleMessage(){
        if(this.onSale){
            return this.brand + " " + this.product + " is on sale."
        }
        return ''
    },
    shipping(){
        if(this.premium){
            return 'Free'
        }
        return 2.99
    }

}

})