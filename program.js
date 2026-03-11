var currentForm = 'algebraic';

function showForm() {
    currentForm = document.getElementById('formType').value;
    var isAlg = (currentForm === 'algebraic');

    document.getElementById('lbl-z1-re').firstChild.nodeValue = isAlg ? 'a\u2081 = ' : 'r\u2081 = ';
    document.getElementById('lbl-z1-im').firstChild.nodeValue = isAlg ? 'b\u2081 = ' : '\u03c6\u2081 = ';
    document.getElementById('lbl-z2-re').firstChild.nodeValue = isAlg ? 'a\u2082 = ' : 'r\u2082 = ';
    document.getElementById('lbl-z2-im').firstChild.nodeValue = isAlg ? 'b\u2082 = ' : '\u03c6\u2082 = ';
}

var inputIds = ['z1re', 'z1im', 'z2re', 'z2im'];
for (var i = 0; i < inputIds.length; i++) {
    (function(id) {
        document.getElementById(id).onfocus = function() {
            this.classList.remove('error');
        };
    })(inputIds[i]);
}

document.getElementById('operations').onfocus = function() {
    this.classList.remove('error');
    document.getElementById('ops-label').classList.remove('ops-error');
};

function fmt(x) {
    return parseFloat(x.toFixed(3)).toString();
}

function trigToAlg(r, phi) {
    return { re: r * Math.cos(phi), im: r * Math.sin(phi) };
}

function algToTrig(re, im) {
    return { r: Math.sqrt(re * re + im * im), phi: Math.atan2(im, re) };
}

function fmtAlg(re, im) {
    var a = fmt(re);
    var b = fmt(Math.abs(im));
    if (im >= 0) return a + ' + ' + b + 'i';
    return a + ' - ' + b + 'i';
}

function fmtTrig(r, phi) {
    var phiDeg = fmt(phi * 180 / Math.PI);
    return fmt(r) + '\u00b7(cos ' + phiDeg + '\u00b0 + i\u00b7sin ' + phiDeg + '\u00b0)';
}

function doOp(op, z1, z2) {
    var re, im;

    if (op === 'product') {
        if (currentForm === 'trig') {
            var t1 = algToTrig(z1.re, z1.im);
            var t2 = algToTrig(z2.re, z2.im);
            return fmtTrig(t1.r * t2.r, t1.phi + t2.phi);
        }
        re = z1.re * z2.re - z1.im * z2.im;
        im = z1.re * z2.im + z1.im * z2.re;
        return fmtAlg(re, im);
    }

    if (op === 'quotient') {
        if (z2.re === 0 && z2.im === 0) return 'ошибка: деление на ноль';
        if (currentForm === 'trig') {
            var t1 = algToTrig(z1.re, z1.im);
            var t2 = algToTrig(z2.re, z2.im);
            if (t2.r === 0) return 'ошибка: деление на ноль';
            return fmtTrig(t1.r / t2.r, t1.phi - t2.phi);
        }
        var d = z2.re * z2.re + z2.im * z2.im;
        re = (z1.re * z2.re + z1.im * z2.im) / d;
        im = (z1.im * z2.re - z1.re * z2.im) / d;
        return fmtAlg(re, im);
    }

    if (op === 'sum') {
        re = z1.re + z2.re;
        im = z1.im + z2.im;
        if (currentForm === 'trig') {
            var t = algToTrig(re, im);
            return fmtTrig(t.r, t.phi);
        }
        return fmtAlg(re, im);
    }

    if (op === 'diff') {
        re = z1.re - z2.re;
        im = z1.im - z2.im;
        if (currentForm === 'trig') {
            var t = algToTrig(re, im);
            return fmtTrig(t.r, t.phi);
        }
        return fmtAlg(re, im);
    }
}

var opNames = {
    product: 'произведение',
    quotient: 'частное',
    sum: 'сумма',
    diff: 'разность'
};

function calculate() {
    var hasError = false;

    var v1re = document.getElementById('z1re').value;
    var v1im = document.getElementById('z1im').value;
    var v2re = document.getElementById('z2re').value;
    var v2im = document.getElementById('z2im').value;

    if (v1re === '' || isNaN(Number(v1re))) {
        document.getElementById('z1re').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('z1re').classList.remove('error');
    }

    if (v1im === '' || isNaN(Number(v1im))) {
        document.getElementById('z1im').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('z1im').classList.remove('error');
    }

    var r2invalid = (v2re === '' || isNaN(Number(v2re)));
    if (currentForm === 'trig' && !r2invalid && Number(v2re) <= 0) r2invalid = true;
    if (r2invalid) {
        document.getElementById('z2re').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('z2re').classList.remove('error');
    }

    if (v2im === '' || isNaN(Number(v2im))) {
        document.getElementById('z2im').classList.add('error');
        hasError = true;
    } else {
        document.getElementById('z2im').classList.remove('error');
    }

    var opsEl = document.getElementById('operations');
    var selected = [];
    for (var i = 0; i < opsEl.options.length; i++) {
        if (opsEl.options[i].selected) selected.push(opsEl.options[i].value);
    }
    if (selected.length === 0) {
        opsEl.classList.add('error');
        document.getElementById('ops-label').classList.add('ops-error');
        hasError = true;
    } else {
        opsEl.classList.remove('error');
        document.getElementById('ops-label').classList.remove('ops-error');
    }

    if (hasError) return false;

    var z1, z2;
    if (currentForm === 'algebraic') {
        z1 = { re: Number(v1re), im: Number(v1im) };
        z2 = { re: Number(v2re), im: Number(v2im) };
    } else {
        z1 = trigToAlg(Number(v1re), Number(v1im));
        z2 = trigToAlg(Number(v2re), Number(v2im));
    }

    var output = document.getElementById('output');
    output.innerHTML = '<p><b>Результат:</b></p>';

    for (var i = 0; i < selected.length; i++) {
        var res = doOp(selected[i], z1, z2);
        var p = document.createElement('p');
        p.innerHTML = opNames[selected[i]] + ' = ' + res;
        output.appendChild(p);
    }

    return true;
}

function clearData() {
    document.getElementById('z1re').value = '';
    document.getElementById('z1im').value = '';
    document.getElementById('z2re').value = '';
    document.getElementById('z2im').value = '';

    document.getElementById('z1re').classList.remove('error');
    document.getElementById('z1im').classList.remove('error');
    document.getElementById('z2re').classList.remove('error');
    document.getElementById('z2im').classList.remove('error');

    var opsEl = document.getElementById('operations');
    for (var i = 0; i < opsEl.options.length; i++) {
        opsEl.options[i].selected = false;
    }
    opsEl.classList.remove('error');
    document.getElementById('ops-label').classList.remove('ops-error');

    document.getElementById('output').innerHTML = '';
}
