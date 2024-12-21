<template>
    <Message :msg="msg" v-show="msg" />
    <div id="order-table">
        <div>
            <div id="order-table-heading">
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Copo:</div>
                <div>Tamanho:</div>
                <div>Base:</div>
                <div>Opcionais:</div>
                <div class="order-acoes">Ações:</div>
            </div>
        </div>
        <div id="order-table-rows">
            <div class="order-table-row" v-for="order in orders" :key="order.id">
                <div class="order-number">{{ order.id }}</div>
                <div>{{ order.nome }}</div>
                <div>{{ order.recipiente }}</div>
                <div>{{ order.tamanho }}</div>
                <div>{{ order.base }}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, index) in order.opcionais" :key="index">
                            {{ opcional }}
                        </li>
                    </ul>
                </div>
                <div class="order-final">
                    <select name="status" class="status" @change="updateOrder($event, order.id)">
                        <option value="">Selecione</option>
                        <option :value="s.tipo" v-for="s in status" :key="s.id" :selected="order.status == s.tipo">
                            {{s.tipo}}
                        </option>
                    </select>
                    <button class="delete-btn" @click="deleteOrder(order.id)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import Message from './Message.vue';
    
    export default {
        name: "Dashboard",
        data() {
            return {
                orders: null,
                order_id: null,
                status: [],
                msg: null
            }
        },
        methods: {
            async getOrders() {
                const req = await fetch("http://localhost:3000/orders");

                const data = await req.json();

                this.orders = data;

                console.log(this.orders);

                //resgatar status

                this.getStatus();
            },
            async getStatus() {
                const req = await fetch("http://localhost:3000/status");

                const data = await req.json();

                this.status = data;
            },
            async deleteOrder(id) {
                const req = await fetch(`http://localhost:3000/orders/${id}`, {
                    method: "DELETE"
                });

                const res = req.json();

                //colocar uma msg de sistema
                this.msg = `Pedido Nº ${id} deletado com sucesso!`

                this.getOrders();

                //limpar msg
                setTimeout(() => {
                    this.msg = ""
                }, 3000);

            },
            async updateOrder(event, id) {

                const option = event.target.value;

                const dataJson = JSON.stringify({ status: option });

                const req = await fetch(`http://localhost:3000/orders/${id}`, {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: dataJson
                });

                const res = await req.json();

                this.msg = `O pedido Nº ${res.id} foi atualizado para ${res.status}!`

                //limpar msg
                setTimeout(() => {
                    this.msg = ""
                }, 4000);
            }
        },
        mounted() {
            this.getOrders();
        },
        components: {
            Message
        }
    }
</script>

<style scoped>

    #order-table {
        max-width: 1200px;
        margin: 0 auto;
        min-height: 500px;
    }

    #order-table-heading,
    #order-table-rows,
    .order-table-row {
        display: flex;
        flex-wrap: wrap;
    }

    #order-table-heading{
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    #order-table-heading div,
    .order-table-row div {
        width: 15%;
    }

    .order-table-row {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #CCC;
    }

    ::marker {
        color: #A2D128;
    }

    #order-table-heading .order-id,
    .order-table-row .order-number {
        width: 5%;
    }

    #order-table-heading .order-acoes,
    .order-table-row .order-final {
        width: 20%;
    }

    select {
        padding: 12px 6px;
        margin-right: 12px;
    }
    
    .delete-btn {
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

    .delete-btn:hover {
        background-color: transparent;
        color: #222;
    }

</style>