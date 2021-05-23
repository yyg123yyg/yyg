import {ADD_COUNTER,ADD_TO_CART} from "./mutations-type";

export default {
  addCart(context, payload) {
    //payload是新添加的商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
    if (oldProduct) {
      // oldProduct.count += 1;
      context.commit(ADD_COUNTER,oldProduct)
    } else {
      payload.count = 1;
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }

  }
}
