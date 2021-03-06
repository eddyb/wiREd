/** @file arch-8051.js This file was auto-generated */


var _inspect = (typeof require !== 'undefined' ? require('util').inspect : function(x) {/*HACK*/return JSON.stringify(x, 0, 2);});

var bitsof = exports.bitsof = function bitsof(x) {
    if(typeof x === 'object' && 'bitsof' in x)
        return x.bitsof;
    throw new TypeError('Missing bit size for '+inspect(x));
}

var sizeof = exports.sizeof = function sizeof(x) {
    return Math.ceil(bitsof(x)/8);
}

var valueof = exports.valueof = function valueof(x) {
    if(x.known)
        return x;
    var v = x.value;
    if(v === null || v === void 0)
        return x;
    return v;
}

var lvalueof = exports.lvalueof = function lvalueof(x) {
    if(typeof x !== 'object' || !('lvalue' in x))
        return valueof(x);
    var v = x.lvalue;
    if(v === null || v === void 0)
        return x;
    return v;
}

var inspect = exports.inspect = function inspect(x, p) {
    if(typeof x === 'object' && x.inspect)
        return x.inspect(0, p || 16);
    return _inspect(x);
}

var Unknown = exports.Unknown = function Unknown(bits) {
    // HACK int[bits] - signed because it can promote to unsigned if required.
    if(typeof bits === 'number') {
        this.bitsof = bits;
        this.signed = true;
        this.type = int[bits];
        this.isInteger = true;
    }
}
Unknown.prototype = {
    constructor: Unknown, known: false,
    not: function not() {
        return new Not(this);
    },
    neg: function neg() {
        return new Neg(this);
    },
    mov: function mov(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).mov(that);
            return that.mov(this);
        }
        return new Mov(this, that);
    },
    add: function add(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).add(that);
            return that.add(this);
        }
        return new Add(this, that);
    },
    mul: function mul(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).mul(that);
            return that.mul(this);
        }
        return new Mul(this, that);
    },
    div: function div(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).div(that);
            return that.div(this);
        }
        return new Div(this, that);
    },
    and: function and(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).and(that);
            return that.and(this);
        }
        return new And(this, that);
    },
    or: function or(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).or(that);
            return that.or(this);
        }
        return new Or(this, that);
    },
    xor: function xor(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).xor(that);
            return that.xor(this);
        }
        return new Xor(this, that);
    },
    eq: function eq(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).eq(that);
            return that.eq(this);
        }
        return new Eq(this, that);
    },
    lt: function lt(that) {
        if(this.isInteger >= that.isInteger && that.bitsof > this.bitsof || that.bitsof === this.bitsof && that.signed < this.signed) { // that.type > this.type
            if(!that.isInteger || that.known)
                return (new that.type(this)).lt(that);
            return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
        }
        return new Lt(this, that);
    },
    shl: function shl(that) {
        return new Shl(this, that);
    },
    shr: function shr(that) {
        return new Shr(this, that);
    },
    sub: function sub(that) {
        if(that.isInteger && (!that.signed || that.bitsof < this.bitsof)) // HACK cleaner output
            that = int[this.bitsof](that);
        return this.add(that.neg());
    },
    rol: function rol(that) {
        return this.shl(that).or(this.shr(u8(this.bitsof).sub(that)));
    },
    ror: function ror(that) {
        return this.shr(that).or(this.shl(u8(this.bitsof).sub(that)));
    }
};
var Not = exports.Not = function Not(a) { // assumes !a.known.
    if(a.op === '~') return a.a;
    this.a = a;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Not.prototype = new Unknown;
Not.prototype.constructor = Not;
Not.prototype.fn = 'Not'; // TODO obsolete?
Not.prototype.op = '~';
Not.prototype.a = null;
Not.prototype.type = null;
Not.prototype.bitsof = 0;
Not.prototype.signed = true;
Not.prototype.isInteger = true;
Object.defineProperty(Not.prototype, 'value', {get: function() {
    var a = valueof(this.a);
    if(a !== this.a)
        return a.not();
}});
Not.prototype.inspect = function(_, p) {
    if(this.bitsof === 1) {
        if(this.a.op === '==') {
            var expr = inspect(this.a.a, 7)+' != '+inspect(this.a.b, 7);
            return 7 <= p ? expr : '('+expr+')'
        }
        if(this.a.op === '<') {
            var expr = inspect(this.a.a, 6)+' >= '+inspect(this.a.b, 6);
            return 6 <= p ? expr : '('+expr+')'
        }
    }
    var expr = '~'+inspect(this.a, 2);
    return 2 <= p ? expr : '('+expr+')';
};
var Neg = exports.Neg = function Neg(a) { // assumes !a.known.
    if(a.op === '-') return a.a;
    this.a = a;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Neg.prototype = new Unknown;
Neg.prototype.constructor = Neg;
Neg.prototype.fn = 'Neg'; // TODO obsolete?
Neg.prototype.op = '-';
Neg.prototype.a = null;
Neg.prototype.type = null;
Neg.prototype.bitsof = 0;
Neg.prototype.signed = true;
Neg.prototype.isInteger = true;
Object.defineProperty(Neg.prototype, 'value', {get: function() {
    var a = valueof(this.a);
    if(a !== this.a)
        return a.neg();
}});
Neg.prototype.inspect = function(_, p) {
    var expr = '-'+inspect(this.a, 4);
    return 4 <= p ? expr : '('+expr+')';
};
var Mov = exports.Mov = function Mov(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(!(this instanceof Mov)) return new Mov(a, b);
    this.a = a;
    this.b = b;
}
Mov.prototype = new Unknown;
Mov.prototype.constructor = Mov;
Mov.prototype.fn = 'Mov'; // TODO obsolete?
Mov.prototype.op = '=';
Mov.prototype.a = null;
Mov.prototype.b = null;
Mov.prototype.type = null;
Mov.prototype.bitsof = 0;
Mov.prototype.signed = true;
Mov.prototype.isInteger = true;
Object.defineProperty(Mov.prototype, 'value', {get: function() {
    var a = lvalueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return new Mov(a, b);
}});
Mov.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var op = '=';
    if(b.op && b.op !== '=' && b.op !== '<->' && b.op !== '==' && b.op !== '<' && b.op !== '-' && b.op !== '~' && (b.a === a || b.a.lvalue === a)) { // HACK the lvalue check might be costy.
        if(b.isInteger && b.op === '+' && b.b.bitsof <= 32 && b.b._A < 0 && b.b._A !== -1 << (b.b.bitsof-1)) { // HACK doesn't work > 32bits.
            op = '-=';
            b = b.b.neg();
        } else {
            op = b.op+'=';
            b = b.b;
        }
    }
    var expr = inspect(a, 13)+' '+op+' '+inspect(b, 13);
    return 13 <= p ? expr : '('+expr+')';
};
var Add = exports.Add = function Add(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(b.isInteger && b.bitsof <= 32 && b._A === 0) /* HACK doesn't work > 32bits. */ return a;
    if(a.op === '+' && a.b.known && b.known) return a.a.add(a.b.add(b));
    if(a.op === '-' && a.a === b || b.op === '-' && b.a === a) return new a.type(0);
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Add.prototype = new Unknown;
Add.prototype.constructor = Add;
Add.prototype.fn = 'Add'; // TODO obsolete?
Add.prototype.op = '+';
Add.prototype.a = null;
Add.prototype.b = null;
Add.prototype.type = null;
Add.prototype.bitsof = 0;
Add.prototype.signed = true;
Add.prototype.isInteger = true;
Object.defineProperty(Add.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.add(b);
}});
Add.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var op = '+';
    if(b.isInteger && b.bitsof <= 32 && b._A < 0 && b._A !== -1 << (b.bitsof-1)) { // HACK doesn't work > 32bits.
        op = '-';
        b = b.neg();
    } else if(b.op === '-') {
        op = '-';
        b = b.a;
    }
    var expr = inspect(a, 4)+' '+op+' '+inspect(b, 4);
    return 4 <= p ? expr : '('+expr+')';
};
var Mul = exports.Mul = function Mul(a, b) { /* assumes a.type >= b.type and !a.known. */
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Mul.prototype = new Unknown;
Mul.prototype.constructor = Mul;
Mul.prototype.fn = 'Mul'; // TODO obsolete?
Mul.prototype.op = '*';
Mul.prototype.a = null;
Mul.prototype.b = null;
Mul.prototype.type = null;
Mul.prototype.bitsof = 0;
Mul.prototype.signed = true;
Mul.prototype.isInteger = true;
Object.defineProperty(Mul.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.mul(b);
}});
Mul.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 3)+' * '+inspect(b, 3);
    return 3 <= p ? expr : '('+expr+')';
};
var Div = exports.Div = function Div(a, b) { /* assumes a.type >= b.type and !a.known. */
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Div.prototype = new Unknown;
Div.prototype.constructor = Div;
Div.prototype.fn = 'Div'; // TODO obsolete?
Div.prototype.op = '/';
Div.prototype.a = null;
Div.prototype.b = null;
Div.prototype.type = null;
Div.prototype.bitsof = 0;
Div.prototype.signed = true;
Div.prototype.isInteger = true;
Object.defineProperty(Div.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.div(b);
}});
Div.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 3)+' / '+inspect(b, 3);
    return 3 <= p ? expr : '('+expr+')';
};
var And = exports.And = function And(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(b.isInteger && b.bitsof <= 32 && b._A === 0) /* HACK doesn't work > 32bits. */ return new a.type(0);
    if(a === b) return a;
    if(b.isInteger && b.known && b.bitsof <= 32 && b._A === (b.signed ? -1 : (-1 >>> (32-b.bitsof)))) /* HACK doesn't work > 32bits. */ return a;
    if(a.op === '&' && a.b.known && b.known) return a.a.and(a.b.and(b));
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
And.prototype = new Unknown;
And.prototype.constructor = And;
And.prototype.fn = 'And'; // TODO obsolete?
And.prototype.op = '&';
And.prototype.a = null;
And.prototype.b = null;
And.prototype.type = null;
And.prototype.bitsof = 0;
And.prototype.signed = true;
And.prototype.isInteger = true;
Object.defineProperty(And.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.and(b);
}});
And.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 8)+' & '+inspect(b, 8);
    return 8 <= p ? expr : '('+expr+')';
};
var Or = exports.Or = function Or(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(b.isInteger && b.bitsof <= 32 && b._A === 0) /* HACK doesn't work > 32bits. */ return a;
    if(a === b) return a;
    if(b.isInteger && b.known && b.bitsof <= 32 && b._A === (b.signed ? -1 : (-1 >>> (32-b.bitsof)))) /* HACK doesn't work > 32bits. */ return b;
    if(a.op === '|' && a.b.known && b.known) return a.a.or(a.b.or(b));
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Or.prototype = new Unknown;
Or.prototype.constructor = Or;
Or.prototype.fn = 'Or'; // TODO obsolete?
Or.prototype.op = '|';
Or.prototype.a = null;
Or.prototype.b = null;
Or.prototype.type = null;
Or.prototype.bitsof = 0;
Or.prototype.signed = true;
Or.prototype.isInteger = true;
Object.defineProperty(Or.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.or(b);
}});
Or.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 10)+' | '+inspect(b, 10);
    return 10 <= p ? expr : '('+expr+')';
};
var Xor = exports.Xor = function Xor(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(b.isInteger && b.bitsof <= 32 && b._A === 0) /* HACK doesn't work > 32bits. */ return a;
    if(a === b) return new a.type(0);
    if(a.op === '^' && a.b.known && b.known) return a.a.xor(a.b.xor(b));
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Xor.prototype = new Unknown;
Xor.prototype.constructor = Xor;
Xor.prototype.fn = 'Xor'; // TODO obsolete?
Xor.prototype.op = '^';
Xor.prototype.a = null;
Xor.prototype.b = null;
Xor.prototype.type = null;
Xor.prototype.bitsof = 0;
Xor.prototype.signed = true;
Xor.prototype.isInteger = true;
Object.defineProperty(Xor.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.xor(b);
}});
Xor.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 9)+' ^ '+inspect(b, 9);
    return 9 <= p ? expr : '('+expr+')';
};
var Eq = exports.Eq = function Eq(a, b) { /* assumes a.type >= b.type and !a.known. */
    this.a = a;
    this.b = b;
    this.type = u1;
    this.bitsof = 1;
    this.signed = false;
    this.isInteger = true;
}
Eq.prototype = new Unknown;
Eq.prototype.constructor = Eq;
Eq.prototype.fn = 'Eq'; // TODO obsolete?
Eq.prototype.op = '==';
Eq.prototype.a = null;
Eq.prototype.b = null;
Eq.prototype.type = null;
Eq.prototype.bitsof = 0;
Eq.prototype.signed = true;
Eq.prototype.isInteger = true;
Object.defineProperty(Eq.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.eq(b);
}});
Eq.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 7)+' == '+inspect(b, 7);
    return 7 <= p ? expr : '('+expr+')';
};
var Lt = exports.Lt = function Lt(a, b) { /* assumes a.type >= b.type and !a.known. */
    this.a = a;
    this.b = b;
    this.type = u1;
    this.bitsof = 1;
    this.signed = false;
    this.isInteger = true;
}
Lt.prototype = new Unknown;
Lt.prototype.constructor = Lt;
Lt.prototype.fn = 'Lt'; // TODO obsolete?
Lt.prototype.op = '<';
Lt.prototype.a = null;
Lt.prototype.b = null;
Lt.prototype.type = null;
Lt.prototype.bitsof = 0;
Lt.prototype.signed = true;
Lt.prototype.isInteger = true;
Object.defineProperty(Lt.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.lt(b);
}});
Lt.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 6)+' < '+inspect(b, 6);
    return 6 <= p ? expr : '('+expr+')';
};
var Shl = exports.Shl = function Shl(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(b.isInteger && b.bitsof <= 32 && b._A === 0) /* HACK doesn't work > 32bits. */ return a;
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Shl.prototype = new Unknown;
Shl.prototype.constructor = Shl;
Shl.prototype.fn = 'Shl'; // TODO obsolete?
Shl.prototype.op = '<<';
Shl.prototype.a = null;
Shl.prototype.b = null;
Shl.prototype.type = null;
Shl.prototype.bitsof = 0;
Shl.prototype.signed = true;
Shl.prototype.isInteger = true;
Object.defineProperty(Shl.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.shl(b);
}});
Shl.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 5)+' << '+inspect(b, 5);
    return 5 <= p ? expr : '('+expr+')';
};
var Shr = exports.Shr = function Shr(a, b) { /* assumes a.type >= b.type and !a.known. */
    if(b.isInteger && b.bitsof <= 32 && b._A === 0) /* HACK doesn't work > 32bits. */ return a;
    this.a = a;
    this.b = b;
    this.type = a.type;
    this.bitsof = a.bitsof;
    this.signed = a.signed;
    this.isInteger = a.isInteger;
}
Shr.prototype = new Unknown;
Shr.prototype.constructor = Shr;
Shr.prototype.fn = 'Shr'; // TODO obsolete?
Shr.prototype.op = '>>';
Shr.prototype.a = null;
Shr.prototype.b = null;
Shr.prototype.type = null;
Shr.prototype.bitsof = 0;
Shr.prototype.signed = true;
Shr.prototype.isInteger = true;
Object.defineProperty(Shr.prototype, 'value', {get: function() {
    var a = valueof(this.a), b = valueof(this.b);
    if(a !== this.a || b !== this.b)
        return a.shr(b);
}});
Shr.prototype.inspect = function(_, p) {
    var a = this.a, b = this.b;
    var expr = inspect(a, 5)+' >> '+inspect(b, 5);
    return 5 <= p ? expr : '('+expr+')';
};
var Integer = exports.Integer = function Integer() {}
Integer.prototype = {
    constructor: Integer, isInteger: true,
    get value() {
        if(!this.known) {
            var v = valueof(this._A);
            if(v !== this._A)
                return new this.type(v);
        }
    },
    get lvalue() {
        if(!this.known)
            return this._A.lvalue;
    },
    sub: function sub(that) {
        if(that.isInteger && (!that.signed || that.bitsof < this.bitsof)) // HACK cleaner output
            that = int[this.bitsof](that);
        return this.add(that.neg());
    }
};

