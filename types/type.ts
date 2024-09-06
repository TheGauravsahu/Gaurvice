export interface BusinessType {
    category: {
      name: string;
    };
    email: string;
    id: string;
    images: [
      {
        url: string;
      }
    ];
    name: string;
    about: string;
    address: string;
    contactPerson: string;
  }
  

export interface CategoryType {
  id: string;
  name: string;
  backgroundColour: {
    hex: string;
  };
  icon: {
    url: string;
  };
}
