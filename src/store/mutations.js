import {ADD_COUNTER,ADD_TO_CART} from "./mutations-type";

export default {
  [ADD_COUNTER](state,payload) {
    payload.count++
  },
  // addCounter(state,payload) {
  //   payload.count++
  // },
  // addCart(state,payload){
  //   state.cartList.push(payload)
  // },
  [ADD_TO_CART](state,payload){
    payload.checked=true;
    state.cartList.push(payload)
  }
}
