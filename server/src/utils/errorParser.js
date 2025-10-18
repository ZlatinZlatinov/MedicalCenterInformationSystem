function errorParser(eror) {
    if (Array.isArray(eror)) {
        return eror.map((e) => e.msg).join('\n');
    } else if (eror.name == 'validationError') {
        return Object.values(eror.errors).map(v => v.message).join('\n');
    } else {
        return eror.message;
    }
} 

module.exports = {
    errorParser
}