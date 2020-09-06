// Imports
import * as mongoose from 'mongoose';

// Customer Schema 
export const CustomerSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String,
    phone: Number,
    password: String
})

// Customer Interface
export interface Customer extends mongoose.Document {
    _id?: string,
    email: string,
    name: string,
    address: string,
    phone: number,
    password: string
}