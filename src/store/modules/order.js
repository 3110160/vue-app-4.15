const orderList = {
    state: {
        list: [],
        serviceList: [],
        abnormalList: []
    },
    mutations: {
        //申报单列表
        setList(state, list) {
            state.list = list;
        },
        //评价改变申报单状态
        changeStatus(state, id) {
            let p = [...state.list];
            p.map(item => {
                if (item.id === id) {
                    item.status = 99
                }
            })
            state.list = p;
        },
        //报修单列表
        setServiceList(state, list) {
            state.serviceList = list;
        },
        //开始维修
        repairStart(state, id) {
            let p = [...state.serviceList];
            p.map(item => {
                if (item.id === id) {
                    item.status = 2
                }
            })
            state.serviceList = p;
        },
        //结束维修
        repairEnd(state, id) {
            let p = [...state.serviceList];
            p.map(item => {
                if (item.id === id) {
                    item.status = 3
                }
            })
            state.serviceList = p;
        },
        //无法维修修改状态
        deleteOrder(state, {
            id,
            repairStatus
        }) {
            state.serviceList.map((item, index) => {
                if (item.id === id) {
                    item.repairStatus = repairStatus
                }
            })
        },
        //异常单列表
        setAbnormalList(state, list) {
            state.abnormalList = list;
        },
    },
    actions: {

    }
}

export default orderList;