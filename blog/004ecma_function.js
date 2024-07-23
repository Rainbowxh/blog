function test() {

}
/**
 * 15.2 Function Definitions
 * 15.2.4 Runtime Semantics: InstantiateOrdinaryFunctionObject
 *  const foo() { } 
 *  FunctionDeclaration : function BindingIdentifier ( FormalParameters ) { FunctionBody }
 *    
 *  let name = String(Bindingidentifier)
 *  let sourceText = FunctionDeclaration;
 *  let F = OrdinaryFunctionCreate(%Function.prototype%, sourceText, FormalParameters, FunctionBody, NON-LEXICAL-THIS, env, privateEnv);
 *  SetFunctionName(F, name);
 *  MakeConstructor(F)
 *  return F
 * 
 * 15.2.5 Runtime Semantics: InstantiateOrdinaryFunctionExpression
 * const name = function test() {}
 * FunctionExpression : function BindingIdentifier ( FormalParameters ) { FunctionBody }
 * 
 * let name = BindingIdentifier.StringValue;
 * let outerEnv = running execution context's LexicalEnvironment
 * let funcEnv = NewDeclarativeEnvironment(outerEnv)
 * funcEnv.CreateImmutableBinding(name, false)
 * let privateEnv = running execution context's PrivateEnvironment
 * let sourceText = FunctionExpression.source text
 * let closure = OrdinaryFunctionCreate(%Function.prototype%, sourceText, FormalParameters, FunctionBody, NON-LEXICAL-THIS, funcEnv, privateEnv).
 * SetFunctionName(closure, name)
 * MakeConstructor(closure);
 * funcEnv.InitializeBinding(name, closure)
 * return closure
 * 
 */

/**
 * 10.2.3 OrdinaryFunctionCreate( functionPrototype, sourceText, ParameterList, Body, thisMode, env, privateEnv )
 * 
 *  let internalSlotsList = Table 30;
 *  let F = OrdinaryObjectCreate(functionPrototype, internalSlotsList);
 *  F.[[Call]] = definition 10.2.1
 *  F.[[SourceText]] = sourceText
 *  F.[[FormalParameters]] = FormalParameters
 *  F.[[ECMAScriptCode]] = body
 *  F.[[Strict]] = Strict
 *  F.[[ThisMode]] LEXICAL / STRICT / GLOBAL
 *  F.[[IsClassConstructor]] = false
 *  F.[[Environment]] = env
 *  F.[[PrivateEnvironment]] = privateEnv
 *  F.[[ScriptOrModule]] = {}
 *  F.[[Realm]] = { LexicalEnvironment, PrivateEnvironment, VariableEnvironment }
 *  F.[[HomeObject]] = undefined
 *  F.[[Fields]] = new empty list
 *  F.[[PrivateMethods]] = []
 *  F.[[ClassFieldInitializerName]] = EMPTY
 *  let len = ParameterList.length
 *  SetFunctionLength(F, len);
 *  return F;
 */

function abc() {}

abc();

