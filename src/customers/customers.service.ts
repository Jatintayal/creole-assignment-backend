// Imports
import { Injectable, NotFoundException, InternalServerErrorException, Param } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from "./customers.model";
import { Model } from 'mongoose';

// Customer service class
@Injectable()
export class CustomersService {

    constructor(
        @InjectModel('Customer') private readonly customerModel: Model<Customer>
    ) { }

    // Add new customer to the database
    async addCustomer(customer: Customer) {
        try {
            // Create new customer model using received customer data
            const newCustomer = new this.customerModel(customer);
            const result = await newCustomer.save();
            return { id: result._id };
        } catch {
            throw new InternalServerErrorException('Oops! Something went wrong.');
        }
    }

    // Get all customers
    async getAllCustomers() {
        try {
            const customers = await this.customerModel.find().exec();
            return customers.map(customer => ({
                _id: customer._id,
                email: customer.email,
                name: customer.name,
                address: customer.address,
                phone: customer.phone,
                password: customer.password
            }));
        } catch {
            throw new InternalServerErrorException('Oops! Something went wrong.');
        }
    }

    // Get Single Customer
    async getCustomer(customerId) {
        const customer = await this.customerModel.findById(customerId).exec();
        return {
            _id: customer._id,
            email: customer.email,
            name: customer.name,
            address: customer.address,
            phone: customer.phone,
            password: customer.password
        }
    }

    // Update a customer's details
    async updateCustomer(customer: Customer) {
        try {
            const updatedCustomer = await this.customerModel.findByIdAndUpdate(
                customer._id, 
                customer
            )
            return { id: customer._id };
        } catch {
            throw new InternalServerErrorException('Oops! Something went wrong.');
        }
    }

    // Delete a customer
    async deleteCustomer(customerId: string) {
        try {
            const deletedCustomer = await this.customerModel.deleteOne({_id: customerId}).exec();
            if (deletedCustomer.n === 0) {
                // If customer wasn't found
              throw new NotFoundException('Could not find product.');
            }
            return { id: customerId };
        } catch (err) {
            if (err.status == 404) {
                throw err;
            } else {
                throw new InternalServerErrorException('Oops! Something went wrong.');
            }
        }
    }
}