let lastId = 0;

const newid = (prefix='id') => {
    lastId++;
    return `${prefix}${lastId}`;
}

export default newid;