var uint = exports.uint = [], int = exports.int = [];
var signed = exports.signed = function(x) {
    return new int[x.bitsof](x);
};
var unsigned = exports.unsigned = function(x) {
    return new uint[x.bitsof](x);
};

var u1 = uint[1] = exports.u1 = function u1(a) {
    if(a.type === u1) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u1))
        return new u1(a);
    if(typeof a === 'number')
        this._A = a & 0x1;
    else if(a.isInteger && a.known)
        this._A = a._A & 0x1;
    else {
        this.known = false;
        this._A = a instanceof i1 || a instanceof u1 ? a._A : a;
    }
}
u1.prototype = new Integer;
u1.prototype.constructor = u1;
u1.prototype.type = u1;
u1.prototype.bitsof = 1;
u1.prototype.signed = false;
u1.prototype.known = true;
u1.prototype._A = 0;
u1.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 'ub' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u1) ? 'u1('+inspect(this._A)+')' : inspect(this._A, p);
};
u1.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new u1(~this._A);
};
u1.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new u1(-this._A);
};
u1.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new u1(this._A = (that._A & 0x1));
};
u1.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new u1(this._A + (that._A & 0x1));
};
u1.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new u1(this._A * (that._A & 0x1));
};
u1.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new u1(this._A / (that._A & 0x1));
};
u1.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new u1(this._A & (that._A & 0x1));
};
u1.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new u1(this._A | (that._A & 0x1));
};
u1.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new u1(this._A ^ (that._A & 0x1));
};
u1.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == (that._A & 0x1) ? 1 : 0));
};
u1.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < (that._A & 0x1) ? 1 : 0));
};
u1.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new u1(this._A << (that._A & 0x0));
};
u1.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new u1(this._A >>> (that._A & 0x0));
};
u1.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(1).sub(that)));
};
u1.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(1).sub(that)));
};

var i1 = int[1] = exports.i1 = function i1(a) {
    if(a.type === i1) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i1))
        return new i1(a);
    if(typeof a === 'number')
        this._A = a << 31 >> 31;
    else if(a.isInteger && a.known)
        this._A = a._A << 31 >> 31;
    else {
        this.known = false;
        this._A = a instanceof u1 || a instanceof i1 ? a._A : a;
    }
}
i1.prototype = new Integer;
i1.prototype.constructor = i1;
i1.prototype.type = i1;
i1.prototype.bitsof = 1;
i1.prototype.signed = true;
i1.prototype.known = true;
i1.prototype._A = 0;
i1.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 'b' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i1) ? 'i1('+inspect(this._A)+')' : inspect(this._A, p);
};
i1.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new i1(~this._A);
};
i1.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new i1(-this._A);
};
i1.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new i1(this._A = that._A);
};
i1.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new i1(this._A + that._A);
};
i1.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new i1(this._A * that._A);
};
i1.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new i1(this._A / that._A);
};
i1.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new i1(this._A & that._A);
};
i1.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new i1(this._A | that._A);
};
i1.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new i1(this._A ^ that._A);
};
i1.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == that._A ? 1 : 0));
};
i1.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 1 || that.bitsof === 1 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < that._A ? 1 : 0));
};
i1.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new i1(this._A << (that._A & 0x0));
};
i1.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new i1(this._A >> (that._A & 0x0));
};
i1.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(1).sub(that)));
};
i1.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(1).sub(that)));
};

var u8 = uint[8] = exports.u8 = function u8(a) {
    if(a.type === u8) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u8))
        return new u8(a);
    if(typeof a === 'number')
        this._A = a & 0xff;
    else if(a.isInteger && a.known)
        this._A = a._A & 0xff;
    else {
        this.known = false;
        this._A = a instanceof i8 || a instanceof u8 ? a._A : a;
    }
}
u8.prototype = new Integer;
u8.prototype.constructor = u8;
u8.prototype.type = u8;
u8.prototype.bitsof = 8;
u8.prototype.signed = false;
u8.prototype.known = true;
u8.prototype._A = 0;
u8.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 'uc' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u8) ? 'u8('+inspect(this._A)+')' : inspect(this._A, p);
};
u8.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new u8(~this._A);
};
u8.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new u8(-this._A);
};
u8.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new u8(this._A = (that._A & 0xff));
};
u8.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new u8(this._A + (that._A & 0xff));
};
u8.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new u8(this._A * (that._A & 0xff));
};
u8.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new u8(this._A / (that._A & 0xff));
};
u8.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new u8(this._A & (that._A & 0xff));
};
u8.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new u8(this._A | (that._A & 0xff));
};
u8.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new u8(this._A ^ (that._A & 0xff));
};
u8.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == (that._A & 0xff) ? 1 : 0));
};
u8.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < (that._A & 0xff) ? 1 : 0));
};
u8.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new u8(this._A << (that._A & 0x7));
};
u8.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new u8(this._A >>> (that._A & 0x7));
};
u8.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(8).sub(that)));
};
u8.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(8).sub(that)));
};

var i8 = int[8] = exports.i8 = function i8(a) {
    if(a.type === i8) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i8))
        return new i8(a);
    if(typeof a === 'number')
        this._A = a << 24 >> 24;
    else if(a.isInteger && a.known)
        this._A = a._A << 24 >> 24;
    else {
        this.known = false;
        this._A = a instanceof u8 || a instanceof i8 ? a._A : a;
    }
}
i8.prototype = new Integer;
i8.prototype.constructor = i8;
i8.prototype.type = i8;
i8.prototype.bitsof = 8;
i8.prototype.signed = true;
i8.prototype.known = true;
i8.prototype._A = 0;
i8.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 'c' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i8) ? 'i8('+inspect(this._A)+')' : inspect(this._A, p);
};
i8.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new i8(~this._A);
};
i8.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new i8(-this._A);
};
i8.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new i8(this._A = that._A);
};
i8.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new i8(this._A + that._A);
};
i8.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new i8(this._A * that._A);
};
i8.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new i8(this._A / that._A);
};
i8.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new i8(this._A & that._A);
};
i8.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new i8(this._A | that._A);
};
i8.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new i8(this._A ^ that._A);
};
i8.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == that._A ? 1 : 0));
};
i8.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 8 || that.bitsof === 8 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < that._A ? 1 : 0));
};
i8.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new i8(this._A << (that._A & 0x7));
};
i8.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new i8(this._A >> (that._A & 0x7));
};
i8.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(8).sub(that)));
};
i8.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(8).sub(that)));
};

var u16 = uint[16] = exports.u16 = function u16(a) {
    if(a.type === u16) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u16))
        return new u16(a);
    if(typeof a === 'number')
        this._A = a & 0xffff;
    else if(a.isInteger && a.known)
        this._A = a._A & 0xffff;
    else {
        this.known = false;
        this._A = a instanceof i16 || a instanceof u16 ? a._A : a;
    }
}
u16.prototype = new Integer;
u16.prototype.constructor = u16;
u16.prototype.type = u16;
u16.prototype.bitsof = 16;
u16.prototype.signed = false;
u16.prototype.known = true;
u16.prototype._A = 0;
u16.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 'us' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u16) ? 'u16('+inspect(this._A)+')' : inspect(this._A, p);
};
u16.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new u16(~this._A);
};
u16.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new u16(-this._A);
};
u16.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new u16(this._A = (that._A & 0xffff));
};
u16.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new u16(this._A + (that._A & 0xffff));
};
u16.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new u16(this._A * (that._A & 0xffff));
};
u16.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new u16(this._A / (that._A & 0xffff));
};
u16.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new u16(this._A & (that._A & 0xffff));
};
u16.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new u16(this._A | (that._A & 0xffff));
};
u16.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new u16(this._A ^ (that._A & 0xffff));
};
u16.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == (that._A & 0xffff) ? 1 : 0));
};
u16.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < (that._A & 0xffff) ? 1 : 0));
};
u16.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new u16(this._A << (that._A & 0xf));
};
u16.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new u16(this._A >>> (that._A & 0xf));
};
u16.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(16).sub(that)));
};
u16.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(16).sub(that)));
};

var i16 = int[16] = exports.i16 = function i16(a) {
    if(a.type === i16) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i16))
        return new i16(a);
    if(typeof a === 'number')
        this._A = a << 16 >> 16;
    else if(a.isInteger && a.known)
        this._A = a._A << 16 >> 16;
    else {
        this.known = false;
        this._A = a instanceof u16 || a instanceof i16 ? a._A : a;
    }
}
i16.prototype = new Integer;
i16.prototype.constructor = i16;
i16.prototype.type = i16;
i16.prototype.bitsof = 16;
i16.prototype.signed = true;
i16.prototype.known = true;
i16.prototype._A = 0;
i16.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 's' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i16) ? 'i16('+inspect(this._A)+')' : inspect(this._A, p);
};
i16.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new i16(~this._A);
};
i16.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new i16(-this._A);
};
i16.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new i16(this._A = that._A);
};
i16.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new i16(this._A + that._A);
};
i16.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new i16(this._A * that._A);
};
i16.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new i16(this._A / that._A);
};
i16.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new i16(this._A & that._A);
};
i16.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new i16(this._A | that._A);
};
i16.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new i16(this._A ^ that._A);
};
i16.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == that._A ? 1 : 0));
};
i16.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 16 || that.bitsof === 16 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < that._A ? 1 : 0));
};
i16.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new i16(this._A << (that._A & 0xf));
};
i16.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new i16(this._A >> (that._A & 0xf));
};
i16.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(16).sub(that)));
};
i16.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(16).sub(that)));
};

