    const express = require('express');
    const cors = require('cors');
    const app = express();
    const http = require('http');
    require('dotenv').config();
    require('./connection'); // Assuming your database connection setup is in connection.js

    const server = http.createServer(app);
    const { Server } = require('socket.io');
    const io = new Server(server, {
        cors: 'http://localhost:3001',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'] 
    });

    const Order = require('./models/Order'); // Import the Order model

    const User = require('./models/User');
    const userRoutes = require('./routes/userRoutes');
    const productRoutes = require('./routes/productRoutes');
    const orderRoutes = require('./routes/orderRoutes');
    const imageRoutes = require('./routes/imageRoutes');
//summa
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use('/users', userRoutes);
    app.use('/products', productRoutes);
    app.use('/orders', orderRoutes);
    app.use('/images', imageRoutes);


    app.post('/create-order', async (req, res) => {
    const { userId, name, email, address, country, cart } = req.body;

    try {
        if (!userId) {
            throw new Error('userId is required');
        }

        // Create the order with userId as owner
        const order = await Order.create({
            owner: userId,
            name,
            email,
            address,
            country,
            products: cart.products,
            total: cart.total
        });

        // Optionally, you can perform additional operations like updating user's cart, etc.

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
    });


    server.listen(8080, () => {
        console.log('Server running at port', 8080);
    });

    app.set('socketio', io);
