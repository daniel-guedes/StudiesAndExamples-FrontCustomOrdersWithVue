<template>
    <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form @submit="createOrder" id="order-form">
                <div class="input-container">
                    <label for="nome">Nome do cliente:</label>
                    <input type="text" name="nome" id="nome" v-model="nome" placeholder="Digite o seu nome">
                </div>
                <div class="input-container">
                    <label for="recipiente">Escolha o seu copo:</label>
                    <select name="recipiente" id="recipiente" v-model="recipiente">
                        <option value="">Selecione o seu copo</option>
                        <option v-for="recipiente in recipientes" :key="recipiente.id" :value="recipiente.tipo">{{ recipiente.tipo }}</option>
                    </select>
                </div>
                <div id="tamanho-container" class="input-container">
                    <legend for="tamanho" id="tamanho-title">Tamanho do pote:</legend>
                    <div class="radio-container"  v-for="tamanhoItem in tamanhos" :key="tamanhoItem.id">
                        <input type="radio" :id="`tamanho-${tamanhoItem.id}`" :value="tamanhoItem.tipo" v-model="tamanho"> 
                        <label :for="`tamanho-${tamanhoItem.id}`">{{ tamanhoItem.tipo }}</label>
                    </div>
                </div>
                <div class="input-container">
                    <label for="base">Açaí base:</label>
                    <select name="base" id="base" v-model="base">
                        <option value="">Selecione a base do seu açaí</option>
                        <option v-for="base in bases" :key="base.id" :value="base.tipo">{{ base.tipo }}</option>
                    </select>
                </div>
                <div id="opcionais-container" class="input-container">
                    <legend id="opcionais-title">Toppings:</legend>
                    <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                        <input type="checkbox" :id="`opcional-${opcional.id}`" :name="`opcionais-${opcional.id}`" v-model="opcionais" :value="opcional.tipo">
                        <label :for="`opcional-${opcional.id}`" >{{ opcional.tipo }}</label>
                    </div>
                </div>
                <div class="input-container">
                    <input type="submit" class="submit-btn" value="Criar meu açaí">
                </div>
            </form>
        </div>
    </div>    
</template>

<script>

    import Message from "./Message.vue";

    export default {
        name: "OrdersForm",
        data() {
            return {
                recipientes: null,
                tamanhos: null,
                bases: null,
                opcionaisdata: null,
                nome: null,
                recipiente: null,
                tamanho: null,
                base: null,
                opcionais: [],
                msg: null
            }
        },
        methods: {
            async getIngredients() {
                const req = await fetch("http://localhost:3000/ingredientes");
                const data = await req.json();

                this.recipientes = data.recipientes;
                this.tamanhos = data.tamanhos;
                this.bases = data.bases;
                this.opcionaisdata = data.opcionais;
            },
            async createOrder(e) {
                e.preventDefault();

                const data = {
                    nome: this.nome,
                    base: this.base,
                    recipiente: this.recipiente,
                    tamanho: this.tamanho,
                    opcionais: Array.from(this.opcionais),
                    status: "Solicitado"
                }
                const dataJson = JSON.stringify(data);

                const req = await fetch("http://localhost:3000/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: dataJson
                });

                const res = await req.json();

                //colocar uma msg de sistema
                this.msg = `Pedido Nº ${res.id} realizado com sucesso!`
                
                //limpar msg
                setTimeout(() => {
                    this.msg = ""
                }, 3000);

                //limpar os campos
                this.nome = "";
                this.base = "";
                this.recipiente = "";
                this.tamanho = "";
                this.opcionais = [];

                //console.log(res);
            }
        },
        mounted() {
            this.getIngredients()
        },
        components: {
            Message
        }
    }
</script>

<style scoped>
    #order-form {
        max-width: 400px;
        margin: 0 auto;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #590455;
    }

    legend {
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #590455;
    }

    #tamanho-container {
        flex-direction: row;
        flex-wrap: wrap;
    }

    #tamanho-title {
        width: 100%;
    }

    .radio-container {
        display: flex;
        align-items: flex-start;
        width: 25%;
    }

    .radio-container input {
        width: auto;
    }
    .radio-container label {
        border-left: none;
        padding: 0;
        margin-left: 6px;
    }

    input, select {
        padding: 5px 10px;
        width: 300px;
    }

    #opcionais-container {
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    #opcionais-title {
        width: 100%;
    }

    .checkbox-container {
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    .checkbox-container label, .checkbox-container input {
        width: auto;
    }

    .checkbox-container label {
        margin-left: 6px;
        font-weight: bold;
        margin-bottom: 0px;
        color: #222;
        padding: 0px;
        border-left: none;
    }

    .submit-btn {
        background-color: #590455;
        color: #A2D128;
        font-weight: bold;
        border: 2px solid #3d043b;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover {
        background-color: transparent;
        color: #222;
    }


</style>