// src/lexer/parser.js
const parse = (tokens) => {
    let current = 0;
  
    const walk = () => {
      let token = tokens[current];
  
      if (token.type === 'OPEN_TAG') {
        // Crear un nodo de elemento
        const node = { type: 'ElementNode', tagName: token.value, children: [] };
  
        // Saltar el token OPEN_TAG
        token = tokens[++current];
  
        // Recorrer los hijos
        while (token && token.type !== 'CLOSE_TAG') {
          if (token.type === 'IDENTIFIER') {
            // Agregar nodo de texto
            node.children.push({ type: 'TextNode', value: token.value });
          }
          // Saltar al siguiente token
          token = tokens[++current];
        }
  
        // Saltar el token CLOSE_TAG
        token = tokens[++current];
  
        return node;
      }
  
      // Si no es una etiqueta de apertura, devolverá null
      return null;
    };
  
    // Construir el árbol de nodos
    const ast = {
      type: 'Program',
      body: [],
    };
  
    while (current < tokens.length) {
      const elementNode = walk();
      if (elementNode) {
        ast.body.push(elementNode);
      } else {
        // Manejar otros tipos de nodos si es necesario
        current++;
      }
    }
  
    return ast;
  };
  
  export default parse;

  export const operators = {
    if: "si",
    switch: "cambiar",
    while: "mientras",
    try: "intentar",
    print: "imprimir",
    else: "otro",
    break: "romper",
    continue: "continuar",
    return: "regresar",
    catch: "capturar",
    throw: "lanzar",
    public: "publico",
    private: "privado",
    static: "estatico",
    final: "finalizacion",
    "+": "suma",
    "-": "resta",
    "=": "es igual a",
    "*": "multiplicación",
    "/": "división",
    "^": "Potencia",
    "==": "iguala",
    "!=": "distinto de",
    "<": "es menor que",
    ">": "es mayor que",
    "<=": "es menor o igual que",
    ">=": "es mayor o igual que",
    "{": "entonces",
    "}": "fin",
    "(": "inicio",
    ")": "fin",
  };
  
  export const messageErrorMissingParenthesis =
    "Error: Falta el paréntesis de cierre";
  export const messageErrorMissingCurlyBracket =
    "Error: Falta la llave de cierre";
  export const messageErrorMissingOpeningCurlyBracket =
    "Error: Falta la llave de apertura";
  
  export const messageErrorMissingOpeningParenthesis =
    "Error: Falta el paréntesis de apertura";
  export const messageSyntaxAnalysisSuccessful = "Análisis sintáctico exitoso";
  