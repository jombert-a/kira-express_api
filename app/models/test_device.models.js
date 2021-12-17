module.exports = mongoose => {
    const Test_device = mongoose.model(
        "Test_device",
        mongoose.Schema({
            uuid: {
                type: String,
                unique: true,
                required: true
            },
            button: {
                type: Boolean,
                default: false
            },
            led: {
                type: Boolean,
                default: false
            },
            online: {
                type: Boolean,
                default: false
            },
            device: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "device",
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        }, { timestamps: true })
    );

    return Test_device;
};