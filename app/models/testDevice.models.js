module.exports = mongoose => {
                const testDevice = mongoose.model(
                  "testDevice",
                  mongoose.Schema(
                    {led:Boolean,state:Boolean,stove:Boolean,uuid:String,user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}},
                    { timestamps: true }
                  )
                );
              
                return testDevice;
              };