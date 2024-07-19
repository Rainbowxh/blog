Object instanceof Function;
Function instanceof Object;

/**
 * 7.3.21 OrdinaryHasInstance (C, O)
 *
 * OrdinaryHasInstance(Object, Function)
 *
 * if(!isCallable(C)) return false;
 *
 *
 */

function instance_of(C, O) {
  let p = C.prototype;
  while (true) {
    let O = O.__proto__;

    if (O === null) {
      return false;
    }
    if(p == O) {
      return true;
    }
  }
}
