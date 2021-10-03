function randomInt(min, max, type) {
    if (type == 'inclusive') {
        return inclusive(min, max);
    }
    else {
        return exclusive(min, max);
    }
}

function inclusive(num1, num2) {
    const min = Math.floor(num1);
    const max = Math.ceil(num2);

    const random = Math.random() * (max - min + 1) + min;

    return Math.floor(random)
}

function exclusive(num1, num2) {
    const min = Math.floor(num1);
    const max = Math.ceil(num2);

    const random = Math.random() * (max - min) + min;
    
    return Math.floor(random);
}

module.exports = randomInt;