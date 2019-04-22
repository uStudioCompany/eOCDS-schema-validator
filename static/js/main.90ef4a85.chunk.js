(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e){e.exports={type:"object",required:["tender","planning","buyer"],properties:{tender:{type:"object",required:["title","classification"],properties:{title:{type:"string"},description:{type:"string"},classification:{type:"object",required:["id"],properties:{id:{type:"string"},scheme:{type:"string"},description:{type:"string"}}}}},planning:{type:"object",required:["budget"],properties:{budget:{type:"object",required:["period"],properties:{period:{type:"object",required:["startDate","endDate"],properties:{startDate:{type:"string",format:"date-time",pattern:"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"},endDate:{type:"string",format:"date-time",pattern:"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z"}}}}},rationale:{type:"string"}}},buyer:{type:"object",required:["name","identifier","address","contactPoint"],properties:{name:{type:"string"},identifier:{type:"object",required:["scheme","id","legalName"],properties:{scheme:{type:"string"},id:{type:"string"},legalName:{type:"string"},uri:{type:"string",format:"uri"}}},address:{type:"object",required:["streetAddress","addressDetails"],properties:{streetAddress:{type:"string"},postalCode:{type:"string"},addressDetails:{type:"object",required:["country","region","locality"],properties:{country:{type:"object",required:["id"],properties:{id:{type:"string"}}},region:{type:"object",required:["id"],properties:{id:{type:"string"}}},locality:{type:"object",required:["scheme","id"],properties:{scheme:{type:"string"},id:{type:"string"}},if:{properties:{scheme:{const:"CUATM"}}},then:{required:["description"],properties:{description:{type:"string"}}}}}}}},additionalIdentifiers:{type:"array",minItems:1,items:{type:"object",required:["id","scheme","legalName"],properties:{id:{type:"string"},scheme:{type:"string"},legalName:{type:"string"},uri:{type:"string",format:"uri"}}}},contactPoint:{type:"object",required:["name","email","telephone"],properties:{name:{type:"string"},email:{type:"string",format:"email"},telephone:{type:"string"},faxNumber:{type:"string"},url:{type:"string"}}},details:{type:"object",properties:{typeOfBuyer:{type:"string",enum:["NATIONAL_AGENCY","REGIONAL_AUTHORITY","REGIONAL_AGENCY","BODY_PUBLIC","EU_INSTITUTION","MINISTRY"]},mainGeneralActivity:{type:"string",enum:["DEFENCE","PUBLIC_ORDER_AND_SAFETY","ECONOMIC_AND_FINANCIAL_AFFAIRS","ENVIRONMENT","RECREATION_CULTURE_AND_RELIGION","EDUCATION","SOCIAL_PROTECTION","HEALTH","GENERAL_PUBLIC_SERVICES","HOUSING_AND_COMMUNITY_AMENITIES"]},mainSectoralActivity:{type:"string",enum:["EXPLORATION_EXTRACTION_GAS_OIL","ELECTRICITY","POSTAL_SERVICES","PRODUCTION_TRANSPORT_DISTRIBUTION_GAS_HEAT","WATER","URBAN_RAILWAY_TRAMWAY_TROLLEYBUS_BUS_SERVICES","PORT_RELATED_ACTIVITIES","RAILWAY_SERVICES","EXPLORATION_EXTRACTION_COAL_OTHER_SOLID_FUEL","AIRPORT_RELATED_ACTIVITIES"]}}}}}}}},29:function(e,t,a){e.exports=a(77)},73:function(e){e.exports={}},75:function(e,t,a){},77:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),i=a(21),s=a.n(i),o=a(7),c=a.n(o),l=a(22),p=a(23),m=a(24),u=a(27),d=a(25),h=a(28),E=a(3),g=a.n(E),y=a(8),f=a(9),v=a.n(f),S=(a(70),a(72),a(73),a(26)),I=(a(74),a(75),new g.a({allErrors:!0,verbose:!0,validateSchema:!1})),N=function(e){function t(e){var a;return Object(p.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).setSchemaRef=function(e){if(e){var t=e.jsonEditor;a.schemaJsonEditor=t}else a.schemaJsonEditor=null},a.setDataRef=function(e){if(e){var t=e.jsonEditor;a.dataJsonEditor=t}else a.dataJsonEditor=null},a.validateInputs=function(e,t){var r=new g.a;try{var n=r.compile(e);n(t)?a.setState({errors:[]}):(a.setState({errors:n.errors}),console.log(n.errors))}catch(i){}},a.handleChangeSchema=function(e){var t=new g.a;t.validateSchema(e)?a.setState({inputSchema:e,schemaIsValid:!0,errorSchemaMessage:[]},function(){a.validateInputs(a.state.inputSchema,a.state.inputData)}):a.setState({errors:[],schemaIsValid:!1,errorSchemaMessage:t.errors})},a.handleChangeData=function(e){a.setState({inputData:e},function(){a.validateInputs(a.state.inputSchema,a.state.inputData),a.saveDataToLocalStorage()})},a.handleChangePreset=function(e){a.setState({preset:e.currentTarget.value,inputSchema:a.state.presetSchemas[e.currentTarget.value]||{},errors:[],schemaIsValid:!0,errorSchemaMessage:[]},function(){a.schemaJsonEditor.set(a.state.inputSchema),a.validateInputs(a.state.inputSchema,a.state.inputData)})},a.saveDataToLocalStorage=Object(l.a)(c.a.mark(function e(){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:localStorage.setItem("data",JSON.stringify(a.state.inputData));case 1:case"end":return e.stop()}},e)})),a.state={preset:"",inputSchema:{},inputData:{},errors:[],schemaIsValid:!0,errorSchemaMessage:[],presetSchemas:{createEISchema:S}},a}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(localStorage.getItem("data")){var t=JSON.parse(localStorage.getItem("data"));this.setState({inputData:t},function(){e.dataJsonEditor.set(t)})}}},{key:"render",value:function(){var e=this,t=this.state,a=t.preset,r=t.inputSchema,i=t.inputData,s=t.presetSchemas,o=t.errors,c=t.schemaIsValid,l=t.errorSchemaMessage,p=!!r&&!!i;return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"presets"},n.a.createElement("h3",null,"Presets schemas"),n.a.createElement("select",{className:"preset-select",value:a,onChange:this.handleChangePreset},n.a.createElement("option",{value:""},"-"),Object.keys(s).map(function(e){return n.a.createElement("option",{key:e,value:e},e)})),n.a.createElement("button",{className:"validate-button",disabled:!c,onClick:function(){return e.validateInputs(r,i)}},"Validate"),p&&c&&n.a.createElement("span",{className:o.length?"validate-status validate-status_invalid":"validate-status validate-status_valid"},o.length?"Data is not valid":"Data is valid"),!c&&n.a.createElement("span",{className:"validate-status validate-status_invalid"},"Error parsing schema")),n.a.createElement("div",{className:"editors"},n.a.createElement("div",{className:"schema-editor"},n.a.createElement("h2",null,"Schema"),n.a.createElement(y.a,{ref:this.setSchemaRef,value:r,mode:"view",allowedModes:["view","code"],onChange:this.handleChangeSchema,ace:v.a,theme:"ace/theme/chrome"})),n.a.createElement("div",{className:"data-editor"},n.a.createElement("h2",null,"Data"),n.a.createElement(y.a,{ref:this.setDataRef,value:i,mode:"code",onChange:this.handleChangeData,ace:v.a,theme:"ace/theme/chrome",ajv:I,schema:r}))),(!!o.length||!!l.length)&&n.a.createElement("h3",null,"Errors"),n.a.createElement("div",{className:"errors"},o.map(function(e,t){return n.a.createElement("div",{className:"error",key:t},n.a.createElement("h4",null,"\u2116 ",t+1),n.a.createElement("p",null,"Keyword of error: ",n.a.createElement("b",null,e.keyword)),n.a.createElement("p",null,"Schema path: ",n.a.createElement("b",null,e.schemaPath)),n.a.createElement("p",null,"Data path: ",n.a.createElement("b",null,e.dataPath||"-")),n.a.createElement("p",null,"Message: ",n.a.createElement("b",null,e.message)),"params"in e&&n.a.createElement("p",null,"Details:"),"params"in e&&n.a.createElement("ul",null,Object.entries(e.params).map(function(e){return n.a.createElement("li",{key:e[0]},e[0]," : ",n.a.createElement("b",null,e[1]||"-"))})))})),n.a.createElement("div",{className:"errors"},l.map(function(e,t){return n.a.createElement("div",{className:"error",key:t},n.a.createElement("h4",null,"\u2116 ",t+1),n.a.createElement("p",null,"Keyword of error: ",n.a.createElement("b",null,e.keyword)),n.a.createElement("p",null,"Schema path: ",n.a.createElement("b",null,e.schemaPath)),n.a.createElement("p",null,"Data path: ",n.a.createElement("b",null,e.dataPath||"-")),n.a.createElement("p",null,"Message: ",n.a.createElement("b",null,e.message)),"params"in e&&n.a.createElement("p",null,"Details:"),"params"in e&&n.a.createElement("ul",null,Object.entries(e.params).map(function(e){return n.a.createElement("li",{key:e[0]},e[0]," : ",n.a.createElement("b",null,e[1]||"-"))})))})))}}]),t}(r.Component),A=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function b(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}a(76);s.a.render(n.a.createElement(N,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/eOCDS-schema-validator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("/eOCDS-schema-validator","/service-worker.js");A?(function(e,t){fetch(e).then(function(a){var r=a.headers.get("content-type");404===a.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):b(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):b(t,e)})}}()}},[[29,1,2]]]);
//# sourceMappingURL=main.90ef4a85.chunk.js.map