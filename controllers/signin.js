

const handleSignIn =  (req, res, db, bcrypt) => { 

	const {email, password} = req.body;	
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(users => {
			const isValidPw = bcrypt.compareSync(password, users[0].hash);
			if (isValidPw) {
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(users => {
						res.json(users[0])
					}) 
					.catch(err => res.status(400).json('unable to get user'));				
			} else {
				res.status(400).json('wrong credentials')
			}	
		})
		.catch(err => res.status(400).json('Unable to signin'));
}


module.exports = {
	handleSignIn: handleSignIn,
};