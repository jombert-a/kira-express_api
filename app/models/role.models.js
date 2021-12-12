module.exports = mongoose => {
    const Role = mongoose.model(
      "role",
      mongoose.Schema(
        {
          value: {
              type: String,
              required: true,
              default: 'USER',
              unique: true
          }
        }
      )
    );
  
    return Role;
  };