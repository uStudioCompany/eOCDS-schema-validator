import React, { Component } from "react";

import Ajv from "ajv";

import { JsonEditor as Editor } from "jsoneditor-react";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/chrome";

// eslint-disable-next-line
import budgetSchema from "./schemas/budget.json";
import createEISchema from "./schemas/create-ei.json";
import createFSSchema from "./schemas/create-fs.json";
import createPNSchema from "./schemas/create-pn.json";
import createCNEVSchema from "./schemas/create-cn-ev.json";
import createEnquirySchema from "./schemas/create-enquiry.json";
import createAnswerSchema from "./schemas/create-answer.json";
import createBidSchema from "./schemas/create-bid.json";
import createACSchema from "./schemas/create-ac.json";

import "jsoneditor-react/es/editor.min.css";
import "./App.css";

const ajvForData = new Ajv({ allErrors: true, verbose: true, validateSchema: false, unknownFormats: "ignore" });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: "",
      inputSchema: {},
      inputData: {},
      errors: [],
      schemaIsValid: true,
      errorSchemaMessage: [],
      presetSchemas: {
        //budgetSchema,
        [createEISchema.title]: createEISchema,
        [createFSSchema.title]: createFSSchema,
        [createPNSchema.title]: createPNSchema,
        [createCNEVSchema.title]: createCNEVSchema,
        [createEnquirySchema.title]: createEnquirySchema,
        [createAnswerSchema.title]: createAnswerSchema,
        [createBidSchema.title]: createBidSchema,
        [createACSchema.title]: createACSchema,
      }
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
    } catch (e) { }
  };

  handleChangeSchema = (val) => {
    const ajvForSchema = new Ajv({ allErrors: true });

    if (ajvForSchema.validateSchema(val)) {
      this.setState(
        {
          inputSchema: val,
          schemaIsValid: true,
          errorSchemaMessage: [],
        },
        () => {
          this.validateInputs(this.state.inputSchema, this.state.inputData);
        }
      );
    } else {
      this.setState({ errors: [], schemaIsValid: false, errorSchemaMessage: ajvForSchema.errors });
    }
  };

  handleChangeData = (val) => {
    this.setState({ inputData: val }, () => {
      this.validateInputs(this.state.inputSchema, this.state.inputData);
      this.saveDataToLocalStorage();
    });
  };

  handleChangePreset = (e) => {
    this.setState(
      {
        preset: e.currentTarget.value,
        inputSchema: this.state.presetSchemas[e.currentTarget.value] || {},
        errors: [],
        schemaIsValid: true,
        errorSchemaMessage: [],
      },
      () => {
        this.schemaJsonEditor.set(this.state.inputSchema);
        this.validateInputs(this.state.inputSchema, this.state.inputData);
      }
    );
  };

  saveDataToLocalStorage = async () => {
    localStorage.setItem("data", JSON.stringify(this.state.inputData));
  };

  render() {
    const { preset, inputSchema, inputData, presetSchemas, errors, schemaIsValid, errorSchemaMessage } = this.state;
    const showStatus = !!inputSchema && !!inputData;

    return (
      <div className="App">
        <div className="presets">
          <h3>Presets schemas</h3>
          <select className="preset-select" value={preset} onChange={this.handleChangePreset}>
            <option value="">-</option>
            {Object.keys(presetSchemas).map(schemaName => (<option key={schemaName} value={schemaName}>{schemaName}</option>))}
          </select>
          <button
            className="validate-button"
            disabled={!schemaIsValid}
            onClick={() => this.validateInputs(inputSchema, inputData)}>
            Validate
          </button>
          {showStatus && schemaIsValid && (
            <span
              className={
                !!errors.length ? "validate-status validate-status_invalid" : "validate-status validate-status_valid"
              }>
              {!!errors.length ? "Data is not valid" : "Data is valid"}
            </span>
          )}
          {!schemaIsValid && <span className="validate-status validate-status_invalid">Error parsing schema</span>}
        </div>
        <div className="editors">
          <div className="schema-editor">
            <h2>Schema</h2>
            <Editor
              ref={this.setSchemaRef}
              value={inputSchema}
              mode="view"
              allowedModes={["view", "code"]}
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

        {!!errorSchemaMessage.length && <h3>Errors in schema</h3>}
        <div className="errors">
          {errorSchemaMessage.map((error, i) => (
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
