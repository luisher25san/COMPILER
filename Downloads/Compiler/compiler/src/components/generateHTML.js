const generateHTML = (tokens) => {
    let htmlCode = '';
  
    tokens.forEach((token) => {
      switch (token.type) {
        case 'OPEN_TAG':
          htmlCode += `${token.value}`;
          break;
        case 'CLOSE_TAG':
          htmlCode += `${token.value}`;
          break;
        case 'TEXT_CONTENT':
          htmlCode += `${token.value}`;
          break;
        // Agrega más casos según sea necesario para otros tipos de tokens
        default:
          break;
      }
    });
  
    return htmlCode;
  };
  
  // Ejemplo de uso
  const tokens = [
    { type: 'OPEN_TAG', value: '<div class="example">' },
    { type: 'TEXT_CONTENT', value: 'Hola, mundo!' },
    { type: 'CLOSE_TAG', value: '</div>' },
  ];
  
  const codigoHTMLGenerado = generateHTML(tokens);
  console.log(codigoHTMLGenerado);
  