const path = require('path');
const fs = require('fs');
let x = 0;
let y = 0;
let n = 0;
module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
        }
        /*checkParamsCount(nbParams){
            if(Object.keys(this.params).length > nbParams){
                return this.error("too many parameters");
            }
            return true;
        }*/
        get() {
            const params = this.HttpContext.path.params;
            if (this.HttpContext.path.queryString == '?') {
                // Send html help page
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            } else {
                if (params.op) {
                    switch (params.op) {
                        case (' '):
                            params.op = '+';
                            if (Object.keys(params).length > 3) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.x || !params.y) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            x = parseInt(params.x);
                            y = parseInt(params.y);
                            params.value = x + y;
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('-'):
                            if (Object.keys(params).length > 3) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.x || !params.y) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            x = parseInt(params.x);
                            y = parseInt(params.y);
                            params.value = x - y;
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('*'):
                            if (Object.keys(params).length > 3) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.x || !params.y) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            x = parseInt(params.x);
                            y = parseInt(params.y);
                            params.value = x * y;
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('/'):
                            if (Object.keys(params).length > 3) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.x || !params.y) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            x = parseInt(params.x);
                            y = parseInt(params.y);
                            if (y === 0) {
                                params.error = "Impossible de diviser un nombre par 0";
                            }
                            params.value = x / y;
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('%'):
                            if (Object.keys(params).length > 3) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.x || !params.y) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            x = parseInt(params.x);
                            y = parseInt(params.y);
                            if (y === 0) {
                                params.error = "Impossible de moduler un nombre par 0";
                            }
                            params.value = x % y;
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('!'):
                            if (Object.keys(params).length > 2) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.n) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            n = params.n;
                            if (n < 0) {
                                params.error = "Impossible de calculer la factorielle d'un nombre négatif";
                                n = 0;
                            }
                            let facto = 1;
                            for (var i = 1; i <= n; ++i) {
                                facto = facto * i;
                            }
                            params.value = facto;
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('p'):
                            if (Object.keys(params).length > 2) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.n) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            n = params.n;
                            params.value = isPrime(n);
                            this.HttpContext.response.JSON(params);
                            break;

                        case ('np'):
                            if (Object.keys(params).length > 2) {
                                params.error = "too many params";
                                return this.HttpContext.response.JSON(params);
                            }
                            if (!params.n) {
                                params.error = "params missing";
                                return this.HttpContext.response.JSON(params);
                            }
                            n = params.n;
                            params.value = findPrime(n);
                            this.HttpContext.response.JSON(params);
                            break;
                    }
                }
                else {
                    params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(params);

                }
            }
        }
    }

function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumer = 0;
    for (let i = 0; i < n; i++) {
        primeNumer++;
        while (!isPrime(primeNumer)) {
            primeNumer++;
        }
    }
    return primeNumer;
}