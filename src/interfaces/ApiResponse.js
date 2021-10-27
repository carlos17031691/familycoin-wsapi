const success= (data) => {
    return {
        result: 'OK',
        data: data,
        error: null
    }
}
const error = (error) => {
    return {
        result: 'ERROR',
        data: null,
        error: error
    }
}

exports.success = success;
exports.error = error