var u32 = uint[32] = exports.u32 = function u32(a) {
    if(a.type === u32) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u32))
        return new u32(a);
    if(typeof a === 'number')
        this._A = a >>> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >>> 0;
    else {
        this.known = false;
        this._A = a instanceof i32 || a instanceof u32 ? a._A : a;
    }
}
u32.prototype = new Integer;
u32.prototype.constructor = u32;
u32.prototype.type = u32;
u32.prototype.bitsof = 32;
u32.prototype.signed = false;
u32.prototype.known = true;
u32.prototype._A = 0;
u32.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? 'u' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u32) ? 'u32('+inspect(this._A)+')' : inspect(this._A, p);
};
u32.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new u32(~this._A);
};
u32.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new u32(-this._A);
};
u32.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new u32(this._A = (that._A >>> 0));
};
u32.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new u32(this._A + (that._A >>> 0));
};
u32.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new u32(this._A * (that._A >>> 0));
};
u32.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new u32(this._A / (that._A >>> 0));
};
u32.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new u32(this._A & (that._A >>> 0));
};
u32.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new u32(this._A | (that._A >>> 0));
};
u32.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new u32(this._A ^ (that._A >>> 0));
};
u32.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == (that._A >>> 0) ? 1 : 0));
};
u32.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < (that._A >>> 0) ? 1 : 0));
};
u32.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new u32(this._A << (that._A & 0x1f));
};
u32.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new u32(this._A >>> (that._A & 0x1f));
};
u32.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(32).sub(that)));
};
u32.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(32).sub(that)));
};

var i32 = int[32] = exports.i32 = function i32(a) {
    if(a.type === i32) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i32))
        return new i32(a);
    if(typeof a === 'number')
        this._A = a >> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >> 0;
    else {
        this.known = false;
        this._A = a instanceof u32 || a instanceof i32 ? a._A : a;
    }
}
i32.prototype = new Integer;
i32.prototype.constructor = i32;
i32.prototype.type = i32;
i32.prototype.bitsof = 32;
i32.prototype.signed = true;
i32.prototype.known = true;
i32.prototype._A = 0;
i32.prototype.inspect = function(_, p) {
    if(this.known)
        return (this._A >= 48 ? '0x'+this._A.toString(16) : this._A)+(/*process.env.DEBUG_INT*/false ? '' : '');
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i32) ? 'i32('+inspect(this._A)+')' : inspect(this._A, p);
};
i32.prototype.not = function not() {
    if(!this.known) // Unknown#not
        return new Not(this);
    return new i32(~this._A);
};
i32.prototype.neg = function neg() {
    if(!this.known) // Unknown#neg
        return new Neg(this);
    return new i32(-this._A);
};
i32.prototype.mov = function mov(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mov
            return (new that.type(this)).mov(that);
        return that.mov(this);
    }
    if(!this.known) // Unknown#mov
        return new Mov(this, that);
    if(!that.known)
        return that.mov(this);
    return new i32(this._A = that._A);
};
i32.prototype.add = function add(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#add
            return (new that.type(this)).add(that);
        return that.add(this);
    }
    if(!this.known) // Unknown#add
        return new Add(this, that);
    if(!that.known)
        return that.add(this);
    return new i32(this._A + that._A);
};
i32.prototype.mul = function mul(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#mul
            return (new that.type(this)).mul(that);
        return that.mul(this);
    }
    if(!this.known) // Unknown#mul
        return new Mul(this, that);
    if(!that.known)
        return that.mul(this);
    return new i32(this._A * that._A);
};
i32.prototype.div = function div(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#div
            return (new that.type(this)).div(that);
        return that.div(this);
    }
    if(!this.known) // Unknown#div
        return new Div(this, that);
    if(!that.known)
        return that.div(this);
    return new i32(this._A / that._A);
};
i32.prototype.and = function and(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#and
            return (new that.type(this)).and(that);
        return that.and(this);
    }
    if(!this.known) // Unknown#and
        return new And(this, that);
    if(!that.known)
        return that.and(this);
    return new i32(this._A & that._A);
};
i32.prototype.or = function or(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#or
            return (new that.type(this)).or(that);
        return that.or(this);
    }
    if(!this.known) // Unknown#or
        return new Or(this, that);
    if(!that.known)
        return that.or(this);
    return new i32(this._A | that._A);
};
i32.prototype.xor = function xor(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#xor
            return (new that.type(this)).xor(that);
        return that.xor(this);
    }
    if(!this.known) // Unknown#xor
        return new Xor(this, that);
    if(!that.known)
        return that.xor(this);
    return new i32(this._A ^ that._A);
};
i32.prototype.eq = function eq(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#eq
            return (new that.type(this)).eq(that);
        return that.eq(this);
    }
    if(!this.known) // Unknown#eq
        return new Eq(this, that);
    if(!that.known)
        return that.eq(this);
    return new u1((this._A == that._A ? 1 : 0));
};
i32.prototype.lt = function lt(that) { // assumes that is of an integer type.
    if(!that.isInteger || that.bitsof > 32 || that.bitsof === 32 && !that.signed) { // that.type > this.type
        if(!this.known && that.known) // Unknown#lt
            return (new that.type(this)).lt(that);
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    }
    if(!this.known) // Unknown#lt
        return new Lt(this, that);
    if(!that.known)
        return /*HACK < is the only non-commutative operator */ that.lt(this).not().and(that.eq(this).not());
    return new u1((this._A < that._A ? 1 : 0));
};
i32.prototype.shl = function shl(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shl
        return new Shl(this, that);
    return new i32(this._A << (that._A & 0x1f));
};
i32.prototype.shr = function shr(that) { // assumes that is of an integer type.
    if(!this.known || !that.isInteger || !that.known) // Unknown#shr
        return new Shr(this, that);
    return new i32(this._A >> (that._A & 0x1f));
};
i32.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(32).sub(that)));
};
i32.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(32).sub(that)));
};

var u64 = uint[64] = exports.u64 = function u64(a, b) {
    if(a.type === u64) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u64))
        return new u64(a);
    if(typeof a === 'number')
        this._A = a >>> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >>> 0;
    else {
        this.known = false;
        this._A = a instanceof i64 || a instanceof u64 ? a._A : a;
    }
}
u64.prototype = new Integer;
u64.prototype.constructor = u64;
u64.prototype.type = u64;
u64.prototype.bitsof = 64;
u64.prototype.signed = false;
u64.prototype.known = true;
u64.prototype._A = u64.prototype._B = 0;
u64.prototype.inspect = function(_, p) {
    if(this.known)
        return 'u64('+this._A+', '+this._B+')';
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u64) ? 'u64('+inspect(this._A)+')' : inspect(this._A, p);
};
u64.prototype.not = Unknown.prototype.not;
u64.prototype.neg = Unknown.prototype.neg;
u64.prototype.mov = Unknown.prototype.mov;
u64.prototype.add = Unknown.prototype.add;
u64.prototype.mul = Unknown.prototype.mul;
u64.prototype.div = Unknown.prototype.div;
u64.prototype.and = Unknown.prototype.and;
u64.prototype.or = Unknown.prototype.or;
u64.prototype.xor = Unknown.prototype.xor;
u64.prototype.eq = Unknown.prototype.eq;
u64.prototype.lt = Unknown.prototype.lt;
u64.prototype.shl = Unknown.prototype.shl;
u64.prototype.shr = Unknown.prototype.shr;
u64.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(64).sub(that)));
};
u64.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(64).sub(that)));
};

var i64 = int[64] = exports.i64 = function i64(a, b) {
    if(a.type === i64) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i64))
        return new i64(a);
    if(typeof a === 'number')
        this._A = a >> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >> 0;
    else {
        this.known = false;
        this._A = a instanceof u64 || a instanceof i64 ? a._A : a;
    }
}
i64.prototype = new Integer;
i64.prototype.constructor = i64;
i64.prototype.type = i64;
i64.prototype.bitsof = 64;
i64.prototype.signed = true;
i64.prototype.known = true;
i64.prototype._A = i64.prototype._B = 0;
i64.prototype.inspect = function(_, p) {
    if(this.known)
        return 'i64('+this._A+', '+this._B+')';
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i64) ? 'i64('+inspect(this._A)+')' : inspect(this._A, p);
};
i64.prototype.not = Unknown.prototype.not;
i64.prototype.neg = Unknown.prototype.neg;
i64.prototype.mov = Unknown.prototype.mov;
i64.prototype.add = Unknown.prototype.add;
i64.prototype.mul = Unknown.prototype.mul;
i64.prototype.div = Unknown.prototype.div;
i64.prototype.and = Unknown.prototype.and;
i64.prototype.or = Unknown.prototype.or;
i64.prototype.xor = Unknown.prototype.xor;
i64.prototype.eq = Unknown.prototype.eq;
i64.prototype.lt = Unknown.prototype.lt;
i64.prototype.shl = Unknown.prototype.shl;
i64.prototype.shr = Unknown.prototype.shr;
i64.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(64).sub(that)));
};
i64.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(64).sub(that)));
};

var u128 = uint[128] = exports.u128 = function u128(a, b, c, d) {
    if(a.type === u128) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u128))
        return new u128(a);
    if(typeof a === 'number')
        this._A = a >>> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >>> 0;
    else {
        this.known = false;
        this._A = a instanceof i128 || a instanceof u128 ? a._A : a;
    }
}
u128.prototype = new Integer;
u128.prototype.constructor = u128;
u128.prototype.type = u128;
u128.prototype.bitsof = 128;
u128.prototype.signed = false;
u128.prototype.known = true;
u128.prototype._A = u128.prototype._B = u128.prototype._C = u128.prototype._D = 0;
u128.prototype.inspect = function(_, p) {
    if(this.known)
        return 'u128('+this._A+', '+this._B+', '+this._C+', '+this._D+')';
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u128) ? 'u128('+inspect(this._A)+')' : inspect(this._A, p);
};
u128.prototype.not = Unknown.prototype.not;
u128.prototype.neg = Unknown.prototype.neg;
u128.prototype.mov = Unknown.prototype.mov;
u128.prototype.add = Unknown.prototype.add;
u128.prototype.mul = Unknown.prototype.mul;
u128.prototype.div = Unknown.prototype.div;
u128.prototype.and = Unknown.prototype.and;
u128.prototype.or = Unknown.prototype.or;
u128.prototype.xor = Unknown.prototype.xor;
u128.prototype.eq = Unknown.prototype.eq;
u128.prototype.lt = Unknown.prototype.lt;
u128.prototype.shl = Unknown.prototype.shl;
u128.prototype.shr = Unknown.prototype.shr;
u128.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(128).sub(that)));
};
u128.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(128).sub(that)));
};

var i128 = int[128] = exports.i128 = function i128(a, b, c, d) {
    if(a.type === i128) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i128))
        return new i128(a);
    if(typeof a === 'number')
        this._A = a >> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >> 0;
    else {
        this.known = false;
        this._A = a instanceof u128 || a instanceof i128 ? a._A : a;
    }
}
i128.prototype = new Integer;
i128.prototype.constructor = i128;
i128.prototype.type = i128;
i128.prototype.bitsof = 128;
i128.prototype.signed = true;
i128.prototype.known = true;
i128.prototype._A = i128.prototype._B = i128.prototype._C = i128.prototype._D = 0;
i128.prototype.inspect = function(_, p) {
    if(this.known)
        return 'i128('+this._A+', '+this._B+', '+this._C+', '+this._D+')';
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i128) ? 'i128('+inspect(this._A)+')' : inspect(this._A, p);
};
i128.prototype.not = Unknown.prototype.not;
i128.prototype.neg = Unknown.prototype.neg;
i128.prototype.mov = Unknown.prototype.mov;
i128.prototype.add = Unknown.prototype.add;
i128.prototype.mul = Unknown.prototype.mul;
i128.prototype.div = Unknown.prototype.div;
i128.prototype.and = Unknown.prototype.and;
i128.prototype.or = Unknown.prototype.or;
i128.prototype.xor = Unknown.prototype.xor;
i128.prototype.eq = Unknown.prototype.eq;
i128.prototype.lt = Unknown.prototype.lt;
i128.prototype.shl = Unknown.prototype.shl;
i128.prototype.shr = Unknown.prototype.shr;
i128.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(128).sub(that)));
};
i128.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(128).sub(that)));
};

