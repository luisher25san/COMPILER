import operators  from '../lexer/parser';
import * as Babel from 'babel-standalone';
export function Lexer(code) {
  // Define the regular expressions for each token type
  const tokens = [
    ["NUMBER", /\d+/],
    ["OPERATOR", /[+\-*/%^=]/],
    ["COMPARISON", /[><]=?|==|!=/],
    ["IDENTIFIER", /[a-zA-Z_]\w*/],
    ["LEFT_PAREN", /\(/],
    ["RIGHT_PAREN", /\)/],
    ["LEFT_BRACE", /\{/],
    ["RIGHT_BRACE", /\}/],
    ["WHITESPACE", /\s+/],
  ];

  // Combine the regular expressions into a single pattern
  const pattern = tokens
    .map(([name, regex]) => `(?<${name}>${regex.source})`)
    .join("|");

  // Use the pattern to find all matches in the code
  const matches = code.matchAll(new RegExp(pattern, "g"));

  // Convert the matches into an array of tokens
  const result = [];
  let display = "";

  let pr = 0;
  let simbolos = 0;
  let numeros = 0;
  let identificadores = 0;

  for (const match of matches) {
    const kind = Object.keys(match.groups).find(
      (key) => match.groups[key] !== undefined
    );
    const value = match.groups[kind];
    if (kind === "NUMBER") {
      display += " " + value;
      numeros++;
      result.push(parseInt(value));
    } else if (kind === "LEFT_BRACE") {
      display += " " + operators[value];
      simbolos++;
    } else if (kind === "RIGHT_PAREN") {
      simbolos++;
    } else if (kind === "LEFT_PAREN") {
      simbolos++;
    } else if (kind === "RIGHT_BRACE") {
      simbolos++;

      result.push(value);
    } else if (kind === "OPERATOR" || kind === "COMPARISON") {
      simbolos++;
      display += " " + operators[value];
      result.push(value);
    } else if (kind === "IDENTIFIER") {
      const isPR = Boolean(operators[value]);
      const item = operators[value] ?? value;
      if (isPR) {
        pr++;
      } else {
        identificadores++;
      }
      display += " " + item;
      result.push(value);
    } else if (kind !== "WHITESPACE") {
      result.push(value);
    }
  }

  return {
    display: display.trim(),
    result,
    count: {
      pr,
      simbolos,
      numeros,
      identificadores,
    },
  };
}

export default Lexer;

