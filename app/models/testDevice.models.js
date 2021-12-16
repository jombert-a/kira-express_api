module.exports = mongoose => {
                const testDevice = mongoose.model(
                  "testDevice",
                  mongoose.Schema(
                    {online:Boolean,led:Boolean,state:Boolean,stove:Boolean,uuid:String,user:{type:mongoose.Schema.Types.ObjectId,ref:'user'}},
                    { timestamps: true }
                  )
                );
              
                return testDevice;
              };