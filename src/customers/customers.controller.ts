// Imports
import { Controller, Post, Body, Get, Put, Delete, Param } from "@nestjs/common";
import { CustomersService } from "./customers.service";
import { Customer } from "./customers.model";

// Customer controller class
@Controller('customer')
export class CustomersController {
    
    constructor(
        private readonly customersServ: CustomersService
    ) { }

    // Request handlers
    @Post()
    addCustomer(
        @Body() customerData: Customer
    ) {
        return this.customersServ.addCustomer(customerData);
    }

    @Get()
    getAllCustomers() {
        return this.customersServ.getAllCustomers();
    }

    @Get(':id')
    getCustomer(
        @Param('id') customerId: string
    ) {
        return this.customersServ.getCustomer(customerId);
    }

    @Put()
    updateCustomer(
        @Body() customerData: Customer
    ) {
        return this.customersServ.updateCustomer(customerData);
    }

    @Delete(':id')
    deleteCustomer (
        @Param('id') customerId: string
    ) {
        return this.customersServ.deleteCustomer(customerId);
    }
}