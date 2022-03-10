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
	},
	customer: {
		create: {
			user_name: 'required|string|minLength:3|unique:users,user_name',
			email: 'required|email|unique:users,email',
			password: 'required|string|minLength:6',
			phone: 'required|minLength:10',
			is_active: 'required|boolean',
		},
		update: {
			user_name: 'required|string|minLength:3|unique:users,user_name,id',
			email: 'required|email|unique:users,email,id',
			phone: 'required|minLength:10',
			is_active: 'required|boolean',
		},
		login: {
			email: "required|email",
			password: "required|string"
		}
	}
};
