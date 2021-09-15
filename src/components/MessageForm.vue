<template>

  <div class="block-content">

 
      <div class="width-100 font-error" v-show="dataError">
        <pre data-testid="error">{{ dataError }}</pre>
      </div>
    
      <div class="table width-auto">
                             
        <div class="tr">                  
          <div class="td text-right" :class="{'font-error': !formValid.name}">        
            <span>Name</span>  
            <span>*</span>            
          </div>
          <div class="td">
            <input type="text" data-testid="name" v-model="formData.name" :readonly="formSent" />
          </div>
        </div> 
        
        <div class="tr">                  
          <div class="td text-right" :class="{'font-error': !formValid.email}">            
            <span>Email</span> 
            <span>*</span>
          </div>
          <div class="td">
            <input type="email" data-testid="email" v-model="formData.email" :readonly="formSent" />
          </div>
        </div>         
        
        <div class="tr">                  
          <div class="td text-right" :class="{'font-error': !formValid.subject}">            
            <span>Subject</span> 
          </div>
          <div class="td">
            <input type="text" data-testid="subject" v-model="formData.subject" :readonly="formSent" />
          </div>
        </div>          
        
        <div class="tr">                  
          <div class="td text-top" :class="{'font-error': !formValid.message}">    
            <span>Message</span>           
            <span>*</span>
          </div>
          <div class="td">
            <textarea data-testid="message" class="width-100 custom-input" rows="3" v-model="formData.message" :readonly="formSent" />
          </div>
        </div>           
        
        <div class="tr" v-show="!formSent">                  
          <div class="td text-right">            
          </div>
          <div class="td text-left">
            <button data-testid="send" v-on:click="send()">Send message</button>
          </div>
        </div>  
            
      </div>
      

      <div data-testid="success" class="td text-left" v-show="formSent">
        {{ formSent }}         
      </div>
    
   
  </div>

</template>

<script>

import axios from "axios";

export default {

  mixins: [],
 
  data() {
    return {
    
      dataError: null,      
      dataApi: "https://5d9f7fe94d823c0014dd323d.mockapi.io/api",   
    
      formData : {
        name: "",
        email: "",
        subject: "",
        message: ""
      },

      formValid : {
        name: true,
        email: true,
        subject: true,
        message: true
      },
      
      formSent : null
      
    }
  },

  watch: {
  },

  mounted() {
  },

  methods: {
  
    validate() {
    
      this.formData.name    = this.formData.name.trim();
      this.formData.email   = this.formData.email.trim();
      this.formData.subject = this.formData.subject.trim();
      this.formData.message = this.formData.message.trim();
      
      this.dataError = "";
      
      if (this.formData.name.length < 5) {
        this.dataError += "Name must be at least 5 characters long\n";
        this.formValid.name = false;
      }
      else if (this.formData.name.length > 50) {
        this.dataError += "Name can be up to 50 characters long\n";
        this.formValid.name = false;
      }
      else {
        this.formValid.name = true;
      }      
      
      let emailMask = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
      
      if (!emailMask.test(this.formData.email)) {
        this.dataError += "Please enter valid email address\n";
        this.formValid.email = false;  
      }
      else {
        this.formValid.email = true;
      }    
      
      if (this.formData.subject.length > 100) {
        this.dataError += "Subject can be up to 100 characters long, please shorten it a little\n";
        this.formValid.subject = false;
      }     
      else {
        this.formValid.subject = true;
      }  
      
      if (this.formData.message.length < 1) {
        this.dataError += "Message is too short, please give us more details\n";
        this.formValid.message = false;        
      }       
      else if (this.formData.message.length > 500) {
        this.dataError += "Message is too long,it can be up to 500 characters, please consider to shorten a little\n";
        this.formValid.message = false;
      }  
      else {
        this.formValid.message = true;
      } 

      return this.formValid.name && this.formValid.email && this.formValid.subject && this.formValid.message;      
    
    },
  
  
    async send() {

      if (!this.validate()) return;
      
      // sending POST request to the server
  
      try {
        let response = await axios.post(this.dataApi + "/message", this.formData);
        //window.console.log(response);
        this.dataError = null;
        this.formSent  = "Your message is sent, message id #" + response.data.id;          
      }
      catch(error) {
        this.dataErrorLog(error);      
      }

    }, 

    dataErrorLog(error) {  
       
      //non standard stucture      
      if (error.response && error.response.data && error.response.data.code) {
        this.dataError = error.response.data.code + ": " + error.response.data.message;    
      }       
      else if (error.request && error.request.status) { 
        this.dataError = error.request.responseText;         
      }      
      else {
        this.dataError = error;       
      }
       
      window.console.log(error.request);
      window.console.log(error.response);     
      window.console.log(this.dataError);     

    }

  
  },
  
  computed: {
  }
}
</script>


<style scoped>

*,
*:before,
*:after,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

input {
  border: none;
  border-bottom: 1px solid;
  background-color: inherit;
}

textarea {
  white-space: nowrap;
  overflow: auto;
  background-color: inherit;
} 

.nowebkit-appearance,
textarea, 
input[type=text], 
input[type=date], 
input[type=number], 
input[type=submit] {
	-webkit-appearance: none;
  -webkit-border: none;
  -webkit-border-radius: 0; /* fixed */
  -webkit-box-shadow: none;
}

input:-webkit-autofill {
    background-color: inherit;
}

select {
  //-moz-appearance: none;
  border: none;
  border-bottom: 1px solid;
  background-color: inherit;
}

select > option {
  //background-color: inherit;
  background-color: var(--main-b-color);
}


.block-content {
  box-sizing: border-box;
  padding: 0.3em;

  width: 100%;
  max-width: 100%;

  word-break:    break-word;
  word-wrap:     break-word;
  overflow-wrap: break-word;
}

.width-100 {
  width: 100%;
  max-width: 100%;  
}
.width-auto {
  width: auto;
  max-width: 100%;  
}

.font-error {
  color: Red;
}

.table {
  display: table;  
  box-sizing: border-box;  
  
  /* idea from bootstrap */
  margin-bottom: 0;
  
  color: var(--main-color);    
  background-color: var(--main-b-color);  
}

.thead {
  display: table-header-group;
  border: inherit;
}

.tbody {
  display: table-row-group;
  border: inherit;
}

.th {
  display: table-row;
  font-weight: bold;
  border: inherit;
  background-color: var(--table-header-b-color);
}

.tr {
  display: table-row;
  border: inherit;
}

.td {
  display: table-cell;
  box-sizing: border-box;
  padding: 0.3em;
  border: inherit;
}

.td {
  padding-top: 1em;
}

--main-input-border-color: LightGray;
--main-input-border-color-focus: Black;  
  
.custom-input {  
  outline: none !important;
  box-sizing: border-box;
  border-radius: 0;  /* fixed */
  box-shadow: none;  
  border-color: var(--main-input-border-color) !important;
  border: none;
  border-bottom: 1px solid;  
  padding: 0.1em;
  color: inherit;
  background-color: inherit !important;
}

.custom-input:focus {
  border: 1px solid var(--main-input-border-color-focus) !important;
  box-shadow: 0 0 0.6em var(--main-border-color);
  background-color: inherit !important;  
}


/* text aligment */
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}

.text-top {
  vertical-align: top;
}

.text-bottom {
  vertical-align: bottom;
}

</style>
