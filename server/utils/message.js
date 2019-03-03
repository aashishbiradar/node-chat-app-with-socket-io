var generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt : Date.now()
    }
}

var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url: `https://www.google.co.in/maps?q=${latitude},${longitude}`,
        createdAt : Date.now()
    }
}

module.exports = {generateMessage,generateLocationMessage};