function person() {
  this.name = 'kv';
  this.age = 18;
  console.log(this)
};

const kv = new person();

/**
 * 13.3.5 The new Operator
 * 执行new函数
 * NewExpression: new NewExpression
 *    return EvaluateNew(NewExpression, EMPTY).
 *     
 * 13.3.5.1.1 EvaluateNew(constructExpr, arguments)
 *  let ref = NewExpression,
 *  let constructor = GetValue(ref);
 *  if(arguments === EMPTY){
 *    let argList = new EmptyList();
 *  }else {
 *    let argList = arguments.ArgumentListEvaluation;
 *  }
 *  if(isConstructor(constructor)) {
 *    return Construct(constructor, argList)
 *  }
 * 
 * 7.3.14 Construct(F, argumentsList, newTarget)
 *  if(!newTarget) {
 *    newTarget = F;
 *  }
 *  argumentsList = argumentsList || new EmptyList();
 *  return F.[[Construct]](argumentsList, newTarget);
 * 
 * 10.2.2 [[Construct]] (argumentsList, newTarget)
 *  
 *  let callerContext = runningExecutionContext
 *  let kind = F.[[ConstructorKind]]
 *  if(kind === BASE) {
 *    根据constructor创建相对应的函数this
 *    let thisArgument = OrdinaryCreateFromConstructor(new Target, Object.prototype);
 *  }
 *  let calleeConext = PrepareForOrdinaryCall(F, newTarget);
 *  if(kind === BASE) {
 *    绑定当前的this环境，function() { this.name = '123' } this指向thisArguments中的对象
 *    OrdinaryCallBindThis(F, calleeContext, thisArgument);
 *  
 *    let initializeResult = Completion(InitializeinstanceElements(thisArgument, F));
 *    if(initializeResult === abrupt completion) {
 *      remove calleeContext execution context stack & restore callercontext => running execution context;
 *      return initializeResult;
 *    }
 *  }
 *  let constructorEnv = calleeContext.LexicalEnvironment;
 *  执行当前函数
 *  let result = Completion(OrdinaryCallEvaluateBody(F, argumentsList));
 *  remove calleeContext execution context stack & restore callercontext => running execution context;
 *  if(result === return completion) {
 *    if(result.[[Value]]) return result.[[Value]]
 *    if(kind === BASE) return thisArgument;
 *    if(result.[[Value]] !== undefined) throw new TypeError()
 *  }else {
 *    returnIfAbrupt(result)
 *  }
 *  let thisBinding = constructorEnv.GetThisBinding();
 *  return thisBinding;
*/


/**
 * 10.1.13 OrdinaryCreateFromConstructor
 *  OrdinaryCreateFromConstructor(newTarget, %Object.prototype%)
 *  
 *  设置相对应的对象环境
 *  let proto = GetPrototypeFromConstructor(newTarget, %Object.prototype%)
 *  let slotsList = internalSlotsList || new EmptyList();
 *  return OrdinaryObjectCreate(proto, slotsList);
 *    10.1.12 OrdinaryObjectCreate(proto, additionalInternalSlotsList)
 *       let internalSlotsList = [[Prototype]]
 *       let O = MakeBasicObject(internalSlotsList);
 *       O.[[Prototype]] = proto
 *  
 */

/**
 * 10.1.14 GetPrototypeFromConstructor
 *  GetPrototypeFromConstructor ( constructor, intrinsicDefaultProto)
 *  
 *  设置当前函数的[[prototype]]
 *  let proto = constructor.prototype
 *  if(isObject(proto)) {
 *    let realm = GetFunctionRealm(constructor)
 *    prot = realm's intrinsicDefaultProto
 *  }
 *  return proto 
 * 
 */


/**
 * mockNew
 * function test() {}
 * const t = new test();
 */

function _new(F, ...args) {
  const constructor = F.prototype.constructor;
  const obj = {}
  constructor.call(obj)
  obj.__proto__ = F.prototype;
  return obj;
}

