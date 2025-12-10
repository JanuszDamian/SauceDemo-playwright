// tests/data/types.ts

export class ProductListDataType {
  typeOfSort: string;
  

  constructor(typeOfSort: string) {
    this.typeOfSort = typeOfSort;
    
  }

  static fromProductListDataJson(json: any): ProductListDataType{
    return new ProductListDataType(json.typeOfSort)
  }
}
