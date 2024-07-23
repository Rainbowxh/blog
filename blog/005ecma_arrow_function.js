const arrow = () => {}

/**
 * An ArrowFunction does not define local bindings for arguments, super, this, or new.target. Any reference to arguments, super, this, or new.target within an ArrowFunction must resolve to a binding in a lexically enclosing environment. 
 * 
 * 
 * 15.3.5 Runtime Semantics: Evaluation
 * ArrowFunction: ArrowParameters => ConcisBody
 *  1. 1. Return InstantiateArrowFunctionExpression of ArrowFunction.
 * 
 * 15.3.4 Runtime Semantics: InstantiateArrowFunctionExpression
 * ArrowFunction : ArrowParameters => ConciseBody
 *  let name = "";
 *  let env = running execution context's LexicalEnvironment;
 *  let privartEnv = running execution context's PrivateEnvironment;  
 *  let sourceText = ArrowFunction.sourceText
 *  let closure = OrdinaryFunctionCreate(%Function.prototype%, sourceText, ArrowParameters, ConciseBody, LEXICAL-THIS, env, privateEnv).
 *  SetFunctionName(closure, name)
 *  return closure
 * 
 */
