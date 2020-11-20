const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema({
    booking_date: {
        type:Date,
        required:true
    },
    startTime: {
        type:Number,
        required:true
    },
    endTime: {
        type:Number,
        required:true
    },
    doctor_id: {
        type:String,
        required:true
    },
    patient_phone: {
        type:String,
        required:true
    }
}, {timestamps: true});

module.exports = mongoose.model("Booking", Booking);