/**
 * 13.1 Identifiers
 * 13.1.3 Runtime Semantics: Evaluation
 *  Return ? ResolveBinding(StringValue of Identifier).
 * 
 * 13.3.2 Property Accessors
 *  MemberExpression : MemberExpression . IdentifierName
 *  let baseReference = MemberExpression.ref
 *  let baseValue = GetValue(baseReference)
 *  return EvaluatePropertyAccessWithIdentifierKey(baseValue, IdentifierName, strict).
 *    根据base的类型进行判断，如果baseValue是Environment Record则否，不然为true; 
 *    return Reference Record { [[Base]]: baseValue, [[ReferenceName]]: propertyNameString, [[ThisValue]]: EMPTY }   
 *      
 * 9.4.2 ResolveBinding(name, env)
 *  env = runningExecution.LexicalEnvironment;  (EnvironmentRecord)
 *  return GetIdentifierReference(env, name, strict);
 * 
 * 9.1.2.1 GetIdentifierReference(env, name, strict)
 *  if(!env) {
 *    return Reference Record { [[Base]]: UNRESOLVABLE, [[ReferencedName]]: name, [[Strict]]: strict, [[ThisValue]]: EMPTY }.
 *  }
 *  let exists = env.HasBinding(name).
 *     解释: HasBinding
 *  if(exists) {
 *      Reference Record { [[Base]]: env, [[ReferencedName]]: name, [[Strict]]: strict, [[ThisValue]]: EMPTY }.
 *  } else {
 *    let outer = env.[[OuterEnv]];
 *    return GetIdentifierReference(outer, name, strict)
 *  }
 * 
 * 13.3.11.1 MemberExpression TemplateLiteral
 *  tagRef = Reference Record { [[Base]]: env, [[ReferencedName]]: name, [[Strict]]: strict, [[ThisValue]]: EMPTY }
 *         = Reference Record { [[Base]]: baseValue, [[ReferenceName]]: propertyNameString, [[ThisValue]]: EMPTY }
 *  tagFunc = GetValue(tagRef.[[base]], tagRef.[[ReferencedName]])
 *  return EvaluateCall(tagFunc, tagRef, TemplateLiteral, tailCall);
 *  
 * 13.3.6.2 EvaluateCall ( func, ref, arguments, tailPosition ) 
 *  if(is Reference Record(ref)) {
 *    if(IsPropertyReference(ref)) {
 *      如果是一个对父的引用，不是则获取[[Base]], 获取当前环境的this
 *      thisValue = GetThisValue();
 *    } else {
 *      let refEnv = ref.[[Base]]
 *      thisValue = refEnv.WithBaseObject();
 *    }
 *  } else {
 *    thisValue = undefined;
 *  }
 *  
 *  let argList = arguments;
 *  return Call(func, thisValue, argList)
 * 
 * 7.3.13 Call (F, V, arguments)
 *  return F.[[Call]](V, arguments || [])  
 *  
 * 10.2.1 [[Call]] (thisArgument, argumentsList)
 *  获取当前执行环境
 *  let callerContext = running execution context;
 *  新建函数执行环境
 *  let calleeContext = PrepareForOrdinaryCall(F, undefined)
 *  如果是class...
 *  if(F.[[isClassConstructor]]) {}
 *  绑定this
 *  OrdinaryCallBindThis(F, calleeContext, thisArguments);
 *  执行函数
 *  let result = Completion(OrdinaryCallEvaluateBody(F, arguments)) 
 *  ....
 *  if(result is a return completion) {
 *    return result.[[Value]]
 *  }
 *  return undefined
 * 
 * 生成执行环境
 * 10.2.1.1 PrepareForOrdinaryCall(F, newTarget)
 *  获取当前执行环境
 *  let callerContext = running execution context;
 *  生成空的执行环境对象
 *  let calleeContext = new ECMAScript execution context;
 *  将执行环境绑定到函数上
 *  F = calleeContext
 *  let calleeRealm = F.[[Realm]]
 *  calleeContext.Realm = calleeContext.realm
 *  calleeContext.ScriptOrModule = F.ScriptOrModule
 *  生成函数环境
 *  let localEnv = new FunctionEnvironment(F, newTarget)
 *      env = new Function Environment Record;  
 *      env.[[FunctionObject]] = F
 *      if(F.[[ThisMode]] === LEXICAL) {
 *        env.[[ThisBindingStatus]] = LEXICAL  
 *      } else {
 *        env.[[ThisBindingStatus]] = UNINITIALIZED
 *      }
 *      env.[[NewTarget]] = newTarget
 *      设置外部环境，外部环境是函数被声明时候的所处的runningExecutionEnvironment 
 *      env.[[OuterEnv]] = F.[[Environment]] <=
 *      return env
 *  将生成的环境绑定到当前执行环境
 *  calleeContext.LexicalEnvironment = localEnv
 *  calleeContext.VariableEnvironment = localEnv
 *  calleeContext.PrivateEnvironment = F.[[PrivateEnvironment]]
 *  execution context stack push(calleeContext);
 *  return calleeContext;
 * 
 * 10.2.1.2 OrdinaryCallBindThis(F, calleeContext, thisArgument)
 *  calleeContext 当前生成的执行环境 thisArgument 生成的当前this undefined
 *  
 *  let thisMode = F.[[ThisMode]];
 *  if(thisMode === LEXICAL) return UNUSED;
 *  let calleeRealm = F.[[Realm]]
 *  let localEnv = calleeContext.LexicalEnvironment
 *  if(thisMode === STRICT) {
 *    样例：//use-strict func(); 默认指向全局环境
 *    let thisValue = thisArgument
 *  } else {
 *    样例： func(); 默认指向全局环境
 *    if(thisArgument === null || thisArgument === undefined) {
 *      let globalEnv = calleeRealm.[[GlobalEnv]]
 *      将thisValue设置为当前全局环境
 *      let thisValue = globalEnv.[[GlobalThisValue]]
 *    } else {
 *      thisValue = ToObject(thisArgument)
 *    }
 *  }
 *  localEnv.BindThisValue(thisValue)
 *    envRec.[[ThisValue]] = V
 *    envRec.[[ThisBindingStatus]] = INITIALIZED
 *    return thisValue
 *  return UNUSED
 * 
 * 13.2.1 The this Keyword
 * 13.2.1.1 Runtime Semantics: Evaluation
 *  Return ? ResolveThisBinding().
 *  
 * 9.4.4 ResolveThisBinding ( )
 *  获取当前有this的环境
 *  let envRec = GetThisEnvironment()
 *  return envRec.GetThisBinding()
 * 
 * 9.4.3 GetThisEnvironment ( )
 *  获取当前的执行环境
 *  let env = running execution context
 *  通过当前的词法环境，直到获取thisBinding
 *  while(env) {
 *    let exists = env.HasThisBinding();
 *    if(exists) {
 *      return env
 *    }
 *    let outer = env.[[OuterEnv]]
 *    env = outer;
 *  }
 * 
 * 9.1.1.3.4 GetThisBinding()
 *  
 * return envRec.[[ThisValue]]
 * 
 */
