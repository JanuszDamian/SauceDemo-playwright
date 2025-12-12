// tests/data/types.ts

export class CheckoutDataType {
  firstName: string;
  lastName: string;
  postalCode: string;
  

  constructor(firstName: string, lastName: string, postalCode: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.postalCode = postalCode;
    
  }

  static fromCheckoutDataJson(json: any): CheckoutDataType{
    return new CheckoutDataType(json.firstName, json.lastName, json.postalCode)
  }
}
