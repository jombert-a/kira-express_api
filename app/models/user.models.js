module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          email: String,
          password: String,
        },
        { timestamps: true }
      )
    );
  
    return User;
  };