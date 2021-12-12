module.exports = mongoose => {
    const Device = mongoose.model(
      "device",
      mongoose.Schema(
        {
          serial: String,
          user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user' 
          }
        },
        { timestamps: true }
      )
    );
  
    return Device;
  };