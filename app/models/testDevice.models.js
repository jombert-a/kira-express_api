module.exports = mongoose => {
                const testDevice = mongoose.model(
                  "testDevice",
                  mongoose.Schema(
                    {"led":"Boolean","state":"Boolean","uuid":"String"},
                    { timestamps: true }
                  )
                );
              
                return testDevice;
              };