


module.exports = {
    createInventory(req, res) {
        const dbInstance = req.app.get('db');
        const { name, imageurl, price } = req.body;
        dbInstance.create_product({ name, imageurl, price })
        .then(products => {
        res.status(200).json({message: 'Created Product'});
    }).catch(err => console.log('create product', err));
    },
    readInventory(req, res) {
        
        const dbInstance = req.app.get('db');
        dbInstance.read_products().then(products => {
            res.status(200).json({products: products});
            }).catch(err => console.log('read product error----------', err));
    },
    
    readProduct(req, res) {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
    dbInstance.read_product(id).then(product => {
            res.status(200).json({product: product});
        }).catch(err => console.log('REad Product bad-', err));
    },
    
    updateInventory(req, res) {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        const { name, imageurl, price } = req.body;
        dbInstance.update_product({ id: +id, name, imageurl, price: +price })
        .then(products => {
            res.status(200).json({message: 'Updated Product!'});
           
        })
    },
    deleteInventory(req, res) {
        const dbInstance = req.app.get('db');
        const { id } = req.params;
        dbInstance.delete_product(+id)
        .then(products => {
            res.status(200).json({message: 'Delete Product!'});
            
        })
    }

}