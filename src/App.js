import React, { Component } from "react";

import Ajv from "ajv";

import { JsonEditor as Editor } from "jsoneditor-react";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/chrome";

import budgetSchema from "./schemas/budget.json";

import "jsoneditor-react/es/editor.min.css";
import "./App.css";

const ajvForData = new Ajv({ allErrors: true, verbose: true });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: "",
      inputSchema: {},
      inputData: {},
      errors: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data"));
      this.setState({ inputData: data }, () => {
        this.dataJsonEditor.set(data);
      });
    }
  }

  setSchemaRef = (instance) => {
    if (instance) {
      const { jsonEditor } = instance;
      this.schemaJsonEditor = jsonEditor;
    } else {
      this.schemaJsonEditor = null;
    }
  };

  setDataRef = (instance) => {
    if (instance) {
      const { jsonEditor } = instance;
      this.dataJsonEditor = jsonEditor;
    } else {
      this.dataJsonEditor = null;
    }
  };

  validateInputs = (schema, data) => {
    const ajv = new Ajv();
    try {
      const validate = ajv.compile(schema);
      const valid = validate(data);

      if (!valid) {
        this.setState({ errors: validate.errors });
        console.log(validate.errors);
      } else {
        this.setState({ errors: [] });
      }
    } catch (e) {}
  };

  handleChangeSchema = (val) => {
    console.log(val);
    this.setState({ inputSchema: val }, () => {
      this.validateInputs(this.state.inputSchema, this.state.inputData);
    });
  };

  handleChangeData = (val) => {
    console.log(val);
    this.setState({ inputData: val }, () => {
      this.validateInputs(this.state.inputSchema, this.state.inputData);
      this.saveDataToLocalStorage();
    });
  };

  handleChangePreset = (e) => {
    switch (e.currentTarget.value) {
      case "budget":
        this.setState(
          {
            preset: e.currentTarget.value,
            inputSchema: budgetSchema,
            errors: [],
          },
          () => {
            this.schemaJsonEditor.set(this.state.inputSchema);
            this.validateInputs(this.state.inputSchema, this.state.inputData);
          }
        );
        break;
      default:
        this.setState(
          {
            preset: "",
            inputSchema: {},
            errors: [],
          },
          () => {
            this.schemaJsonEditor.set(this.state.inputSchema);
            this.validateInputs(this.state.inputSchema, this.state.inputData);
          }
        );
    }
  };

  saveDataToLocalStorage = async () => {
    localStorage.setItem("data", JSON.stringify(this.state.inputData));
  };

  render() {
    const { preset, inputSchema, inputData, errors } = this.state;
    const showStatus = !!inputSchema && !!inputData;

    return (
      <div className="App">
        <div className="presets">
          <h3>Presets schemas</h3>
          <select className="preset-select" value={preset} onChange={this.handleChangePreset}>
            <option value="">-</option>
            <option value="budget">Budget</option>
          </select>
          <button className="validate-button" onClick={() => this.validateInputs(inputSchema, inputData)}>
            Validate
          </button>
          {showStatus && (
            <span
              className={
                !!errors.length ? "validate-status validate-status_invalid" : "validate-status validate-status_valid"
              }>
              {!!errors.length ? "Data is not valid" : "Data is valid"}
            </span>
          )}
        </div>
        <div className="editors">
          <div className="schema-editor">
            <h2>Schema</h2>
            <Editor
              ref={this.setSchemaRef}
              value={inputSchema}
              mode="code"
              onChange={this.handleChangeSchema}
              ace={ace}
              theme="ace/theme/chrome"
            />
          </div>
          <div className="data-editor">
            <h2>Data</h2>
            <Editor
              ref={this.setDataRef}
              value={inputData}
              mode="code"
              onChange={this.handleChangeData}
              ace={ace}
              theme="ace/theme/chrome"
              ajv={ajvForData}
              schema={inputSchema}
            />
          </div>
        </div>
        {!!errors.length && <h3>Errors</h3>}
        <div className="errors">
          {errors.map((error, i) => (
            <div className="error" key={i}>
              <h4>№ {i + 1}</h4>
              <p>
                Keyword of error: <b>{error.keyword}</b>
              </p>
              <p>
                Schema path: <b>{error.schemaPath}</b>
              </p>
              <p>
                Data path: <b>{error.dataPath || "-"}</b>
              </p>
              <p>
                Message: <b>{error.message}</b>
              </p>
              {"params" in error && <p>Details:</p>}
              {"params" in error && (
                <ul>
                  {Object.entries(error.params).map((param) => (
                    <li key={param[0]}>
                      {param[0]} : <b>{param[1] || "-"}</b>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
