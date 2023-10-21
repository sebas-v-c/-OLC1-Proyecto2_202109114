import "../../../scss/Errors.scss"

interface Table {
    lex: string;
    line: number;
    column: number;
}

interface Token extends Table {
    token: string;
}

interface LexError extends Table {
    desc: string;
}

interface SynError extends LexError {
}

interface Symbol {
    var: string;
    type: string;
    value: any;
}

type Errors = {
    lex: Array<any>,
    sem: Array<any>,
    syn: Array<any>
}

type Props = {
    errors: Errors;
    symTable: Array<any>;
    tokens: Array<any>;
}

export default function OutputErrors({ errors, symTable, tokens }: Props){

  const chunkedData = [];
  for (let i = 0; i < tokens.length; i += 6) {
    chunkedData.push(tokens.slice(i, i + 6));
  }


    return(
        <div className="terminal">
            <h2 className="table-title" style={{"margin": "15px"}}>Tokens Table</h2>
    <table>
      <thead>
        <tr>
          <th>Col1</th>
          <th>Col2</th>
          <th>Col3</th>
          <th>Col4</th>
          <th>Col5</th>
          <th>Col6</th>
        </tr>
      </thead>
      <tbody>
        {chunkedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((item: any, columnIndex: any) => (
              <td key={columnIndex}>{item}</td>
            ))}
          </tr>
        ))}
        </tbody>
    </table>


            <h2 className="table-title" style={{"margin": "15px"}}>Lexical Errors</h2>
    <table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Line</th>
          <th>Column</th>
        </tr>
      </thead>
      <tbody>
        {errors.lex.map((item, index) => (
          <tr key={index}>
            <td>{item.character}</td>
            <td>{item.line}</td>
            <td>{item.column}</td>
          </tr>
        ))}
      </tbody>
    </table>
            <h2 className="table-title" style={{"margin": "15px"}}>Syntax Errors</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Line</th>
          <th>Column</th>
        </tr>
      </thead>
      <tbody>
        {errors.syn.map((item, index) => (
          <tr key={index}>
            <td>{`Unexpected Token '${item.token}'`}</td>
            <td>{item.line}</td>
            <td>{item.column}</td>
          </tr>
        ))}
      </tbody>
    </table>
            <h1 style={{"margin": "10px", "color": "#b4befe"}}>Symbols Table</h1>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Line</th>
          <th>Column</th>
        </tr>
      </thead>
      <tbody>
        {symTable.map((item, index) => (
          <tr key={index}>
            <td>{item[0]}</td>
            <td>{item[1].type}</td>
            <td>{item[1].row}</td>
            <td>{item[1].column}</td>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
    );
}
