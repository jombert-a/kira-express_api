module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          email: {type: String, unique: true, required: true},
          password: {type: String, required: true},
          roles: [{type: String, ref: 'role'}]
        },
        { timestamps: true }
      )
    );
  
    return User;
  };