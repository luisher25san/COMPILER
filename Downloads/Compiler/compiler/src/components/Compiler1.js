// src/components/Compiler.js
import React, { useState } from 'react';
import * as Babel from 'babel-standalone';
import Lexer from '../lexer/lexer';
import parse from '../lexer/parser';
import operators from '../lexer/parser';
import '../styles.css';

const generateCode = (node) => {
  if (node.type === 'Program') {
    // Recorrer los nodos del programa
    return node.body.map(generateCode).join('\n');
  } else if (node.type === 'ElementNode') {
    // Generar código para la etiqueta y sus hijos
    const childrenCode = node.children.map(generateCode).join('\n');
    return `<${node.tagName}>${childrenCode}</${node.tagName}>`;
  } else if (node.type === 'TextNode') {
    // Generar código para el nodo de texto
    return node.value;
  }

  return ''; // Otros tipos de nodos no compatibles
};

const Compiler = () => {
  const [code, setCode] = useState('');
  const [compiledCode, setCompiledCode] = useState('');
  const [tokens, setTokens] = useState([]);
  const [ast, setAst] = useState(null);
  const [operators, setOperators] = useState([]);

  const compileCode = () => {
    try {
      const lexerTokens = Lexer(code);
      setTokens(lexerTokens);

      const syntaxTree = parse(lexerTokens);
      setAst(syntaxTree);

      // Generar código React a partir del árbol de sintaxis
      const generatedCode = generateCode(syntaxTree);
      setCompiledCode(generatedCode);

      // También puedes realizar otras acciones aquí antes de la compilación
      // por ejemplo, transformaciones adicionales antes de pasar a Babel

      // Compilar código generado con Babel para visualización
      const result = Babel.transform(generatedCode, {
        presets: ['env', 'react'],
      });
      setCompiledCode(result.code);
    } catch (error) {
      setCompiledCode(`Error during compilation: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>React Compiler with Lexer, Parser, and Code Generator</h2>
      <div>
        <label htmlFor="code">Enter your React code:</label>
        <br />
        <textarea
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows="10"
          cols="50"
          style={{ color: '#007b00' }}
        />
      </div>
      <br />
      <div className='hola'>
      <button style={{ alignItems:'center'}} onClick={compileCode}>COMPILAR</button>
      </div>
      <div>
        <h3>Lexer Tokens:</h3>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
      </div>
      <div>
        <h3>Syntax Tree:</h3>
        <pre>{JSON.stringify(ast, null, 2)}</pre>
      </div>
      <div>
        <h3>Generated Code:</h3>
        <pre>{compiledCode}</pre>
      </div>
    </div>
  );
};

export default Compiler;