var u256 = uint[256] = exports.u256 = function u256(a, b, c, d, e, f, g, h) {
    if(a.type === u256) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof u256))
        return new u256(a);
    if(typeof a === 'number')
        this._A = a >>> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >>> 0;
    else {
        this.known = false;
        this._A = a instanceof i256 || a instanceof u256 ? a._A : a;
    }
}
u256.prototype = new Integer;
u256.prototype.constructor = u256;
u256.prototype.type = u256;
u256.prototype.bitsof = 256;
u256.prototype.signed = false;
u256.prototype.known = true;
u256.prototype._A = u256.prototype._B = u256.prototype._C = u256.prototype._D = u256.prototype._E = u256.prototype._F = u256.prototype._G = u256.prototype._H = 0;
u256.prototype.inspect = function(_, p) {
    if(this.known)
        return 'u256('+this._A+', '+this._B+', '+this._C+', '+this._D+', '+this._E+', '+this._F+', '+this._G+', '+this._H+')';
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== u256) ? 'u256('+inspect(this._A)+')' : inspect(this._A, p);
};
u256.prototype.not = Unknown.prototype.not;
u256.prototype.neg = Unknown.prototype.neg;
u256.prototype.mov = Unknown.prototype.mov;
u256.prototype.add = Unknown.prototype.add;
u256.prototype.mul = Unknown.prototype.mul;
u256.prototype.div = Unknown.prototype.div;
u256.prototype.and = Unknown.prototype.and;
u256.prototype.or = Unknown.prototype.or;
u256.prototype.xor = Unknown.prototype.xor;
u256.prototype.eq = Unknown.prototype.eq;
u256.prototype.lt = Unknown.prototype.lt;
u256.prototype.shl = Unknown.prototype.shl;
u256.prototype.shr = Unknown.prototype.shr;
u256.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(256).sub(that)));
};
u256.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(256).sub(that)));
};

var i256 = int[256] = exports.i256 = function i256(a, b, c, d, e, f, g, h) {
    if(a.type === i256) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof i256))
        return new i256(a);
    if(typeof a === 'number')
        this._A = a >> 0;
    else if(a.isInteger && a.known)
        this._A = a._A >> 0;
    else {
        this.known = false;
        this._A = a instanceof u256 || a instanceof i256 ? a._A : a;
    }
}
i256.prototype = new Integer;
i256.prototype.constructor = i256;
i256.prototype.type = i256;
i256.prototype.bitsof = 256;
i256.prototype.signed = true;
i256.prototype.known = true;
i256.prototype._A = i256.prototype._B = i256.prototype._C = i256.prototype._D = i256.prototype._E = i256.prototype._F = i256.prototype._G = i256.prototype._H = 0;
i256.prototype.inspect = function(_, p) {
    if(this.known)
        return 'i256('+this._A+', '+this._B+', '+this._C+', '+this._D+', '+this._E+', '+this._F+', '+this._G+', '+this._H+')';
    return (/*process.env.DEBUG_INT*/false || (this._A instanceof Integer || this._A instanceof Unknown) && this._A.type !== i256) ? 'i256('+inspect(this._A)+')' : inspect(this._A, p);
};
i256.prototype.not = Unknown.prototype.not;
i256.prototype.neg = Unknown.prototype.neg;
i256.prototype.mov = Unknown.prototype.mov;
i256.prototype.add = Unknown.prototype.add;
i256.prototype.mul = Unknown.prototype.mul;
i256.prototype.div = Unknown.prototype.div;
i256.prototype.and = Unknown.prototype.and;
i256.prototype.or = Unknown.prototype.or;
i256.prototype.xor = Unknown.prototype.xor;
i256.prototype.eq = Unknown.prototype.eq;
i256.prototype.lt = Unknown.prototype.lt;
i256.prototype.shl = Unknown.prototype.shl;
i256.prototype.shr = Unknown.prototype.shr;
i256.prototype.rol = function rol(that) {
    return this.shl(that).or(this.shr(u8(256).sub(that)));
};
i256.prototype.ror = function ror(that) {
    return this.shr(that).or(this.shl(u8(256).sub(that)));
};

var Float = exports.Float = function Float() {}
var _floatConvertor = new DataView(new ArrayBuffer(8));
Float.prototype = {
    constructor: Float, known: true, isInteger: false,
    get value() {
        if(!this.known) {
            var v = valueof(this._A);
            if(this._A.fn === 'Mem' && this.bitsof <= 64) { // HACK *reinterpret_cast<float*>(addr)
                if(!v.isInteger || v.bitsof !== this.bitsof || !v.known)
                    return; // TODO better support for reinterpret casts.
                _floatConvertor.setInt32(0, v._A | 0, true);
                if(this.bitsof === 32)
                    return new this.type(_floatConvertor.getFloat32(0, true));
                _floatConvertor.setInt32(4, v._B | 0, true);
                return new this.type(_floatConvertor.getFloat64(0, true));
            }
            if(v !== this._A)
                return new this.type(v);
        }
    },
    get lvalue() {
        if(!this.known)
            return this._A.lvalue;
    },
    sub: function sub(that) {
        if(that.isInteger || that.bitsof < this.bitsof) // HACK cleaner output
            that = new this.type(that);
        return this.add(that.neg());
    }
};

var float = exports.float = [];

