module.exports = {
	product: {
		create: {
			product_name: 'required|string|minLength:3|unique:products,product_name',
			product_description: 'required|string|minLength:3',
			is_active: 'required|in:1,2'
		},
		update: {
			product_name: 'required|string|minLength:3|unique:products,product_name,id',
			product_description: 'required|string|minLength:3',
			is_active: 'required|in:true,false,1,0'
		}
	}
};
