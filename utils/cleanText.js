const clean = (text) => {
    text = text.toLowerCase();
    const BAD_SYMBOLS = /[^a-zA-Z #_]/g;
    // const ADD_SPACE = /[/(){}\[\]\|@,;]/g;
    // text = text.replace(ADD_SPACE, ' ');
    text = text.replace(BAD_SYMBOLS, '');
    // text = text.replace(/\b...\b/g, '');
    // text = text.replace(/\b..\b/g, '');
    // text = text.replace(/\b.\b/g, '');
    // text = text.match(/[a-z]*/g);
    // console.log(text);
    return text;
}

module.exports = clean;