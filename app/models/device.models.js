module.exports = mongoose => {
    const Device = mongoose.model(
        "device",
        mongoose.Schema({
            name: String,
            scheme: Object
        }, { timestamps: true })
    );

    return Device;
};