/**
 * 8.2.1 Static Semantics: BoundNames
 */

// BindingIdentifier : Identifier
// BindingIdentifier : yield
// BindingIdentifier : await
// LexicalDeclaration : LetOrConst BindingList ;
// BindingList : BindingList , LexicalBinding
// LexicalBinding : BindingIdentifier Initializeropt
// LexicalBinding : BindingPattern Initializer
// VariableDeclarationList : VariableDeclarationList , VariableDeclaration
// VariableDeclaration : BindingIdentifier Initializeropt
// VariableDeclaration : BindingPattern Initializer
// ObjectBindingPattern : { }
// ObjectBindingPattern : { BindingPropertyList , BindingRestProperty }
// ArrayBindingPattern : [ Elisionopt ]
// ArrayBindingPattern : [ Elisionopt BindingRestElement ]
// ArrayBindingPattern : [ BindingElementList , Elisionopt ]
// ArrayBindingPattern : [ BindingElementList , Elisionopt BindingRestElement ]
// BindingPropertyList : BindingPropertyList , BindingProperty
// BindingElementList : BindingElementList , BindingElisionElement
// BindingElisionElement : Elisionopt BindingElement
// BindingProperty : PropertyName : BindingElement
// SingleNameBinding : BindingIdentifier Initializeropt
// BindingElement : BindingPattern Initializeropt
// ForDeclaration : LetOrConst ForBinding
// FunctionDeclaration : function BindingIdentifier ( FormalParameters ) { FunctionBody }
// FunctionDeclaration : function ( FormalParameters ) { FunctionBody }
// FormalParameters : [empty]
// FormalParameters : FormalParameterList , FunctionRestParameter
// FormalParameterList : FormalParameterList , FormalParameter
// ArrowParameters : CoverParenthesizedExpressionAndArrowParameterList
// GeneratorDeclaration : function * BindingIdentifier ( FormalParameters ) { GeneratorBody }
// GeneratorDeclaration : function * ( FormalParameters ) { GeneratorBody }
// AsyncGeneratorDeclaration : async function * BindingIdentifier ( FormalParameters ) { AsyncGeneratorBody }
// AsyncGeneratorDeclaration : async function * ( FormalParameters ) { AsyncGeneratorBody }
// ClassDeclaration : class BindingIdentifier ClassTail
// ClassDeclaration : class ClassTail
// AsyncFunctionDeclaration : async function BindingIdentifier ( FormalParameters ) { AsyncFunctionBody }
// AsyncFunctionDeclaration : async function ( FormalParameters ) { AsyncFunctionBody }
// CoverCallExpressionAndAsyncArrowHead : MemberExpression Arguments
// ImportDeclaration : import ImportClause FromClause ;
// ImportDeclaration : import ModuleSpecifier ;
// ImportClause : ImportedDefaultBinding , NameSpaceImport
// ImportClause : ImportedDefaultBinding , NamedImports
// NamedImports : { }
// ImportsList : ImportsList , ImportSpecifier
// ImportSpecifier : ModuleExportName as ImportedBinding
// ExportDeclaration :
// export ExportFromClause FromClause ;
// export NamedExports ;
// ExportDeclaration : export VariableStatement
// ExportDeclaration : export Declaration
// ExportDeclaration : export default HoistableDeclaration
// ExportDeclaration : export default ClassDeclaration
// ExportDeclaration : export default AssignmentExpression ;

/**
 * 8.3 Labels
 */
// IfStatement : if ( Expression ) Statement else Statement
// IfStatement : if ( Expression ) Statement
// DoWhileStatement : do Statement while ( Expression ) ;
// WhileStatement : while ( Expression ) Statement
// ForStatement :
  // for ( Expressionopt ; Expressionopt ; Expressionopt ) Statement
  // for ( var VariableDeclarationList ; Expressionopt ; Expressionopt ) Statement
  // for ( LexicalDeclaration Expressionopt ; Expressionopt ) Statement
// ForInOfStatement :
  // for ( LeftHandSideExpression in Expression ) Statement
  // for ( var ForBinding in Expression ) Statement
  // for ( ForDeclaration in Expression ) Statement
  // for ( LeftHandSideExpression of AssignmentExpression ) Statement
  // for ( var ForBinding of AssignmentExpression ) Statement
  // for ( ForDeclaration of AssignmentExpression ) Statement
  // for await ( LeftHandSideExpression of AssignmentExpression ) Statement
  // for await ( var ForBinding of AssignmentExpression ) Statement
  // for await ( ForDeclaration of AssignmentExpression ) Statement
// BreakStatement : break ;
// BreakStatement : break LabelIdentifier ;
// WithStatement : with ( Expression ) Statement
// SwitchStatement : switch ( Expression ) CaseBlock
// CaseBlock : { }
// CaseBlock : { CaseClausesopt DefaultClause CaseClausesopt }
// CaseClauses : CaseClauses CaseClause
// CaseClause : case Expression : StatementListopt
// DefaultClause : default : StatementListopt
// LabelledStatement : LabelIdentifier : LabelledItem
// LabelledItem : FunctionDeclaration
// TryStatement : try Block Catch
// TryStatement : try Block Finally
// TryStatement : try Block Catch Finally
// Catch : catch ( CatchParameter ) Block

/**
 * 8.4 Function Name inference
 */
// FunctionExpression :
//   function ( FormalParameters ) { FunctionBody }
// GeneratorExpression :
//   function * ( FormalParameters ) { GeneratorBody }
// AsyncGeneratorExpression :
//   async function * ( FormalParameters ) { AsyncGeneratorBody }
// AsyncFunctionExpression :
//   async function ( FormalParameters ) { AsyncFunctionBody }
// ArrowFunction :
//   ArrowParameters => ConciseBody
// AsyncArrowFunction :
//   async AsyncArrowBindingIdentifier => AsyncConciseBody
//   CoverCallExpressionAndAsyncArrowHead => AsyncConciseBody
// ClassExpression :
// class ClassTail
// 1. 1. Return false.
// FunctionExpression :
// function BindingIdentifier ( FormalParameters ) { FunctionBody }
// GeneratorExpression :
//   function * BindingIdentifier ( FormalParameters ) { GeneratorBody }
// AsyncGeneratorExpression :
//   async function * BindingIdentifier ( FormalParameters ) { AsyncGeneratorBody }
// AsyncFunctionExpression :
//   async function BindingIdentifier ( FormalParameters ) { AsyncFunctionBody }
// ClassExpression :
//   class BindingIdentifier ClassTail

