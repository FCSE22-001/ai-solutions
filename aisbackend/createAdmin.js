const bcrypt = require('bcrypt');
const db = require('./config/db');

const createAdmin = async () => {
    const username = 'drdoom808';
    const password = 'D00m@12#';

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO administrators (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err, result) => {
            if (err) {
                console.error('Error Creating Admin:', err.message);
            } else {
                console.log('Admin Created Successfully!');
            }
            process.exit();
        }
    );
};

createAdmin();
