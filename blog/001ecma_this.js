function abc() {
  console.log(this);
}

/** 
 * Runtime Semantics: InstantiateOrdinaryFunctionObject
 * F = OrdinaryFunctionCreate()
 *  thisMode = GLOBAL
 */

/**
 * this;
 *   envRec = GetThisEnvironment();
 *      let env = runningExecutionContext;
 *      while(true) {
 *        let exists = env.hasThisBinding();
 *        if(exists) {
 *          return env
 *        }
 *        let outer = env.[[OuterEnv]]
 *        env = outer;
 *      }
 *   return envRec.GetThisBinding();
 *      
 */

abc() 

/**
 * abc 
 *  ResolveBinding(StringValue of Identifier).
 *  env = runningExecutionContext.LexicalEnvironment
 *  return GetIdentifierReference(env, 'abc', strict).
 *       ReferenceRecord { [[Base]]: env, [[ReferenceName]]: 'abc', [[ThisValue]]: EMPTY }
 */


/**
 * Situation abc()
 * 
 * return EvaluateCall(func, abc, Arguments, tailCall)
 *    ref is a Reference Record
 *        ref is a propertyReference
 *            thisValue = GetThisValue(abc)
 *        ref is not a propertyReference 
 *            thisValue = abc.[[Base]].WithBaseObject(); <- undefined
 *    Call(func, thisValue, argList)
 * => func.[[call]](thisValue, argList)
 *        calleeContext = PrepareForOrdinaryCall(F, undefined)
 *        OrdinaryCallBindThis(F, calleeContext, thisValue)
 *            thisValue = globalEnv.[[GlobalThisValue]] or ToOBject(thisValue);
 *            localEnv = calleeContext.LexicalEnvironment
 *            localEnv.BindThisValue(thisValue);
 */

/**
 * Situation obj.abc();
 * 
 * obj.abc
 *    baseReference = obj;
 *    baseValue = GetValue(baseReference);
 *    EvaluatePropertyAccessWithIdentifierKey(baseValue, abc, strict);
 *      return { [[Base]]: baseValue, [[ReferencedName]]: 'abc', [[ThisValue]]: EMPTY }
 * 
 * return EvaluateCall(func, obj.abc, Arguments, tailCall)
 *    ref is a Reference Record
 *        ref is a propertyReference
 *            thisValue = GetThisValue(abc)  <= obj
 *        ref is not a propertyReference 
 *            thisValue = abc.[[Base]].WithBaseObject(); <- undefined
 *    Call(func, thisValue, argList)
 * => func.[[call]](thisValue, argList)
 *        calleeContext = PrepareForOrdinaryCall(F, undefined)
 *        OrdinaryCallBindThis(F, calleeContext, thisValue)
 *            thisValue = globalEnv.[[GlobalThisValue]] or ToOBject(thisValue);
 *            localEnv = calleeContext.LexicalEnvironment
 *            localEnv.BindThisValue(thisValue);
 *                F.[[ThisValue]] =  thisValue
 *                F.[[ThisBindingStatus]] =  thisValue
 *                return F;
 */

/**
 * const arrowFunc = () => { console.log(this) }
 *  let closure = OrdinaryFunctionCreate(%Function.prototype%, sourceText, ArrowParameters, ConciseBody, LEXICAL-THIS, env, privateEnv)
 *      F.[[ThisMode]] = LEXICAL;
 *  return closure
 * 
 * Situation arrowFunc():
 * 
 * return EvaluateCall(arrow, arrowFunc, arguments)
 *    ref is a ReferenceRecord
 *        ref is not PropertyReference
 *            thisValue = ref.[[Base]].WithBaseObject()  <= undefined
 *    Call(func, thisValue, argList)
 * => F.[[Call]](thisValue, argList)
 *        calleeContext = PrepareForOrdinarycall(F, thisValue);
 *        OrdinaryCallBindThis(F, calleeContext, thisValue);
 *            return UNUSED;
 * 
 *  this;
 *   envRec = GetThisEnvironment();
 *      let env = runningExecutionContext;
 *        {
 *          LexicalEnvironment,
 *          VariableEnvironment,
 *          PrivateEnvironment,
 *          outerEnv: nowRuningExecutionContext
 *        }
 *              
 *      while(true) {
 *        let exists = env.hasThisBinding();
 *        if(exists) {
 *          return env
 *        }
 *        let outer = env.[[OuterEnv]]
 *        env = outer;
 *      }
 *   return envRec.GetThisBinding();
 */

outerEnv

const c = () => console.log(this)

function tt() {
  function abc() {
    c()
  }
  let obj = {
    abc: abc
  }
  obj.abc();
}
tt()
