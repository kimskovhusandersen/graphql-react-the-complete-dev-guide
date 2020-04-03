# User Project - GraphQL with REST API

The user-project is short demo on how to implement GraphQL with a REST API.

## Installation

Clone the repository and cd into the user-project directory and run

```
npm install

```

## Usage

Run Express.js from the directory folder:

```
npm run dev
```

and go to http://localhost:4000/graphql

### Here you can run queries...

```
query findCompany {
  company1: company(id: 1) {
    ...companyDetails
    users {
      ...userDetails
    }
  }
}

fragment companyDetails on Company {
  id
  name
  description
}

fragment userDetails on User {
  id
  firstName
  age
}
```

### ...and mutate the database:

```
mutation {
  addUser(firstName: "John", age: 71) {
    id
    firstName
    age
  }
}

mutation {
  editUser(id: 3, firstName: "Kirsten", age: 70) {
    id
    firstName
    age
  }
}

mutation {
  deleteUser(id: 4) {
    id
  }
}
```

## Contributing

Kim Skovhus Andersen.

The project was developed in cooperation with Udemy.

## License

[MIT](https://choosealicense.com/licenses/mit/)
