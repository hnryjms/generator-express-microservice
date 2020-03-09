"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");
const pascalCase = require("pascal-case");
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("appname", { type: String, required: false });
    this.name = this.options.appname || "myapp";
    this.entityName = this.options.entityName || "[entity]";
    this.author = this.options.author || "author";
    this.version = "1.0.0";
    this.description = "My cool TypeScript REST API";
    this.isMicroService = true;
    this.rootpath = this.isMicroService ? this.name : '.';
  }

  prompting() {
    // Have Yeoman greet the user.
    // this.log(
    //   yosay(
    //     `Welcome to the splendid ${chalk.red(
    //       "generator-rest-express-typescript"
    //     )} generator!`
    //   )
    // );
    const initialPrompt =
    {
      type: "rawlist",
      name: "initialtype",
      message: `Wanted to add`,
      // choices: [{ name: 'microservice', value: 'microservice' },
      // { name: 'microservice-entity', value: 'microservice-entity' }]
      choices: ['microservice', 'microservice-entity']
    }

    return this.prompt(initialPrompt).then(initialProps => {
      // To access props later use this.props.someAnswer;
      this.initialtype = initialProps.initialtype || "microservice";
      this.isMicroService = (this.initialtype === "microservice") ? true : false;
      console.log(this.initialtype);

      const microservicePrompts = [
        {
          type: "input",
          name: "version",
          message: `App version [${this.version}]`
        },
        {
          type: "input",
          name: "description",
          message: `App description [${this.description}]`
        },
        {
          type: "input",
          name: "author",
          message: `App author [${this.author}]`
        }
      ];

      const entityScopePrompts = {
        type: "input",
        name: "entities",
        message: `Provide entities(comma separated)`
      }

      if (!this.options.appname && this.initialtype === "microservice") {
        microservicePrompts.unshift({
          type: "input",
          name: "name",
          message: `App name [${this.name}]`
        });
      }

      if (this.initialtype === "microservice") {
        microservicePrompts.push(entityScopePrompts);
        return this.prompt(microservicePrompts).then(props => {
          // To access props later use this.props.someAnswer;
          this.name = props.name || this.name;
          this.version = props.version || this.version;
          this.description = props.description || this.description;
          this.author = props.author || this.author;
          this.entityName = props.entityName || this.entityName;
          this.description = props.description || this.description;
          this.docker = props.docker;
          let entites = props.entities || this.entities;
          this.entities = entites.split(',');
          this.rootpath = this.name;
          console.log(this.entities);
        });
      }
      else {
        return this.prompt(entityScopePrompts).then(props => {
          // To access props later use this.props.someAnswer;
          let entites = props.entities || this.entities;
          this.entities = entites.split(',');
          this.rootpath = '.';
        });
      }
    });
  };

  _rename_entity(entityName) {
    console.log('destinationPath');
    console.log(this.destinationPath());
    console.log('Root Path');
    console.log(this.rootpath);
    console.log(entityName);
    this.fs.move(
      this.destinationPath(`${this.rootpath}/src/${entityName}`, 'entity.data-access.ts'),
      this.destinationPath(`${this.rootpath}/src/${entityName}`, `${entityName}.data-access.ts`)
    );

    this.fs.move(
      this.destinationPath(`${this.rootpath}/src/${entityName}`, 'entity.model.ts'),
      this.destinationPath(`${this.rootpath}/src/${entityName}`, `${entityName}.model.ts`)
    );
  }

  writing() {
    console.log(`this.sourceRoot() - ${this.sourceRoot()}`);
    console.log(`this.destinationPath() - ${this.destinationPath()}`);
    const src = this.isMicroService ? `${this.sourceRoot()}\\api` : `${this.sourceRoot()}\\api\\src\\entity`;
    const dest = this.isMicroService ? this.destinationPath(this.name) : this.destinationPath();
    console.log(`src - ${src}`);
    console.log(`dest - ${dest}`);    

    let opts = {
      name: this.name,
      description: this.description,
      author: this.author,
      version: this.version
    };

    if (this.isMicroService) {
      //ignore files
      let entityFilesPath = `${src}/src/entity/**/*`;
      let entityTestFilesPath = `${src}/test/entity/**/*`;
      let entityRouteFilePath = `${src}/src/router/routes/entity.routes.ts`;
      const copyOpts = {
        globOptions: {
          ignore: [entityFilesPath,
            entityTestFilesPath,
            entityRouteFilePath]
        }
      };

      this.fs.copy(src, dest, copyOpts);
      const globalFiles = [
        "package.temp.json",
      ];

      globalFiles.forEach(f => {
        this.fs.copyTpl(
          this.templatePath(`./api/${f}`),
          this.destinationPath(`${this.name}/${f}`),
          opts
        );
      });

      this.fs.move(
        this.destinationPath(`${this.name}`, "gitignore"),
        this.destinationPath(`${this.name}`, ".gitignore")
      );

      this.fs.move(
        this.destinationPath(`${this.name}`, "eslintrc.js"),
        this.destinationPath(`${this.name}`, ".eslintrc.js")
      );

      this.fs.move(
        this.destinationPath(`${this.name}`, "npmignore"),
        this.destinationPath(`${this.name}`, ".npmignore")
      );

      this.fs.move(
        this.destinationPath(`${this.name}`, "npmrc"),
        this.destinationPath(`${this.name}`, ".npmrc")
      );

      this.fs.move(
        this.destinationPath(`${this.name}`, "yarnrc"),
        this.destinationPath(`${this.name}`, ".yarnrc")
      );
    }

    this.entities.forEach(entityName => {
      entityName = entityName.toLowerCase();
      let entityDestination = `${this.rootpath}/src/${entityName}`;

      if (this.fs.exists(entityDestination)) throw new Error(`${entityName} already exists!`)

      let entityOpts = {
        entityName: entityName,
        entityClass: pascalCase.pascalCase(entityName.toLowerCase()),
        entityInterface: `I${pascalCase.pascalCase(entityName.toLowerCase())}`,
        entityCollectionName: `${entityName.toUpperCase()}_COLLECTION`,
        dateTime: new Date().toString()
      };

      //parse all files in entity folder
      console.log(`entityName - ${entityName}`)
      this.fs.copyTpl(
        this.templatePath("./api/src/entity"),
        this.destinationPath(entityDestination),
        entityOpts
      );
      //parse all files in entity test folder
      this.fs.copyTpl(
        this.templatePath("./api/test/entity"),
        this.destinationPath(`${this.rootpath}/test/${entityName}`),
        entityOpts
      );
      //parse entity routes file
      this.fs.copyTpl(
        this.templatePath("./api/src/router/routes/entity.routes.ts"),
        this.destinationPath(`${this.rootpath}/src/router/routes/${entityName}.routes.ts`),
        entityOpts
      );
      
      //rename required files
      this.fs.move(
        this.destinationPath(dest, `src/${entityName}/entity.data-access.ts`),
        this.destinationPath(dest, `src/${entityName}/${entityName}.data-access.ts`)
      );
  
      this.fs.move(
        this.destinationPath(dest, `src/${entityName}/entity.model.ts`),
        this.destinationPath(dest, `src/${entityName}/${entityName}.model.ts`)
      );
      //this._rename_entity(entityName);
    });

    if (this.isMicroService) {
    }
  }

  install() {
    if (this.isMicroService) {
      const appDir = path.join(process.cwd(), this.name);
      process.chdir(appDir);
      //this.npmInstall();
    }
  }
};
