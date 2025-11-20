// models/user.js
// پایگاه داده موقت ما
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let nextId = 3;

// در اینجا ما توابعی را export می‌کنیم که عملیات CRUD را روی آرایه انجام می‌دهند

module.exports = {
    getAll: () => {
        return users;
    },

    getById: (id) => {
        return users.find(u => u.id === id);
    },

    create: (data) => {
        const newUser = { id: nextId++, ...data };
        users.push(newUser);
        return newUser;
    },

    update: (id, data) => {
        const user = users.find(u => u.id === id);
        if (!user) return null;
        
        user.name = data.name || user.name;
        user.email = data.email || user.email;
        return user;
    },

    remove: (id) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex === -1) return false;
        
        users.splice(userIndex, 1);
        return true;
    }
};