// TODO how would the
var f32 = float[32] = exports.f32 = function f32(a) {
    if(a.type === f32) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof f32))
        return new f32(a);
    if(typeof a === 'number')
        this._A = a; // TODO actual conversion.
    else if(!a.isInteger && a.known) // FIXME check if it's actually a Float.
        this._A = a._A; // TODO actual conversion.
    else {
        this._A = a instanceof f32 ? a._A : a;
        this.known = false;
    }
}
f32.prototype = new Float;
f32.prototype.constructor = f32;
f32.prototype.type = f32;
f32.prototype._A = 0;
f32.prototype.bitsof = 32;
f32.prototype.signed = true;
f32.prototype.inspect = function() {
    if(this.known)
        return this._A.toString();
    var a = inspect(this._A);
    return (/*process.env.DEBUG_FLOAT*/false || this._A instanceof Float || this._A instanceof Unknown) ? 'f32('+a+')' : a;
};
f32.prototype.not = Unknown.prototype.not;
f32.prototype.neg = Unknown.prototype.neg;
f32.prototype.mov = Unknown.prototype.mov;
f32.prototype.add = Unknown.prototype.add;
f32.prototype.mul = Unknown.prototype.mul;
f32.prototype.div = Unknown.prototype.div;
f32.prototype.and = Unknown.prototype.and;
f32.prototype.or = Unknown.prototype.or;
f32.prototype.xor = Unknown.prototype.xor;
f32.prototype.eq = Unknown.prototype.eq;
f32.prototype.lt = Unknown.prototype.lt;
f32.prototype.shl = Unknown.prototype.shl;
f32.prototype.shr = Unknown.prototype.shr;
// TODO how would the
var f64 = float[64] = exports.f64 = function f64(a) {
    if(a.type === f64) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof f64))
        return new f64(a);
    if(typeof a === 'number')
        this._A = a; // TODO actual conversion.
    else if(!a.isInteger && a.known) // FIXME check if it's actually a Float.
        this._A = a._A; // TODO actual conversion.
    else {
        this._A = a instanceof f64 ? a._A : a;
        this.known = false;
    }
}
f64.prototype = new Float;
f64.prototype.constructor = f64;
f64.prototype.type = f64;
f64.prototype._A = 0;
f64.prototype.bitsof = 64;
f64.prototype.signed = true;
f64.prototype.inspect = function() {
    if(this.known)
        return this._A.toString();
    var a = inspect(this._A);
    return (/*process.env.DEBUG_FLOAT*/false || this._A instanceof Float || this._A instanceof Unknown) ? 'f64('+a+')' : a;
};
f64.prototype.not = Unknown.prototype.not;
f64.prototype.neg = Unknown.prototype.neg;
f64.prototype.mov = Unknown.prototype.mov;
f64.prototype.add = Unknown.prototype.add;
f64.prototype.mul = Unknown.prototype.mul;
f64.prototype.div = Unknown.prototype.div;
f64.prototype.and = Unknown.prototype.and;
f64.prototype.or = Unknown.prototype.or;
f64.prototype.xor = Unknown.prototype.xor;
f64.prototype.eq = Unknown.prototype.eq;
f64.prototype.lt = Unknown.prototype.lt;
f64.prototype.shl = Unknown.prototype.shl;
f64.prototype.shr = Unknown.prototype.shr;
// TODO how would the
var f80 = float[80] = exports.f80 = function f80(a) {
    if(a.type === f80) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof f80))
        return new f80(a);
    if(typeof a === 'number')
        this._A = a; // TODO actual conversion.
    else if(!a.isInteger && a.known) // FIXME check if it's actually a Float.
        this._A = a._A; // TODO actual conversion.
    else {
        this._A = a instanceof f80 ? a._A : a;
        this.known = false;
    }
}
f80.prototype = new Float;
f80.prototype.constructor = f80;
f80.prototype.type = f80;
f80.prototype._A = 0;
f80.prototype.bitsof = 80;
f80.prototype.signed = true;
f80.prototype.inspect = function() {
    if(this.known)
        return this._A.toString();
    var a = inspect(this._A);
    return (/*process.env.DEBUG_FLOAT*/false || this._A instanceof Float || this._A instanceof Unknown) ? 'f80('+a+')' : a;
};
f80.prototype.not = Unknown.prototype.not;
f80.prototype.neg = Unknown.prototype.neg;
f80.prototype.mov = Unknown.prototype.mov;
f80.prototype.add = Unknown.prototype.add;
f80.prototype.mul = Unknown.prototype.mul;
f80.prototype.div = Unknown.prototype.div;
f80.prototype.and = Unknown.prototype.and;
f80.prototype.or = Unknown.prototype.or;
f80.prototype.xor = Unknown.prototype.xor;
f80.prototype.eq = Unknown.prototype.eq;
f80.prototype.lt = Unknown.prototype.lt;
f80.prototype.shl = Unknown.prototype.shl;
f80.prototype.shr = Unknown.prototype.shr;
// TODO how would the
var f128 = float[128] = exports.f128 = function f128(a) {
    if(a.type === f128) // HACK This should only fix Unknown operations.
        return a;
    if(!(this instanceof f128))
        return new f128(a);
    if(typeof a === 'number')
        this._A = a; // TODO actual conversion.
    else if(!a.isInteger && a.known) // FIXME check if it's actually a Float.
        this._A = a._A; // TODO actual conversion.
    else {
        this._A = a instanceof f128 ? a._A : a;
        this.known = false;
    }
}
f128.prototype = new Float;
f128.prototype.constructor = f128;
f128.prototype.type = f128;
f128.prototype._A = 0;
f128.prototype.bitsof = 128;
f128.prototype.signed = true;
f128.prototype.inspect = function() {
    if(this.known)
        return this._A.toString();
    var a = inspect(this._A);
    return (/*process.env.DEBUG_FLOAT*/false || this._A instanceof Float || this._A instanceof Unknown) ? 'f128('+a+')' : a;
};
f128.prototype.not = Unknown.prototype.not;
f128.prototype.neg = Unknown.prototype.neg;
f128.prototype.mov = Unknown.prototype.mov;
f128.prototype.add = Unknown.prototype.add;
f128.prototype.mul = Unknown.prototype.mul;
f128.prototype.div = Unknown.prototype.div;
f128.prototype.and = Unknown.prototype.and;
f128.prototype.or = Unknown.prototype.or;
f128.prototype.xor = Unknown.prototype.xor;
f128.prototype.eq = Unknown.prototype.eq;
f128.prototype.lt = Unknown.prototype.lt;
f128.prototype.shl = Unknown.prototype.shl;
f128.prototype.shr = Unknown.prototype.shr;
var Register = exports.Register = [];
function RegisterFrozen1(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen1.prototype = new Unknown(1);
RegisterFrozen1.prototype.constructor = RegisterFrozen1;
RegisterFrozen1.prototype.name = null;
RegisterFrozen1.prototype.type = null;
RegisterFrozen1.prototype.inspect = function() {
    return this.name;
};
var Register1 = Register[1] = exports.Register1 = function Register1(name) {
    if(!(this instanceof Register1))
        return new Register1(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen1(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register1.prototype = new Unknown(1);
Register1.prototype.constructor = Register1;
Register1.prototype.name = '<1>';
Register1.prototype.nthValue = 0;
Register1.prototype.value = null;
Register1.prototype.lvalue = null;
Object.defineProperties(Register1.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register1.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen8(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen8.prototype = new Unknown(8);
RegisterFrozen8.prototype.constructor = RegisterFrozen8;
RegisterFrozen8.prototype.name = null;
RegisterFrozen8.prototype.type = null;
RegisterFrozen8.prototype.inspect = function() {
    return this.name;
};
var Register8 = Register[8] = exports.Register8 = function Register8(name) {
    if(!(this instanceof Register8))
        return new Register8(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen8(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register8.prototype = new Unknown(8);
Register8.prototype.constructor = Register8;
Register8.prototype.name = '<8>';
Register8.prototype.nthValue = 0;
Register8.prototype.value = null;
Register8.prototype.lvalue = null;
Object.defineProperties(Register8.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register8.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen16(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen16.prototype = new Unknown(16);
RegisterFrozen16.prototype.constructor = RegisterFrozen16;
RegisterFrozen16.prototype.name = null;
RegisterFrozen16.prototype.type = null;
RegisterFrozen16.prototype.inspect = function() {
    return this.name;
};
var Register16 = Register[16] = exports.Register16 = function Register16(name) {
    if(!(this instanceof Register16))
        return new Register16(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen16(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register16.prototype = new Unknown(16);
Register16.prototype.constructor = Register16;
Register16.prototype.name = '<16>';
Register16.prototype.nthValue = 0;
Register16.prototype.value = null;
Register16.prototype.lvalue = null;
Object.defineProperties(Register16.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register16.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen32(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen32.prototype = new Unknown(32);
RegisterFrozen32.prototype.constructor = RegisterFrozen32;
RegisterFrozen32.prototype.name = null;
RegisterFrozen32.prototype.type = null;
RegisterFrozen32.prototype.inspect = function() {
    return this.name;
};
var Register32 = Register[32] = exports.Register32 = function Register32(name) {
    if(!(this instanceof Register32))
        return new Register32(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen32(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register32.prototype = new Unknown(32);
Register32.prototype.constructor = Register32;
Register32.prototype.name = '<32>';
Register32.prototype.nthValue = 0;
Register32.prototype.value = null;
Register32.prototype.lvalue = null;
Object.defineProperties(Register32.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register32.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen64(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen64.prototype = new Unknown(64);
RegisterFrozen64.prototype.constructor = RegisterFrozen64;
RegisterFrozen64.prototype.name = null;
RegisterFrozen64.prototype.type = null;
RegisterFrozen64.prototype.inspect = function() {
    return this.name;
};
var Register64 = Register[64] = exports.Register64 = function Register64(name) {
    if(!(this instanceof Register64))
        return new Register64(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen64(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register64.prototype = new Unknown(64);
Register64.prototype.constructor = Register64;
Register64.prototype.name = '<64>';
Register64.prototype.nthValue = 0;
Register64.prototype.value = null;
Register64.prototype.lvalue = null;
Object.defineProperties(Register64.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register64.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen80(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen80.prototype = new Unknown(80);
RegisterFrozen80.prototype.constructor = RegisterFrozen80;
RegisterFrozen80.prototype.name = null;
RegisterFrozen80.prototype.type = null;
RegisterFrozen80.prototype.inspect = function() {
    return this.name;
};
var Register80 = Register[80] = exports.Register80 = function Register80(name) {
    if(!(this instanceof Register80))
        return new Register80(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen80(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register80.prototype = new Unknown(80);
Register80.prototype.constructor = Register80;
Register80.prototype.name = '<80>';
Register80.prototype.nthValue = 0;
Register80.prototype.value = null;
Register80.prototype.lvalue = null;
Object.defineProperties(Register80.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register80.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen128(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen128.prototype = new Unknown(128);
RegisterFrozen128.prototype.constructor = RegisterFrozen128;
RegisterFrozen128.prototype.name = null;
RegisterFrozen128.prototype.type = null;
RegisterFrozen128.prototype.inspect = function() {
    return this.name;
};
var Register128 = Register[128] = exports.Register128 = function Register128(name) {
    if(!(this instanceof Register128))
        return new Register128(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen128(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register128.prototype = new Unknown(128);
Register128.prototype.constructor = Register128;
Register128.prototype.name = '<128>';
Register128.prototype.nthValue = 0;
Register128.prototype.value = null;
Register128.prototype.lvalue = null;
Object.defineProperties(Register128.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register128.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
function RegisterFrozen256(name, type) {
    this.name = name;
    this.type = type;
}
RegisterFrozen256.prototype = new Unknown(256);
RegisterFrozen256.prototype.constructor = RegisterFrozen256;
RegisterFrozen256.prototype.name = null;
RegisterFrozen256.prototype.type = null;
RegisterFrozen256.prototype.inspect = function() {
    return this.name;
};
var Register256 = Register[256] = exports.Register256 = function Register256(name) {
    if(!(this instanceof Register256))
        return new Register256(name);
    var self = this;
    if(name !== undefined)
        this.name = name;
    else
        name = this.name;
    this.lvalueBase = function() {};
    this.lvalueBase.prototype = {
        freeze: function() {
            self.value = new RegisterFrozen256(name + (self.nthValue++).toSubString(), self.type);
        },
        get value() {
            return self.value;
        },
        set value(v) {
            self.value = v;
        },
        inspect: function() {
            return name /*+ (self.nthValue ? self.nthValue.toSubString() : '')*/;
        }
    };
}
Register256.prototype = new Unknown(256);
Register256.prototype.constructor = Register256;
Register256.prototype.name = '<256>';
Register256.prototype.nthValue = 0;
Register256.prototype.value = null;
Register256.prototype.lvalue = null;
Object.defineProperties(Register256.prototype, {
    lvalue: {
        get: function() {
            var lvalue = new this.lvalueBase, name = this.name + (this.nthValue ? this.nthValue.toSubString() : '');
            lvalue.inspect = function inspect() {
                return name;
            };
            return lvalue;
        }
    }
});
Register256.prototype.inspect = function() {
    return /*typeof this.name === 'string' ?*/ this.name /*: '(R)'+inspect(this.name)*/;
};
var Mem = exports.Mem = {};
Mem.read = function(address, bits) {
    if(/*process.env.DEBUG_MEM*/false)
        console.error('Non-implemented Mem read ['+inspect(address)+']'+bits);
};
Mem.write = function(address, bits, value) {
    if(/*process.env.DEBUG_MEM*/false)
        console.error('Non-implemented Mem write ['+inspect(address)+']'+bits+' = '+inspect(value));
};
var Mem1 = Mem[1] = exports.Mem1 = function Mem1(addr) {
    if(!(this instanceof Mem1))
        return new Mem1(addr);
    this.addr = addr;
};
Mem1.prototype = new Unknown(1);
Mem1.prototype.constructor = Mem1;
Mem1.prototype.fn = 'Mem';
Mem1.prototype.addr = null;
Object.defineProperties(Mem1.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem1(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 1);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem1(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 1, v);
        }
    }
});
Mem1.prototype.inspect = function() {
    return '['+inspect(this.addr)+']1';
};

var Mem8 = Mem[8] = exports.Mem8 = function Mem8(addr) {
    if(!(this instanceof Mem8))
        return new Mem8(addr);
    this.addr = addr;
};
Mem8.prototype = new Unknown(8);
Mem8.prototype.constructor = Mem8;
Mem8.prototype.fn = 'Mem';
Mem8.prototype.addr = null;
Object.defineProperties(Mem8.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem8(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 8);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem8(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 8, v);
        }
    }
});
Mem8.prototype.inspect = function() {
    return '['+inspect(this.addr)+']8';
};

var Mem16 = Mem[16] = exports.Mem16 = function Mem16(addr) {
    if(!(this instanceof Mem16))
        return new Mem16(addr);
    this.addr = addr;
};
Mem16.prototype = new Unknown(16);
Mem16.prototype.constructor = Mem16;
Mem16.prototype.fn = 'Mem';
Mem16.prototype.addr = null;
Object.defineProperties(Mem16.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem16(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 16);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem16(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 16, v);
        }
    }
});
Mem16.prototype.inspect = function() {
    return '['+inspect(this.addr)+']16';
};

var Mem32 = Mem[32] = exports.Mem32 = function Mem32(addr) {
    if(!(this instanceof Mem32))
        return new Mem32(addr);
    this.addr = addr;
};
Mem32.prototype = new Unknown(32);
Mem32.prototype.constructor = Mem32;
Mem32.prototype.fn = 'Mem';
Mem32.prototype.addr = null;
Object.defineProperties(Mem32.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem32(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 32);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem32(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 32, v);
        }
    }
});
Mem32.prototype.inspect = function() {
    return '['+inspect(this.addr)+']32';
};

var Mem64 = Mem[64] = exports.Mem64 = function Mem64(addr) {
    if(!(this instanceof Mem64))
        return new Mem64(addr);
    this.addr = addr;
};
Mem64.prototype = new Unknown(64);
Mem64.prototype.constructor = Mem64;
Mem64.prototype.fn = 'Mem';
Mem64.prototype.addr = null;
Object.defineProperties(Mem64.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem64(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 64);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem64(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 64, v);
        }
    }
});
Mem64.prototype.inspect = function() {
    return '['+inspect(this.addr)+']64';
};

var Mem80 = Mem[80] = exports.Mem80 = function Mem80(addr) {
    if(!(this instanceof Mem80))
        return new Mem80(addr);
    this.addr = addr;
};
Mem80.prototype = new Unknown(80);
Mem80.prototype.constructor = Mem80;
Mem80.prototype.fn = 'Mem';
Mem80.prototype.addr = null;
Object.defineProperties(Mem80.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem80(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 80);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem80(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 80, v);
        }
    }
});
Mem80.prototype.inspect = function() {
    return '['+inspect(this.addr)+']80';
};

var Mem128 = Mem[128] = exports.Mem128 = function Mem128(addr) {
    if(!(this instanceof Mem128))
        return new Mem128(addr);
    this.addr = addr;
};
Mem128.prototype = new Unknown(128);
Mem128.prototype.constructor = Mem128;
Mem128.prototype.fn = 'Mem';
Mem128.prototype.addr = null;
Object.defineProperties(Mem128.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem128(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 128);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem128(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 128, v);
        }
    }
});
Mem128.prototype.inspect = function() {
    return '['+inspect(this.addr)+']128';
};

var Mem256 = Mem[256] = exports.Mem256 = function Mem256(addr) {
    if(!(this instanceof Mem256))
        return new Mem256(addr);
    this.addr = addr;
};
Mem256.prototype = new Unknown(256);
Mem256.prototype.constructor = Mem256;
Mem256.prototype.fn = 'Mem';
Mem256.prototype.addr = null;
Object.defineProperties(Mem256.prototype, {
    lvalue: {
        get: function() {
            var v = valueof(this.addr);
            if(v !== this.addr) return new Mem256(v);
        }
    },
    value: {
        get: function() {
            var v = valueof(this.addr), m = Mem.read(v, 256);
            if(m !== null && m !== void 0)
                return m;
            if(v !== this.addr) return new Mem256(v);
        },
        set: function(v) {
            return Mem.write(this.addr, 256, v);
        }
    }
});
Mem256.prototype.inspect = function() {
    return '['+inspect(this.addr)+']256';
};

var If = exports.If = function If(cond, then) {
    if(!(this instanceof If))
        return new If(cond, then);
    //if(cond.known && cond.bitsof <= 32) // HACK doesn't work > 32bits.
    //    return cond._A ? then : Nop(); // HACK Nop was null.
    if(!Array.isArray(then)) // HACK allow the old usage of If.
        then = [then];
    else
        then = then.filter(function(x) {return !!x;}); // HACK this could be too slow.
    this.cond = cond;
    this.then = then;
};
If.prototype = {
    constructor: If, fn: 'If',
    get value() {
        var cond = valueof(this.cond);
        if(cond !== this.cond)
            return new If(cond, this.then);
    },
    inspect: function() {
        var s = 'if('+inspect(this.cond)+') ';
        if(this.then.length === 1)
            return s+inspect(this.then[0])+';';
        s += '{';
        for(var i = 0; i < this.then.length; i++)
            s += (i ? '; ' : '')+inspect(this.then[i]);
        return s + '}';
    }
};

var FnCall = exports.FnCall = function FnCall(name) {
    if(!(this instanceof FnCall)) // HACK this can slow things down, use new in generated code.
        return new (FnCall.bind.apply(FnCall, [null].concat([].slice.call(arguments))));
    this.name = name;
    this.args = [].slice.call(arguments, 1);
};
FnCall.prototype = {
    constructor: FnCall, fn: 'FnCall',
    get value() {
        var changes = false, args = [null, this.name];
        for(var i = 0; i < this.args.length; i++)
            if((args[i+2] = valueof(this.args[i])) !== this.args[i])
                changes = true;
        if(changes)
            return new (FnCall.bind.apply(FnCall, args));
    },
    inspect: function() {
        var s = this.name+'(';
        for(var i = 0; i < this.args.length; i++)
            s += (i ? ', ' : '')+inspect(this.args[i]);
        return s+')';
    }
};

var Nop = exports.Nop = FnCall.bind(null, 'Nop');
var Interrupt = exports.Interrupt = FnCall.bind(null, 'Interrupt');

var R = exports.R = [], R1 = [], R8 = [], R16 = [], R32 = [];
Object.defineProperty(R, 'byName', {value: {}});
R.push(R.byName.SP = R8[1] = new Register8('SP'));
R.push(R.byName.DPTR = R16[2] = new Register16('DPTR'));
R.push(R.byName.DPL = R8[2] = new Register8('DPL'));
R.push(R.byName.DPH = R8[3] = new Register8('DPH'));
R.push(R.byName.A = R8[96] = new Register8('A'));
R.push(R.byName.B = R8[112] = new Register8('B'));
R.push(R.byName.SFR_00 = R8[0] = new Register8('SFR_00'));
R.push(R.byName.SFR_04 = R8[4] = new Register8('SFR_04'));
R.push(R.byName.SFR_05 = R8[5] = new Register8('SFR_05'));
R.push(R.byName.SFR_06 = R8[6] = new Register8('SFR_06'));
R.push(R.byName.SFR_07 = R8[7] = new Register8('SFR_07'));
R.push(R.byName.SFR_08 = R8[8] = new Register8('SFR_08'));
R.push(R.byName.SFR_09 = R8[9] = new Register8('SFR_09'));
R.push(R.byName.SFR_0A = R8[10] = new Register8('SFR_0A'));
R.push(R.byName.SFR_0B = R8[11] = new Register8('SFR_0B'));
R.push(R.byName.SFR_0C = R8[12] = new Register8('SFR_0C'));
R.push(R.byName.SFR_0D = R8[13] = new Register8('SFR_0D'));
R.push(R.byName.SFR_0E = R8[14] = new Register8('SFR_0E'));
R.push(R.byName.SFR_0F = R8[15] = new Register8('SFR_0F'));
R.push(R.byName.SFR_10 = R8[16] = new Register8('SFR_10'));
R.push(R.byName.SFR_11 = R8[17] = new Register8('SFR_11'));
R.push(R.byName.SFR_12 = R8[18] = new Register8('SFR_12'));
R.push(R.byName.SFR_13 = R8[19] = new Register8('SFR_13'));
R.push(R.byName.SFR_14 = R8[20] = new Register8('SFR_14'));
R.push(R.byName.SFR_15 = R8[21] = new Register8('SFR_15'));
R.push(R.byName.SFR_16 = R8[22] = new Register8('SFR_16'));
R.push(R.byName.SFR_17 = R8[23] = new Register8('SFR_17'));
R.push(R.byName.SFR_18 = R8[24] = new Register8('SFR_18'));
R.push(R.byName.SFR_19 = R8[25] = new Register8('SFR_19'));
R.push(R.byName.SFR_1A = R8[26] = new Register8('SFR_1A'));
R.push(R.byName.SFR_1B = R8[27] = new Register8('SFR_1B'));
R.push(R.byName.SFR_1C = R8[28] = new Register8('SFR_1C'));
R.push(R.byName.SFR_1D = R8[29] = new Register8('SFR_1D'));
R.push(R.byName.SFR_1E = R8[30] = new Register8('SFR_1E'));
R.push(R.byName.SFR_1F = R8[31] = new Register8('SFR_1F'));
R.push(R.byName.SFR_20 = R8[32] = new Register8('SFR_20'));
R.push(R.byName.SFR_21 = R8[33] = new Register8('SFR_21'));
R.push(R.byName.SFR_22 = R8[34] = new Register8('SFR_22'));
R.push(R.byName.SFR_23 = R8[35] = new Register8('SFR_23'));
R.push(R.byName.SFR_24 = R8[36] = new Register8('SFR_24'));
R.push(R.byName.SFR_25 = R8[37] = new Register8('SFR_25'));
R.push(R.byName.SFR_26 = R8[38] = new Register8('SFR_26'));
R.push(R.byName.SFR_27 = R8[39] = new Register8('SFR_27'));
R.push(R.byName.SFR_28 = R8[40] = new Register8('SFR_28'));
R.push(R.byName.SFR_29 = R8[41] = new Register8('SFR_29'));
R.push(R.byName.SFR_2A = R8[42] = new Register8('SFR_2A'));
R.push(R.byName.SFR_2B = R8[43] = new Register8('SFR_2B'));
R.push(R.byName.SFR_2C = R8[44] = new Register8('SFR_2C'));
R.push(R.byName.SFR_2D = R8[45] = new Register8('SFR_2D'));
R.push(R.byName.SFR_2E = R8[46] = new Register8('SFR_2E'));
R.push(R.byName.SFR_2F = R8[47] = new Register8('SFR_2F'));
R.push(R.byName.SFR_30 = R8[48] = new Register8('SFR_30'));
R.push(R.byName.SFR_31 = R8[49] = new Register8('SFR_31'));
R.push(R.byName.SFR_32 = R8[50] = new Register8('SFR_32'));
R.push(R.byName.SFR_33 = R8[51] = new Register8('SFR_33'));
R.push(R.byName.SFR_34 = R8[52] = new Register8('SFR_34'));
R.push(R.byName.SFR_35 = R8[53] = new Register8('SFR_35'));
R.push(R.byName.SFR_36 = R8[54] = new Register8('SFR_36'));
R.push(R.byName.SFR_37 = R8[55] = new Register8('SFR_37'));
R.push(R.byName.SFR_38 = R8[56] = new Register8('SFR_38'));
R.push(R.byName.SFR_39 = R8[57] = new Register8('SFR_39'));
R.push(R.byName.SFR_3A = R8[58] = new Register8('SFR_3A'));
R.push(R.byName.SFR_3B = R8[59] = new Register8('SFR_3B'));
R.push(R.byName.SFR_3C = R8[60] = new Register8('SFR_3C'));
R.push(R.byName.SFR_3D = R8[61] = new Register8('SFR_3D'));
R.push(R.byName.SFR_3E = R8[62] = new Register8('SFR_3E'));
R.push(R.byName.SFR_3F = R8[63] = new Register8('SFR_3F'));
R.push(R.byName.SFR_40 = R8[64] = new Register8('SFR_40'));
R.push(R.byName.SFR_41 = R8[65] = new Register8('SFR_41'));
R.push(R.byName.SFR_42 = R8[66] = new Register8('SFR_42'));
R.push(R.byName.SFR_43 = R8[67] = new Register8('SFR_43'));
R.push(R.byName.SFR_44 = R8[68] = new Register8('SFR_44'));
R.push(R.byName.SFR_45 = R8[69] = new Register8('SFR_45'));
R.push(R.byName.SFR_46 = R8[70] = new Register8('SFR_46'));
R.push(R.byName.SFR_47 = R8[71] = new Register8('SFR_47'));
R.push(R.byName.SFR_48 = R8[72] = new Register8('SFR_48'));
R.push(R.byName.SFR_49 = R8[73] = new Register8('SFR_49'));
R.push(R.byName.SFR_4A = R8[74] = new Register8('SFR_4A'));
R.push(R.byName.SFR_4B = R8[75] = new Register8('SFR_4B'));
R.push(R.byName.SFR_4C = R8[76] = new Register8('SFR_4C'));
R.push(R.byName.SFR_4D = R8[77] = new Register8('SFR_4D'));
R.push(R.byName.SFR_4E = R8[78] = new Register8('SFR_4E'));
R.push(R.byName.SFR_4F = R8[79] = new Register8('SFR_4F'));
R.push(R.byName.SFR_50 = R8[80] = new Register8('SFR_50'));
R.push(R.byName.SFR_51 = R8[81] = new Register8('SFR_51'));
R.push(R.byName.SFR_52 = R8[82] = new Register8('SFR_52'));
R.push(R.byName.SFR_53 = R8[83] = new Register8('SFR_53'));
R.push(R.byName.SFR_54 = R8[84] = new Register8('SFR_54'));
R.push(R.byName.SFR_55 = R8[85] = new Register8('SFR_55'));
R.push(R.byName.SFR_56 = R8[86] = new Register8('SFR_56'));
R.push(R.byName.SFR_57 = R8[87] = new Register8('SFR_57'));
R.push(R.byName.SFR_58 = R8[88] = new Register8('SFR_58'));
R.push(R.byName.SFR_59 = R8[89] = new Register8('SFR_59'));
R.push(R.byName.SFR_5A = R8[90] = new Register8('SFR_5A'));
R.push(R.byName.SFR_5B = R8[91] = new Register8('SFR_5B'));
R.push(R.byName.SFR_5C = R8[92] = new Register8('SFR_5C'));
R.push(R.byName.SFR_5D = R8[93] = new Register8('SFR_5D'));
R.push(R.byName.SFR_5E = R8[94] = new Register8('SFR_5E'));
R.push(R.byName.SFR_5F = R8[95] = new Register8('SFR_5F'));
R.push(R.byName.SFR_61 = R8[97] = new Register8('SFR_61'));
R.push(R.byName.SFR_62 = R8[98] = new Register8('SFR_62'));
R.push(R.byName.SFR_63 = R8[99] = new Register8('SFR_63'));
R.push(R.byName.SFR_64 = R8[100] = new Register8('SFR_64'));
R.push(R.byName.SFR_65 = R8[101] = new Register8('SFR_65'));
R.push(R.byName.SFR_66 = R8[102] = new Register8('SFR_66'));
R.push(R.byName.SFR_67 = R8[103] = new Register8('SFR_67'));
R.push(R.byName.SFR_68 = R8[104] = new Register8('SFR_68'));
R.push(R.byName.SFR_69 = R8[105] = new Register8('SFR_69'));
R.push(R.byName.SFR_6A = R8[106] = new Register8('SFR_6A'));
R.push(R.byName.SFR_6B = R8[107] = new Register8('SFR_6B'));
R.push(R.byName.SFR_6C = R8[108] = new Register8('SFR_6C'));
R.push(R.byName.SFR_6D = R8[109] = new Register8('SFR_6D'));
R.push(R.byName.SFR_6E = R8[110] = new Register8('SFR_6E'));
R.push(R.byName.SFR_6F = R8[111] = new Register8('SFR_6F'));
R.push(R.byName.SFR_71 = R8[113] = new Register8('SFR_71'));
R.push(R.byName.SFR_72 = R8[114] = new Register8('SFR_72'));
R.push(R.byName.SFR_73 = R8[115] = new Register8('SFR_73'));
R.push(R.byName.SFR_74 = R8[116] = new Register8('SFR_74'));
R.push(R.byName.SFR_75 = R8[117] = new Register8('SFR_75'));
R.push(R.byName.SFR_76 = R8[118] = new Register8('SFR_76'));
R.push(R.byName.SFR_77 = R8[119] = new Register8('SFR_77'));
R.push(R.byName.SFR_78 = R8[120] = new Register8('SFR_78'));
R.push(R.byName.SFR_79 = R8[121] = new Register8('SFR_79'));
R.push(R.byName.SFR_7A = R8[122] = new Register8('SFR_7A'));
R.push(R.byName.SFR_7B = R8[123] = new Register8('SFR_7B'));
R.push(R.byName.SFR_7C = R8[124] = new Register8('SFR_7C'));
R.push(R.byName.SFR_7D = R8[125] = new Register8('SFR_7D'));
R.push(R.byName.SFR_7E = R8[126] = new Register8('SFR_7E'));
R.push(R.byName.SFR_7F = R8[127] = new Register8('SFR_7F'));
R.push(R.byName.PC = R32[0] = new Register32('PC'));
R.push(R.byName.CF = R1[0] = new Register1('CF'));
exports.dis = function _8051dis(b, i) {
    var $0, $1, $2, $3;

    if((b[i] & 0xff) === 0x85)
    switch(((((((b[i+1] & 128) & 0xffff) >>> 7) & 0xffff) | ((b[i+2] << 1) & 0xffff)) & 0xffff) & 0x101) {
        case 0x0: return [3, new Mov(new Mem8(new i8(new u8(b[i+1] & 127))), new Mem8(new i8(new u8(b[i+2] & 127))))];
        case 0x1: return [3, new Mov(R8[((((b[i+1] & 127) & 0xff)) & 0xff)], new Mem8(new i8(new u8(b[i+2] & 127))))];
        case 0x100: return [3, new Mov(new Mem8(new i8(new u8(b[i+1] & 127))), R8[((((b[i+2] & 127) & 0xff)) & 0xff)])];
        case 0x101: return [3, new Mov(R8[((((b[i+1] & 127) & 0xff)) & 0xff)], R8[((((b[i+2] & 127) & 0xff)) & 0xff)])];
    }

    if((((((b[i] & 8) & 0xff) >>> 3) & 0xff) & 0x1) === 0x0)
    switch(((b[i] | ((b[i+1] << 8) & 0xffff)) & 0xffff) & 0x80f7) {
        case 0x5: return [2, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Add($0, new i8(1))))];
        case 0x10: return [3, new Mov(($2 = (new Register1)), (new Not((new Eq((new And(new u8(1 << (($1 = ((((b[i+1] & 7) & 0xff)) << 24 >> 24)) & 0x7)), ($0 = new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32))))), new i8(0)))))), new Mov($0, (new And(new u8(~((1 << ($1 & 0x7)) & 0xff)), $0))), new If($2, [new Mov(($3 = R32[0]), (new Add($3, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x15: return [2, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Add($0, new i8(-1))))];
        case 0x20: return [3, new If((new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x25: return [2, new Mov(($0 = R8[96]), (new Add($0, new Mem8(new i8(new u8(b[i+1] & 127))))))];
        case 0x30: return [3, new If((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x35: return [2, new Mov(($0 = R8[96]), (new Add((new Add($0, new Mem8(new i8(new u8(b[i+1] & 127))))), R1[0])))];
        case 0x42: return [2, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Or($0, R8[96])))];
        case 0x43: return [3, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Or($0, new i8(new u8(b[i+2])))))];
        case 0x45: return [2, new Mov(($0 = R8[96]), (new Or($0, new Mem8(new i8(new u8(b[i+1] & 127))))))];
        case 0x52: return [2, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new And($0, R8[96])))];
        case 0x53: return [3, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new And($0, new i8(new u8(b[i+2])))))];
        case 0x55: return [2, new Mov(($0 = R8[96]), (new And($0, new Mem8(new i8(new u8(b[i+1] & 127))))))];
        case 0x62: return [2, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Xor($0, R8[96])))];
        case 0x63: return [3, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Xor($0, new i8(new u8(b[i+2])))))];
        case 0x65: return [2, new Mov(($0 = R8[96]), (new Xor($0, new Mem8(new i8(new u8(b[i+1] & 127))))))];
        case 0x72: return [2, new Mov(($0 = R1[0]), (new Or((new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))))), $0)))];
        case 0x75: return [3, new Mov(new Mem8(new i8(new u8(b[i+1] & 127))), new i8(new u8(b[i+2])))];
        case 0x82: return [2, new Mov(($0 = R1[0]), (new And((new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))))), $0)))];
        case 0x86: return [2, new Mov(new Mem8(new Mem8(new i8(0))), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0x87: return [2, new Mov(new Mem8(new Mem8(new i8(1))), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0x92: return [2, new Mov(($0 = new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32))), (new Or((new Shl(new u8(R1[0]), new i8(new u8(b[i+1] & 7)))), $0)))];
        case 0x95: return [2, new Mov(($0 = R1[0]), (new Not((new Lt(new u8(($2 = (new Add(($1 = R8[96]), (new Neg(new Mem8(new i8(new u8(b[i+1] & 127))))))))), new u8($0)))))), new Mov($1, (new Add($2, (new Neg(new i8($0))))))];
        case 0xa0: return [2, new Mov(($0 = R1[0]), (new Or((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))), $0)))];
        case 0xa2: return [2, new Mov(R1[0], (new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))))))];
        case 0xa6: return [2, new Mov(new Mem8(new Mem8(new i8(0))), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0xa7: return [2, new Mov(new Mem8(new Mem8(new i8(1))), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0xb0: return [2, new Mov(($0 = R1[0]), (new And((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32)))), new i8(0))), $0)))];
        case 0xb2: return [2, new Mov(($0 = new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32))), (new Xor(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), $0)))];
        case 0xb5: return [3, new If((new Not((new Eq(R8[96], new Mem8(new i8(new u8(b[i+1] & 127))))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0xc0: return [2, new Mov(($0 = R8[1]), (new Add($0, new i8(1)))), new Mov(new Mem8($0), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0xc2: return [2, new Mov(($0 = new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32))), (new And(new u8(~((1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)) & 0xff)), $0)))];
        case 0xc5: return [2, new Mov(($2 = (new Register8)), ($0 = new Mem8(new i8(new u8(b[i+1] & 127))))), new Mov($0, ($1 = R8[96])), new Mov($1, $2)];
        case 0xd0: return [2, new Mov(($0 = R8[1]), (new Add($0, new i8(-1)))), new Mov(new Mem8(new i8(new u8(b[i+1] & 127))), new Mem8($0))];
        case 0xd2: return [2, new Mov(($0 = new Mem8(new i8(((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) + 32))), (new Or(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), $0)))];
        case 0xd5: return [3, new Mov(($0 = new Mem8(new i8(new u8(b[i+1] & 127)))), (new Add($0, new i8(-1)))), new If((new Not((new Eq($0, new i8(0))))), [new Mov(($1 = R32[0]), (new Add($1, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0xe5: return [2, new Mov(R8[96], new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0xf5: return [2, new Mov(new Mem8(new i8(new u8(b[i+1] & 127))), R8[96])];
        case 0x8005: return [2, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Add($0, new i8(1))))];
        case 0x8010: return [3, new Mov(($2 = (new Register1)), (new Not((new Eq((new And(new u8(1 << (($1 = ((((b[i+1] & 7) & 0xff)) << 24 >> 24)) & 0x7)), ($0 = R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)]))), new i8(0)))))), new Mov($0, (new And(new u8(~((1 << ($1 & 0x7)) & 0xff)), $0))), new If($2, [new Mov(($3 = R32[0]), (new Add($3, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x8015: return [2, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Add($0, new i8(-1))))];
        case 0x8020: return [3, new If((new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x8025: return [2, new Mov(($0 = R8[96]), (new Add($0, R8[((((b[i+1] & 127) & 0xff)) & 0xff)])))];
        case 0x8030: return [3, new If((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x8035: return [2, new Mov(($0 = R8[96]), (new Add((new Add($0, R8[((((b[i+1] & 127) & 0xff)) & 0xff)])), R1[0])))];
        case 0x8042: return [2, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Or($0, R8[96])))];
        case 0x8043: return [3, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Or($0, new i8(new u8(b[i+2])))))];
        case 0x8045: return [2, new Mov(($0 = R8[96]), (new Or($0, R8[((((b[i+1] & 127) & 0xff)) & 0xff)])))];
        case 0x8052: return [2, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new And($0, R8[96])))];
        case 0x8053: return [3, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new And($0, new i8(new u8(b[i+2])))))];
        case 0x8055: return [2, new Mov(($0 = R8[96]), (new And($0, R8[((((b[i+1] & 127) & 0xff)) & 0xff)])))];
        case 0x8062: return [2, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Xor($0, R8[96])))];
        case 0x8063: return [3, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Xor($0, new i8(new u8(b[i+2])))))];
        case 0x8065: return [2, new Mov(($0 = R8[96]), (new Xor($0, R8[((((b[i+1] & 127) & 0xff)) & 0xff)])))];
        case 0x8072: return [2, new Mov(($0 = R1[0]), (new Or((new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))))), $0)))];
        case 0x8075: return [3, new Mov(R8[((((b[i+1] & 127) & 0xff)) & 0xff)], new i8(new u8(b[i+2])))];
        case 0x8082: return [2, new Mov(($0 = R1[0]), (new And((new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))))), $0)))];
        case 0x8086: return [2, new Mov(new Mem8(new Mem8(new i8(0))), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x8087: return [2, new Mov(new Mem8(new Mem8(new i8(1))), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x8092: return [2, new Mov(($0 = R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)]), (new Or((new Shl(new u8(R1[0]), new i8(new u8(b[i+1] & 7)))), $0)))];
        case 0x8095: return [2, new Mov(($0 = R1[0]), (new Not((new Lt(new u8(($2 = (new Add(($1 = R8[96]), (new Neg(R8[((((b[i+1] & 127) & 0xff)) & 0xff)])))))), new u8($0)))))), new Mov($1, (new Add($2, (new Neg(new i8($0))))))];
        case 0x80a0: return [2, new Mov(($0 = R1[0]), (new Or((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))), $0)))];
        case 0x80a2: return [2, new Mov(R1[0], (new Not((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))))))];
        case 0x80a6: return [2, new Mov(new Mem8(new Mem8(new i8(0))), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x80a7: return [2, new Mov(new Mem8(new Mem8(new i8(1))), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x80b0: return [2, new Mov(($0 = R1[0]), (new And((new Eq((new And(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)])), new i8(0))), $0)))];
        case 0x80b2: return [2, new Mov(($0 = R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)]), (new Xor(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), $0)))];
        case 0x80b5: return [3, new If((new Not((new Eq(R8[96], R8[((((b[i+1] & 127) & 0xff)) & 0xff)])))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x80c0: return [2, new Mov(($0 = R8[1]), (new Add($0, new i8(1)))), new Mov(new Mem8($0), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x80c2: return [2, new Mov(($0 = R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)]), (new And(new u8(~((1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)) & 0xff)), $0)))];
        case 0x80c5: return [2, new Mov(($2 = (new Register8)), ($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)])), new Mov($0, ($1 = R8[96])), new Mov($1, $2)];
        case 0x80d0: return [2, new Mov(($0 = R8[1]), (new Add($0, new i8(-1)))), new Mov(R8[((((b[i+1] & 127) & 0xff)) & 0xff)], new Mem8($0))];
        case 0x80d2: return [2, new Mov(($0 = R8[((((((((((b[i+1] & 120) & 0xff) >>> 3) & 0xff)) << 24 >> 24) << 3) << 24 >> 24)) & 0xff)]), (new Or(new u8(1 << (((((b[i+1] & 7) & 0xff)) << 24 >> 24) & 0x7)), $0)))];
        case 0x80d5: return [3, new Mov(($0 = R8[((((b[i+1] & 127) & 0xff)) & 0xff)]), (new Add($0, new i8(-1)))), new If((new Not((new Eq($0, new i8(0))))), [new Mov(($1 = R32[0]), (new Add($1, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0x80e5: return [2, new Mov(R8[96], R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x80f5: return [2, new Mov(R8[((((b[i+1] & 127) & 0xff)) & 0xff)], R8[96])];
    }

    if((((((b[i] & 248) & 0xff) >>> 3) & 0xff) & 0x1b) === 0x11)
    switch(((((((b[i] & 224) & 0xffff) >>> 5) & 0xffff) | ((b[i+1] << 3) & 0xffff)) & 0xffff) & 0x401) {
        case 0x0: return [2, new Mov(new Mem8(new i8(new u8(b[i] & 7))), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0x1: return [2, new Mov(new Mem8(new i8(new u8(b[i] & 7))), new Mem8(new i8(new u8(b[i+1] & 127))))];
        case 0x400: return [2, new Mov(new Mem8(new i8(new u8(b[i] & 7))), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
        case 0x401: return [2, new Mov(new Mem8(new i8(new u8(b[i] & 7))), R8[((((b[i+1] & 127) & 0xff)) & 0xff)])];
    }

    if((((((b[i] & 8) & 0xff) >>> 3) & 0xff) & 0x1) === 0x0)
    switch(b[i] & 0xf7) {
        case 0x0: return [1, new FnCall('Nop')];
        case 0x2: return [3, new Mov(R32[0], new i32(((((b[i+2] | ((b[i+1] << 8) & 0xffff)) & 0xffff)) >> 0) + exports.PCbase))];
        case 0x3: return [1, new Mov(($0 = R8[96]), (new Or((new Shr($0, new u8(1))), (new Shl($0, new u8(7))))))];
        case 0x4: return [1, new Mov(($0 = R8[96]), (new Add($0, new i8(1))))];
        case 0x6: return [1, new Mov(($0 = new Mem8(new Mem8(new i8(0)))), (new Add($0, new i8(1))))];
        case 0x7: return [1, new Mov(($0 = new Mem8(new Mem8(new i8(1)))), (new Add($0, new i8(1))))];
        case 0x12: return [3, new Mov(($0 = R8[1]), (new Add($0, new i8(4)))), new Mov(new Mem32($0), (new Add(($1 = R32[0]), new i8(3)))), new Mov($1, new i32(((((b[i+2] | ((b[i+1] << 8) & 0xffff)) & 0xffff)) >> 0) + exports.PCbase))];
        case 0x13: return [1, new Mov(($0 = R8[96]), (new Or((new Shr(new u8($0), new u8(1))), (new Shl(new u8(R1[0]), new u8(7))))))];
        case 0x14: return [1, new Mov(($0 = R8[96]), (new Add($0, new i8(-1))))];
        case 0x16: return [1, new Mov(($0 = new Mem8(new Mem8(new i8(0)))), (new Add($0, new i8(-1))))];
        case 0x17: return [1, new Mov(($0 = new Mem8(new Mem8(new i8(1)))), (new Add($0, new i8(-1))))];
        case 0x22: return [1, new Mov(R32[0], new Mem32(($0 = R8[1]))), new Mov($0, (new Add($0, new i8(-4))))];
        case 0x23: return [1, new Mov(($0 = R8[96]), (new Or((new Shl($0, new u8(1))), (new Shr($0, new u8(7))))))];
        case 0x24: return [2, new Mov(($0 = R8[96]), (new Add($0, new i8(new u8(b[i+1])))))];
        case 0x26: return [1, new Mov(($0 = R8[96]), (new Add($0, new Mem8(new Mem8(new i8(0))))))];
        case 0x27: return [1, new Mov(($0 = R8[96]), (new Add($0, new Mem8(new Mem8(new i8(1))))))];
        case 0x32: return [1, new FnCall('RETI'), new Mov(R32[0], new Mem32(($0 = R8[1]))), new Mov($0, (new Add($0, new i8(-4))))];
        case 0x33: return [1, new Mov(($0 = R8[96]), (new Or(new u8(R1[0]), (new Shl($0, new u8(1))))))];
        case 0x34: return [2, new Mov(($0 = R8[96]), (new Add((new Add($0, new i8(new u8(b[i+1])))), R1[0])))];
        case 0x36: return [1, new Mov(($0 = R8[96]), (new Add((new Add($0, new Mem8(new Mem8(new i8(0))))), R1[0])))];
        case 0x37: return [1, new Mov(($0 = R8[96]), (new Add((new Add($0, new Mem8(new Mem8(new i8(1))))), R1[0])))];
        case 0x40: return [2, new If(R1[0], [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+1]) << 24 >> 24) + 2))))])];
        case 0x44: return [2, new Mov(($0 = R8[96]), (new Or($0, new i8(new u8(b[i+1])))))];
        case 0x46: return [1, new Mov(($0 = R8[96]), (new Or($0, new Mem8(new Mem8(new i8(0))))))];
        case 0x47: return [1, new Mov(($0 = R8[96]), (new Or($0, new Mem8(new Mem8(new i8(1))))))];
        case 0x50: return [2, new If((new Not(R1[0])), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+1]) << 24 >> 24) + 2))))])];
        case 0x54: return [2, new Mov(($0 = R8[96]), (new And($0, new i8(new u8(b[i+1])))))];
        case 0x56: return [1, new Mov(($0 = R8[96]), (new And($0, new Mem8(new Mem8(new i8(0))))))];
        case 0x57: return [1, new Mov(($0 = R8[96]), (new And($0, new Mem8(new Mem8(new i8(1))))))];
        case 0x60: return [2, new If((new Eq(R8[96], new i8(0))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+1]) << 24 >> 24) + 2))))])];
        case 0x64: return [2, new Mov(($0 = R8[96]), (new Xor($0, new i8(new u8(b[i+1])))))];
        case 0x66: return [1, new Mov(($0 = R8[96]), (new Xor($0, new Mem8(new Mem8(new i8(0))))))];
        case 0x67: return [1, new Mov(($0 = R8[96]), (new Xor($0, new Mem8(new Mem8(new i8(1))))))];
        case 0x70: return [2, new If((new Not((new Eq(R8[96], new i8(0))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+1]) << 24 >> 24) + 2))))])];
        case 0x73: return [1, new Mov(R32[0], (new Add(new i32((new Add(R16[2], R8[96]))), new i32(exports.PCbase))))];
        case 0x74: return [2, new Mov(R8[96], new i8(new u8(b[i+1])))];
        case 0x76: return [2, new Mov(new Mem8(new Mem8(new i8(0))), new i8(new u8(b[i+1])))];
        case 0x77: return [2, new Mov(new Mem8(new Mem8(new i8(1))), new i8(new u8(b[i+1])))];
        case 0x80: return [2, new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+1]) << 24 >> 24) + 2))))];
        case 0x83: return [1, new Mov(($0 = R8[96]), new Mem8((new Add((new Add((new Add(R32[0], new i8(1))), $0)), new i32(exports.PCbase)))))];
        case 0x84: return [1, new Mov(($0 = R8[96]), (new Div($0, R8[112])))];
        case 0x90: return [3, new Mov(R16[2], new i8(new u16(b[i+2] | ((b[i+1] << 8) & 0xffff))))];
        case 0x93: return [1, new Mov(($0 = R8[96]), new Mem8((new Add(new i32((new Add(R16[2], $0))), new i32(exports.PCbase)))))];
        case 0x94: return [2, new Mov(($0 = R1[0]), (new Not((new Lt(new u8(($2 = (new Add(($1 = R8[96]), new i8(-((b[i+1]) << 24 >> 24)))))), new u8($0)))))), new Mov($1, (new Add($2, (new Neg(new i8($0))))))];
        case 0x96: return [1, new Mov(($0 = R1[0]), (new Not((new Lt(new u8(($2 = (new Add(($1 = R8[96]), (new Neg(new Mem8(new Mem8(new i8(0))))))))), new u8($0)))))), new Mov($1, (new Add($2, (new Neg(new i8($0))))))];
        case 0x97: return [1, new Mov(($0 = R1[0]), (new Not((new Lt(new u8(($2 = (new Add(($1 = R8[96]), (new Neg(new Mem8(new Mem8(new i8(1))))))))), new u8($0)))))), new Mov($1, (new Add($2, (new Neg(new i8($0))))))];
        case 0xa3: return [1, new Mov(($0 = R16[2]), (new Add($0, new i8(1))))];
        case 0xa4: return [1, new Mov(($1 = (new Register16)), (new Mul(new u8(($0 = R8[96])), ($2 = R8[112])))), new Mov($0, $1), new Mov($2, (new Shr($1, new u8(8))))];
        case 0xa5: return [1, new FnCall('Reserved')];
        case 0xb3: return [1, new Mov(($0 = R1[0]), (new Not($0)))];
        case 0xb4: return [3, new If((new Not((new Eq(R8[96], new i8(new u8(b[i+1])))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0xb6: return [3, new If((new Not((new Eq(new Mem8(new Mem8(new i8(0))), new i8(new u8(b[i+1])))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0xb7: return [3, new If((new Not((new Eq(new Mem8(new Mem8(new i8(1))), new i8(new u8(b[i+1])))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0xc3: return [1, new Mov(R1[0], new u1(0))];
        case 0xc4: return [1, new Mov(($0 = R8[96]), (new Or((new Shl(new u8($0), new u8(4))), (new Shr(new u8($0), new u8(4))))))];
        case 0xc6: return [1, new Mov(($2 = (new Register8)), ($0 = new Mem8(new Mem8(new i8(0))))), new Mov($0, ($1 = R8[96])), new Mov($1, $2)];
        case 0xc7: return [1, new Mov(($2 = (new Register8)), ($0 = new Mem8(new Mem8(new i8(1))))), new Mov($0, ($1 = R8[96])), new Mov($1, $2)];
        case 0xd3: return [1, new Mov(R1[0], new u1(1))];
        case 0xd4: return [1, new Mov(($0 = R8[96]), new FnCall('DecimalAdjust', $0, R1[0]))];
        case 0xd6: return [1, new Mov(($2 = (new Register8)), ($0 = new Mem8(new Mem8(new i8(0))))), new Mov($0, (new Or((new And($0, new i8(-16))), (new And(($1 = R8[96]), new i8(15)))))), new Mov($1, (new Or((new And($1, new i8(-16))), (new And($2, new i8(15))))))];
        case 0xd7: return [1, new Mov(($2 = (new Register8)), ($0 = new Mem8(new Mem8(new i8(1))))), new Mov($0, (new Or((new And($0, new i8(-16))), (new And(($1 = R8[96]), new i8(15)))))), new Mov($1, (new Or((new And($1, new i8(-16))), (new And($2, new i8(15))))))];
        case 0xe0: return [1, new Mov(R8[96], new Mem8((new Add(new i32(R16[2]), new i32(917504)))))];
        case 0xe2: return [1, new Mov(R8[96], new Mem8((new Add(new i32(new Mem8(new i8(0))), new i32(917504)))))];
        case 0xe3: return [1, new Mov(R8[96], new Mem8((new Add(new i32(new Mem8(new i8(1))), new i32(917504)))))];
        case 0xe4: return [1, new Mov(R8[96], new i8(0))];
        case 0xe6: return [1, new Mov(R8[96], new Mem8(new Mem8(new i8(0))))];
        case 0xe7: return [1, new Mov(R8[96], new Mem8(new Mem8(new i8(1))))];
        case 0xf0: return [1, new Mov(new Mem8((new Add(new i32(R16[2]), new i32(917504)))), R8[96])];
        case 0xf2: return [1, new Mov(new Mem8((new Add(new i32(new Mem8(new i8(0))), new i32(917504)))), R8[96])];
        case 0xf3: return [1, new Mov(new Mem8((new Add(new i32(new Mem8(new i8(1))), new i32(917504)))), R8[96])];
        case 0xf4: return [1, new Mov(($0 = R8[96]), (new Not($0)))];
        case 0xf6: return [1, new Mov(new Mem8(new Mem8(new i8(0))), R8[96])];
        case 0xf7: return [1, new Mov(new Mem8(new Mem8(new i8(1))), R8[96])];
    }

    if((((((b[i] & 8) & 0xff) >>> 3) & 0xff) & 0x1) === 0x1)
    switch(((((b[i] & 240) & 0xff) >>> 4) & 0xff) & 0xf) {
        case 0x0: return [1, new Mov(($0 = new Mem8(new i8(new u8(b[i] & 7)))), (new Add($0, new i8(1))))];
        case 0x1: return [1, new Mov(($0 = new Mem8(new i8(new u8(b[i] & 7)))), (new Add($0, new i8(-1))))];
        case 0x2: return [1, new Mov(($0 = R8[96]), (new Add($0, new Mem8(new i8(new u8(b[i] & 7))))))];
        case 0x3: return [1, new Mov(($0 = R8[96]), (new Add((new Add($0, new Mem8(new i8(new u8(b[i] & 7))))), R1[0])))];
        case 0x4: return [1, new Mov(($0 = R8[96]), (new Or($0, new Mem8(new i8(new u8(b[i] & 7))))))];
        case 0x5: return [1, new Mov(($0 = R8[96]), (new And($0, new Mem8(new i8(new u8(b[i] & 7))))))];
        case 0x6: return [1, new Mov(($0 = R8[96]), (new Xor($0, new Mem8(new i8(new u8(b[i] & 7))))))];
        case 0x7: return [2, new Mov(new Mem8(new i8(new u8(b[i] & 7))), new i8(new u8(b[i+1])))];
        case 0x9: return [1, new Mov(($0 = R1[0]), (new Not((new Lt(new u8(($2 = (new Add(($1 = R8[96]), (new Neg(new Mem8(new i8(new u8(b[i] & 7))))))))), new u8($0)))))), new Mov($1, (new Add($2, (new Neg(new i8($0))))))];
        case 0xb: return [3, new If((new Not((new Eq(new Mem8(new i8(new u8(b[i] & 7))), new i8(new u8(b[i+1])))))), [new Mov(($0 = R32[0]), (new Add($0, new i8(((b[i+2]) << 24 >> 24) + 3))))])];
        case 0xc: return [1, new Mov(($2 = (new Register8)), ($0 = new Mem8(new i8(new u8(b[i] & 7))))), new Mov($0, ($1 = R8[96])), new Mov($1, $2)];
        case 0xd: return [2, new Mov(($0 = new Mem8(new i8(new u8(b[i] & 7)))), (new Add($0, new i8(-1)))), new If((new Not((new Eq($0, new i8(0))))), [new Mov(($1 = R32[0]), (new Add($1, new i8(((b[i+1]) << 24 >> 24) + 2))))])];
        case 0xe: return [1, new Mov(R8[96], new Mem8(new i8(new u8(b[i] & 7))))];
        case 0xf: return [1, new Mov(new Mem8(new i8(new u8(b[i] & 7))), R8[96])];
    }

    if((((b[i] & 15) & 0xff) & 0xf) === 0x1)
    switch(((((b[i] & 16) & 0xff) >>> 4) & 0xff) & 0x1) {
        case 0x0: return [2, new Mov(($0 = R32[0]), (new Add((new Or((new And((new Add($0, new i8(2))), new i32(63488))), new i32(((((((((b[i] & 224) & 0xff) >>> 5) & 0xff)) >> 0) << 8) >> 0) | ((b[i+1]) >> 0)))), new i32(exports.PCbase))))];
        case 0x1: return [2, new Mov(($0 = R8[1]), (new Add($0, new i8(4)))), new Mov(new Mem32($0), (new Add(($1 = R32[0]), new i8(2)))), new Mov($1, (new Add((new Or((new And((new Add($1, new i8(2))), new i32(63488))), new i32(((((((((b[i] & 224) & 0xff) >>> 5) & 0xff)) >> 0) << 8) >> 0) | ((b[i+1]) >> 0)))), new i32(exports.PCbase))))];
    }

}
exports.PC = R.byName.PC;
exports.SP = R.byName.SP;
exports.returnPC = Mem32(exports.SP); // FIXME proper stack handling, returnPC should be 16-bit.

exports.paddingLength = function(b, i) {
    var l;
    for(l = 0; i < b.length && b[i] === 0x00 /*NOP*/; i++, l++);
    return l;
};
