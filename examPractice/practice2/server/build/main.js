require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const koa = __webpack_require__(/*! koa */ "koa");

const app = new koa();

const server = __webpack_require__(/*! http */ "http").createServer(app.callback());

const WebSocket = __webpack_require__(/*! ws */ "ws");

const wss = new WebSocket.Server({
  server
});

const Router = __webpack_require__(/*! koa-router */ "koa-router");

const cors = __webpack_require__(/*! koa-cors */ "koa-cors");

const bodyParser = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");

const convert = __webpack_require__(/*! koa-convert */ "koa-convert");

app.use(bodyParser());
app.use(convert(cors()));
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.response.status} - ${ms}ms`);
});

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const productNames = ['Book', 'Phone', 'Tablet', 'Laptop', 'Computer'];
const productDescription = ['Very good!', 'Slightly used', 'Top condition', 'Somehow new!'];
const statusTypes = ['new', 'sold', 'popular', 'old', 'discounted'];
const products = [];

for (let i = 0; i < 10; i++) {
  products.push({
    id: i + 1,
    name: productNames[getRandomInt(0, productNames.length)],
    description: productDescription[getRandomInt(0, productDescription.length)],
    quantity: getRandomInt(1, 100),
    price: getRandomInt(1, 10000),
    status: statusTypes[getRandomInt(0, statusTypes.length)]
  });
}

const router = new Router();
router.get('/products', ctx => {
  ctx.response.body = products.filter(product => product.status !== statusTypes[1]);
  ctx.response.status = 200;
});
router.get('/all', ctx => {
  ctx.response.body = products;
  ctx.response.status = 200;
});
router.post('/buyProduct', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.request.body; // console.log("body: " + JSON.stringify(headers));

  const id = headers.id;
  const quantity = headers.quantity;

  if (typeof id !== 'undefined' && typeof quantity !== 'undefined') {
    const index = products.findIndex(product => product.id == id && product.quantity >= quantity);

    if (index === -1) {
      console.log("Product not available!");
      ctx.response.body = {
        text: 'Product not available!'
      };
      ctx.response.status = 404;
    } else {
      let product = products[index];
      product.quantity -= 1;

      if (product.quantity === 0) {
        product.status = statusTypes[1];
      }

      ctx.response.body = product;
      ctx.response.status = 200;
    }
  } else {
    console.log("Missing or invalid: id or quantity!");
    ctx.response.body = {
      text: 'Missing or invalid: id or quantity!'
    };
    ctx.response.status = 404;
  }
});

const broadcast = data => wss.clients.forEach(client => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(data));
  }
});

router.post('/product', ctx => {
  // console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.request.body; // console.log("body: " + JSON.stringify(headers));

  const name = headers.name;
  const description = headers.description;
  const quantity = headers.quantity;
  const price = headers.price;

  if (typeof name !== 'undefined' && typeof description !== 'undefined' && typeof quantity !== 'undefined' && typeof price !== 'undefined') {
    const index = products.findIndex(product => product.name == name && product.description == description);

    if (index !== -1) {
      console.log("Product already exists!");
      ctx.response.body = {
        text: 'Product already exists!'
      };
      ctx.response.status = 404;
    } else {
      let maxId = Math.max.apply(Math, products.map(function (product) {
        return product.id;
      })) + 1;
      let product = {
        id: maxId,
        name,
        description,
        quantity,
        price,
        status: statusTypes[0]
      };
      products.push(product);
      broadcast(product);
      ctx.response.body = product;
      ctx.response.status = 200;
    }
  } else {
    console.log("Missing or invalid: name, description, quantity or price!");
    ctx.response.body = {
      text: 'Missing or invalid: name, description, quantity or price!"'
    };
    ctx.response.status = 404;
  }
});
router.del('/product/:id', ctx => {
  console.log("ctx: " + JSON.stringify(ctx));
  const headers = ctx.params;
  console.log("body: " + JSON.stringify(headers));
  const id = headers.id;

  if (typeof id !== 'undefined') {
    const index = products.findIndex(product => product.id == id);

    if (index === -1) {
      console.log("No product with id: " + id);
      ctx.response.body = {
        text: 'Invalid product id'
      };
      ctx.response.status = 404;
    } else {
      let product = products[index];
      products.splice(index, 1);
      ctx.response.body = product;
      ctx.response.status = 200;
    }
  } else {
    ctx.response.body = {
      text: 'Id missing or invalid'
    };
    ctx.response.status = 404;
  }
});
app.use(router.routes());
app.use(router.allowedMethods());
server.listen(2024);

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Work\facultate\an3\sem1\Mobile-Applications\examPractice\practice2\server\src/index.js */"./src/index.js");


/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-convert":
/*!******************************!*\
  !*** external "koa-convert" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-convert");

/***/ }),

/***/ "koa-cors":
/*!***************************!*\
  !*** external "koa-cors" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-cors");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ })

/******/ });
//# sourceMappingURL=main.map