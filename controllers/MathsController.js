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
        get() {
            if(this.HttpContext.path.queryString == '?'){
                // Send html help page
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }else{
                if(this.HttpContext.path.params.op){
                    switch(this.HttpContext.path.params.op){
                        case('+'):
                        this.HttpContext.path.params.op = '+';
                        x = this.HttpContext.path.params.x;
                        y = this.HttpContext.path.params.y;
                        this.HttpContext.path.params.value = parseInt(x) + parseInt(y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case(' '):
                        this.HttpContext.path.params.op = '+';
                        x = this.HttpContext.path.params.x;
                        y = this.HttpContext.path.params.y;
                        this.HttpContext.path.params.value = parseInt(x) + parseInt(y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('-'):
                        x = this.HttpContext.path.params.x;
                        y = this.HttpContext.path.params.y;
                        this.HttpContext.path.params.value = parseInt(x) - parseInt(y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('*'):
                        x = this.HttpContext.path.params.x;
                        y = this.HttpContext.path.params.y;
                        this.HttpContext.path.params.value = parseInt(x) * parseInt(y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('/'):
                        x = parseInt(this.HttpContext.path.params.x);
                        y = parseInt(this.HttpContext.path.params.y);
                        this.HttpContext.path.params.value = x / y;
                        if(y === 0){
                            this.HttpContext.path.params.value = "Impossible de diviser un nombre par 0";
                        }
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('%'):
                        x = this.HttpContext.path.params.x;
                        y = this.HttpContext.path.params.y;
                        this.HttpContext.path.params.value = parseInt(x) % parseInt(y);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('!'):
                        n = this.HttpContext.path.params.n;
                        let facto = 1;
                        for(var i = 1; i <= n; ++i){
                            facto = facto * i;
                        }
                        this.HttpContext.path.params.value = facto;
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('p'):
                        n = this.HttpContext.path.params.n;
                        this.HttpContext.path.params.value = isPrime(n);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;

                        case('np'):// qu'est-ce ue cette fonction envoie?
                        n = this.HttpContext.path.params.n;
                        this.HttpContext.path.params.value = findPrime(n);
                        this.HttpContext.response.JSON(this.HttpContext.path.params);
                        break;
                    }
                }
                else{
                    this.HttpContext.path.params.error = "parameter 'op' is missing";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }
        }
    }

    function isPrime(value) {
        for(var i = 2; i < value; i++) {
            if(value % i === 0) {
                return false;
            }
        }
        return value > 1;
    }
    function findPrime(n){
        let primeNumer = 0;
        for ( let i=0; i < n; i++){
            primeNumer++;
            while (!isPrime(primeNumer)){
                primeNumer++;
            }
        }
        return primeNumer;
    }